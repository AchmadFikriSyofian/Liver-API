/*
  Warnings:

  - You are about to drop the column `course_id_mentor` on the `Mentors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mentors" DROP CONSTRAINT "Mentors_course_id_mentor_fkey";

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "mentor_id" INTEGER;

-- AlterTable
ALTER TABLE "Mentors" DROP COLUMN "course_id_mentor";

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "Mentors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
