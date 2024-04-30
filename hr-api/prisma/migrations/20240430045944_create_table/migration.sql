/*
  Warnings:

  - You are about to drop the column `createdAt` on the `employeeprofile` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `employeeprofile` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `employeeprofile` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `employeeprofile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `employeeprofile` table. All the data in the column will be lost.
  - You are about to drop the `attendances` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employeeprofileimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leaverequests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `monthlypayrolls` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `positions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shifts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `EmployeeProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `EmployeeProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `EmployeeProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `attendances` DROP FOREIGN KEY `Attendances_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `employeeprofile` DROP FOREIGN KEY `EmployeeProfile_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `employees` DROP FOREIGN KEY `Employees_positionId_fkey`;

-- DropForeignKey
ALTER TABLE `employees` DROP FOREIGN KEY `Employees_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `employees` DROP FOREIGN KEY `Employees_shiftId_fkey`;

-- DropForeignKey
ALTER TABLE `leaverequests` DROP FOREIGN KEY `LeaveRequests_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `monthlypayrolls` DROP FOREIGN KEY `MonthlyPayrolls_employeeId_fkey`;

-- AlterTable
ALTER TABLE `employeeprofile` DROP COLUMN `createdAt`,
    DROP COLUMN `deletedAt`,
    DROP COLUMN `imageId`,
    DROP COLUMN `photos`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `employeeId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `attendances`;

-- DropTable
DROP TABLE `employeeprofileimage`;

-- DropTable
DROP TABLE `employees`;

-- DropTable
DROP TABLE `leaverequests`;

-- DropTable
DROP TABLE `monthlypayrolls`;

-- DropTable
DROP TABLE `positions`;

-- DropTable
DROP TABLE `shifts`;

-- CreateTable
CREATE TABLE `Employee` (
    `uid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `positionId` INTEGER NOT NULL,
    `shiftId` INTEGER NOT NULL,
    `leaveBalance` INTEGER NOT NULL DEFAULT 12,
    `address` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeImagesProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `employeeProfileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `salary` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start` TIME NOT NULL,
    `end` TIME NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `clockin` TIME NOT NULL,
    `clockout` TIME NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `deduction` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stardDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `status` ENUM('APPROVED', 'REJECTED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    `employeeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MonthlyPayroll` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `totalDeduction` INTEGER NOT NULL,
    `finalSalary` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `EmployeeProfile_employeeId_key` ON `EmployeeProfile`(`employeeId`);

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `Position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `Shift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeProfile` ADD CONSTRAINT `EmployeeProfile_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeImagesProfile` ADD CONSTRAINT `EmployeeImagesProfile_employeeProfileId_fkey` FOREIGN KEY (`employeeProfileId`) REFERENCES `EmployeeProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MonthlyPayroll` ADD CONSTRAINT `MonthlyPayroll_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
