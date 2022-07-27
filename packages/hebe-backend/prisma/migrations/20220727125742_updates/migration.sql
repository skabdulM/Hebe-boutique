/*
  Warnings:

  - Added the required column `name` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paynmentId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `products` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddress` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "CartProducts" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "CartProducts_id_seq";

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "paynmentId" TEXT NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL,
ADD COLUMN     "products" JSONB NOT NULL,
ADD COLUMN     "shippingAddress" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "totalAmount" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "productPrice" SET DATA TYPE DECIMAL(65,30);
