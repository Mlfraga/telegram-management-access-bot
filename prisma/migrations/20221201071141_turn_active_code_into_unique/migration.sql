/*
  Warnings:

  - A unique constraint covering the columns `[active_code]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscription_active_code_key" ON "Subscription"("active_code");
