import connectMongo from "lib/connectMongo";
import modelRetirar from "models/modelRetirar";

const handler = async (req, res) => {
  const { _id } = req.body;
  try {
    await connectMongo();
    await modelRetirar.deleteOne(_id)
    res.status(200).json({mensaje:'borrado'});
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default handler;