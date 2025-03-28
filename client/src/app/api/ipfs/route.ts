import { NextResponse } from "next/server";
import axios from "axios";
import { IPFS_ENDPOINT } from "@/constants";
import mimeTypes from "@/constants/mime-types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";

async function cp(argCid: string, argName: string) {
  const url = IPFS_ENDPOINT + `/api/v0/files/cp?arg=/ipfs/${argCid}&arg=/${argName}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.Message && errorData.Message.includes("already has entry by that name")) {
        return {
          data: { cid: argCid, name: argName },
          result: true,
          message: "success",
        };
      }
    }

    return {
      data: { cid: argCid, name: argName },
      result: true,
      message: "success",
    };
  } catch (e) {
    return {
      data: { cid: argCid, name: argName },
      result: false,
      message: parseError(e),
    };
  }
}

// Main function to handle kudo upload
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized", result: false }, { status: 401 });
    }

    const mediaCount = await prisma.media.count({
      where: { userId },
    });

    if (mediaCount >= 50) {
      return NextResponse.json({ message: "You have reached the maximum limit of 50 media.", result: false }, { status: 400 });
    }

    // Upload to IPFS
    const response = await axios.post(
      `${IPFS_ENDPOINT}/api/v0/add?stream-channels=true&pin=false&wrap-with-directory=false&progress=false`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (!response.data) {
      return NextResponse.json({ message: "Empty response data from upload", result: false }, { status: 500 });
    }

    if (typeof response.data === "object") {
      const { Hash, Name } = response.data;

      const cpResult = await cp(Hash, Name);
      if (!cpResult.result) {
        return NextResponse.json({ message: cpResult.message, result: false }, { status: 500 });
      }

      const { cid, name } = cpResult.data;
      await prisma.media.upsert({
        where: {
          url: `ipfs://${cid}`,
        },
        update: {
          userId: userId,
          name: name,
          type: mimeTypes[name.split(".").pop()?.toLowerCase() ?? ""] || "unknown",
          url: `ipfs://${cid}`,
          updatedAt: new Date(),
        },
        create: {
          userId: userId,
          name: name,
          type: mimeTypes[name.split(".").pop()?.toLowerCase() ?? ""] || "unknown",
          url: `ipfs://${cid}`,
        },
      });

      return NextResponse.json({ message: "success", result: true });
    } else {
      const results = await Promise.all(
        response.data
          .trim()
          .split("\n")
          .map((line: string) => {
            const { Hash, Name } = JSON.parse(line);
            return cp(Hash, Name);
          }),
      );

      const availableSlots = 50 - (await prisma.media.count({ where: { userId } }));

      if (availableSlots <= 0) {
        return NextResponse.json({ message: "You have reached the maximum limit of 50 media.", result: false }, { status: 400 });
      }

      const filteredResults = results.filter((item) => item.result).slice(0, availableSlots);
      await prisma.media.createMany({
        data: filteredResults.map((item) => {
          const { cid, name } = item.data;
          return {
            userId: userId,
            name: name,
            type: mimeTypes[name.split(".").pop()?.toLowerCase()] || "unknown",
            url: `ipfs://${cid}`,
          };
        }),
        skipDuplicates: true,
      });

      return NextResponse.json({ message: "success", result: true });
    }
  } catch (e) {
    return NextResponse.json(
      {
        message: e instanceof Error ? e.message : "An error occurred",
        result: false,
      },
      { status: 500 },
    );
  }
}
