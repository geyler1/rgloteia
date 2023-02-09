import connectMongo from "lib/connectMongo";
import modelUsers from 'models/modelUsers'
import modelTransferencias from 'models/modelTransferencias'
const handler = async (req, res) => {
try {
  await connectMongo();

  const {_id} = req.body;
  const {_id2} = req.body;
  const {saldo} = req.body;
  let saldox = parseInt(saldo)

  let data = await modelUsers.findById(_id);
  let data2 = await modelUsers.findById(_id2);
 
  if(data?.saldo){
    if(data?.saldo >= saldox){
      data = await modelUsers.findOneAndUpdate({_id: _id}, {saldo: data.saldo - saldox}, {new:true})
      data2 = await modelUsers.findOneAndUpdate({_id: _id2}, {saldo: data2.saldo + saldox}, {new:true})
      const recarga = await modelTransferencias.create({
        envia: data?._id,
        recibe: data2?._id,
        saldo: saldox,
        fotoEnvia: data?.image,
        fotoRecibe: data2?.image,
        nombreEnvia: data?.name,
        nombreRecibe: data2?.name,
        usernameEnvia: data?.username,
        usernameRecibe: data2?.username,
      })
      var datos = {
        data, data2
      }
    }else{
      var datos = {
        error: 'No tienes saldo suficiente para realizar la transferencia.'
      }
    }
  }

  res.status(200).json(datos)
} catch (error) {
  res.status(500).json({error, titulo:'No tienes suficiente saldo para transferir'})
} 

}
export default handler;