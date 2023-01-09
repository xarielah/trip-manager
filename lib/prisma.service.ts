import { PrismaClient } from "@prisma/client";

// export * from "@prisma/client";

declare module globalThis {
  let prisma: PrismaClient;
}

export const PrismaService =
  globalThis.prisma ||
  new PrismaClient({
    log: ["warn", "error"],
    errorFormat: process.env.NODE_ENV === "production" ? "minimal" : "pretty",
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = PrismaService;
}
