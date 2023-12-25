/*
  Warnings:

  - You are about to drop the column `kode` on the `Enrollments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chapters" DROP CONSTRAINT "Chapters_course_id_chapter_fkey";

-- DropIndex
DROP INDEX "Enrollments_kode_key";

-- AlterTable
ALTER TABLE "Chapters" ALTER COLUMN "course_id_chapter" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "rating" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Enrollments" DROP COLUMN "kode",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Enrollments_id_seq";

-- AddForeignKey
ALTER TABLE "Chapters" ADD CONSTRAINT "Chapters_course_id_chapter_fkey" FOREIGN KEY ("course_id_chapter") REFERENCES "Courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
