"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createWarehouse({ name, location, capacity = 0 }: { name: string; location?: string; capacity?: number }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.warehouse.create({
      data: { name, location, capacity },
    });

    return { result: true, message: "Warehouse has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function getAllWarehouses() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const warehouses = await prisma.warehouse.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { result: true, message: "Get all warehouses successful", data: warehouses };
  } catch (e) {
    return { result: false, data: [], message: parseError(e) };
  }
}

export async function deleteWarehouse(warehouseId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.warehouse.delete({ where: { id: warehouseId } });

    return { result: true, message: "Warehouse has been deleted successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function updateWarehouse({
  warehouseId,
  name,
  location,
  capacity,
}: {
  warehouseId: string;
  name?: string;
  location?: string;
  capacity?: number;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.warehouse.update({
      where: { id: warehouseId },
      data: { name, location, capacity },
    });

    return { result: true, message: "Warehouse has been updated successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}
