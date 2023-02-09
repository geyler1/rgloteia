import connectMongo from "lib/connectMongo";
import modelUsers from "models/modelUsers";

//AL LOGEARSE POR PRIMERA VES AL USUARIO SE LE AÑADE 
//EL SALDO EN 0 Y EL NOMBRE DE USUARIO CON SU ID UNICO
const handler = async (req, res) => {
  try {
    await connectMongo();
    const { actuser } = req.query;

    let data = await modelUsers.findById(actuser);
    if(data){
      data = await modelUsers.findOneAndUpdate({_id: actuser}, {saldo: 0, username: actuser}, {new:true})
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default handler;