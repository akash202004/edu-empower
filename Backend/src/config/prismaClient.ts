import { PrismaClient } from "@prisma/client";

class prismaSingleton {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!prismaSingleton.instance) {
      prismaSingleton.instance = new PrismaClient();
    }

    return prismaSingleton.instance;
  }
}

const prisma = prismaSingleton.getInstance();

export { prisma };
