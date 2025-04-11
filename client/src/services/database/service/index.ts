"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createService({ name, description, price, duration }: { name: string; description?: string; price: number; duration: number }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.service.create({
      data: { name, description, price, duration },
    });

    return { result: true, message: "Service has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function getAllServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { result: true, message: "Get all services successful", data: services };
  } catch (e) {
    return { result: false, data: [], message: parseError(e) };
  }
}

export async function deleteService(serviceId: string) {
  try {
    await prisma.service.delete({ where: { id: serviceId } });

    return { result: true, message: "Service has been deleted successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function updateService({
  serviceId,
  name,
  description,
  price,
  duration,
}: {
  serviceId: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
}) {
  try {
    await prisma.service.update({
      where: { id: serviceId },
      data: { name, description, price, duration },
    });

    return { result: true, message: "Service has been updated successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}
