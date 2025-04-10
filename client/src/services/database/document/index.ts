"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createDocument({ productId, docType, url, hash }: { productId: string; docType: string; url: string; hash?: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.document.create({
      data: {
        productId,
        docType,
        url,
        hash,
      },
    });

    return { result: true, message: "Document has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function getAllDocuments({ productId }: { productId: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const documents = await prisma.document.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
    });

    return { result: true, message: "Get all documents successful", data: documents };
  } catch (e) {
    return { result: false, data: [], message: parseError(e) };
  }
}

export async function deleteDocument(documentId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.document.delete({ where: { id: documentId } });

    return { result: true, message: "Document has been deleted successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function updateDocument({ documentId, docType, url, hash }: { documentId: string; docType?: string; url?: string; hash?: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.document.update({
      where: { id: documentId },
      data: {
        docType,
        url,
        hash,
      },
    });

    return { result: true, message: "Document has been updated successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}
