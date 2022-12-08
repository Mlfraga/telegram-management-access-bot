/*
  Warnings:

  - Added the required column `kiwify_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "kiwify_id" TEXT NOT NULL;
