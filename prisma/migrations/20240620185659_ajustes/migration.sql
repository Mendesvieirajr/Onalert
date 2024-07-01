/*
  Warnings:

  - The primary key for the `medicalrecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `medicalrecord` table. All the data in the column will be lost.
  - You are about to alter the column `vitalWill` on the `medicalrecord` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - You are about to alter the column `vitalWillExpiryDate` on the `medicalrecord` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `medicalrecord` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `familyDoctorPhone` VARCHAR(191) NULL,
    MODIFY `allergies` VARCHAR(191) NULL,
    MODIFY `familyDoctor` VARCHAR(191) NULL,
    MODIFY `healthCenter` VARCHAR(191) NULL,
    MODIFY `healthCenterLocation` VARCHAR(191) NULL,
    MODIFY `healthInsuranceNumber` VARCHAR(191) NULL,
    MODIFY `medication` VARCHAR(191) NULL,
    MODIFY `vaccines` VARCHAR(191) NULL,
    MODIFY `vitalWill` BOOLEAN NOT NULL,
    MODIFY `vitalWillExpiryDate` DATETIME(3) NULL,
    ADD PRIMARY KEY (`patientNumber`);
