/*
  Warnings:

  - The values [isPromo] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `jenis_kelamin` on the `Users` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otp` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('isFree', 'isPremium');
ALTER TABLE "Courses" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Courses" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
ALTER TABLE "Courses" ALTER COLUMN "type" SET DEFAULT 'isFree';
COMMIT;

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "image" TEXT,
ADD COLUMN     "rating" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "jenis_kelamin",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "foto_profile" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otp" TEXT NOT NULL,
ALTER COLUMN "no_hp" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CoursePromos" (
    "id" SERIAL NOT NULL,
    "promo_code" TEXT NOT NULL,
    "discount_percentage" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "course_id_promo" INTEGER NOT NULL,

    CONSTRAINT "CoursePromos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoursePromos_promo_code_key" ON "CoursePromos"("promo_code");

-- AddForeignKey
ALTER TABLE "CoursePromos" ADD CONSTRAINT "CoursePromos_course_id_promo_fkey" FOREIGN KEY ("course_id_promo") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
