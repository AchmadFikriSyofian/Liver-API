/*
  Warnings:

  - You are about to drop the column `averageRating` on the `Courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "averageRating",
ADD COLUMN     "sumRating" DOUBLE PRECISION NOT NULL DEFAULT 0;
