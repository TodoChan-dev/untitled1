-- AlterTable
ALTER TABLE `Application` ADD COLUMN `statusMessage` TEXT NULL,
    ADD COLUMN `verificationCode` VARCHAR(10) NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX `verification_code_idx` ON `Application`(`verificationCode`);
