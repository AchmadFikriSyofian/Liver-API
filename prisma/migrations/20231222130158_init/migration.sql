/*
  Warnings:

  - You are about to drop the column `is_buy` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Courses` table. All the data in the column will be lost.
  - Changed the type of `price` on the `Courses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Categories_name_key";

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "is_buy",
DROP COLUMN "rating",
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
