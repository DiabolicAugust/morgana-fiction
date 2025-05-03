-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('ONGOING', 'FROZEN', 'COMPLETED');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "status" "BookStatus" NOT NULL DEFAULT 'ONGOING';
