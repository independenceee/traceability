"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createCertification({
  productId,
  certName,
  issueDate,
  expiryDate,
  certHash,
}: {
  productId: string;
  certName: string;
  issueDate: Date;
  expiryDate?: Date;
  certHash?: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.certification.create({
      data: {
        productId,
        certName,
        issueDate,
        expiryDate,
        certHash,
      },
    });

    return { result: true, message: "Certification has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function getAllCertifications({ productId }: { productId: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const certifications = await prisma.certification.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
    });

    return { result: true, message: "Get all certifications successful", data: certifications };
  } catch (e) {
    return { result: false, data: [], message: parseError(e) };
  }
}

export async function deleteCertification(certificationId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.certification.delete({ where: { id: certificationId } });

    return { result: true, message: "Certification has been deleted successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function updateCertification({
  certificationId,
  certName,
  issueDate,
  expiryDate,
  certHash,
}: {
  certificationId: string;
  certName?: string;
  issueDate?: Date;
  expiryDate?: Date;
  certHash?: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.certification.update({
      where: { id: certificationId },
      data: {
        certName,
        issueDate,
        expiryDate,
        certHash,
      },
    });

    return { result: true, message: "Certification has been updated successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}
