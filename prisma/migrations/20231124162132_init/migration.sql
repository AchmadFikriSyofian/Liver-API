/*
  Warnings:

  - You are about to drop the column `category_id` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `mentor_id` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `level` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('isFree', 'isPremium');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_mentor_id_fkey";

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "category_id",
DROP COLUMN "mentor_id",
ADD COLUMN     "level" "Level" NOT NULL,
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'isFree';

-- AlterTable
ALTER TABLE "Enrollments" ADD COLUMN     "payment" TEXT;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "is_admin" SET DEFAULT false;

-- CreateTable
CREATE TABLE "MentorsOnCourses" (
    "mentor_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MentorsOnCourses_pkey" PRIMARY KEY ("mentor_id","course_id")
);

-- CreateTable
CREATE TABLE "CategoriesOnCourses" (
    "category_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnCourses_pkey" PRIMARY KEY ("category_id","course_id")
);

-- AddForeignKey
ALTER TABLE "MentorsOnCourses" ADD CONSTRAINT "MentorsOnCourses_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "Mentors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorsOnCourses" ADD CONSTRAINT "MentorsOnCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnCourses" ADD CONSTRAINT "CategoriesOnCourses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnCourses" ADD CONSTRAINT "CategoriesOnCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
