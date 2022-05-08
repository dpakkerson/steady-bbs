import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type PostResponseRequest = {
  threadId: number;
  name: string;
  mail: string;
  content: string;
  hashId: string;
};

export function postResponse(newPost: PostResponseRequest) {
  return listThreadResponses(newPost.threadId).then((responses) => {
    const newNumber = responses.length + 1;
    return prisma.response.create({
      data: {
        ...newPost,
        number: newNumber,
      },
    });
  });
}

export function listThreadResponses(
  threadId: number,
  from?: number,
  to?: number
) {
  const numberConstraint = from || to ? { gte: from, lte: to } : undefined;
  const where = {
    threadId,
    number: numberConstraint,
  };
  return prisma.response.findMany({
    where,
  });
}
