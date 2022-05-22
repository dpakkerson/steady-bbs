import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function createThread(title: string) {
  const threadId = Math.floor(Date.now() / 1000);

  return prisma.thread.create({
    data: {
      id: threadId,
      title,
    },
  });
}

export function listThreads() {
  return prisma.thread.findMany({orderBy: {updatedAt: 'desc'}, include: {_count: {select: { Response: true }}}});
}

export function getThread(id: number) {
  return prisma.thread.findUnique({
    where: {
      id,
    },
  });
}
