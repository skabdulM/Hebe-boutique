/*
  Warnings:

  - You are about to drop the `CartProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartProducts" DROP CONSTRAINT "CartProducts_userId_fkey";

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "phone2" INTEGER;

-- DropTable
DROP TABLE "CartProducts";

-- CreateTable
CREATE TABLE "Cart" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "productQuantity" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
