-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_hp" TEXT NOT NULL,
    "jenis_kelamin" TEXT,
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modules" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "course_id_module" INTEGER NOT NULL,

    CONSTRAINT "Modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "course_id_mentor" INTEGER NOT NULL,

    CONSTRAINT "Mentors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "course_id_categories" INTEGER NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessments" (
    "id" SERIAL NOT NULL,
    "nilai" INTEGER NOT NULL,
    "course_id_assessment" INTEGER NOT NULL,
    "student_id_assessment" INTEGER NOT NULL,

    CONSTRAINT "Assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollments" (
    "id" SERIAL NOT NULL,
    "student_id_enrollment" INTEGER NOT NULL,
    "course_id_enrollment" INTEGER NOT NULL,

    CONSTRAINT "Enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_email_key" ON "Accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Students_email_key" ON "Students"("email");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modules" ADD CONSTRAINT "Modules_course_id_module_fkey" FOREIGN KEY ("course_id_module") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentors" ADD CONSTRAINT "Mentors_course_id_mentor_fkey" FOREIGN KEY ("course_id_mentor") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_course_id_categories_fkey" FOREIGN KEY ("course_id_categories") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessments" ADD CONSTRAINT "Assessments_course_id_assessment_fkey" FOREIGN KEY ("course_id_assessment") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessments" ADD CONSTRAINT "Assessments_student_id_assessment_fkey" FOREIGN KEY ("student_id_assessment") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_student_id_enrollment_fkey" FOREIGN KEY ("student_id_enrollment") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_course_id_enrollment_fkey" FOREIGN KEY ("course_id_enrollment") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
