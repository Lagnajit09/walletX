/*
  Warnings:

  - Made the column `walletID` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "walletID" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "walletID" SET NOT NULL;
