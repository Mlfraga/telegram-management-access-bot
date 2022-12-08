import { addYears } from 'date-fns';
import { Telegraf } from 'telegraf';
import prisma from '../../shared/prisma';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

class CreateGroupLink {
  public async execute(telegrafClient: Telegraf, active_code: string): Promise<String> {
    const subscription = await prisma.subscription.findUnique({
      where: {
        active_code
      }
    });

    if(subscription?.has_already_received_link && subscription.group_invite_link){
      return subscription.group_invite_link;
    }

    const {invite_link} = await telegrafClient.telegram.createChatInviteLink(CHAT_ID as string, {
      expire_date: addYears(new Date(), 1).getTime() / 1000,
      member_limit: 1,
    });

    await prisma.subscription.update({
      where: {
        active_code
      },
      data: {
        group_invite_link: invite_link,
        has_already_received_link: true,
        status_telegram_channel: 'INVITE_RECEIVED'
      }
    });

    return invite_link;
  }
}

export default CreateGroupLink;
