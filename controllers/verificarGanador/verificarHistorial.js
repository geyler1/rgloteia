import axios from "axios";
import * as cheerio from "cheerio";

export default async function controller(ultimaFecha) {

  var dia = ultimaFecha? ultimaFecha.slice(0,2):null
  var mes = ultimaFecha? ultimaFecha.slice(3,5):null
  var year = ultimaFecha? ultimaFecha.slice(6,10):null
  if(!dia){
    return 
  }

  let { data } = await axios.get(`https://www.flalottery.com/site/winningNumberSearch?searchTypeIn=date&gameNameIn=PICK3&singleDateIn=${mes}%2F${dia}%2F${year}&fromDateIn=&toDateIn=&n1=&n2=&n3=&n4=&n5=&n6=&pb=&mb=&submitForm=Submit`);
  let $ = cheerio.load(data);

  let bola1Dia = $('#bodyContent > section.column2 > section > table > thead > tr:nth-child(1) > td:nth-child(1) > span:nth-child(4)').text()
  let bola2Dia = $('#bodyContent > section.column2 > section > table > thead > tr:nth-child(1) > td:nth-child(1) > span:nth-child(6)').text()
  let bola1Noche = $('#bodyContent > section.column2 > section > table > thead > tr:nth-child(1) > td:nth-child(2) > span:nth-child(4)').text()
  let bola2Noche = $('#bodyContent > section.column2 > section > table > thead > tr:nth-child(1) > td:nth-child(2) > span:nth-child(6)').text()

  if(!bola1Dia){
    return 
  }
  let NumDia = `${bola1Dia}${bola2Dia}`;
  let NumNoche = `${bola1Noche}${bola2Noche}`;

  let historial = {
    NumDia, NumNoche
  };

 return historial;
}