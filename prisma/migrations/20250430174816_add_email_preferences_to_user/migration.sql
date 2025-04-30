-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailAlerts" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "monthlyReport" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "weeklyReport" BOOLEAN NOT NULL DEFAULT true;
