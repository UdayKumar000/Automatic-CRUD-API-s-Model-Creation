-- CreateTable
CREATE TABLE `freshmod` (
    `clo1` INTEGER NOT NULL,
    `col2` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `col3` DECIMAL(65, 30) NOT NULL,
    `id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `freshmod_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
