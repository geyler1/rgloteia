import connectMongo from "lib/connectMongo";
import modelRecargas from "models/modelRecargas";
import modelTransferencias from 'models/modelTransferencias'
import modelUsers from 'models/modelUsers'

const handler = async (req, res) => {
  const { id } = req.body;
  const { uid } = req.body;
  var { saldo } = req.body;
  var { referido } = req.body;
  const { name } = req.body;
  const { username } = req.body;

  try {
    await connectMongo();

    const user = await modelUsers.findById(uid);
    const userReferido = referido ? await modelUsers.findById(referido) : null;
    
    console.log(userReferido)
    console.log(user)

    var bono = 0
    if(saldo == 19){
       var bono = 1;
    }
    if(saldo == 57){
      var bono = 3;
    }
    if(saldo == 95){
    var bono = 5;
    }
    if(saldo == 285){
      var bono = 15;
    }
    if(saldo == 475){
      var bono = 25;
    }
    if(saldo == 950){
      var bono = 50;
    }

    console.log('paso1')

    console.log(uid, referido)
    // si hay nombre de usuario de referido
    if(referido){
      console.log('Alguien te refirio')
      if(userReferido && !user?.recarga && `${userReferido?._id}` != `${user?._id}`){
        console.log('es tu primera recarga')
        await modelTransferencias.create({
          envia: user?._id,
          recibe: userReferido?._id,
          saldo: bono,
          fotoEnvia: user?.image,
          fotoRecibe: userReferido?.image,
          nombreEnvia: user?.name,
          nombreRecibe: userReferido?.name,
          usernameEnvia: user?.username,
          usernameRecibe: userReferido?.username,
        })
        await modelUsers.findOneAndUpdate({_id: userReferido?._id},
          {saldo: userReferido?.saldo + bono});
          
        await modelUsers.findOneAndUpdate({_id: user?._id}, {
          referido: userReferido?._id,
          donado: bono
        });
      }
    }
    console.log('paso2')

    await modelRecargas.findOneAndUpdate({_id: id}, {pendiente: false});
    await modelTransferencias.create({
      envia: "RGLOTERIA",
      recibe: user?._id,
      saldo: saldo,
      fotoEnvia: "/perfilLogo.png",
      fotoRecibe: user?.image,
      nombreEnvia: "RGLOTERIA",
      nombreRecibe: user?.name,
      usernameEnvia: "rgloteria.com",
      usernameRecibe: user?.username,
    })
    console.log('paso3')

    await modelUsers.findOneAndUpdate({_id: user?._id}, {saldo: user?.saldo + saldo, recarga: true});


    res.status(200).json({mensaje:'recargado'});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });

  }
};
export default handler;