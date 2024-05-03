-- CreateTable
CREATE TABLE `EmployeeVerify` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isVerify` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `employeeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EmployeeVerify_employeeId_key`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmployeeVerify` ADD CONSTRAINT `EmployeeVerify_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
