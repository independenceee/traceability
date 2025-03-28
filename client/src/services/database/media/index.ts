"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";
import { Media } from "@prisma/client";
import { isEmpty, isNil } from "lodash";
import { DateRange } from "react-day-picker";

export async function getMedia({
  query = null,
  range = null,
  page = 1,
  limit = 12,
}: {
  query?: string | null;
  range?: DateRange | null;
  page?: number;
  limit?: number;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const whereConditions: {
      userId: string;
      OR?: Array<
        | {
            name?: {
              contains: string;
              mode?: "insensitive";
            };
          }
        | {
            url?: {
              contains: string;
              mode?: "insensitive";
            };
          }
      >;
      createdAt?: {
        gte?: Date;
        lte?: Date;
      };
    } = {
      userId: userId,
    };

    if (!isNil(query) && !isEmpty(query)) {
      whereConditions.OR = [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          url: {
            contains: query,
            mode: "insensitive",
          },
        },
      ];
    }

    if (!isNil(range)) {
      whereConditions.createdAt = {
        gte: range.from,
        lte: range.to,
      };
    }

    const media = await prisma.media.findMany({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        updatedAt: "desc",
      },
    });

    const totalItems = await prisma.media.count({
      where: whereConditions,
    });

    return {
      data: media,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  } catch (e) {
    return {
      data: [],
      message: parseError(e),
    };
  }
}

export async function deleteMedia(media: Media[]): Promise<{ message: string; result: boolean }> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.media.deleteMany({
      where: {
        userId: userId,
        id: {
          in: media.map((item) => item.id),
        },
      },
    });

    return {
      message: "success",
      result: true,
    };
  } catch (e) {
    return {
      message: parseError(e),
      result: false,
    };
  }
}
