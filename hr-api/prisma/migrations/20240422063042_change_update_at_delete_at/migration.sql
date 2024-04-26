-- AlterTable
ALTER TABLE `attendances` ALTER COLUMN `updatedAt` DROP DEFAULT,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `employees` ALTER COLUMN `updatedAt` DROP DEFAULT,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `leaverequests` ALTER COLUMN `updatedAt` DROP DEFAULT,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `monthlypayrolls` ALTER COLUMN `updatedAt` DROP DEFAULT,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `positions` ALTER COLUMN `updatedAt` DROP DEFAULT,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `shifts` ALTER COLUMN `updatedAt` DROP DEFAULT,
    MODIFY `deletedAt` DATETIME(3) NULL;
