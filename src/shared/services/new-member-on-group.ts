import prisma from '../../shared/prisma';

class NewMemberOnGroup {
  public async execute(user_telegram_id: string, link: string): Promise<boolean> {
    const subscription = await prisma.subscription.findUnique({
      where: {
        group_invite_link: link,
      }
    });

    if(!subscription){
      return false;
    }

    await prisma.user.update({
      where: {
        id: subscription.user_id,
      },
      data: {
        telegram_id: user_telegram_id,
      }
    });

    return true;
  }
}

export default NewMemberOnGroup;
