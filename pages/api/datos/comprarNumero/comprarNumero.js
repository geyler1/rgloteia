import connectMongo from "lib/connectMongo";
import modelUsers from 'models/modelUsers';
import modelComprarNumero from 'models/modelComprarNumero';
import llamarUsuario from "controllers/comprarNumero/llamarUsuario";
import validarHorarios from 'controllers/comprarNumero/validarHorarios';
import buscarNumerosComprados from "controllers/comprarNumero/buscarNumerosComprados";
import numerosCompradosMios from "controllers/comprarNumero/numerosCompradosMios";
import agregarCompra from "controllers/comprarNumero/agregarCompra";
import HorasUTC from "datos/horasUTC";

const handler = async (req, res) => {
try { 
  await connectMongo();
  const horasUTC = HorasUTC();

  //datos que me envia el usuario al comprar
  const {id} = req.body;
  const {unidades} = req.body;
  const fecha = `${horasUTC.fechaActualUTC}`;
  const hora = `${horasUTC.horaActualUTC}`;
  const {numero} = req.body;
  const {sorteo} = req.body;


  //si el id no es valido mandar a recargar la pagina
  if(!id){
    return res.status(500).json({
      error:'Su id no se obtuvo correctamente, recarga la página y vuelve a intentar.'
    });
  };
  const horarios = await validarHorarios(sorteo);
  const data = await llamarUsuario(id);

  const saldo = data?.saldo ? parseInt(data.saldo) : 0
  const email = data.email;
  const nombreJugador = data?.name;

  if(saldo < parseInt(unidades)){
    return res.status(500).json({
      error:'Su saldo no es suficiente para realizar la compra.'
    });
  };

  const totalComprados = await buscarNumerosComprados(numero, fecha, sorteo, unidades);

  if(parseInt(totalComprados.totalUnidades) > 20){
    return res.status(500).json({
      error:`Hay ${20 - parseInt(totalComprados.totalUnidadesCompradas) < 0 ? 0 : 20 - parseInt(totalComprados.totalUnidadesCompradas)} 
      ${' '}unidades disponibles del número ${numero} en el sorteo 
      ${sorteo == 1 ? ' del Mediodía' : ' de Noche'}`
    });
  };

  if(parseInt(totalComprados.totalUnidadesCompradas) > 20){
    return res.status(500).json({
      error:`No quedan números disponibles para el sorteo ${sorteo == 1 ? ' del Mediodía' : ' de Noche'}`
    })
  }

  const compradosMios = await numerosCompradosMios(numero, fecha, sorteo, id, email)
  const existeCompra = compradosMios.existeNumero;
  const idExistente = compradosMios.idExisteNumero;
  const unidadesExisten = compradosMios.unidadesExisten;

  const Comprado = await agregarCompra(id, unidades, fecha, hora, email, numero, sorteo, existeCompra, idExistente, unidadesExisten, saldo, nombreJugador)
  res.status(200).json({
    data,horarios,totalComprados,compradosMios,Comprado
  })

} catch (error) {

  res.status(500).json({error: error.message, mensaje:'Ocurrio un error inesperado.'})
}
}
export default handler;