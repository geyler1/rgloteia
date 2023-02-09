import modelComprarNumero from 'models/modelComprarNumero';
const buscarNumerosComprados = async (numero, fecha, sorteo, unidades) => {

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
  }, {
    limit: 10,
    page: 1,
    sort: {
        createdAt: -1
    }
  });

  if(data?.totalDocs < 0){
    throw new Error('Ocurrió un error al obtener los datos.');
  }

  //sumar las unidades de numeros comprados
  var U1 = data?.docs[0] ? parseInt(data?.docs[0]?.unidades) : 0
  var U2 = data?.docs[1] ? parseInt(data?.docs[1]?.unidades) : 0
  var U3 = data?.docs[2] ? parseInt(data?.docs[2]?.unidades) : 0
  var U4 = data?.docs[3] ? parseInt(data?.docs[3]?.unidades) : 0
  var U5 = data?.docs[4] ? parseInt(data?.docs[4]?.unidades) : 0
  var U6 = data?.docs[5] ? parseInt(data?.docs[5]?.unidades) : 0
  var U7 = data?.docs[6] ? parseInt(data?.docs[6]?.unidades) : 0
  var U8 = data?.docs[7] ? parseInt(data?.docs[7]?.unidades) : 0
  var U9 = data?.docs[8] ? parseInt(data?.docs[8]?.unidades) : 0
  var U10 = data.docs[9] ? parseInt(data?.docs[9]?.unidades) : 0
  var totalUnidadesCompradas = U1+U2+U3+U4+U5+U6+U7+U8+U9+U10
  var totalUnidades = parseInt(totalUnidadesCompradas) + parseInt(unidades);

  return {data,totalUnidades,totalUnidadesCompradas};

}
export default buscarNumerosComprados