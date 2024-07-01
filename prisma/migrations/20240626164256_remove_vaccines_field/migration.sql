-- DropIndex
DROP INDEX `MedicalRecord_patientNumber_key` ON `medicalrecord`;

-- AlterTable
ALTER TABLE `medicalrecord` MODIFY `allergies` JSON NULL,
    MODIFY `medication` JSON NULL;
