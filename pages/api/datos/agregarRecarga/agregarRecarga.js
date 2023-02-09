import connectMongo from "lib/connectMongo";
import modelRecargas from 'models/modelRecargas'

const handler = async (req, res) => {
  try {
    await connectMongo();
    const data = await modelRecargas.create(req.body)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({error})
  }
}
export default handler; 