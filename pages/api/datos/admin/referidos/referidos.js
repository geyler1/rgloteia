import connectMongo from "lib/connectMongo";
import modelUsers from 'models/modelUsers'

const handler = async (req, res) => {
  const { referido } = req.body;
  const { uid } = req.body;

  try {
    await connectMongo();

    const userReferido = referido ? await modelUsers.findById(referido) : null;

    if(referido){
      if(userReferido?._id && `${userReferido?._id}` != `${uid}` && `${userReferido?.referido}` != `${uid}`){
        await modelUsers.updateOne({_id: uid},{referido: userReferido?._id, donado:0});
      }
    }

    res.status(200).json({mensaje:'ok'});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};
export default handler;