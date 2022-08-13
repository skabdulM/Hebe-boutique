/*
  Warnings:

  - You are about to drop the column `productsId` on the `Tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tagName]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_productsId_fkey";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "productsId";

-- CreateTable
CREATE TABLE "_ProductsToTags" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsToTags_AB_unique" ON "_ProductsToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsToTags_B_index" ON "_ProductsToTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_tagName_key" ON "Tags"("tagName");

-- AddForeignKey
ALTER TABLE "_ProductsToTags" ADD CONSTRAINT "_ProductsToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToTags" ADD CONSTRAINT "_ProductsToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
