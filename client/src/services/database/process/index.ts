"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createProductionProcess({
  productId,
  startTime,
  endTime,
  location,
}: {
  productId: string;
  startTime: Date;
  endTime?: Date;
  location?: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.productionProcess.create({
      data: {
        productId,
        startTime,
        endTime,
        location,
      },
    });

    return { result: true, message: "Production process has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function getAllProductionProcesses({ productId }: { productId: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const productionProcesses = await prisma.productionProcess.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
    });

    return { result: true, message: "Get all production processes successful", data: productionProcesses };
  } catch (e) {
    return { result: false, data: [], message: parseError(e) };
  }
}

export async function deleteProductionProcess(productionProcessId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.productionProcess.delete({ where: { id: productionProcessId } });

    return { result: true, message: "Production process has been deleted successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function updateProductionProcess({
  productionProcessId,
  startTime,
  endTime,
  location,
}: {
  productionProcessId: string;
  startTime?: Date;
  endTime?: Date;
  location?: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.productionProcess.update({
      where: { id: productionProcessId },
      data: {
        startTime,
        endTime,
        location,
      },
    });

    return { result: true, message: "Production process has been updated successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}
