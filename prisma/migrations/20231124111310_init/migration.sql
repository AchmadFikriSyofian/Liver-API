/*
  Warnings:

  - You are about to drop the column `course_id_mentor` on the `Mentors` table. All the data in the column will be lost.
  - Added the required column `mentor_id` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mentors" DROP CONSTRAINT "Mentors_course_id_mentor_fkey";

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "mentor_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Mentors" DROP COLUMN "course_id_mentor";

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "Mentors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
