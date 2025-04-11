"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createProduct({
  name,
  assetName,
  policyId,
  imageUrl,
  description,
  historyHash,
}: {
  name: string;
  assetName?: string;
  policyId?: string;
  imageUrl?: string;
  description?: string;
  historyHash?: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.product.create({
      data: {
        name,
        assetName,
        policyId,
        imageUrl,
        description,
        historyHash,
        userId,
      },
    });

    return { result: true, message: "Product has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function getAllProducts({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where: { userId } }),
    ]);

    return {
      result: true,
      message: "Get all products successful",
      data: products,
      total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (e) {
    return { result: false, data: [], message: parseError(e), total: 0, totalPages: 0 };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.product.delete({ where: { id: productId } });

    return { result: true, message: "Product has been deleted successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function updateProduct({
  productId,
  name,
  assetName,
  policyId,
  imageUrl,
  description,
  historyHash,
}: {
  productId: string;
  name: string;
  assetName?: string;
  policyId?: string;
  imageUrl?: string;
  description?: string;
  historyHash?: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        assetName,
        policyId,
        imageUrl,
        description,
        historyHash,
      },
    });

    return { result: true, message: "Product has been updated successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function getProductById({ productId }: { productId: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        userId,
      },
      include: {
        Certification: true,
        Document: true,
        WarehouseStorage: {
          include: {
            warehouse: true,
          },
        },
        Feedback: true,
        ProductionProcess: true,
      },
    });

    if (!product) {
      return { result: false, message: "Product not found", data: null };
    }

    return { result: true, message: "Get product successful", data: product };
  } catch (e) {
    return { result: false, message: parseError(e), data: null };
  }
}
