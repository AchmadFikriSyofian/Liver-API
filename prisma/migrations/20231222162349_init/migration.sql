/*
  Warnings:

  - You are about to drop the column `is_buy` on the `Courses` table. All the data in the column will be lost.
  - The `price` column on the `Courses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `kode` on the `Enrollments` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Categories_name_key";

-- DropIndex
DROP INDEX "Enrollments_kode_key";

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "is_buy",
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER,
ALTER COLUMN "rating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Enrollments" DROP COLUMN "kode",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Enrollments_id_seq";
