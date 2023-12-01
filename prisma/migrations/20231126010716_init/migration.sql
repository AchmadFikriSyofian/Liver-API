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
