/*
  Warnings:

  - The `seoTitle` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `seoDescription` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `seoTitle` column on the `SiteSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `seoDescription` column on the `SiteSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `seoKeywords` column on the `SiteSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "seoTitle",
ADD COLUMN     "seoTitle" JSONB,
DROP COLUMN "seoDescription",
ADD COLUMN     "seoDescription" JSONB;

-- AlterTable
ALTER TABLE "SiteSettings" DROP COLUMN "seoTitle",
ADD COLUMN     "seoTitle" JSONB,
DROP COLUMN "seoDescription",
ADD COLUMN     "seoDescription" JSONB,
DROP COLUMN "seoKeywords",
ADD COLUMN     "seoKeywords" JSONB;
