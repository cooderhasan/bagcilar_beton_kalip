/*
  Warnings:

  - The `seoTitle` column on the `Page` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `seoDescription` column on the `Page` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "seoTitle",
ADD COLUMN     "seoTitle" JSONB,
DROP COLUMN "seoDescription",
ADD COLUMN     "seoDescription" JSONB;
