-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 05-Jul-2024 às 12:46
-- Versão do servidor: 8.0.36
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `onalert`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `emergencycontact`
--

CREATE TABLE `emergencycontact` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `emergencycontact`
--

INSERT INTO `emergencycontact` (`id`, `name`, `phone`, `userId`) VALUES
(3, 'Martim', '924267161', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `medicalrecord`
--

CREATE TABLE `medicalrecord` (
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `allergies` json DEFAULT NULL,
  `familyDoctor` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `healthCenter` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `healthCenterLocation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `healthInsuranceNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medication` json DEFAULT NULL,
  `patientNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vitalWill` tinyint(1) NOT NULL,
  `vitalWillExpiryDate` datetime(3) DEFAULT NULL,
  `familyDoctorPhone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` int NOT NULL,
  `vaccinesUpToDate` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `medicalrecord`
--

INSERT INTO `medicalrecord` (`userId`, `createdAt`, `allergies`, `familyDoctor`, `healthCenter`, `healthCenterLocation`, `healthInsuranceNumber`, `medication`, `patientNumber`, `vitalWill`, `vitalWillExpiryDate`, `familyDoctorPhone`, `id`, `vaccinesUpToDate`) VALUES
(1, '2024-07-03 18:06:10.443', '[\"Benuron\", \"Penicilina\"]', NULL, NULL, NULL, NULL, 'null', '12345678', 1, '2024-09-05 21:13:00.000', NULL, 11, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profilePicture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jwtToken` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `name`, `profilePicture`, `jwtToken`, `createdAt`, `updatedAt`) VALUES
(1, 'Ciganopreto@gmail.com', '$2a$08$wBMfMLvSdJswEO/.BXCy6uCGIjJV0XOvO93jPcwD4VPOm2powPQAy', 'Cigano Black', '1719411786259-e44f9ba5-2d8b-4038-b562-4e67756021b4.jpeg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJDaWdhbm9wcmV0b0BnbWFpbC5jb20iLCJpYXQiOjE3MjAxMjAwNTUsImV4cCI6MTcyMDcyNDg1NX0.vYX8fO00WoZ4kJ1r0ft6GeqXDXAz_2y9HxGsnSV7e2o', '2024-06-24 18:01:47.994', '2024-07-04 19:07:35.760');

-- --------------------------------------------------------

--
-- Estrutura da tabela `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('15b6a49f-aad4-4ce5-9a7d-23e1d72576e2', '85190d83d808d2f34b6e4db13245ddd56a101f508c9e214cb29a2f28e953672a', '2024-06-24 17:51:29.117', '20240624175128_update_medical_record_schema', NULL, NULL, '2024-06-24 17:51:28.966', 1),
('347e68a7-fe34-4984-9079-4f13fed1e949', '4b65a7f3c3c1046ba413afafdbd5ffc029e0069fe0c8c8c61a723bf7a6045806', '2024-06-26 16:42:56.297', '20240626164256_remove_vaccines_field', NULL, NULL, '2024-06-26 16:42:56.186', 1),
('743b5131-a975-4e14-9a6f-aee5cc091a22', '8c459a51258e8b2061a0c875fcfcb1e87d9a0c1395cb0b9edae8009c92d7e282', '2024-06-26 14:21:28.460', '20240626142128_add_medical_records_fields', NULL, NULL, '2024-06-26 14:21:28.359', 1),
('7f37a396-1a0e-410e-be60-12f8cdd696ee', 'd33e5a9caa130c595ec4d69ef72fc3930cc3273e31c27d8a573a9131feabf08a', '2024-06-24 17:51:22.707', '20240620092750_add_emergency_contacts', NULL, NULL, '2024-06-24 17:51:22.554', 1),
('8ad5e0ac-64ea-4146-9f60-b719f9115fd7', '399f25837d9ac12a556b93e932791dd13c773fef34709e033abe5cd93b0e0084', '2024-06-24 17:51:22.543', '20240612215950_init', NULL, NULL, '2024-06-24 17:51:22.321', 1),
('a7bbb264-6fa7-4886-b882-c69435d852dd', 'c967ca74505e3df7e5e2429bd83586c3a54f270323a5da9f9c2764e06b3be59e', '2024-06-24 17:51:22.749', '20240620142604_add_medical_records', NULL, NULL, '2024-06-24 17:51:22.711', 1),
('aada266c-edcc-41eb-b215-e7953a54568a', '2c5dbaae5cacebe38282e8598677c620041782080a9e98615700d7648bd31040', '2024-06-24 17:51:22.855', '20240620185659_ajustes', NULL, NULL, '2024-06-24 17:51:22.753', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `emergencycontact`
--
ALTER TABLE `emergencycontact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `EmergencyContact_userId_fkey` (`userId`);

--
-- Índices para tabela `medicalrecord`
--
ALTER TABLE `medicalrecord`
  ADD PRIMARY KEY (`id`),
  ADD KEY `MedicalRecord_userId_fkey` (`userId`);

--
-- Índices para tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Índices para tabela `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `emergencycontact`
--
ALTER TABLE `emergencycontact`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `medicalrecord`
--
ALTER TABLE `medicalrecord`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `emergencycontact`
--
ALTER TABLE `emergencycontact`
  ADD CONSTRAINT `EmergencyContact_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Limitadores para a tabela `medicalrecord`
--
ALTER TABLE `medicalrecord`
  ADD CONSTRAINT `MedicalRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
