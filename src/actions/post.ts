"use server";

import { z } from "zod";
import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location: z.string(),
  email: z.string(),
});

export const createPost = async (data: FormData) => {
  const postData = postSchema.parse(Object.fromEntries(data));
  await prisma.post.create({
    data: {
      ...postData,
      contact: Number(postData.contact),
    },
  });
  revalidatePath("/");
};
