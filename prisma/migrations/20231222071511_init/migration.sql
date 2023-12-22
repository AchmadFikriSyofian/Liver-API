/*
  Warnings:

  - The primary key for the `Enrollments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Enrollments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `kode` to the `Enrollments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enrollments" DROP CONSTRAINT "Enrollments_pkey",
ADD COLUMN     "kode" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Enrollments_pkey" PRIMARY KEY ("id");
