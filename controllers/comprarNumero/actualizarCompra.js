import modelComprarNumero from 'models/modelComprarNumero';

const actualizarCompra = async(id, update) => {
 const data = await modelComprarNumero.updateOne({_id: id}, update, {new: true});
 return data;
}

export default actualizarCompra;