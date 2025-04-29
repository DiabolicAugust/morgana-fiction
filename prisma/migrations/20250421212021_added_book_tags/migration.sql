-- CreateTable
CREATE TABLE "book_tag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "book_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToBookTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BookToBookTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_tag_name_key" ON "book_tag"("name");

-- CreateIndex
CREATE INDEX "_BookToBookTag_B_index" ON "_BookToBookTag"("B");

-- AddForeignKey
ALTER TABLE "_BookToBookTag" ADD CONSTRAINT "_BookToBookTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBookTag" ADD CONSTRAINT "_BookToBookTag_B_fkey" FOREIGN KEY ("B") REFERENCES "book_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
