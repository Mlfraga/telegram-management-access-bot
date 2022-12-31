import { differenceInDays } from "date-fns"
import prisma from '../../shared/prisma';

class ValidateSubscriptionIsActive {
  public async execute(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    })

    if (!user) {
      return false;
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        user_id: user.id,
      }
    });

    if (!subscription) {
      return false;
    }

    return {
      status: subscription.status,
      next_payment: differenceInDays(subscription.next_payment_date, new Date()),
    }
  }
}


export default ValidateSubscriptionIsActive;
