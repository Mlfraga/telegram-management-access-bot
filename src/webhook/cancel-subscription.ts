import prisma from '../shared/prisma';
import { IOrder } from '../interfaces/order';
import Bot from '../shared/implementations/bot';

const cancelSubscription = async (order: IOrder) => {
  try{
    const updatedSub = await prisma.subscription.update({
      where: {
        kiwify_id: order.subscription_id
      },
      data: {
        status: 'CANCELLED',
      },
    });

    const bot = new Bot();

    const user = await prisma.user.findUnique({
      where: {
        id: updatedSub.user_id
      }
    });

    if(user?.telegram_id && user){
      bot.removeMemberFromChat(user?.telegram_id, updatedSub.group_invite_link);

      await prisma.subscription.delete({
        where: {
          id: updatedSub.id,
        }
      });

      await prisma.user.delete({
        where: {
          id: updatedSub.user_id,
        }
      });
    }
  }catch(e){
    console.log('error');
  }
};

export default cancelSubscription;
