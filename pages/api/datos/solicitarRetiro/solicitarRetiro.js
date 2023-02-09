import connectMongo from "lib/connectMongo";
import modelRetirar from 'models/modelRetirar';
import modelUsers from 'models/modelUsers';

const handler = async (req, res) => {
try {
  await connectMongo();
  const {_id} = req.body;
  const {saldo} = req.body; 
  var {billetera} = req.body;
  let user = await modelUsers.findById(_id);
  if(!user){
    return res.status(500).json({error: 'Ocurrió un error inesperado, recarga la página y vuelve a intentar.'});
  }
  if(!billetera && !user.billetera){
    return res.status(500).json({error: 'Para solicitar un retiro de fondos, primero tienes que agregar una billetera en el perfil o escribe la billetera de destino en el campo de arriba.'});
  }
  
  const haySolicitud = await modelRetirar.paginate({
    pendiente: true,
    uid: {
      $regex: _id || '',
      $options: "i",
    },
  }, {
    limit: 1,
    page: 1,
    sort: {
        createdAt: -1
    }
  });

  if(haySolicitud?.totalDocs > 0){
    return res.status(500).json({error: 'Ya existe una solicitud pendiente, no puedes solicitar otro retiro hasta que no se procese el que ya está en proceso.'});
  }

  var billetera = !billetera?user.billetera:billetera;

  if(user.saldo < 50){
    return res.status(500).json({error: 'No tienes suficiente saldo para retirar, el mínimo de retiro es de 50.'});
  }
  if(user.saldo < saldo){
    return res.status(500).json({error: `Su saldo actual es de ${user.saldo}, no puedes retirar ${saldo}. 
    Para más información sobre el intento de fraude puedes leer el artículo 2.0 en la sección de ayuda.`});
  }

  await modelUsers.findOneAndUpdate({_id: _id}, {saldo: user.saldo - saldo});
  await modelRetirar.create({
    uid: _id,
    email: user.email,
    billetera: billetera,
    saldoCrypto: "TRX",
    saldo: saldo,
    pendiente: true,
  })

  res.status(200).json({mensaje: 'Solicitud enviada.'})
} catch (error) {
  res.status(500).json({error})
}}
export default handler;