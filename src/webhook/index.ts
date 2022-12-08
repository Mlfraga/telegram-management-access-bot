import * as crypto from 'crypto';
import { Request, Response } from "express";
import approvedPurchase from './approved-purchase';
import cancelSubscription from './cancel-subscription';

const secret = process.env.KIWIFY_SECRET;

const webhook = (req: Request, res: Response) => {
  if(!secret){
		return res.status(404).send({ status: 'kiwify secret does not found' });
  }

	if (req.method !== 'POST') {
		return res.status(200).send({ status: 'ok' });
	}

	let order: any = {};

	try {
		order = JSON.parse(req.body);
	} catch (error) {
		return res.status(400).send({ error });
	}

	const { signature } = req.query;

	const calculatedSignature = crypto.createHmac('sha1', secret)
		.update(JSON.stringify(order)).digest('hex');

	if (signature !== calculatedSignature) {
		return res.status(400).send({ error: 'Incorrect signature' });
	}

	console.log('Received order:', order);
	console.log('order?.subscription?.status:', order?.subscription?.statusorder);

  if(order?.Subscription?.status === 'active'){
    approvedPurchase(order);
  }else if(order?.Subscription?.status === 'waiting_payment' || order?.Subscription?.status === 'canceled' || order?.Subscription?.status === 'refunded' || order?.order_status === 'order_status'){
    cancelSubscription(order);
  }

	return res.status(200).send({ status: 'ok' });
}

export default webhook;
