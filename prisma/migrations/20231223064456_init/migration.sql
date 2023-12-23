/*
  Warnings:

  - You are about to drop the column `course_id_chapter` on the `Chapters` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chapters" DROP CONSTRAINT "Chapters_course_id_chapter_fkey";

-- AlterTable
ALTER TABLE "Chapters" DROP COLUMN "course_id_chapter",
ADD COLUMN     "course_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Chapters" ADD CONSTRAINT "Chapters_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
