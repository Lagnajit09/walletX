// apps/bank-webhook/build.js
const { execSync } = require("child_process");
const path = require("path");

try {
  // Generate Prisma Client
  console.log("Generating Prisma Client...");
  execSync("npx prisma generate", { stdio: "inherit" });

  // Run the build
  console.log("Building the application...");
  execSync("npm run build", { stdio: "inherit" });
} catch (error) {
  console.error("Build failed:", error);
  process.exit(1);
}
