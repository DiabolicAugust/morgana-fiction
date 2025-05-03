-- CreateEnum
CREATE TYPE "BookLanguage" AS ENUM ('UKRAINIAN', 'ENGLISH');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "amount_of_pages" INTEGER,
ADD COLUMN     "language" "BookLanguage" NOT NULL DEFAULT 'UKRAINIAN',
ADD COLUMN     "release_year" INTEGER,
ADD COLUMN     "translator" TEXT;
