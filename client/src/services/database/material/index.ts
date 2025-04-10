"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createMaterial({
  name,
  supplierId,
  quantity = 0,
  harvestDate,
}: {
  name: string;
  supplierId: string;
  quantity?: number;
  harvestDate?: Date;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.material.create({
      data: { name, quantity, supplierId, harvestDate },
    });

    return { result: true, message: "Material has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function getAllMaterials({ supplierId }: { supplierId: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const materials = await prisma.material.findMany({
      where: { supplierId: supplierId },
      orderBy: { createdAt: "desc" },
    });

    return { result: true, message: "Get all materials successful", data: materials };
  } catch (e) {
    return { result: false, data: [], message: parseError(e) };
  }
}

export async function deleteMaterial(materialId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.material.delete({ where: { id: materialId } });

    return { result: true, message: "Material has been deleted successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function updateMaterial({
  materialId,
  name,
  quantity = 0,
  supplierId,
  harvestDate,
}: {
  materialId: string;
  name: string;
  quantity?: number;
  supplierId?: string;
  harvestDate?: Date;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.material.update({
      where: { id: materialId },
      data: { name, quantity, supplierId, harvestDate },
    });

    return { result: true, message: "Material has been updated successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}
