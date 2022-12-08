/*
  Warnings:

  - A unique constraint covering the columns `[kiwify_id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscription_kiwify_id_key" ON "Subscription"("kiwify_id");
