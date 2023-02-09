import connectMongo from "lib/connectMongo";
import modelUsers from "models/modelUsers";

//BUSCA TODA LA INFORMACION DEL USUARIO MEDIANTE EL CORREO ELECTRONICO
const handler = async (req, res) => {
  try {
    await connectMongo();
    const { userInfo } = req.query;

    const data = userInfo ? await modelUsers.findById(userInfo) : null;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default handler;