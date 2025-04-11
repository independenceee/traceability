"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createWarehouseStorage({
  productId,
  warehouseId,
  entryTime,
  exitTime,
  conditions,
}: {
  productId: string;
  warehouseId: string;
  entryTime: Date;
  exitTime?: Date;
  conditions?: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.warehouseStorage.create({
      data: { productId, warehouseId, entryTime, exitTime, conditions },
    });

    return { result: true, message: "Warehouse storage record has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function getAllWarehouseStorage({ productId }: { productId: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const warehouseStorageRecords = await prisma.warehouseStorage.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      include: {
        product: true,
        warehouse: true,
      },
    });

    return { result: true, message: "Get all warehouse storage records successful", data: warehouseStorageRecords };
  } catch (e) {
    return { result: false, data: [], message: parseError(e) };
  }
}

export async function deleteWarehouseStorage(warehouseStorageId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.warehouseStorage.delete({ where: { id: warehouseStorageId } });

    return { result: true, message: "Warehouse storage record has been deleted successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function updateWarehouseStorage({
  warehouseStorageId,
  entryTime,
  exitTime,
  conditions,
}: {
  warehouseStorageId: string;
  entryTime?: Date;
  exitTime?: Date;
  conditions?: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.warehouseStorage.update({
      where: { id: warehouseStorageId },
      data: { entryTime, exitTime, conditions },
    });

    return { result: true, message: "Warehouse storage record has been updated successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}
