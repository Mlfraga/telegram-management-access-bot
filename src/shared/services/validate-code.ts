import prisma from '../../shared/prisma';

class ValidateSubscriptionActivateCode {
  public async execute(active_code: string): Promise<boolean> {
    const subscription = await prisma.subscription.findUnique({
      where: {
        active_code
      }
    });

    if(subscription){
      return true;
    }else{
      return false;
    }
  }
}

export default ValidateSubscriptionActivateCode;
