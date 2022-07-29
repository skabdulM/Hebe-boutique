/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `ProductCategory` table. All the data in the column will be lost.
  - The `id` column on the `ProductCategory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `productCategoryId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToProducts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productsId` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_productCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProducts" DROP CONSTRAINT "_CategoryToProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProducts" DROP CONSTRAINT "_CategoryToProducts_B_fkey";

-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "ProductCategory_name_key";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_pkey",
DROP COLUMN "name",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "productsId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("productsId", "categoryId");

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "productCategoryId";

-- DropTable
DROP TABLE "_CategoryToProducts";

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
