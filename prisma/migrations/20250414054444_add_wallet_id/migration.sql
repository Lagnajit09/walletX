/*
  Warnings:

  - A unique constraint covering the columns `[walletID]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "walletID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_walletID_key" ON "User"("walletID");
