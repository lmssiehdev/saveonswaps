import axios from "axios";

export const cryptoSymbolMapping = {
  xmr: "monero",
  btc: "bitcoin",
  ltc: "litecoin",
  bch: "bitcoin-cash",
  wow: "wownero",
  xno: "nano",
  usdt: "tether",
  firo: "zcoin",
  zec: "zcash",
};

type Symbol = keyof typeof cryptoSymbolMapping;

/**
 * Fetches the price of a cryptocurrency.
 * @param {keyof CryptoSymbolMapping} symbol - The symbol of the cryptocurrency.
 * @returns {Promise<Object>} - The price data of the cryptocurrency.
 */
export async function getPrice(symbol: Symbol) {
  const id = cryptoSymbolMapping[symbol];

  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
  );

  return data[id].usd;
}

/**
 * Formats the total price based on the provided amount and price.
 *
 * @param {number} amount - The quantity of items.
 * @param {number} price - The price per item.
 * @returns {string} The formatted total price as a currency string.
 */
export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}
