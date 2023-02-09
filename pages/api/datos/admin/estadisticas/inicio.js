import connectMongo from "lib/connectMongo";
import modelUsers from 'models/modelUsers'
import modelComprarNumero from 'models/modelComprarNumero'
const handler = async (req, res) => {
  try {
    await connectMongo();
    const users = await modelUsers.paginate({
      username: {
        $regex: '' || '',
        $options: "i",
      }
    }, {
      limit: 1,
      page: 1,
    });
    const numeros = await modelComprarNumero.paginate({
      id: {
        $regex: '' || '',
        $options: "i",
      }
    }, {
      limit: 1,
      page: 1,
    });

    
    res.status(200).json({users, numeros});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};
export default handler;