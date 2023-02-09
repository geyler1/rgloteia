import axios from "axios";
import * as cheerio from "cheerio";

export default async function controller() {

  var fx = new Date();
  var dActx = fx.getDate()
  var mActx = (fx.getMonth() +1)
  var aActx = fx.getFullYear();
  var longDActx = new String(dActx);
  var longMActx = new String(mActx);

  if(longDActx.length == 1){
    dActx = '0'+dActx
  }
  if(longMActx.length == 1){
    mActx = '0'+mActx
  }   

  let { data } = await axios.get(`https://bolitacuba.com/pya-${mActx}-${dActx}-${aActx}/`);
  let $ = cheerio.load(data);
  
  let salieron = $('div.post-inner.thin > .entry-content > p:nth-child(3)').text()
  let nosalieron = $('div.post-inner.thin > .entry-content > p:nth-child(4)').text()
  let provavilidad = $('div.post-inner.thin > div > p:nth-child(5)').text()
  let palabrasclave = $('div.post-inner.thin > div > p:nth-child(6)').text()
  let acertijodia = $('div.post-inner.thin > div > p:nth-child(7)').text()
  let acertijonoche = $('div.post-inner.thin > div > p:nth-child(8)').text()

  let adivinanzas = [];

  adivinanzas.push({
    salieron, nosalieron, palabrasclave, provavilidad, acertijodia, acertijonoche
  });

 return adivinanzas;
}