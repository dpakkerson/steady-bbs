// copied from server's prisma type defn.
// todo: use server's file directly.

/**
 * Model Thread
 *
 */
export type Thread = {
  id: number;
  postedAt: Date;
  updatedAt: Date;
  title: string;
};

/**
 * Model Response
 *
 */
export type Response = {
  id: number;
  postedAt: Date;
  name: string;
  mail: string;
  number: number;
  content: string;
  hashId: string;
  threadId: number;
};
