/*
  Warnings:

  - Added the required column `description` to the `financial_record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `financial_record` ADD COLUMN `description` VARCHAR(150) NOT NULL;
