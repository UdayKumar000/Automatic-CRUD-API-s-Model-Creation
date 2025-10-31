-- CreateTable
CREATE TABLE `admin` (
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    UNIQUE INDEX `admin_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
