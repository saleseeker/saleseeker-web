import { CURRENCY_SYMBOL } from "./Constants";

export const formatCurrency = (value:number) => `${CURRENCY_SYMBOL + (value).toFixed(2)}`;