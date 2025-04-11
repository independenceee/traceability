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

export async function getAllCertifications({ productId, page = 1, limit = 10 }: { productId: string; page?: number; limit?: number }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    // Tính toán số bản ghi cần bỏ qua (offset)
    const offset = (page - 1) * limit;

    // Lấy tổng số chứng nhận
    const totalCertifications = await prisma.certification.count({
      where: { productId },
    });

    // Lấy danh sách chứng nhận với phân trang
    const certifications = await prisma.certification.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    });

    return {
      result: true,
      message: "Get all certifications successful",
      data: certifications,
      totalItem: totalCertifications,
      totalPages: Math.ceil(totalCertifications / limit),
      currentPage: page,
    };
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
