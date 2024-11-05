// import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient({
//   log: ["query", "info", "warn", "error"],
// });

// export default db;
// export * from "@prisma/client";

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const db =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}

export default db;
export * from "@prisma/client";
