const Horas = () => {

  var fecha_local = new Date();

  

  var now_utc = Date.UTC(fecha_local.getUTCFullYear(), fecha_local.getUTCMonth(),
  fecha_local.getUTCDate(), fecha_local.getUTCHours(),
  fecha_local.getUTCMinutes(), fecha_local.getUTCSeconds());

  let lahoraUTC = Date.UTC()
  var horaUTC = fecha_local.getUTCHours();

  var fecha_utc = new Date(now_utc)

  var miliSegundos = fecha_utc.getTime();
  var fecha_m3 = new Date(miliSegundos - 10800000);

  //dia
  var dia_m3 = fecha_m3.getDate();
  var vx1 = dia_m3.toString();
  var v1 = vx1.length <= 1?'0':'';
  var dia_m3 = `${v1}`+vx1;

  //mes
  var mes_m3 = fecha_m3.getMonth()+1;
  var vx2 = mes_m3.toString();
  var v2 = vx2.length <= 1?'0':'';
  var mes_m3 = `${v2}`+vx2;

  //anho
  var anho_m3 = fecha_m3.getFullYear();

  //hora
  var hora_m3 = fecha_utc.getHours();
  var vx3 = hora_m3.toString();
  var v3 = vx3.length <= 1?'0':'';
  var hora_m3 = `${v3}`+vx3;

  //minutos
  var minutos_m3 = fecha_m3.getMinutes();
  var vx4 = minutos_m3.toString();
  var v4 = vx4.length <= 1?'0':'';
  var minutos_m3 = `${v4}`+vx4;

  //segundos
  var segundos_m3 = fecha_m3.getSeconds();
  var vx5 = segundos_m3.toString();
  var v5 = vx5.length <= 1?'0':'';
  var segundos_m3 = `${v5}`+vx5;

  return {horas: {dia_m3, mes_m3, anho_m3, hora_m3,
     minutos_m3, segundos_m3, fecha_m3, fecha_local, 
     fecha_utc, now_utc, lahoraUTC, horaUTC}}
}
export default Horas;