export interface IOrder {
  Customer: {
    full_name: string
    email: string
    mobile: string
    CPF: string
    ip: string
  };
  subscription_id: string;
  Subscription: {
    id?: string;
    start_date: string;
    next_payment?: string;
    status: string;
    plan: {
      id: string;
      name: string;
      frequency: string;
      qty_charges: number
    },
  },
}
