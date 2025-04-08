/*
  Warnings:

  - Added the required column `about` to the `Fundraiser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Fundraiser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fundraiser" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
