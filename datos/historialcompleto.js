import axios from "axios";
import * as cheerio from "cheerio";

export default async function controller() {

  var f = new Date();
  f.setDate(f.getDate() - 1);
  var dAct = f.getDate()
  var mAct = (f.getMonth() +1)
  var aAct = f.getFullYear();
  var longDAct = new String(dAct);
  var longMAct = new String(mAct);

  var fa = new Date();
  fa.setDate(fa.getDate() - 30);
  var dAnt = fa.getDate()
  var mAnt = (fa.getMonth() +1)
  var aAnt = fa.getFullYear();
  var longDAnt = new String(dAnt);
  var longMAnt = new String(mAnt);

  if(longDAct.length == 1){
    dAct = '0'+dAct
  }
  if(longMAct.length == 1){
    mAct = '0'+mAct
  }
  if(longDAnt.length == 1){
    dAnt = '0'+dAnt
  }
  if(longMAnt.length == 1){
    mAnt = '0'+mAnt
  }

  let { data } = await axios.get(`https://flalottery.com/site/winningNumberSearch?searchTypeIn=range&gameNameIn=PICK3&singleDateIn=&fromDateIn=${mAnt}%2F${dAnt}%2F${aAnt}&toDateIn=${mAct}%2F${dAct}%2F${aAct}&n1In=&n2In=&n3In=&submitForm=Submit`);
  let $ = cheerio.load(data);

  let h1dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(1) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h1noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(1) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h1fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(1) > td:nth-child(1) > a > div').text();
  
  let h2dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(2) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h2noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(2) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h2fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(2) > td:nth-child(1) > a > div').text();
  
  let h3dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(3) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h3noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(3) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h3fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(3) > td:nth-child(1) > a > div').text();

  let h4dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(4) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h4noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(4) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h4fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(4) > td:nth-child(1) > a > div').text();

  let h5dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(5) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h5noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(5) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h5fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(5) > td:nth-child(1) > a > div').text();

  let h6dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(6) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h6noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(6) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h6fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(6) > td:nth-child(1) > a > div').text();

  let h7dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(7) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h7noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(7) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h7fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(7) > td:nth-child(1) > a > div').text();
  
  let h8dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(8) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h8noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(8) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h8fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(8) > td:nth-child(1) > a > div').text();

  let h9dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(9) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h9noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(9) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h9fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(9) > td:nth-child(1) > a > div').text();

  let h10dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(10) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h10noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(10) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h10fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(10) > td:nth-child(1) > a > div').text();

  let h11dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(11) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h11noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(11) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h11fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(11) > td:nth-child(1) > a > div').text();

  let h12dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(12) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h12noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(12) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h12fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(12) > td:nth-child(1) > a > div').text();

  let h13dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(13) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h13noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(13) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h13fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(13) > td:nth-child(1) > a > div').text();

  let h14dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(14) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h14noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(14) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h14fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(14) > td:nth-child(1) > a > div').text();

  let h15dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(15) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h15noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(15) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h15fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(15) > td:nth-child(1) > a > div').text();

  let h16dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(16) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h16noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(16) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h16fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(16) > td:nth-child(1) > a > div').text();

  let h17dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(17) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h17noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(17) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h17fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(17) > td:nth-child(1) > a > div').text();

  let h18dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(18) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h18noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(18) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h18fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(18) > td:nth-child(1) > a > div').text();

  let h19dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(19) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h19noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(19) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h19fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(19) > td:nth-child(1) > a > div').text();
  
  let h20dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(20) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h20noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(20) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h20fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(20) > td:nth-child(1) > a > div').text();

  let h21dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(21) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h21noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(21) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h21fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(21) > td:nth-child(1) > a > div').text();

  let h22dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(22) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h22noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(22) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h22fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(22) > td:nth-child(1) > a > div').text();

  let h23dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(23) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h23noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(23) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h23fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(23) > td:nth-child(1) > a > div').text();

  let h24dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(24) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h24noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(24) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h24fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(24) > td:nth-child(1) > a > div').text();

  let h25dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(25) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h25noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(25) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h25fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(25) > td:nth-child(1) > a > div').text();

  let h26dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(26) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h26noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(26) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h26fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(26) > td:nth-child(1) > a > div').text();

  let h27dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(27) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h27noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(27) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h27fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(27) > td:nth-child(1) > a > div').text();

  let h28dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(28) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h28noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(28) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h28fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(28) > td:nth-child(1) > a > div').text();

  let h29dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(29) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h29noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(29) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h29fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(29) > td:nth-child(1) > a > div').text();

  let h30dia = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(30) > td:nth-child(2) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h30noche = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(30) > td:nth-child(3) > a > div').text().slice(4,9).replace('-','').replace(/ /g, '');
  let h30fecha = $('#bodyContent > section.column2 > section > table > tbody > tr:nth-child(30) > td:nth-child(1) > a > div').text();

  let historialcompleto = [];

  historialcompleto.push({
    h1fecha, h1dia, h1noche, 
    h2fecha, h2dia, h2noche, 
    h3fecha, h3dia, h3noche, 
    h4fecha, h4dia, h4noche, 
    h5fecha, h5dia, h5noche, 
    h6fecha, h6dia, h6noche, 
    h7fecha, h7dia, h7noche,
    h8fecha, h8dia, h8noche, 
    h9fecha, h9dia, h9noche,
    h10fecha, h10dia, h10noche,
    h11fecha, h11dia, h11noche,
    h12fecha, h12dia, h12noche,
    h13fecha, h13dia, h13noche,
    h14fecha, h14dia, h14noche,
    h15fecha, h15dia, h15noche,
    h16fecha, h16dia, h16noche,
    h17fecha, h17dia, h17noche,
    h18fecha, h18dia, h18noche,
    h19fecha, h19dia, h19noche,
    h20fecha, h20dia, h20noche,
    h21fecha, h21dia, h21noche,
    h22fecha, h22dia, h22noche,
    h23fecha, h23dia, h23noche,
    h24fecha, h24dia, h24noche,
    h25fecha, h25dia, h25noche,
    h26fecha, h26dia, h26noche,
    h27fecha, h27dia, h27noche,
    h28fecha, h28dia, h28noche,
    h29fecha, h29dia, h29noche,
    h30fecha, h30dia, h30noche
  });

 return historialcompleto;
}