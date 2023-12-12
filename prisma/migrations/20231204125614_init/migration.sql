/*
  Warnings:

  - You are about to drop the column `course_id_promo` on the `CoursePromos` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `Users` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promo_id` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoursePromos" DROP CONSTRAINT "CoursePromos_course_id_promo_fkey";

-- AlterTable
ALTER TABLE "CoursePromos" DROP COLUMN "course_id_promo";

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "promo_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "otp";

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "CoursePromos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
