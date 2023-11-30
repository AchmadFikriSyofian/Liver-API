/*
  Warnings:

  - Added the required column `duration` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "duration" INTEGER NOT NULL;
