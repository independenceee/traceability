"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function getUserSubscriptions() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      include: {
        service: true,
        Payment: true,
      },
    });

    if (!subscriptions.length) {
      return { result: false, message: "No subscriptions found.", data: [] };
    }

    return { result: true, message: "Subscriptions fetched successfully.", data: subscriptions };
  } catch (error) {
    return { result: false, message: parseError(error), data: [] };
  }
}
