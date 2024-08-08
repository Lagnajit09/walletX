/** @type {import('next').NextConfig} */
const nextConfig = {};
// next.config.mjs in apps/user-app
import dotenv from "dotenv";

dotenv.config({ path: "../../packages/db/.env" });
export default nextConfig;
