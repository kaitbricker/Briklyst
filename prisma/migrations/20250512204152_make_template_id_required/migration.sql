/*
  Warnings:

  - Made the column `templateId` on table `Storefront` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Storefront" ALTER COLUMN "templateId" SET NOT NULL;
