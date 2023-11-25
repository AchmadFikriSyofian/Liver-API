/*
  Warnings:

  - You are about to drop the column `category_id` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `mentor_id` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `student_id_enrollment` on the `Enrollments` table. All the data in the column will be lost.
  - You are about to drop the `Accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Assessments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Modules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `level` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Enrollments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('isFree', 'isPremium');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- DropForeignKey
ALTER TABLE "Assessments" DROP CONSTRAINT "Assessments_course_id_assessment_fkey";

-- DropForeignKey
ALTER TABLE "Assessments" DROP CONSTRAINT "Assessments_student_id_assessment_fkey";

-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_mentor_id_fkey";

-- DropForeignKey
ALTER TABLE "Enrollments" DROP CONSTRAINT "Enrollments_student_id_enrollment_fkey";

-- DropForeignKey
ALTER TABLE "Modules" DROP CONSTRAINT "Modules_course_id_module_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_account_id_fkey";

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "category_id",
DROP COLUMN "mentor_id",
ADD COLUMN     "level" "Level" NOT NULL,
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'isFree';

-- AlterTable
ALTER TABLE "Enrollments" DROP COLUMN "student_id_enrollment",
ADD COLUMN     "payment" TEXT,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Accounts";

-- DropTable
DROP TABLE "Assessments";

-- DropTable
DROP TABLE "Modules";

-- DropTable
DROP TABLE "Students";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "no_hp" TEXT NOT NULL,
    "jenis_kelamin" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Chapters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "course_id_chapter" INTEGER NOT NULL,

    CONSTRAINT "Chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lessons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "chapter_id" INTEGER NOT NULL,

    CONSTRAINT "Lessons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "MentorsOnCourses" ADD CONSTRAINT "MentorsOnCourses_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "Mentors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorsOnCourses" ADD CONSTRAINT "MentorsOnCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnCourses" ADD CONSTRAINT "CategoriesOnCourses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnCourses" ADD CONSTRAINT "CategoriesOnCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapters" ADD CONSTRAINT "Chapters_course_id_chapter_fkey" FOREIGN KEY ("course_id_chapter") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
