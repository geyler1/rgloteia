import axios from "axios";
import * as cheerio from "cheerio";
//VALOR DEL TRON TRX
export default async function controller() {
  let { data } = await axios.get("https://coinmarketcap.com/es/currencies/tron/");
  let $ = cheerio.load(data);
  let tronTRX = $('div.priceSection > div.priceTitle > div.priceValue > span').text();
  return tronTRX;
}
