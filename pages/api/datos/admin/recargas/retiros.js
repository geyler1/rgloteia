import connectMongo from "lib/connectMongo";
import modelRetirar from "models/modelRetirar";

const handler = async (req, res) => {
  try {
    await connectMongo();

    const data = await modelRetirar.paginate({
      pendiente: true,
    }, {
      limit: 10,
      page: 1,
      sort: {
          createdAt: 1
      }
    });
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error });
  }
};
export default handler;