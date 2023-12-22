-- AlterTable
ALTER TABLE "CategoriesOnCourses" ADD COLUMN     "category_name" TEXT,
ADD COLUMN     "course_name" TEXT;

-- AlterTable
ALTER TABLE "MentorsOnCourses" ADD COLUMN     "course_name" TEXT,
ADD COLUMN     "mentor_name" TEXT;
