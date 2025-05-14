-- CreateTable
CREATE TABLE "book_genre" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "book_genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToBookGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BookToBookGenre_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_genre_name_key" ON "book_genre"("name");

-- CreateIndex
CREATE INDEX "_BookToBookGenre_B_index" ON "_BookToBookGenre"("B");

-- AddForeignKey
ALTER TABLE "_BookToBookGenre" ADD CONSTRAINT "_BookToBookGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBookGenre" ADD CONSTRAINT "_BookToBookGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "book_genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
