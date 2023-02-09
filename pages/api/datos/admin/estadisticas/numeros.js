import connectMongo from "lib/connectMongo";
import modelUsers from 'models/modelUsers'
import modelComprarNumero from 'models/modelComprarNumero'
const handler = async (req, res) => {
  const {pagina} = req.body;
  console.log(pagina)
  try {
    await connectMongo();
    const users = await modelComprarNumero.paginate({
      username: {
        $regex: '' || '',
        $options: "i",
      }
    }, {
      limit: 30,
      page: pagina,
      sort: {
          createdAt: -1
      }
    });

    res.status(200).json({users});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};
export default handler;