import configData from "../config.json"

export const formatCurrency = (value) => `${configData.CURRENCY_SYMBOL + (value).toFixed(2)}`;