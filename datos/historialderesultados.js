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
  fa.setDate(fa.getDate() - 7);
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

  let historial = [];

  historial.push({
    h1fecha, h1dia, h1noche, 
    h2fecha, h2dia, h2noche, 
    h3fecha, h3dia, h3noche, 
    h4fecha, h4dia, h4noche, 
    h5fecha, h5dia, h5noche, 
    h6fecha, h6dia, h6noche, 
    h7fecha, h7dia, h7noche 
  });

 return historial;
}