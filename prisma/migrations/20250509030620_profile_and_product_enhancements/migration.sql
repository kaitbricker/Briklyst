-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imageUrls" TEXT[];

-- AlterTable
ALTER TABLE "Storefront" ADD COLUMN     "headerImageUrl" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "tagline" TEXT,
ADD COLUMN     "tiktok" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "youtube" TEXT;

-- CreateTable
CREATE TABLE "_Favorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Favorites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Favorites_B_index" ON "_Favorites"("B");

-- AddForeignKey
ALTER TABLE "_Favorites" ADD CONSTRAINT "_Favorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Favorites" ADD CONSTRAINT "_Favorites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
