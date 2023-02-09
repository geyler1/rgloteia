import connectMongo from "lib/connectMongo";
import verificarHistorial from 'controllers/verificarGanador/verificarHistorial'
import verificarUltimaJugada from "controllers/verificarGanador/verificarUltimaJugada";
import resultadosdeldia from '/datos/resultadosdeldia'
import actualizarCompra from "controllers/comprarNumero/actualizarCompra";
import HorasUTC from "datos/horasUTC";
import modelUsers from 'models/modelUsers';

const handler = async (req, res) => {
  try {
    await connectMongo();
    const horasUTC = HorasUTC();
    const fechaHoy = horasUTC.fechaActualUTC;
    const {id} = req.body;
    const {email} = req.body; 
    const noChecked = await verificarUltimaJugada(id, email);

    const ultimaFecha = noChecked?.docs[0]?.fecha ? noChecked?.docs[0]?.fecha : null;

    //si la ultima fecha es hoy llamo los resultados del dia para hacer las comparaciones con el resultado del mediodia segun la hora
    var resultadosDia;
    if(ultimaFecha == fechaHoy){
      var resultadosDia = await resultadosdeldia()
    }

    // si la fecha es diferente al de hoy busco en el historial para ver si algun no checked es ganador.
    var ganadores;
    if(ultimaFecha != fechaHoy){
      var ganadores = await verificarHistorial(ultimaFecha);
    }

    const resultados = [];
    for(const checked of noChecked?.docs){
      let victoria = false;
    //  console.log(resultadosDia?.[0]?.mediodia, checked.fecha , fechaHoy , horasUTC.hora_UTC, horasUTC.horaSaleMediodia_UTC)
      if(resultadosDia?.[0]?.mediodia && checked.fecha == fechaHoy && horasUTC.hora_UTC >= horasUTC.horaSaleMediodia_UTC && 
        checked.sorteo == '1'){
        victoria = checked.numero == resultadosDia[0].mediodia
        console.log('hay jugada el mediodia temprano')
        await actualizarCompra(checked._id, {
          checked: true,
          victoria
        });
      }

      
      // console.log(ganadores?.NumDia , checked.sorteo , '1' , checked.fecha , ultimaFecha)
      if(ganadores?.NumDia && checked.sorteo == '1' && checked.fecha == ultimaFecha){
        victoria = checked.numero == ganadores?.NumDia
        console.log('hay jugada el mediodia fecha anterior')
        await actualizarCompra(checked._id, {
          checked: true,
          victoria
        });
      }
      
      if(ganadores?.NumNoche && checked.sorteo == '2' && checked.fecha == ultimaFecha && 
        horasUTC.hora_UTC > 2){
        victoria = checked.numero == ganadores?.NumNoche
        console.log('hay jugada noche fecha anterior')
        await actualizarCompra(checked._id, {
          checked: true,
          victoria
        });
      }

      if(victoria){
        resultados.push(checked);
      }
    }
    
    console.log('VERIFICANDO JUGADOS')
    console.log(resultados)
    res.status(200).json(resultados);
  } catch (error) {
    res.status(500).json({error});
    console.log(error)
  }
};
export default handler;