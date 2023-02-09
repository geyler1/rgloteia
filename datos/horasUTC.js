const HorasUTC = () => {

  let hora = new Date()

  let sorteoInicia = new Date(Date.UTC(2000, 0, 1, 8,0,0,0));
  let mediodiaSale = new Date(Date.UTC(2000, 0, 1, 19,0,0,0));
  let mediodiadisponibleHasta = new Date(Date.UTC(2000, 0, 1, 17,59,0,0));
  let nocheSale = new Date(Date.UTC(2000, 0, 1, 3,0,0,0));

  let horaInicianSorteos = `${sorteoInicia.getHours()<=9?'0':''}${sorteoInicia.getHours()}:${sorteoInicia.getMinutes()<=9?'0':''}${sorteoInicia.getMinutes()}`;
  let horaSaleMediodia = `${mediodiaSale.getHours()<=9?'0':''}${mediodiaSale.getHours()}:${mediodiaSale.getMinutes()<=9?'0':''}${mediodiaSale.getMinutes()}`;
  let horaSaleNoche = `${nocheSale.getHours()<=9?'0':''}${nocheSale.getHours()}:${nocheSale.getMinutes()<=9?'0':''}${nocheSale.getMinutes()}`;

  let horaMediodiadisponibleHasta = `${mediodiadisponibleHasta.getHours()<=9?'0':''}${mediodiadisponibleHasta.getHours()}:${mediodiadisponibleHasta.getMinutes()<=9?'0':''}${mediodiadisponibleHasta.getMinutes()}`;

  let horaActualUTC = `${hora.getUTCHours()<=9?'0':''}${hora.getUTCHours()}:${hora.getUTCMinutes()<=9?'0':''}${hora.getUTCMinutes()}`;
  var fechaActualUTC = `${hora.getUTCDate()<=9?'0':''}${hora.getUTCDate()}/${hora.getUTCMonth()+1<=9?'0':''}${hora.getUTCMonth()+1}/${hora.getUTCFullYear()}`;

  let hora_UTC = hora.getUTCHours()
  let minutos_UTC = hora.getUTCMinutes() 

  let horaInicianSorteos_UTC = 8; //8
  let horaSaleMediodia_UTC = 19; //19
  let horaSaleNoche_UTC = 3; //3
  let horaInicioRecargas_UTC = 11; //11
  let horaFinRecargas_UTC = 3; //3

  if(hora_UTC < 6){
    var fechaActualUTC = `${(hora.getUTCDate()-1) <= 9?'0':''}${hora.getUTCDate()-1}/${hora.getUTCMonth()+1<=9?'0':''}${hora.getUTCMonth()+1}/${hora.getUTCFullYear()}`;
  }

  return {horaSaleMediodia, horaSaleNoche, horaInicianSorteos,
    horaInicianSorteos_UTC, horaSaleMediodia_UTC, horaSaleNoche_UTC, 
    horaActualUTC, fechaActualUTC, hora_UTC, horaMediodiadisponibleHasta, minutos_UTC, horaInicioRecargas_UTC, 
    horaFinRecargas_UTC}
}
export default HorasUTC;