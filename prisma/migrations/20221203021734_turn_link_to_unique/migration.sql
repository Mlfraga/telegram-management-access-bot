/*
  Warnings:

  - A unique constraint covering the columns `[group_invite_link]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscription_group_invite_link_key" ON "Subscription"("group_invite_link");
