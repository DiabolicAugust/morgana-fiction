/*
  Warnings:

  - A unique constraint covering the columns `[bookId,tagId]` on the table `book_tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "book_tag_bookId_tagId_key" ON "book_tag"("bookId", "tagId");
