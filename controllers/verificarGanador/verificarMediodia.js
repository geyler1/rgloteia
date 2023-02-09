import modelComprarNumero from "models/modelComprarNumero";

const verificarMediodia = async (id, email, ultimaFecha, numeroDia) => {

   //fecha y hora en UTC
   var fechaxxx = new Date();
   var hora_utc = fechaxxx.getUTCHours();
   var minutos_utc = fechaxxx.getUTCMinutes();
   var dia_utc = fechaxxx.getUTCDate();
   var mes_utc = fechaxxx.getUTCMonth()+1;
   var ano_utc = fechaxxx.getUTCFullYear();
 
   var num = minutos_utc.toString()
   var cero = num.length <= 1 ? '0' : ''
   var minutos_utc = `${cero}`+num
 
   var num2 = mes_utc.toString()
   var cero2 = num2.length <= 1 ? '0' : ''
   var mes_utc = `${cero2}`+num2
 
   var num3 = dia_utc.toString()
   var cero3 = num3.length <= 1 ? '0' : ''
   var dia_utc = `${cero3}`+num3
 
   var num4 = hora_utc.toString()
   var cero4 = num4.length <= 1 ? '0' : ''
   var hora_utc = `${cero4}`+num4

  var fechahoy = `${dia_utc}/${mes_utc}/${ano_utc}`

  var dataDia;
  var dataVictoriaDia = null;

  //si la fecha es la del dia se fija si ya cerro el sorteo

  if(fechahoy == ultimaFecha){
    //si la hora es menor a la ora que sale el numero no es necesario verificar todavia
    if(parseInt(hora_utc) < 16){
      return dataVictoriaDia;
    }
  }

  if(numeroDia){
    var dataDia = await modelComprarNumero.paginate({
      id: {
        $regex: id || '',
        $options: "i",
      },
      email: {
        $regex: email || '',
        $options: "i",
      },
      fecha: {
        $regex: ultimaFecha || '',
        $options: "i",
      },
      numero: {
        $regex: numeroDia || '',
        $options: "i",
      },
      sorteo: {
        $regex: '1' || '',
        $options: "i",
      }
    }, {
      limit: 1,
      page: 1,
      sort: {
          createdAt: -1
      }
    });

    await modelComprarNumero.findOneAndUpdate({_id: dataDia?.docs[0]?._id}, {cheked: true}, {new: true})

    var numeroDiaJugado = dataDia?.docs[0]?.numero ? dataDia?.docs[0]?.numero : 'a';
    var numeroDiaHistory = numeroDia ? numeroDia : 'b';

    if(numeroDiaJugado == numeroDiaHistory){
      if(!dataDia?.docs[0]?.victoria){
        var dataVictoriaDia = await modelComprarNumero.findOneAndUpdate({_id: dataDia?.docs[0]?._id}, {
          victoria: true}, {new: true});
      }
    }
  }

  
  return dataVictoriaDia;
}
export default verificarMediodia