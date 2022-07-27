/*
  Warnings:

  - The primary key for the `CartProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `productQuantity` to the `CartProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartProducts" DROP CONSTRAINT "CartProducts_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "productQuantity" INTEGER NOT NULL,
ADD CONSTRAINT "CartProducts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "phone" INTEGER;
