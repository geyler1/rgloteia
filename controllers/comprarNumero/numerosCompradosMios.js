import modelComprarNumero from 'models/modelComprarNumero';
const numerosCompradosMios = async (numero, fecha, sorteo, id, email) => {

  const data = await modelComprarNumero.paginate({
    numero: {
      $regex: numero || '',
      $options: "i",
    },
    fecha: {
      $regex: fecha || '',
      $options: "i",
    },
    sorteo: {
      $regex: sorteo || '',
      $options: "i",
    },
    id: {
      $regex: id || '',
      $options: "i",
    },
    email: {
      $regex: email || '',
      $options: "i",
    },
  }, {
    limit: 1,
    page: 1,
    sort: {
        createdAt: -1
    }
  });

  if(data?.totalDocs < 0){
    throw new Error('Ocurrió un error al obtener los datos.');
  }

  var existeNumero = 0;
  var idExisteNumero = null;
  var unidadesExisten = 0;

  if(data.totalDocs != 0){
    var existeNumero = 1;
    var idExisteNumero = data.docs[0]._id;
    var unidadesExisten = data.docs[0].unidades;
  } else{
    var existeNumero = 0;
  }


  return {data,existeNumero,idExisteNumero,unidadesExisten};

}
export default numerosCompradosMios