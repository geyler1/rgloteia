import modelComprarNumero from "models/modelComprarNumero";

const verificarUltimaJugada = async (id, email) => {

  const data = await modelComprarNumero.paginate({
    id: {
      $regex: id || '',
      $options: "i",
    },
    email: {
      $regex: email || '',
      $options: "i",
    },
    checked: false,
  }, {
    limit: 200,
    page: 1,
    sort: {
        createdAt: -1
    }
  });
  
  return data;
}
export default verificarUltimaJugada;