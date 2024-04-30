/*
  Warnings:

  - Added the required column `updatedAt` to the `EmployeeImagesProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `EmployeeProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employeeimagesprofile` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `employeeprofile` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
