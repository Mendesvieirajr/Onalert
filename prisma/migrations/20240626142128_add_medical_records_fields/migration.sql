/*
  Warnings:

  - The primary key for the `medicalrecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `vaccines` on the `medicalrecord` table. All the data in the column will be lost.
  - Added the required column `id` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vaccinesUpToDate` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medicalrecord` DROP PRIMARY KEY,
    DROP COLUMN `vaccines`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `vaccinesUpToDate` BOOLEAN NOT NULL,
    MODIFY `vitalWillExpiryDate` DATETIME(3) NULL,
    ADD PRIMARY KEY (`id`);
