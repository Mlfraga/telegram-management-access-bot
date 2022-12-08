import expres from 'express';
import * as bodyParser from 'body-parser';
import Bot from './shared/implementations/bot';
import webhook from './webhook';

const server = expres();

server.all('/webhook', bodyParser.raw({ type: 'application/json' }), webhook);

const bot = new Bot();

bot.listenEntryMessages();

server.listen(process.env.PORT || 3333, () => console.log('Running on port 3333'));
