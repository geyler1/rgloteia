import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faXmark,
  faArrowLeft,
  faCopy,
  faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import copy from "copy-to-clipboard";  


const Perfil = function (props) {
  
  const [editar, setEditar] = useState(false);
  const [editarBillet, setEditarBillet] = useState(false);
  const [nombre, setNombre] = useState(props?.datos?.user?.name);
  const [billetera, setBilletera] = useState(props?.billetera);
  const [billeteraAct, setBilleteraAct] = useState(props?.billetera)
  const [tarjetaAct, setTarjetaAct] = useState(props?.tarjeta)
  const [tarjeta, setTarjeta] = useState(props?.tarjeta);
  const [editarTarjeta, setEditarTarjeta] = useState(false);

  const [email, setEmail] = useState(props?.email);
  const [name, setName] = useState(props?.datos?.user?.name);
  const [username, setUsername] = useState(props?.username);
  const [mensaje, setMensaje] = useState('');
  const [id, setId] = useState(props?.id)

  const [monedasPend, setMonedasPend] = useState('')
  const [cryptoPend, setCryptoPend] = useState('')
  const [fechaRecarga, setFechaRecarga] = useState('')

  const lamodal = () => {
    if(editar){
      setEditar(false)
    }else{
      setEditar(true)
    }
    setNombre(name);
    setMensaje('')
  }

  const lamodal2 = () => {
    if(editarBillet){
      setEditarBillet(false)
    }else{
      setEditarBillet(true)
    }
    setMensaje('')
  }
  const lamodal3 = () => {
    if(editarTarjeta){
      setEditarTarjeta(false)
    }else{
      setEditarTarjeta(true)
    }
    setMensaje('')
  }

  const copyToClipboard = () => {
    copy(billeteraAct);
    copyAlert()
 }
 const copyToClipboard2 = () => {
  copy(`https://rgloteria.com/?r=${id}`);
  copyAlert()
}
const copyToClipboard3 = () => {
  copy(id);
  copyAlert()
}
const copyToClipboard4 = () => {
  copy(tarjetaAct);
  copyAlert()
}

const [copyText, setCopyText] = useState(false);
const copyAlert = () => {
  setCopyText(true)
  setTimeout(()=>{setCopyText(false)}, 2500)
}

  const actualizarPerfil = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put('/api/datos/actPerfil/actperfil', {
        _id: id,
        billetera: billetera,
        tarjetaCUP: tarjeta
      });
      setMensaje('')
      setEditar(false)

      setBilletera(billetera)
      setBilleteraAct(billetera)
      setTarjetaAct(tarjeta)
    } catch (error) {
      if(error.response.data.error.code === 11000){
        setMensaje('Ocurrió un error inesperado, vuelva a intentar')
      }
    }
    
  };

  const agregarBilletera = async (e) => {
    try {
      const res = await axios.put('/api/datos/billetera/billetera', {
        _id: id,
        billetera: billetera
      });
      const data = res;
      setMensaje('')
      setEditarBillet(false)
      setBilleteraAct(billetera)
    } catch (error) {
      if(error.response.data.error.code === 11000){
        setMensaje('Parece que alguien ya esta usando esta billetera.')
      }
    }
  };
  const agregarTarjeta = async (e) => {
    try {
      const res = await axios.put('/api/datos/billetera/tarjeta', {
        _id: id,
        tarjetaCUP: tarjeta
      });
      const data = res;
      setMensaje('')
      setEditarTarjeta(false)
      setTarjetaAct(tarjeta)
    } catch (error) {
      if(error.response.data.error.code === 11000){
        setMensaje('Parece que alguien ya esta usando esta tarjeta.')
      }
    }
  };

  const validarFormulario = (e) => {
    e.preventDefault()
    
    if(billetera.length <= 9){
      setMensaje('La billetera debe tener un mínimo de 10 caracteres.');
      return;
    }
    if(billetera.length >= 999){
      setMensaje('La billetera debe tener un máximo de 1000 caracteres.');
      return;
    }
    if(billetera.includes(' ')){
      setMensaje('La billetera no puede tener espacios.');
      return;
    }

    if(tarjeta.length <= 15){
      setMensaje('La tarjeta debe tener un mínimo de 16 caracteres.');
      return;
    }
    if(tarjeta.length >= 999){
      setMensaje('La tarjeta debe tener un máximo de 1000 caracteres.');
      return;
    }
    if(tarjeta.includes(' ')){
      setMensaje('La tarjeta no puede tener espacios.');
      return;
    }
    
    setMensaje('');
    setBilleteraAct(billetera)
    actualizarPerfil()
  }

  const validarBilletera = (e) => {
    e.preventDefault()
    if(billetera == ''){
      setMensaje('La billetera no puede estar en blanco.');
      return; 
    }

    if(billetera.length <= 9){
      setMensaje('La billetera debe tener un mínimo de 10 caracteres.');
      return;
    }
    if(billetera.length >= 999){
      setMensaje('La billetera debe tener un máximo de 1000 caracteres.');
      return;
    }
    if(billetera.includes(' ')){
      setMensaje('La billetera no puede tener espacios.');
      return;
    }
    agregarBilletera()
  }

  const validarTarjeta = (e) => {
    e.preventDefault()
    if(tarjeta == ''){
      setMensaje('La tarjeta no puede estar en blanco.');
      return; 
    }

    if(tarjeta.length <= 15){
      setMensaje('La tarjeta debe tener un mínimo de 16 caracteres.');
      return;
    }
    if(tarjeta.length >= 999){
      setMensaje('La tarjeta debe tener un máximo de 1000 caracteres.');
      return;
    }
    if(tarjeta.includes(' ')){
      setMensaje('La tarjeta no puede tener espacios.');
      return;
    }
    agregarTarjeta()
  }

  const recargaPendiente = async () => {
    try {
      const { data } = await axios.get(
        `/api/datos/recargas/${props.id}`
      );
      setMonedasPend(data?.docs[0]?.fichas)
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
  },[]);

  return (
    <>

    {
      copyText ? (
        <div className="fixed top-0 left-0 w-screen max-w-full z-50 ">
          <div className="relative w-full max-w-3xl mx-auto">
            <span className="p-3 mt-6 mr-3 absolute right-0 top-0 bg-green-500 text-slate-50 rounded-xl shadow">
              Copiado a bandeja de clip
            </span>
          </div>
        </div>
      ) : ''
    }

      <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
        <div className="">
          <Image
            src={props?.datos?.user?.image}
            alt="moneda"
            width={76}
            height={76}
          />
        </div>
        <div className="flex flex-col pl-3 w-2/3">
          <span className="text-xl text-current font-bold line-clamp-1">{name}</span>
          <span className="text-base text-slate-600 line-clamp-1">{email}</span>
          <li className="flex">
            <div className="flex text-base text-current items-center">
              <div className="text-slate-600">Mi balance:</div>
              <span className="ml-2 mr-1 pt-1">
                <Image src="/moneda.svg" alt="moneda" width={16} height={16} />
              </span>
              <span className="font-bold text-amber-400">{props?.saldo ? props.saldo : 0}</span>
            </div>
          </li>
        </div>

        <div className="flex items-center flex-initial flex-wrap mt-3 border-b border-slate-200 pb-3 w-full justify-between sm:justify-start">
          <span className="text-slate-600 text-base w-full">ID:</span><br/>
          <span className="text-base font-bold pr-3 w-5/6 line-clamp-1 md:w-1/2">{id}</span>
          <div className="text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer" 
            onClick={copyToClipboard3}>
            <FontAwesomeIcon icon={faCopy} />
          </div>
        </div>

        <div className="flex items-center flex-initial flex-wrap mt-3 border-b border-slate-200 pb-3 w-full justify-between sm:justify-start">
          <span className="text-slate-600 text-base w-full">Link de referido:</span><br/>
          <span className="text-base font-bold pr-3 w-5/6 line-clamp-1 md:w-1/2">
          https://rgloteria.com/?r={id}</span>
          <div className="text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer" 
            onClick={copyToClipboard2}>
            <FontAwesomeIcon icon={faCopy} />
          </div>
        </div>

        {
           billeteraAct ? (
           <div className="flex items-center flex-initial flex-wrap mt-3 pb-3 w-full justify-between sm:justify-start">
              <>
                <span className="text-slate-600 text-base w-full">Mi billetera:</span><br/>
                <span className="text-base font-bold pr-3 w-5/6 md:w-1/2 line-clamp-1">
                {billeteraAct}</span>
                <div className="text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer" 
                  onClick={copyToClipboard}>
                  <FontAwesomeIcon icon={faCopy} />
                </div>
              </>
        </div> ) : '' }

        {
           tarjetaAct ? (
           <div className="flex items-center flex-initial flex-wrap mt-3 pb-3 w-full justify-between sm:justify-start">
              <>
                <span className="text-slate-600 text-base w-full">Mi tarjeta:</span><br/>
                <span className="text-base font-bold pr-3 w-5/6 md:w-1/2 line-clamp-1">
                {tarjetaAct}</span>
                <div className="text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer" 
                  onClick={copyToClipboard4}>
                  <FontAwesomeIcon icon={faCopy} />
                </div>
              </>
        </div>) : '' }
        
        <div className="flex cursor-pointer rounded-full border-2 border-slate-300 text-sm justify-center items-center text-slate-600 hover:bg-slate-100 px-4 py-2 mt-3" 
          onClick={lamodal}>
          <FontAwesomeIcon icon={faPencil} className='pr-3'/> Editar Perfil
        </div>
         
      </div>

      <>
        {fechaRecarga ? (
            <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl text-base">
            <div><span className="mr-2 text-red-500 text-lg"><FontAwesomeIcon icon={faCircleExclamation}/></span>Tienes una solicitud de <b>recarga pendiente</b> para procesar de <b>{monedasPend} fichas</b>, 
            realizaste la solicitud del pago el <b>{fechaRecarga}</b> cuando confirmaste haber 
            enviado <b>{cryptoPend}</b>.</div>
            <div></div>
          </div>
          ) : ''}
      </>

      <div className="imagen-promo">
        <Link href='/referidos'>
          <a>
            <Image
              src='/banner-referidos.png'
              alt="moneda"
              width={748}
              height={158}
            />
          </a>
        </Link>
      </div>


      <div className={`${editar ? 'w-screen h-screen block fixed z-20 top-0 left-0 backdrop-blur-sm overflow-y-scroll bg-black bg-opacity-50' : 'hidden'}`}>
          <div className="relative max-w-3xl mx-auto">
            <div className="text-slate-700 text-base z-20 w-10 h-10 border-2 absolute top-9 right-6 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer flex justify-center items-center" 
            onClick={lamodal}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>

          <div className="shadow bg-white rounded-xl mb-16 mt-6 h-max px-3 py-6 max-w-3xl mx-3 md:mx-auto">
              <form className="w-full max-w-md mx-auto flex flex-wrap">
                <h3 className="pb-3 text-current text-2xl w-full font-semibold">Editar Perfil</h3>

                <div className="contenedor-checkbox">

                  <div className="flex flex-wrap">
                    <label htmlFor='nombre' className="w-full mt-2 text-base text-slate-700 font-bold">Billetera:</label>
                    <span className="pb-2 text-base text-slate-500">Usted debe utilizar esta billetera para comprar fichas.</span>
                    <input type='text' className="rounded-full py-2 px-5 bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent w-full"  
                    id="nombre" placeholder="Mi Billetera."
                    onChange={(e) => {setBilletera(e.target.value)}} value={billetera} />
                  </div>

                  <div className="flex flex-wrap">
                    <label htmlFor='nombre' className="w-full mt-2 text-base text-slate-700 font-bold">Tarjeta:</label>
                    <span className="pb-2 text-base text-slate-500">Usted debe utilizar esta tarjeta para comprar fichas.</span>
                    <input type='text' className="rounded-full py-2 px-5 bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent w-full"  
                    id="nombre" placeholder="Mi Tarjeta."
                    onChange={(e) => {setTarjeta(e.target.value)}} value={tarjeta} />
                  </div>

                <span className="text-base text-red-500 py-3 w-full flex">{mensaje}</span>
                </div>

                <button id="btn-editar" className="w-full py-2 cursor-pointer px-5 rounded-full font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white" 
                onClick={actualizarPerfil}>Guardar</button>
              </form>             
          </div>
      </div>


    </>
  );
};
export default Perfil;