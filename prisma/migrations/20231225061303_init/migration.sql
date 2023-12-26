/*
  Warnings:

  - The primary key for the `Enrollments` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Enrollments" DROP CONSTRAINT "Enrollments_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Enrollments_pkey" PRIMARY KEY ("id");
