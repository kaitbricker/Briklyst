/*
  Warnings:

  - You are about to drop the column `accentColor` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundColor` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `bannerUrl` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `domain` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `fontFamily` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `footerContent` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `footerLinks` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `headerImageUrl` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `layoutStyle` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `primaryColor` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `tagline` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `textColor` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `themeId` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `tiktok` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Storefront` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `Storefront` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Storefront_domain_key";

-- AlterTable
ALTER TABLE "Storefront" DROP COLUMN "accentColor",
DROP COLUMN "backgroundColor",
DROP COLUMN "bannerUrl",
DROP COLUMN "domain",
DROP COLUMN "fontFamily",
DROP COLUMN "footerContent",
DROP COLUMN "footerLinks",
DROP COLUMN "headerImageUrl",
DROP COLUMN "instagram",
DROP COLUMN "layoutStyle",
DROP COLUMN "primaryColor",
DROP COLUMN "tagline",
DROP COLUMN "textColor",
DROP COLUMN "themeId",
DROP COLUMN "tiktok",
DROP COLUMN "twitter",
DROP COLUMN "youtube",
ADD COLUMN     "brandingAssets" JSONB,
ADD COLUMN     "collabHighlights" JSONB,
ADD COLUMN     "customCSS" TEXT,
ADD COLUMN     "customSections" JSONB,
ADD COLUMN     "savedTemplates" JSONB,
ADD COLUMN     "socialLinks" JSONB,
ADD COLUMN     "subscriberBlock" JSONB,
ADD COLUMN     "templateId" TEXT,
ADD COLUMN     "templateOverrides" JSONB;
