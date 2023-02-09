import connectMongo from "lib/connectMongo";
import modelUsers from 'models/modelUsers';
import modelComprarNumero from 'models/modelComprarNumero';
import modelTransferencias from 'models/modelTransferencias';

const handler = async (req, res) => {
try {
  await connectMongo();

  const {id1} = req.body;
  const {id2} = req.body;
  if(!id1 && !id2){
    return res.status(200).json({mensaje: 'no hay nada que actualizar.'})
  }

  const {_id} = req.body;
  if(!_id){
    return res.status(200).json({mensaje: 'no paso el id.'})
  }

  let user = await modelUsers.findById(_id);
  if(!user){
    return res.status(200).json({mensaje: 'no existe el usuario.'})
  }

  const {saldo1} = req.body;
  const {saldo2} = req.body;
  var saldoGanado = 0;
  if(id1){
    await modelComprarNumero.findOneAndUpdate({_id: id1}, {saldoGanado: saldo1*50});
    var saldoGanado = saldoGanado + saldo1*50;
  }
  if(id2){
    await modelComprarNumero.findOneAndUpdate({_id: id2}, {saldoGanado: saldo2*50});
    var saldoGanado = saldoGanado + saldo2*50;
  }
  await modelUsers.findOneAndUpdate({_id: _id}, {saldo: user.saldo + saldoGanado});

  const datos = await modelTransferencias.create({
    envia: "RGLOTERIA",
    recibe: user?._id,
    saldo: saldoGanado,
    fotoEnvia: "/perfilLogo.png",
    fotoRecibe: user?.image,
    nombreEnvia: "RGLOTERIA",
    nombreRecibe: user?.name,
    usernameEnvia: "rgloteria.com",
    usernameRecibe: user?.username,
  })
  
  res.status(200).json({mensaje: 'bien'})

} catch (error) {
  res.status(500).json({error, titulo:'El nombre de usuario ya existe'})
} 

}
export default handler;