import Horas from "datos/horas";
import HorasUTC from "datos/horasUTC";
const validarHorarios = async (sorteo) => {

  var horas = Horas();
  var horasUTC = HorasUTC();

  if(horasUTC.horaInicianSorteos_UTC < 8){
    throw new Error(`El sorteo no está disponible hasta las ${horasUTC.horaInicianSorteos} horas.`);
  }
  if(sorteo == 1){
    if(horasUTC.horaSaleMediodia_UTC > 19){
      throw new Error(`El sorteo no está disponible hasta las ${horasUTC.horaInicianSorteos} horas.`);
    }
  }
  if(sorteo == 2){
    if(horasUTC.horaSaleNoche_UTC > 3 && horasUTC.horaSaleNoche_UTC < 8){
      throw new Error(`El sorteo no está disponible hasta las ${horasUTC.horaInicianSorteos} horas.`);
    }
  }

  return horas;

}
export default validarHorarios