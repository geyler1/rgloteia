import connectMongo from "lib/connectMongo";
import modelComprarNumero from "models/modelComprarNumero";
import modelUsers from 'models/modelUsers'
//BUSCA TODA LA INFORMACION DEL USUARIO MEDIANTE EL CORREO ELECTRONICO
const handler = async (req, res) => {
  try {
    await connectMongo();
    
    var fechaxxx = new Date();
    var hora_utc = fechaxxx.getUTCHours();
    var minutos_utc = fechaxxx.getUTCMinutes();
    var dia_utc = fechaxxx.getUTCDate();
    var mes_utc = fechaxxx.getUTCMonth()+1;
    var ano_utc = fechaxxx.getUTCFullYear();
    const {id} = req.query;
    const fecha = `${dia_utc}/${mes_utc}/${ano_utc}`
 
    const datau = await modelUsers.findById(id);

    const data = await modelComprarNumero.paginate({
      id: {
        $regex: id || '',
        $options: "i",
      },
      fecha: {
        $regex: fecha || '',
        $options: "i",
      },
      email: {
        $regex: datau.email || '',
        $options: "i",
      }
    }, {
      limit: 10,
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