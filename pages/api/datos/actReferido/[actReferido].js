import connectMongo from "lib/connectMongo";
import modelUsers from "models/modelUsers";

//AL ENTRAR CON UN CODIGO DE FERERIDO POR PRIMERA VES AGREGA 
//EN REFERIDO EL ID DE QUIEN LO REFIRIO 
const handler = async (req, res) => {
  try {
    await connectMongo();
    const { actReferido } = req.query;
    const {ref} = req.body

    let data = await modelUsers.findById(actReferido);
    if(data){
      data = await modelUsers.findOneAndUpdate({_id: actReferido}, {referido: ref}, {new:true})
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default handler;