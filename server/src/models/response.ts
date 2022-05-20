import { PrismaClient } from "@prisma/client";
import {createHash} from 'crypto'

const prisma = new PrismaClient();

type PostResponseRequest = {
  threadId: number;
  name: string;
  mail: string;
  content: string;
  hashId: string;
};

export function postResponse(newPost: PostResponseRequest, updateThreadTimestamp?: boolean) {
  return listThreadResponses(newPost.threadId).then((responses) => {
    const newNumber = responses.length + 1;
    return prisma.response.create({
      data: {
        ...newPost,
        name: getNameField(newPost),
        number: newNumber,
      },
    });
  }).then(response => {
    if (updateThreadTimestamp ?? (newPost.mail !== 'sage')) {
      return prisma.thread.update({where: {id: newPost.threadId}, data: {id: newPost.threadId }}).then(() => response);
    } else {
      return response;
    }
  });
}

function getNameField(newPost: PostResponseRequest): string {
  let name = newPost.name;

  // replace forbidden characters
  name = name.replace('◆', '◇');

  // process trip key
  const tripPattern = /#(.*)$/;
  const hashedTripKeyMatch = name.match(tripPattern);
  if (hashedTripKeyMatch !== null) {
    const hasher = createHash('sha1');
    hasher.update(hashedTripKeyMatch[0]);
    const trip = hasher.digest().toString('base64').substring(0, 12);  // todo: compatibility with 0ch plus
    name = name.replace(tripPattern, '◆' + trip)
  }

  return name;
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
