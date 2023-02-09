import modelComprarNumero from "models/modelComprarNumero";

const verificarNoche = async (id, email, ultimaFecha, numeroNoche) => {

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

  var dataNoche;
  var dataVictoriaNoche = null;


  //si la fecha es la del dia se fija si ya cerro el sorteo

  if(fechahoy == ultimaFecha){
    //si la hora es menor a la ora que sale el numero no es necesario verificar todavia
    if(parseInt(hora_utc) < 12){
      return dataVictoriaNoche;
    }
  }

  if(numeroNoche){
    var dataNoche = await modelComprarNumero.paginate({
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
        $regex: numeroNoche || '',
        $options: "i",
      },
      sorteo: {
        $regex: '2' || '',
        $options: "i",
      }
    }, {
      limit: 1,
      page: 1,
      sort: {
          createdAt: -1
      }
    });

    await modelComprarNumero.findOneAndUpdate({_id: dataNoche?.docs[0]?._id}, {cheked: true}, {new: true})
    
    var numeroNocheJugado = dataNoche?.docs[0]?.numero ? dataNoche?.docs[0]?.numero : 'a';
    var numeroNocheHistory = numeroNoche ? numeroNoche : 'b';

    if(numeroNocheJugado == numeroNocheHistory){
      if(!dataNoche?.docs[0]?.victoria){
        var dataVictoriaNoche = await modelComprarNumero.findOneAndUpdate({_id: dataNoche?.docs[0]?._id}, {
          victoria: true}, {new: true});
      }
    }
  }

  await modelComprarNumero.findOneAndUpdate({_id: dataNoche?.docs[0]?._id}, {cheked: true}, {new: true})
  
  return dataVictoriaNoche;
}
export default verificarNoche