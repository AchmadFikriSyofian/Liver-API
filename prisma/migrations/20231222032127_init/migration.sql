/*
  Warnings:

  - You are about to drop the column `category_name` on the `CategoriesOnCourses` table. All the data in the column will be lost.
  - You are about to drop the column `course_name` on the `CategoriesOnCourses` table. All the data in the column will be lost.
  - You are about to drop the column `course_name` on the `MentorsOnCourses` table. All the data in the column will be lost.
  - You are about to drop the column `mentor_name` on the `MentorsOnCourses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CategoriesOnCourses" DROP COLUMN "category_name",
DROP COLUMN "course_name";

-- AlterTable
ALTER TABLE "MentorsOnCourses" DROP COLUMN "course_name",
DROP COLUMN "mentor_name";
