/*
  Warnings:

  - You are about to drop the column `averageRating` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `totalVote` on the `Courses` table. All the data in the column will be lost.
  - Made the column `rating` on table `Courses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "averageRating",
DROP COLUMN "totalVote",
ALTER COLUMN "rating" SET NOT NULL;
