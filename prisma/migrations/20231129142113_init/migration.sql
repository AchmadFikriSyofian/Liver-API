/*
  Warnings:

  - You are about to drop the column `duration` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "duration";

-- AlterTable
ALTER TABLE "Lessons" ADD COLUMN     "duration" INTEGER NOT NULL;
