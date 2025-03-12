/*
  Warnings:

  - Added the required column `fatherName` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherName` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentDetails" ADD COLUMN     "fatherName" TEXT NOT NULL,
ADD COLUMN     "motherName" TEXT NOT NULL;
