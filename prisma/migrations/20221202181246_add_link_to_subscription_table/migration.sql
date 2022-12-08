-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "group_invite_link" TEXT,
ADD COLUMN     "has_already_received_link" BOOLEAN NOT NULL DEFAULT false;
