import connectMongo from "lib/connectMongo";
import modelTransferencias from "models/modelTransferencias";

//BUSCA TODA LA INFORMACION DEL USUARIO MEDIANTE EL CORREO ELECTRONICO
const handler = async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.query;

    const data = await modelTransferencias.paginate({
      recibe: {
        $regex: id || '',
        $options: "i",
      }
    }, {
      limit: 30,
      page: 1,
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