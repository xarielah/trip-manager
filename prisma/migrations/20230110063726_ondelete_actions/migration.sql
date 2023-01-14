-- CreateEnum
CREATE TYPE "Rule" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rule" "Rule" NOT NULL DEFAULT 'USER';
