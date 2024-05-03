/*
  Warnings:

  - You are about to drop the `employeeverify` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `employeeverify` DROP FOREIGN KEY `EmployeeVerify_employeeId_fkey`;

-- AlterTable
ALTER TABLE `employee` ADD COLUMN `status` ENUM('UNVERIFY', 'VERIFY') NOT NULL DEFAULT 'UNVERIFY';

-- DropTable
DROP TABLE `employeeverify`;
