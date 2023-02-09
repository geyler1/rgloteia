import connectMongo from "lib/connectMongo";
import modelRecargas from "models/modelRecargas";

//BUSCA TODA LA INFORMACION DEL USUARIO MEDIANTE EL CORREO ELECTRONICO
const handler = async (req, res) => {
  try {
    await connectMongo();
    const { userInfo } = req.query;

    const data = await modelRecargas.paginate({
      uid: {
        $regex: userInfo || '',
        $options: "i",
      },
      pendiente: true,
    }, {
      limit: 1,
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