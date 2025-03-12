-- DropForeignKey
ALTER TABLE "Scholarship" DROP CONSTRAINT "Scholarship_fundraiserId_fkey";

-- AlterTable
ALTER TABLE "Scholarship" ALTER COLUMN "fundraiserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Scholarship" ADD CONSTRAINT "Scholarship_fundraiserId_fkey" FOREIGN KEY ("fundraiserId") REFERENCES "Fundraiser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
