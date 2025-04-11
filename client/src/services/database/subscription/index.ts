"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createSubscription({
  userId,
  servicePlanId,
  startDate,
  endDate,
  status = "active",
}: {
  userId: string;
  servicePlanId: string;
  startDate: Date;
  endDate: Date;
  status?: string;
}) {
  try {
    const session = await auth();
    const currentUserId = session?.user?.id;

    if (!currentUserId) {
      throw new UnauthorizedException();
    }

    await prisma.subscription.create({
      data: { userId, servicePlanId, startDate, endDate, status },
    });

    return { result: true, message: "Subscription has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function getAllSubscriptions() {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: { user: true, service: true },
      orderBy: { createdAt: "desc" },
    });

    return { result: true, message: "Get all subscriptions successful", data: subscriptions };
  } catch (e) {
    return { result: false, data: [], message: parseError(e) };
  }
}

export async function deleteSubscription(subscriptionId: string) {
  try {
    await prisma.subscription.delete({ where: { id: subscriptionId } });

    return { result: true, message: "Subscription has been deleted successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function updateSubscription({
  subscriptionId,
  startDate,
  endDate,
  status,
}: {
  subscriptionId: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
}) {
  try {
    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { startDate, endDate, status },
    });

    return { result: true, message: "Subscription has been updated successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}
