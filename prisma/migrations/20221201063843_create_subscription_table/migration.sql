-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "status_telegram_channel" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "active_code" TEXT NOT NULL,
    "next_payment_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_user_id_key" ON "Subscription"("user_id");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
