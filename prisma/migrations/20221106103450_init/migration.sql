/*
  Warnings:

  - You are about to alter the column `money` on the `financial_record` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `Int`.
  - You are about to alter the column `status` on the `financial_record` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `financial_record` MODIFY `money` INTEGER NOT NULL,
    MODIFY `status` VARCHAR(50) NOT NULL;
