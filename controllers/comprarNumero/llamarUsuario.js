import modelUsers from 'models/modelUsers';
const llamarUsuario = async (id) => {

  const data = await modelUsers.findById(id);

  if(!data){
    throw new Error('No se encontro ningun usuario con este correo.');
  }
  return data;

}
export default llamarUsuario