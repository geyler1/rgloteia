import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Retirar = function (props) {
  const [saldo, setSaldo] = useState(50);
  const [mensaje, setMensaje] = useState("");
  const [billetera, setBilletera] = useState('');

  const [monedasPend, setMonedasPend] = useState('');
  const [cryptoPend, setCryptoPend] = useState('');
  const [fechaRecarga, setFechaRecarga] = useState('');
  const [botonCargando, setBotonCargando] = useState(false);


  const recargaPendiente = async () => {
    try {
      const { data } = await axios.get(
        `/api/datos/retiros/${props.uid}`
      );
      setMonedasPend(data?.docs[0]?.saldo)
      setCryptoPend(data?.docs[0]?.saldoCrypto)
  
      const formateador = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'medium' });
      const fecha =  new Date(data?.docs[0]?.createdAt);
      const fechaFormateada = formateador.format(fecha);
  
      setFechaRecarga(fechaFormateada)
    } catch (error) {
      setMonedasPend('')
      setCryptoPend('')
      setFechaRecarga('')
    }
  }
  useEffect(() => {
    recargaPendiente()
  });  

//hacer que salga la alerta
const [copyText, setCopyText] = useState(false);
const copyAlert = () => {
  setCopyText(true)
  setTimeout(()=>{setCopyText(false)}, 2600)
}

  const enviarSaldo = async() => {
    setBotonCargando(true)
    try {
      const res = await axios.post('/api/datos/solicitarRetiro/solicitarRetiro', {
        _id: props.uid,
        saldo: saldo,
        billetera: billetera,
      });
      setMensaje('');
      copyAlert();
      setBotonCargando(false)
    } catch (error) {
      if(error.response.data.error){
        setMensaje(error.response.data.error);
        setBotonCargando(false)
      }
    }
  }

  const validarSolicitud = (e) => {
    e.preventDefault();
    if(saldo < 50){
      setMensaje('No puedes retirar menos de 50 fichas.')
      return
    }
    if(saldo > parseInt(props.saldo)){
      setMensaje('La cantidad que puede retirar debe ser menor o igual al saldo actual.')
      return
    }
    setMensaje('')
    enviarSaldo()
  }

  return (
    <>
    {
      copyText ? (
      <div className="fixed top-0 left-0 w-screen max-w-full z-50 ">
        <div className="relative w-full max-w-3xl mx-auto">
          <span className="p-3 mt-6 mr-3 absolute right-0 top-0 bg-green-500 text-slate-50 rounded-xl shadow">
            Solicitud de Retiro realizada!
          </span>
        </div>
      </div>
      ) : ''
    }

      {fechaRecarga ? (
        <div className="m-3 mt-7 p-3 rounded-xl shadow bg-white text-slate-600">
          <div><span className="mr-2 text-red-500 text-lg"><FontAwesomeIcon icon={faCircleExclamation}/></span>Tienes una solicitud de retiro pendiente para procesar de <b>{monedasPend} TRX</b>, 
            realizaste la solicitud el <b>{fechaRecarga}</b>.</div>
          <div></div>
        </div>
      ) : ''}

      <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-6 relative rounded-xl">
        <form className="flex flex-wrap">
          <h3 className="pb-3 text-current text-2xl w-full font-semibold">Retirar Saldo</h3>
          <label htmlFor="billetera" className="text-base text-slate-700 font-bold">
            Billetera de destino:
          </label>
          <span className="text-base text-slate-500 w-full">
          (Opcional) Si desea retirar su saldo a una billetera diferente a la que tienes en el perfil,
          puedes escribirla en este campo, pero si desea que le enviemos el saldo a la billetera que guardo en su perfil,
          solo debe ignorar dicho campo.
          </span>
          <input type="text" className="w-full rounded-full mt-3 mb-5 py-2 px-5 bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent" 
              id="billetera" placeholder="Billetera de destino."
              onChange={(e) => { setBilletera(e.target.value); }} value={billetera}/>
          <label htmlFor="saldo" className="text-base text-slate-700 font-bold">
            Saldo a retirar:
          </label>
          <span className="text-base text-slate-500 w-full">
            Escribe a continuación la cantidad que desea retirar, tenga en cuenta que el mínimo de retiro es de 50 fichas.
          </span>
          <span className="text-base text-red-500 py-3 w-full flex">{mensaje}</span>
          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full my-3">

          <div className="flex flex-nowrap w-full">
            <input type="number" className="w-4/6 rounded-full py-2 px-5 bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent" 
              id="saldo" placeholder="Saldo a Retirar"
              onChange={(e) => { setSaldo(e.target.value); }} value={saldo}/>
            {
              botonCargando ? (
                <button id="btn-editar" className="w-2/6 ml-3 py-2 px-5 rounded-full font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white cursor-pointer" 
                >Enviando...</button>
              ):(
                <button id="btn-editar" className="w-2/6 ml-3 py-2 px-5 rounded-full font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white cursor-pointer" 
                onClick={validarSolicitud}>Retirar</button>
              )
            }
          </div>

          </div>
        </form>
      </div>  
    </>
  );
};
export default Retirar;
