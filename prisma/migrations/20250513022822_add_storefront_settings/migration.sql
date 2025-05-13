-- CreateTable
CREATE TABLE "StorefrontSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "branding" JSONB,
    "layout" JSONB,
    "typography" JSONB,
    "sections" JSONB,
    "customCSS" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StorefrontSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StorefrontSettings_userId_key" ON "StorefrontSettings"("userId");

-- CreateIndex
CREATE INDEX "StorefrontSettings_userId_idx" ON "StorefrontSettings"("userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "StorefrontSettings" ADD CONSTRAINT "StorefrontSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
