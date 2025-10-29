/*
  Warnings:

  - You are about to drop the `students` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `students`;

-- CreateTable
CREATE TABLE `teachers` (
    `techerName` VARCHAR(191) NOT NULL,
    `teacherAge` INTEGER NOT NULL,
    `teacherMobile` BIGINT NOT NULL,
    `teacherScore` INTEGER NOT NULL,
    `teacherId` INTEGER NOT NULL,

    PRIMARY KEY (`teacherId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
