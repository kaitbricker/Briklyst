-- CreateTable
CREATE TABLE "StorefrontTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "settings" JSONB NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StorefrontTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StorefrontTemplate_userId_idx" ON "StorefrontTemplate"("userId");

-- AddForeignKey
ALTER TABLE "StorefrontTemplate" ADD CONSTRAINT "StorefrontTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
