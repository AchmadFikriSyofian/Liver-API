/*
  Warnings:

  - Made the column `mentor_id` on table `Courses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_mentor_id_fkey";

-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "mentor_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "Mentors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
