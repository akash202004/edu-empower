-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "OrganizationDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentURL" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OrganizationDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tenthResult" TEXT NOT NULL,
    "twelfthResult" TEXT NOT NULL,
    "incomeCert" TEXT NOT NULL,

    CONSTRAINT "StudentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationDetails_userId_key" ON "OrganizationDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentDetails_userId_key" ON "StudentDetails"("userId");

-- AddForeignKey
ALTER TABLE "OrganizationDetails" ADD CONSTRAINT "OrganizationDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentDetails" ADD CONSTRAINT "StudentDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
