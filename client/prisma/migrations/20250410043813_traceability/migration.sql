/*
  Warnings:

  - You are about to drop the column `collection_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `step_name` on the `production_process` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_collection_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "collection_id",
ALTER COLUMN "policy_id" DROP NOT NULL,
ALTER COLUMN "asset_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "production_process" DROP COLUMN "step_name";
