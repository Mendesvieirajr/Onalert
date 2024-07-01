/*
  Warnings:

  - A unique constraint covering the columns `[patientNumber]` on the table `MedicalRecord` will be added. If there are existing duplicate values, this will fail.
  - Made the column `allergies` on table `medicalrecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medication` on table `medicalrecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vaccines` on table `medicalrecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vitalWillExpiryDate` on table `medicalrecord` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `medicalrecord` MODIFY `allergies` JSON NOT NULL,
    MODIFY `medication` JSON NOT NULL,
    MODIFY `vaccines` JSON NOT NULL,
    MODIFY `vitalWillExpiryDate` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MedicalRecord_patientNumber_key` ON `MedicalRecord`(`patientNumber`);
