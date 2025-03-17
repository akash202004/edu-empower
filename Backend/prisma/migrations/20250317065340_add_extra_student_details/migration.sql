/*
  Warnings:

  - Added the required column `updatedAt` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentDetails" ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "careerGoals" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "contactNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fullName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "gender" TEXT NOT NULL DEFAULT 'Not Specified',
ADD COLUMN     "nationality" TEXT NOT NULL DEFAULT 'Not Specified',
ADD COLUMN     "otherScholarships" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "scholarshipReason" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
