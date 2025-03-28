"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";
import { isNil } from "lodash";

async function getUserStatistics() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const userStats = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            Collection: true,
            Media: true,
          },
        },
        Collection: {
          include: {
            _count: {
              select: {
                Metadata: true,
              },
            },
          },
        },
      },
    });

    if (isNil(userStats)) {
      throw new Error("User not found");
    }

    const totalMetadata = userStats.Collection.reduce((sum, collection) => sum + (collection._count?.Metadata || 0), 0);

    return {
      result: true,
      message: "Get user statistics successful",
      data: {
        collection: userStats._count.Collection || 0,
        media: userStats._count.Media || 0,
        metadata: totalMetadata,
      },
    };
  } catch (e) {
    return {
      result: false,
      data: null,
      message: parseError(e),
    };
  }
}

export default getUserStatistics;
