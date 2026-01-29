/*
  Warnings:

  - The `seoTitle` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `seoDescription` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "seoTitle",
ADD COLUMN     "seoTitle" JSONB,
DROP COLUMN "seoDescription",
ADD COLUMN     "seoDescription" JSONB;
