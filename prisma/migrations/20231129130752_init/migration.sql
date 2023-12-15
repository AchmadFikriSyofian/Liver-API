-- CreateEnum
CREATE TYPE "Type" AS ENUM ('isFree', 'isPremium');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "no_hp" TEXT,
    "foto_profile" TEXT,
    "country" TEXT,
    "city" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mentors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "rating" INTEGER NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'isFree',
    "image" TEXT,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "Enrollments" (
    "id" SERIAL NOT NULL,
    "payment" TEXT,
    "user_id" INTEGER NOT NULL,
    "course_id_enrollment" INTEGER NOT NULL,

    CONSTRAINT "Enrollments_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CoursePromos_promo_code_key" ON "CoursePromos"("promo_code");

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

-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_course_id_enrollment_fkey" FOREIGN KEY ("course_id_enrollment") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePromos" ADD CONSTRAINT "CoursePromos_course_id_promo_fkey" FOREIGN KEY ("course_id_promo") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
