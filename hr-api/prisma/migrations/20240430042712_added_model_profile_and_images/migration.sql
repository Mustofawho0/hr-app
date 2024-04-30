/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employees` ADD COLUMN `profileId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `EmployeeProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageId` INTEGER NOT NULL,
    `birthDate` DATE NOT NULL,
    `photos` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeProfileImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Employees_profileId_key` ON `Employees`(`profileId`);

-- AddForeignKey
ALTER TABLE `Employees` ADD CONSTRAINT `Employees_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `EmployeeProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeProfile` ADD CONSTRAINT `EmployeeProfile_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `EmployeeProfileImage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
