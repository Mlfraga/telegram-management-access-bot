import { Telegraf } from "telegraf";
import CreateGroupLink from '../services/create-group-link';
import NewMemberOnGroup from "../services/new-member-on-group";
import ValidateSubscriptionActivateCode from "../services/validate-code";
import rateLimit from 'telegraf-ratelimit';

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const CHAT_LOGS = process.env.TELEGRAM_LOGS_ID;

const helpMessage = `
✅✅GRUPO DE SINAIS ✅✅
  \n
Comandos disponiveis:
  /ativar <key> - Ative sua assinatura
  /assinatura - veja o status da sua assinatura
`;

class Bot {
  private telegrafClient: Telegraf<any>;

  constructor() {
    this.telegrafClient = new Telegraf(TOKEN as string);
  };

  public async removeMemberFromChat(user_id: string, link: string | null) {
    try {
      await this.telegrafClient.telegram.banChatMember(CHAT_ID as string, Number(user_id));

      if (link) {
        await this.telegrafClient.telegram.revokeChatInviteLink(CHAT_ID as string, link);
      }
    } catch (err) {
      console.log(err);
    }
  }

  public async listenEntryMessages() {
    this.telegrafClient.start((ctx) => {
      ctx.reply(helpMessage);
    });

    this.telegrafClient.use((ctx, next) => {
      try {
        this.telegrafClient.telegram.sendMessage(CHAT_LOGS as string, `[LOG]: ${ctx.from.username} executou: ${ctx.update.message.text}`)
      } catch (e) {
        console.log('error on log', e);
      }

      next();
    });

    this.telegrafClient.on('chat_member', ctx => {
      console.log('ctx: ', ctx);
      console.log('ctx.update: ', ctx.update);
      console.log('chat_member: ', ctx.update.chat_member);

      const invite_link = ctx.update.chat_member.invite_link?.invite_link;
      const user_telegram_id = ctx.update.chat_member.from.id;

      if (!invite_link || !user_telegram_id) {
        return;
      };

      const newMemberOnGroup = new NewMemberOnGroup();

      const addedMember = newMemberOnGroup.execute(String(user_telegram_id), invite_link);

      console.log('member was added: ', addedMember);
    });

    const limitConfig = {
      window: 5000,
      limit: 1,
      onLimitExceeded: (ctx: any, _next: any) => {
        ctx.reply('Limite de mensagens excedido.');
      }
    }

    this.telegrafClient.use(rateLimit(limitConfig));

    this.telegrafClient.command('ativar', async (ctx) => {
      console.log('comando ativar: ', ctx);

      const active_code = ctx.message.text.split(' ')[1];

      if (!active_code) {
        ctx.reply('Código de ativação inválido');
        return;
      }

      const validateSubscriptionActivateCode = new ValidateSubscriptionActivateCode();

      const active_code_valid = await validateSubscriptionActivateCode.execute(active_code)

      if (active_code_valid) {
        const createGroupLink = new CreateGroupLink();

        const user_invite_link = await createGroupLink.execute(this.telegrafClient, active_code);

        ctx.reply(`Link de acesso: ${user_invite_link}`);
      } else {
        ctx.reply('Codigo invalido!');
      }
    });

    this.telegrafClient.launch({
      allowedUpdates: ['chat_member', 'message']
    });
  }
}

export default Bot;
