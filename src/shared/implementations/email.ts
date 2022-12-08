import mailgun, { Mailgun } from "mailgun-js";

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;

class EmailSender {
  private emailClient: Mailgun

  constructor() {
    this.emailClient = mailgun({ apiKey: API_KEY as string, domain: DOMAIN as string });
  };

  public async sendActiveCodeMail(to: string, code: string) {
    const data = {
      from: 'ativacao@grupovip.com.br',
      to,
      subject: 'GRUPO VIP - ATIVAÇÃO DE ASSINATURA',
      text: `Olá, seu código de ativação é: ${code}. Para ativar sua assinatura, digite o comando /ativar ${code} e envie para o robo https://t.me/GrupoSinaisVipBot.`
    };

    this.emailClient.messages().send(data, function (_error, body) {
      console.log('body: ', body);
    });
  };
}

export default EmailSender;
