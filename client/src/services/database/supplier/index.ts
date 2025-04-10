"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createSupplier({
  name,
  contactInfo,
  gpsCoordinates,
  location,
}: {
  name: string;
  contactInfo?: string;
  gpsCoordinates?: string;
  location?: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.supplier.create({ data: { name, contactInfo, userId, gpsCoordinates, location } });

    return { result: true, message: "Supplier has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function getAllSuppliers() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const suppliers = await prisma.supplier.findMany({ where: { userId: userId }, orderBy: { createdAt: "desc" } });

    return { result: true, message: "Get all suppliers successful", data: suppliers };
  } catch (e) {
    return { result: false, data: [], message: parseError(e) };
  }
}

export async function deleteSupplier(supplierId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.supplier.delete({ where: { id: supplierId } });

    return { result: true, message: "Supplier has been deleted successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function updateSupplier({
  supplierId,
  name,
  contactInfo,
  gpsCoordinates,
  location,
}: {
  supplierId: string;
  name: string;
  contactInfo?: string;
  gpsCoordinates?: string;
  location?: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.supplier.update({ where: { id: supplierId }, data: { name, contactInfo, gpsCoordinates, location } });

    return { result: true, message: "Supplier has been updated successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}
