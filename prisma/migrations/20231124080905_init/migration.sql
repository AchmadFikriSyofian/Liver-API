/*
  Warnings:

  - You are about to drop the column `course_id_categories` on the `Categories` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_course_id_categories_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "course_id_categories";

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "category_id" INTEGER NOT NULL,
ALTER COLUMN "price" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
