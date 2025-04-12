"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createOrRenewSubscriptionWithPayment({
  servicePlanId,
  amount,
  txHash,
}: {
  servicePlanId: string;
  amount: number;
  txHash: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    // Lấy thông tin gói dịch vụ
    const service = await prisma.service.findUnique({
      where: { id: servicePlanId },
    });

    if (!service) {
      throw new Error("Service plan not found.");
    }

    // Tìm subscription hiện tại của người dùng
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId,
        servicePlanId,
      },
    });

    let result;

    if (existingSubscription) {
      // Nếu đã có subscription, gia hạn
      const newEndDate = new Date(existingSubscription.endDate);
      newEndDate.setMonth(newEndDate.getMonth() + service.duration);

      result = await prisma.$transaction(async (prisma) => {
        // Cập nhật subscription
        const updatedSubscription = await prisma.subscription.update({
          where: { id: existingSubscription.id },
          data: {
            endDate: newEndDate,
          },
        });

        // Tạo payment mới
        const payment = await prisma.payment.create({
          data: {
            userId,
            subscriptionId: existingSubscription.id,
            amount,
            txHash,
            paymentDate: new Date(),
          },
        });

        return { updatedSubscription, payment };
      });
    } else {
      // Nếu chưa có subscription, tạo mới
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + service.duration);

      result = await prisma.$transaction(async (prisma) => {
        // Tạo subscription mới
        const subscription = await prisma.subscription.create({
          data: {
            userId,
            servicePlanId,
            startDate,
            endDate,
            status: "active",
          },
        });

        // Tạo payment liên quan đến subscription
        const payment = await prisma.payment.create({
          data: {
            userId,
            subscriptionId: subscription.id,
            amount,
            txHash,
            paymentDate: new Date(),
          },
        });

        return { subscription, payment };
      });
    }

    return {
      result: true,
      message: existingSubscription ? "Subscription renewed successfully!" : "Subscription created successfully!",
      data: result,
    };
  } catch (e) {
    console.error("Error creating or renewing subscription:", e);
    return { result: false, message: parseError(e) };
  }
}
