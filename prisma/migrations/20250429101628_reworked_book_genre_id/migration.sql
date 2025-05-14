/*
  Warnings:

  - The primary key for the `book_genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[bookId,genreId]` on the table `book_genre` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `book_genre` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "book_genre" DROP CONSTRAINT "book_genre_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "book_genre_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "book_genre_bookId_genreId_key" ON "book_genre"("bookId", "genreId");
