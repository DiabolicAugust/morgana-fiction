/*
  Warnings:

  - The primary key for the `book_genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `book_genre` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `book_genre` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `book_tag` table. All the data in the column will be lost.
  - You are about to drop the `_BookToBookGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToBookTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookId` to the `book_genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genreId` to the `book_genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookId` to the `book_tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagId` to the `book_tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookToBookGenre" DROP CONSTRAINT "_BookToBookGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToBookGenre" DROP CONSTRAINT "_BookToBookGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "_BookToBookTag" DROP CONSTRAINT "_BookToBookTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToBookTag" DROP CONSTRAINT "_BookToBookTag_B_fkey";

-- DropIndex
DROP INDEX "book_genre_name_key";

-- DropIndex
DROP INDEX "book_tag_name_key";

-- AlterTable
ALTER TABLE "book_genre" DROP CONSTRAINT "book_genre_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "bookId" TEXT NOT NULL,
ADD COLUMN     "genreId" TEXT NOT NULL,
ADD CONSTRAINT "book_genre_pkey" PRIMARY KEY ("bookId", "genreId");

-- AlterTable
ALTER TABLE "book_tag" DROP COLUMN "name",
ADD COLUMN     "bookId" TEXT NOT NULL,
ADD COLUMN     "tagId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BookToBookGenre";

-- DropTable
DROP TABLE "_BookToBookTag";

-- CreateTable
CREATE TABLE "book_cover" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cover" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,

    CONSTRAINT "book_cover_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_cover_book_id_key" ON "book_cover"("book_id");

-- AddForeignKey
ALTER TABLE "book_cover" ADD CONSTRAINT "book_cover_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_genre" ADD CONSTRAINT "book_genre_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_genre" ADD CONSTRAINT "book_genre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_tag" ADD CONSTRAINT "book_tag_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_tag" ADD CONSTRAINT "book_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
