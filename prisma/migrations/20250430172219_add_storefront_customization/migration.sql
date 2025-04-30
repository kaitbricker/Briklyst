-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Storefront" ADD COLUMN     "backgroundColor" TEXT NOT NULL DEFAULT '#F9FAFB',
ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "textColor" TEXT NOT NULL DEFAULT '#111827';
