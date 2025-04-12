"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createPayment({ subscriptionId, amount, txHash }: { subscriptionId: string; amount: number; txHash: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    // Kiểm tra subscription có tồn tại không
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: { service: true },
    });

    if (!subscription) {
      throw new Error("Subscription not found.");
    }

    // Tạo bản ghi thanh toán
    const payment = await prisma.payment.create({
      data: {
        userId,
        subscriptionId,
        amount,
        txHash,
        paymentDate: new Date(),
      },
    });

    // (Tùy chọn) Gia hạn subscription nếu cần
    const newEndDate = new Date(subscription.endDate);
    newEndDate.setMonth(newEndDate.getMonth() + subscription.service.duration);

    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { endDate: newEndDate },
    });

    return { result: true, message: "Payment has been processed successfully!", data: payment };
  } catch (e) {
    console.error("Error processing payment:", e);
    return { result: false, message: parseError(e) };
  }
}

export async function createSubscriptionWithPayment({ servicePlanId, amount, txHash }: { servicePlanId: string; amount: number; txHash: string }) {
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

    // Tính toán ngày bắt đầu và ngày kết thúc
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + service.duration);

    // Thực hiện cả hai tác vụ trong một giao dịch
    const result = await prisma.$transaction(async (prisma) => {
      // Tạo subscription
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

    return {
      result: true,
      message: "Subscription and payment have been created successfully!",
      data: result,
    };
  } catch (e) {
    console.error("Error creating subscription and payment:", e);
    return { result: false, message: parseError(e) };
  }
}
