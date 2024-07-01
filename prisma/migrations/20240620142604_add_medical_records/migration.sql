/*
  Warnings:

  - You are about to drop the column `record` on the `medicalrecord` table. All the data in the column will be lost.
  - Added the required column `allergies` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyDoctor` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthCenter` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthCenterLocation` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthInsuranceNumber` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medication` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientNumber` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vaccines` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vitalWill` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vitalWillExpiryDate` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medicalrecord` DROP COLUMN `record`,
    ADD COLUMN `allergies` VARCHAR(191) NOT NULL,
    ADD COLUMN `familyDoctor` VARCHAR(191) NOT NULL,
    ADD COLUMN `healthCenter` VARCHAR(191) NOT NULL,
    ADD COLUMN `healthCenterLocation` VARCHAR(191) NOT NULL,
    ADD COLUMN `healthInsuranceNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `medication` VARCHAR(191) NOT NULL,
    ADD COLUMN `patientNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `vaccines` VARCHAR(191) NOT NULL,
    ADD COLUMN `vitalWill` VARCHAR(191) NOT NULL,
    ADD COLUMN `vitalWillExpiryDate` VARCHAR(191) NOT NULL;
