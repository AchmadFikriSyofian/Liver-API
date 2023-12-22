/*
  Warnings:

  - A unique constraint covering the columns `[kode]` on the table `Enrollments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Enrollments_kode_key" ON "Enrollments"("kode");
