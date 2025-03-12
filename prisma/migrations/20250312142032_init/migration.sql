-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `discordUsername` VARCHAR(100) NOT NULL,
    `channelLink` VARCHAR(255) NOT NULL,
    `xLink` VARCHAR(255) NOT NULL,
    `followsTodomen` BOOLEAN NOT NULL DEFAULT false,
    `streamingFrequency` VARCHAR(100) NULL,
    `additionalInfo` TEXT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `email_idx`(`email`),
    INDEX `status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
