import connectMongo from "lib/connectMongo";
import modelUsers from "models/modelUsers";

//BUSCA TODA LA INFORMACION DEL USUARIO MEDIANTE EL CORREO ELECTRONICO
const handler = async (req, res) => {
  try {
    await connectMongo();
    const { referido } = req.query;

    const data = await modelUsers.paginate({
      referido: {
        $regex: referido || '',
        $options: "i",
      },
    }, {
      limit: 50,
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