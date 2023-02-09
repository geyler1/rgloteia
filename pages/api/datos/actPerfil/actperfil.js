import connectMongo from "lib/connectMongo";
import modelUsers from 'models/modelUsers'

const handler = async (req, res) => {
try {
  await connectMongo();

  const {_id, ...rest} = req.body;
  
  const data = await modelUsers.updateOne({_id}, {...rest}, {new: true});
  
  res.status(200).json(data)

} catch (error) {
  res.status(500).json({error, titulo:'El nombre de usuario ya existe'})
} 

}
export default handler;