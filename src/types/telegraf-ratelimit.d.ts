declare module "telegraf-ratelimit"{
  function rateLimit(limitConfig: LimitConfig):any

  export = rateLimit;
}

interface LimitConfig {
  window: number;
  limit: number;
  onLimitExceeded: (ctx: any, _next: any) => void;
}
