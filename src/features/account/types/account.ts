import type { Currency } from './currency';

export type Account = {
  id: string;
  name: string;
  balance: number;
  currency: Currency;
};