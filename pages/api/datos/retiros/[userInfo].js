import connectMongo from "lib/connectMongo";
import modelRetirar from "models/modelRetirar";

const handler = async (req, res) => {
  try {
    await connectMongo();
    const { userInfo } = req.query;

    const data = await modelRetirar.paginate({
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