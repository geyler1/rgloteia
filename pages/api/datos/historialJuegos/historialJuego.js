import connectMongo from "lib/connectMongo";
import modelComprarNumero from "models/modelComprarNumero";
import modelUsers from 'models/modelUsers'
//BUSCA TODA LA INFORMACION DEL USUARIO MEDIANTE EL CORREO ELECTRONICO
const handler = async (req, res) => {
  try {
    await connectMongo();

    const {id} = req.body;
    const {email} = req.body; 
    const {pagina} = req.body; 

    const data = await modelComprarNumero.paginate({
      id: {
        $regex: id || '',
        $options: "i",
      },
      email: {
        $regex: email || '',
        $options: "i",
      }
    }, {
      limit: 30,
      page: pagina,
      sort: {
          createdAt: -1
      }
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default handler;