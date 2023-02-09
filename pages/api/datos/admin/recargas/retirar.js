import connectMongo from "lib/connectMongo";
import modelRetirar from "models/modelRetirar";
import modelTransferencias from 'models/modelTransferencias'
import modelUsers from 'models/modelUsers'

const handler = async (req, res) => {
  const { id } = req.body;
  const { uid } = req.body;
  const { saldo } = req.body;

  try {
    await connectMongo();

    const user = await modelUsers.findById(uid);
    await modelRetirar.findOneAndUpdate({_id: id}, {pendiente: false});
    
    if(user){
      await modelTransferencias.create({
        envia: user?._id,
        recibe: "Billetera Externa",
        saldo: saldo,
        fotoEnvia: user?.image,
        fotoRecibe: user?.image,
        nombreEnvia: user?.name,
        nombreRecibe: "Billetera Externa",
        usernameEnvia: user?.username,
        usernameRecibe: '...',
      })
    }
    res.status(200).json({mensaje:'enviado'});
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default handler;