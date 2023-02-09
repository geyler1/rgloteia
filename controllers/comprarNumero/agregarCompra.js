import modelComprarNumero from 'models/modelComprarNumero';
import modelUsers from 'models/modelUsers';
const agregarCompra = async (id, unidades, fecha, hora, email, numero, sorteo, existeCompra, idExistente, unidadesExisten, saldo, nombreJugador) => {

  if(existeCompra == 0){
    var data = await modelComprarNumero.create({
      id: id,
      saldo: unidades,
      unidades: unidades,
      fecha: fecha,
      hora: hora,
      victoria: false,
      email: email,
      numero: numero,
      sorteo: sorteo,
      checked: false,
      name: nombreJugador,
    })
  }

  if(existeCompra == 1){
    var data = await modelComprarNumero.findOneAndUpdate({_id: idExistente}, {
      saldo: parseInt(unidades) + parseInt(unidadesExisten),
      unidades: parseInt(unidades) + parseInt(unidadesExisten),
    }, {new: true})
  }

  if(!data){
    throw new Error('Ocurrió un error al actualizar los datos.');
  }

  const restarSaldo = await modelUsers.findOneAndUpdate({_id: id}, {saldo: saldo - parseInt(unidades)}, {new:true})

  return {data, restarSaldo};

}
export default agregarCompra