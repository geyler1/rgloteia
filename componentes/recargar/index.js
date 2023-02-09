import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faArrowLeft,
  faCopy,
  faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";
import CardRecargar from "componentes/cardRecargar";
import copy from "copy-to-clipboard";  
import Link from "next/link";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Recargar = function (props) {

  var billeteraOficial = 'TWqyBhLMiw3NXF2dhLP8AW1gwWQjQoorsM'
  var cupOficial = '00000123009706141800'

  const [editar, setEditar] = useState(false);
  const [precio, setPrecio] = useState(0);
  const [monedas, setMonedas] = useState(0);
  const [imagen, setImagen] = useState('')
  const [editarPaso2, setEditarPaso2] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [aPagar, setAPagar] = useState('')
  const [codeAPagar, setCodeAPagar] = useState('')
  const [nombrePagar, setNombrePagar] = useState('')
  const [precioUSD, setPrecioUSD] = useState(0)

  const [monedasPend, setMonedasPend] = useState('')
  const [cryptoPend, setCryptoPend] = useState('')
  const [fechaRecarga, setFechaRecarga] = useState('')

  const [editarBillet, setEditarBillet] = useState(false);
  const [billetera, setBilletera] = useState(props?.billetera);
  const [billeteraAct, setBilleteraAct] = useState(props?.billetera);

  const lamodal = (precioTRX, fichas, img, saldoUSD) => {
    setPrecioUSD(saldoUSD);
    if(editar){
      setEditar(false)
      setEditarPaso2(false)
      setMensaje('')
    }else{
      setEditar(true)
      setPrecio(precioTRX)
      setMonedas(fichas)
      setImagen(img)
      setEditarPaso2(false)
    }
  }
  const paso2 = (x, y, z, d) => {
    if(!fechaRecarga){
      if(editarPaso2){
        setEditarPaso2(false)
        setMensaje('')
      }else{
        if(billeteraAct){
          setEditarPaso2(true)
          setAPagar(x)
          setCodeAPagar(y)
          setNombrePagar(z)
          setMensaje('')
        }else{
          setMensaje('Tienes que agregar tu billetera antes de poder recargar.')
        }
      }
    }else{
      setMensaje('Ya tienes un pago pendiente, hasta que no se procese no puedes agregar otra solicitud de recarga.')
    }
  }

  const copyToClipboard = () => {
    copy(aPagar);
    copyAlert()
 }
 const copyToClipboard2 = () => {
  copy(billeteraOficial);
  copyAlert()
}

const recargaPendiente = async () => {
  try {
    const { data } = await axios.get(
      `/api/datos/recargas/${props.uid}`
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
});

const [botonCargando, setBotonCargando] = useState(false);
const agregarRecarga = async () => {
  if(!fechaRecarga){
    setBotonCargando(true)
    try {
      const res = await axios.post('/api/datos/agregarRecarga/agregarRecarga', {
        uid: props.uid,
        email: props.email,
        referido: localStorage.getItem("refLoteria"),
        billetera: billeteraAct,
        saldoCrypto: `${aPagar} ${codeAPagar}`,
        saldo: precio,
        fichas: monedas,
        pendiente: true,
      });
      const data = res;
      setMensaje('')
      setEditar(false)
      setEditarPaso2(false)
      copyAlert2()
      setBotonCargando(false)
    } catch (error) {
      if(error.response.data.error){
        setBotonCargando(false)
        setMensaje('¡Ups! Parece que ocurrió un error, recarga la página y vuelve a intentar.')
      }
    }
  }else{
    setMensaje('Ya tienes un pago pendiente, hasta que no se procese no puedes agregar otra solicitud de recarga.')
  }
};

const [copyText, setCopyText] = useState(false);
const copyAlert = () => {
  setCopyText(true)
  setTimeout(()=>{setCopyText(false)}, 2500)
}
const [copyText2, setCopyText2] = useState(false);
const copyAlert2 = () => {
  setCopyText2(true)
  setTimeout(()=>{setCopyText2(false)}, 2500)
}

const agregarBilletera = async (e) => {
  try {
    const res = await axios.put('/api/datos/billetera/billetera', {
      _id: props.uid,
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
  setMensaje('');
  setBilleteraAct(billetera)
  agregarBilletera()
}
const lamodal2 = () => {
  if(editarBillet){
    setEditarBillet(false)
  }else{
    setEditarBillet(true)
  }
  setMensaje('')
}
const pagarPaypal = async (precioUSDx, monedasx) => {
  try {
    const res = await axios.post("/api/paypal/paypal",{
        saldo: precioUSDx,
        fichas: monedasx,
      })

    return res.data.id;
  } catch (error) {
    console.log(error);
  }
}
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
      {
        copyText2 ? (
        <div className="fixed top-0 left-0 w-screen max-w-full z-50 ">
          <div className="relative w-full max-w-3xl mx-auto">
            <span className="p-3 mt-6 mr-3 absolute right-0 top-0 bg-green-500 text-slate-50 rounded-xl shadow">
              Solicitud de recarga creada.
            </span>
          </div>
        </div>
        ) : ''
      }

      <div className="flex flex-col box-border w-full min-w-full">
        <h3 className="text-2xl text-current px-3 pt-6 pb-1 m-0 font-semibold">Tienda de Fichas</h3>
        <p className="block py-0 px-3 m-0 text-slate-600">Recarga tu cuenta con fichas para poder participar en los sorteos.</p>

        {fechaRecarga ? (
          <div className="m-3 p-3 rounded-xl shadow bg-white text-slate-600">
            <div><span className="mr-2 text-red-500 text-lg"><FontAwesomeIcon icon={faCircleExclamation}/></span>Tienes una solicitud de recarga pendiente para procesar de <b>{monedasPend} fichas</b>, 
            realizaste la solicitud del pago el <b>{fechaRecarga}</b> cuando confirmaste haber 
            enviado <b>{cryptoPend}</b>.</div>
            <div></div>
        </div>
        ) : ''}

        <div className="flex justify-center flex-wrap pb-6">
          <div onClick={() => {
            lamodal(/*precio, fichas, foto, precioUSD*/20, 19, '/monedas-oferta1.png', 1.50 )
            setPrecioUSD(1.50)
            setMonedas(19)}} 
          className='w-1/2 sm:w-1/4 p-3'>
          <CardRecargar cantidadMonedas='19' imagen="/monedas-oferta1.png" 
          precio='20 TRX'/></div>
          
          <div onClick={() => lamodal(60, 57, '/monedas-oferta2.png', 3.70 )} 
          className='w-1/2 sm:w-1/4 p-3'>
          <CardRecargar cantidadMonedas='57' imagen="/monedas-oferta2.png" 
          precio='60 TRX'  precioOriginal=''  popular={true}/></div>

          <div onClick={() => lamodal(100, 95, '/monedas-oferta3.png' )} 
          className='w-1/2 sm:w-1/4 p-3'>
          <CardRecargar cantidadMonedas='95' imagen="/monedas-oferta3.png" 
          precio='100 TRX'/></div>
          
          <div onClick={() => lamodal(300, 285, '/monedas-oferta4.png' )} 
          className='w-1/2 sm:w-1/4 p-3'>
          <CardRecargar cantidadMonedas='285' imagen="/monedas-oferta4.png" 
          precio='300 TRX'/></div>

          <div onClick={() => lamodal(500, 475, '/monedas-oferta5.png' )} 
          className='w-1/2 sm:w-1/4 p-3'>
          <CardRecargar cantidadMonedas='475' imagen="/monedas-oferta5.png" 
          precio='500 TRX'/></div>

          <div onClick={() => lamodal(1000, 950, '/monedas-oferta6.png' )} 
          className='w-1/2 sm:w-1/4 p-3'>
          <CardRecargar cantidadMonedas='950' imagen="/monedas-oferta6.png" 
          precio='1000 TRX'/></div>
        </div>

      </div>


      <div className={`${editar ? 'w-screen h-screen block fixed z-20 top-0 left-0 backdrop-blur-sm overflow-y-scroll bg-black bg-opacity-50' : 'hidden'}`}>
          <div className="relative max-w-3xl mx-auto">
            <div className="text-slate-700 text-base z-20 w-10 h-10 border-2 absolute top-9 right-6 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer flex justify-center items-center" 
            onClick={lamodal}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>

          <div className="shadow bg-white rounded-xl mb-16 mt-6 h-max px-3 py-6 max-w-3xl mx-3 md:mx-auto">
            
            <div>

              <div className={`w-full mx-auto max-w-md mt-6 ${editarPaso2 ? 'hidden' : ''}`}>
                <div className="text-current text-base flex w-full justify-end items-center pt-5 pb-3 px-0">
                  <span>Mi balance: </span> 
                  <span className="pl-2 pr-1 pt-1">
                    <Image src='/moneda.svg' alt='moneda' width={16} height={16}/></span>
                  <span className="font-bold text-amber-400 text-lg">{props?.saldo ? props.saldo : 0}</span>
                </div> 

                <div className="border rounded-xl border-slate-200 mb-5 pr-4 flex justify-between items-center">
                  <div className="w-16 h-16 overflow-hidden">
                  <Image src={imagen?imagen:'/moneda.svg'} alt="monedas" width={64} height={64}/>
                  </div>
                  <div className="text-xl flex justify-center items-center font-bold">
                    <Image src='/moneda.svg' alt="moneda" width={20} height={20}/> 
                    <span className="pl-1 pb-1">{monedas}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-200 mt-3 pt-3 text-lg text-current font-semibold">
                  <div>
                    Total en TRX
                  </div>
                  <div>
                    {precio}
                  </div>
                </div>

                <div className="flex justify-center items-center flex-col w-full">
                  <div className="flex flex-col w-full pb-6 items-start">{mensaje? (<>
                    {
                      editarBillet ? '' : (
                        <span className="text-base eseses text-red-500 py-3 w-full flex">{mensaje}</span>
                      )
                    }
                    
                    {
                      billeteraAct ? '' : (
                        <span className={`flex w-auto cursor-pointer rounded-full border-2 border-slate-300 text-sm justify-center items-center text-slate-600 hover:bg-slate-100 px-4 py-2 mt-3
                        ${editarBillet ? 'hidden' : ''}`} 
                        onClick={lamodal2} >Agregar billetera</span>
                      )
                    }
                  </>) : ''}</div>

                  <div className="w-full rounded-full py-3 px-5 cursor-pointer font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white text-center"
                   onClick={() => paso2(precio, 'TRX', 'TRX')}>
                    <span>{precio + ' '}</span> TRX
                  </div>

                  {/*<div className="w-full pt-5">
                  <PayPalScriptProvider
                    options={{
                      "client-id": "ASWJk22tmRjWdt5StYJ_q7OrHEjd6Gtx1K7rV4TWCqP9rsKITSQy9V2HxGtH01pKwVy8cA7iAp1dDMf3",
                    }}>
                    <PayPalButtons
                      createOrder={(precioUSD, monedas) => pagarPaypal(precioUSD, monedas)}
                      onCancel={(data) => console.log("compra cancelada")}
                      onApprove={(data, actions) => {
                        console.log('Aprobado')
                        console.log(data);
                        console.log(actions)
                        agregarRecarga()
                        actions.order.capture();
                      }}
                      style={{ layout: "vertical" }}
                    />
                  </PayPalScriptProvider>
                  </div>
                  <div className="btn-pagar" onClick={() => paso2(RMAI, 'RMAI', 'Roima')}>
                    <span className="precio-en-crypto">{RMAI + ' '}</span> RMAI
                  </div>
                  <div className="btn-pagar" onClick={() => paso2(USDT, 'USDT', 'Tether')}>
                    <span className="precio-en-crypto">{USDT + ' '}</span> USDT
                  </div>
                  <div className="btn-pagar" onClick={() => paso2(BNB, 'BNB', 'bnb')}>
                    <span className="precio-en-crypto">{BNB + ' '}</span> BNB
                  </div>
                  <div className="btn-pagar" onClick={() => paso2(EOS, 'EOS', 'eos')}>
                    <span className="precio-en-crypto">{EOS + ' '}</span> EOS
                  </div>*/}
                </div>
              </div>

              <div className={`w-full max-w-md mx-auto mt-6 ${editarPaso2 ? '' : 'hidden'}`}>
              <div>
                <div className="flex justify-between items-center pt-5 pb-3">
                  <div className="">
                    <div className="absolute top-9 text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer" onClick={paso2}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                  </div>
                  <div className="text-current text-base flex w-full justify-end items-center">
                    <span>Mi balance: </span> 
                    <span className="pl-2 pr-1 pt-1">
                      <Image src='/moneda.svg' alt='moneda' width={16} height={16}/></span>
                    <span className="font-bold text-amber-400 text-lg">{props?.saldo ? props.saldo : 0}</span>
                  </div>
                </div>

                <div className="border rounded-xl border-slate-200 mb-5 pr-4 flex justify-between items-center">
                  <div className="w-16 h-16 overflow-hidden">
                  <Image src={imagen?imagen:'/moneda.svg'} alt="Fichas" width={64} height={64}/>
                  </div>
                  <div className="text-xl flex justify-center items-center font-bold">
                    <Image src='/moneda.svg' alt="moneda" width={20} height={20}/> 
                    <span className="pl-1 pb-1">{monedas}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-200 mt-3 pt-3 text-lg text-current font-semibold">
                  <div>
                    Total en TRX
                  </div>
                  <div>
                    {precio}
                  </div>
                </div>

                <div className="flex items-center flex-initial flex-wrap mt-3 border-y border-slate-200 pb-3 pt-3  w-full justify-between">
                  <div className="text-base font-bold pr-3 w-4/6">
                    {codeAPagar}
                  </div>
                  <div className="flex justify-center items-center">
                    <span className="pr-3 text-lg font-semibold">{aPagar}</span>
                    <div className="text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer" 
                    onClick={copyToClipboard}>
                      <FontAwesomeIcon icon={faCopy} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center flex-initial flex-wrap mt-3 border-b border-slate-200 pb-3 w-full justify-between">
                  <span className="w-full text-base text-slate-700 pb-3">Para continuar con el pago debe enviar los {aPagar} {codeAPagar}
                   {' '}a la siguiente dirección y una vez que haya enviado el pago puede hacer click 
                   en confirmar para terminar el proceso</span>

                  <span className="text-base font-bold pr-3 w-4/6 overflow-hidden">
                  {billeteraOficial}</span>
                  <div className="text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer" 
                  onClick={copyToClipboard2}>
                  <FontAwesomeIcon icon={faCopy} />
                </div>
                </div>
                
                {
                  editarBillet ? '' : (
                    <span className="text-base eseses text-red-500 py-3 w-full flex">{mensaje}</span>
                  )
                }
                {
                  botonCargando ? (
                    <div className="w-full py-2 px-5 rounded-full font-semibold cursor-pointer bg-slate-700 hover:bg-slate-900 transition-colors text-white text-center" >
                    <span>Enviando...</span>
                  </div>
                  ):(
                  <div className="w-full py-2 px-5 rounded-full font-semibold cursor-pointer bg-slate-700 hover:bg-slate-900 transition-colors text-white text-center" >
                    <span onClick={agregarRecarga}>Confirmar envío</span>
                  </div>
                  )
                }
                

              </div>
              </div>

            </div>
          </div>
      </div>


      <div className={`w-screen h-screen block fixed z-20 top-0 left-0 backdrop-blur-sm overflow-y-scroll bg-black bg-opacity-50 ${editarBillet ? '' : 'hidden'}`}>
          <div className="relative max-w-3xl mx-auto">
            <div className="text-slate-700 text-base z-20 w-10 h-10 border-2 absolute top-9 right-6 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer flex justify-center items-center" 
            onClick={lamodal2}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>

          <div className="shadow bg-white rounded-xl mb-16 mt-6 h-max px-3 py-6 max-w-3xl mx-3 md:mx-auto">
            <div>
              <form className="w-full max-w-sm mx-auto flex flex-wrap">
                <h3 className="pb-3 text-current text-2xl w-full font-semibold">Agregar mi billetera</h3>

                <label htmlFor='nombre' className="text-base text-slate-700 font-bold">Billetera:</label>
                <span className="pb-2 text-base text-slate-500 w-full">Usted debe utilizar esta billetera para comprar fichas.</span>
                <input type='text' className="rounded-full mb-3 py-2 px-5 bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent w-full" 
                id="nombre" placeholder="Mi billetera."
                onChange={(e) => {setBilletera(e.target.value)}} value={billetera} />


                <div>
                  <span className="pb-2 text-base text-slate-500 w-full">
                    Asegúrese de revisar que su billetera sea la correcta.
                    <br/>
                    {billetera}
                  </span>
                  <span className="text-base text-red-500 py-3 w-full flex">{mensaje}</span>
                </div>

                <button id="btn-editar" className="w-full py-2 px-5 rounded-full font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white cursor-pointer" 
                onClick={validarBilletera}>Guardar billetera</button>
              </form>             
            </div>
          </div>
      </div>
    </>

  );
};
export default Recargar;