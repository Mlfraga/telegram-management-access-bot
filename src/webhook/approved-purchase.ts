import prisma from '../shared/prisma';
import crypto from 'node:crypto';
import { IOrder } from '../interfaces/order';
import { addDays } from 'date-fns';
import EmailSender from '../shared/implementations/email';

const approvedPurchase = async (order: IOrder) => {
  const activeCode = crypto.randomUUID();

  await prisma.user.create({
    data: {
      full_name: order.Customer.full_name,
      email: order.Customer.email,
      mobile: order.Customer.mobile,
      cpf: order.Customer.CPF,
      ip: order.Customer.ip,
      subscription: {
        create: {
          kiwify_id: order.subscription_id,
          start_date: order.Subscription.start_date,
          active_code: activeCode,
          status: order.Subscription.status,
          next_payment_date: order.Subscription.next_payment || addDays(new Date(), 30),
          status_telegram_channel: 'PENDING',
        }
      }
    }
  });

  const emailSender = new EmailSender();

  emailSender.sendActiveCodeMail(order.Customer.email, activeCode);
};

export default approvedPurchase;
