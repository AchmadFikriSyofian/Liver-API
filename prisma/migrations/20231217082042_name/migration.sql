-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "is_buy" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Lessons" ADD COLUMN     "is_done" BOOLEAN NOT NULL DEFAULT false;
