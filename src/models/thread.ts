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
  // todo: filter responses
  return prisma.thread.findMany();
}

export function getThread(id: number) {
  return prisma.thread.findUnique({
    where: {
      id,
    },
  });
}
