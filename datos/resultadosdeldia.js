import axios from "axios";
import * as cheerio from "cheerio";

export default async function controller() {
  let { data } = await axios.get("https://flalottery.com/pick3");
  let $ = cheerio.load(data);

  let medN1 = $('#gameContentLeft > div.gamePageNumbers:nth-child(1) > p:nth-child(4) > span:nth-child(3)').text();
  let medN2 = $('#gameContentLeft > div.gamePageNumbers:nth-child(1) > p:nth-child(4) > span:nth-child(5)').text();
  var medFecha = $('#gameContentLeft > div.gamePageNumbers:nth-child(1) > p:nth-child(3)').text();
  let mediodia = medN1 + medN2
  let nocN1 = $('#gameContentLeft > div.gamePageNumbers:nth-child(2) > p:nth-child(4) > span:nth-child(3)').text();
  let nocN2 = $('#gameContentLeft > div.gamePageNumbers:nth-child(2) > p:nth-child(4) > span:nth-child(5)').text();
  let nocFecha = $('#gameContentLeft > div.gamePageNumbers:nth-child(2) > p:nth-child(3)').text();
  let noche = nocN1 + nocN2

  let resultados = [];

  resultados.push({
    mediodia, noche, medFecha, nocFecha
  });

  return resultados;
}