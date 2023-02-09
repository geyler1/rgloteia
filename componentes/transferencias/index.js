import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faArrowLeft,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import CardRecargar from "componentes/cardRecargar";
import copy from "copy-to-clipboard";
import Link from "next/link";
import axios from "axios";

const Transferencias = function (props) {
  const [usuario, setUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [datos, setDatos] = useState(null);

  const [recargasEnv, setRecargasEnv] = useState(null);
  const [recargasRes, setRecargasRes] = useState(null);

  const [editarBillet, setEditarBillet] = useState(false);
  const [billetera, setBilletera] = useState(100);

  const recargasx = async ()=>{
    var { data: recargasResx } = await axios.get(`/api/datos/recargasRes/${props.uid}`);
    var { data: recargasEnvx } = await axios.get(`/api/datos/recargasEnv/${props.uid}`);
    setRecargasEnv(recargasEnvx.docs);
    setRecargasRes(recargasResx.docs);
  }
  useEffect(() => {
    recargasx()
  },[]);

  const buscarUsuario = async (e) => {
    var { data } = await axios.get(`/api/datos/usuarioATransferir/${usuario}`);
    setDatos(data);

    if(!data){
      setMensaje('El nombre de usuario que buscas no existe')
      return
    }
    if(data?._id == props.uid){
      setMensaje('No puedes transferirte a ti mismo!')
      return
    }
    setMensaje('')
  };

  const validarBusqueda = (e) => {
    e.preventDefault();
    if(usuario == ''){
      setMensaje('El usuario no puede estar vacio.')
      return
    }
    if(usuario.includes(' ')){
      setMensaje('Los nombres de usuario no tienen espacios en blanco.')
      return
    }
    setMensaje('')
    buscarUsuario()
  }

  const lamodal2 = () => {
    if(editarBillet){
      setEditarBillet(false)
      setMensaje('')
    }else{
      setEditarBillet(true)
    }
  }

  //hacer que salga la alerta
const [copyText, setCopyText] = useState(false);
const copyAlert = () => {
  setCopyText(true)
  setTimeout(()=>{setCopyText(false)}, 2600)
}

  const enviarSaldo = async() => {
    try {
      const res = await axios.put('/api/datos/transferir/transferir', {
        _id: props.uid,
        _id2: datos?._id,
        saldo: billetera,
      });
      if(res?.data?.error){
        setMensaje(res?.data?.error)
        return
      }
      setMensaje('')
      lamodal2()
      copyAlert()
    } catch (error) {
      if(error.response.data.error){
        setMensaje('¡Ups! Parece que ocurrió un error, recarga la página y vuelve a intentar.')
      }
    }
  }

  const validarEnviarSaldo = (e) => {
    e.preventDefault();
    if(billetera < 5){
      setMensaje('El minimo a transferir es 5')
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
            Transferencia realizada!
          </span>
        </div>
      </div>
      ) : ''
    }

      <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
        <form className="flex flex-wrap">
          <h3 className="pb-3 text-current text-2xl w-full font-semibold">Transferir saldo</h3>
          <span className="text-base text-slate-500 w-full">
            Busque a quien le quiere transferir por su ID.
          </span>
          <span className="text-base text-red-500 py-3 w-full flex">{mensaje}</span>
          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full my-3">
          <input type="text" className="w-full mb-3 sm:mb-0 sm:w-5/6 rounded-full sm:mr-3 py-2 px-5 bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent" 
            id="nombre" placeholder="Buscar usuario"
            onChange={(e) => { setUsuario(e.target.value); }} value={usuario}/>

          <button id="btn-editar" className="w-full sm:w-1/6 py-2 cursor-pointer px-5 rounded-full font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white" 
          onClick={validarBusqueda}>Buscar</button>
          </div>
        </form>

        {
          datos ? (
        <div className="pt-5 w-full">
          <ul>
            <li key={datos._id}>
              <div className="flex justify-between items-center py-4 border-t border-slate-200">
                <div className="flex justify-start items-start w-2/3">
                  <div className="w-11 h-11 overflow-hidden">
                    <Image
                      src={datos.image}
                      alt="moneda"
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="flex flex-col ml-3 w-2/3">
                    <span className="text-current text-slate-700">{datos.name}</span>
                    <span className="text-current line-clamp-1 w-full text-slate-700 font-semibold">@{datos.username}</span>
                  </div>
                </div>

                <div>
                  <div>
                    {mensaje == 'No puedes transferirte a ti mismo!' ? '' : (
                      <div id="btn-editar" className="w-full text-center py-2 cursor-pointer px-5 rounded-full font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white"  
                      onClick={lamodal2}>Transferir</div>
                    )}
                  </div>
                </div>

              </div>
            </li>
          </ul>
        </div>
          ) : ''
        }

      </div>

      <div>
        <div className="w-full">
          {recargasRes?.[0] ? (<div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
            <ul className="w-full">
              <li>
                <h3 className="pb-3 text-current text-2xl w-full font-semibold">Transferencias Recibidas</h3>
              </li>
              {
                recargasRes.map((user, i) => (
                  <li key={i}>
                    <div className="flex justify-between items-center py-4 border-b border-slate-200">
                      <div className="flex justify-start items-start w-2/3 overflow-hidden">
                        <div className="w-11 h-11 overflow-hidden">
                          <Image
                            src={user?.fotoEnvia}
                            alt="moneda"
                            width={44}
                            height={44}
                          />
                        </div>
                        <div className="flex flex-col ml-3 w-2/3 overflow-hidden">
                          <span className="text-current text-slate-700">{user?.nombreEnvia}</span>
                          <span className="text-current text-slate-700 font-semibold">@{user?.usernameEnvia}</span>
                        </div>
                      </div>

                      <div className="flex justify-center text-amber-400 font-bold items-center text-xl">
                        <span className="w-5 h-5 mr-1">
                          <Image src="/moneda.svg" alt="moneda" width={20} height={20} />
                        </span>
                        <span>{user?.saldo ? user?.saldo : 0}</span>
                      </div>
                    </div>
                  </li> ))
              }
            </ul>
          </div>) : ''
          }

      
          {
          recargasEnv?.[0] ? (<div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-5 relative rounded-xl">
            <ul className="ul-transferencias">
              <li>
                <h3 className="pb-3 text-current text-2xl w-full font-semibold">Transferencias Enviadas</h3>
              </li>
              {
               recargasEnv.map((user, i) => (
                <li key={i}>
                <div className="flex justify-between items-center py-4 border-b border-slate-200">
                  <div className="flex justify-start items-start w-2/3 overflow-hidden">
                    <div className="w-11 h-11 overflow-hidden">
                      <Image
                        src={user?.fotoRecibe}
                        alt="moneda"
                        width={44}
                        height={44}
                      />
                    </div>
                    <div className="flex flex-col ml-3 w-2/3 overflow-hidden">
                      <span className="text-current text-slate-700">{user?.nombreRecibe}</span>
                      <span className="text-current text-slate-700 font-semibold">@{user?.usernameRecibe}</span>
                    </div>
                  </div>

                  <div className="flex text-red-500 justify-center font-bold items-center text-xl">
                    <span className="w-5 h-5 mr-1">
                      <Image src="/moneda.svg" alt="moneda" width={20} height={20} />
                    </span>
                    <span>{user?.saldo ? `-${user?.saldo}` : 0}</span>
                  </div>
                </div>
              </li> ))
              }
            </ul>
          </div>) : ''
          }

        </div>
      </div>


      <div className={`${editarBillet ? 'w-screen h-screen block fixed z-20 top-0 left-0 backdrop-blur-sm overflow-y-scroll bg-black bg-opacity-50' : 'hidden'}`}>
          <div className="relative max-w-3xl mx-auto">
            <div className="text-slate-700 text-base z-20 w-10 h-10 border-2 absolute top-9 right-6 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer flex justify-center items-center" 
            onClick={lamodal2}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>

          <div className="shadow bg-white rounded-xl mb-16 mt-6 h-max px-3 py-6 max-w-3xl mx-3 md:mx-auto overflow-hidden">
            <div>
              {
                datos ? (
              <form className="w-full max-w-md mx-auto flex flex-wrap pt-5">
                <h3 className="pb-3 text-current text-2xl w-full font-semibold">Transferirle fichas a 
                {' '}<span className="font-semibold text-slate-600">@{datos?.username}</span></h3>

                <div className="w-full">
                  <ul>
                    <li key={datos._id}>
                      <div className="flex justify-between w-full items-center mb-3 py-4 border-b border-slate-200">
                        <div className="flex justify-start items-start w-full overflow-hidden">
                          <div className="w-11 h-11 overflow-hidden">
                            <Image
                              src={datos.image}
                              alt="moneda"
                              width={44}
                              height={44}
                            />
                          </div>
                          <div className="flex flex-col pl-3 w-auto">
                            <span className="text-current text-slate-700">{datos.name}</span>
                            <span className="text-current text-slate-700 font-semibold">@{datos.username}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <li className="flex w-full mb-2">
                  <div className="flex text-base text-current items-center">
                    <div className="text-slate-600">Mi balance:</div>
                    <span className="ml-2 mr-1 pt-1">
                      <Image src="/moneda.svg" alt="moneda" width={16} height={16} />
                    </span>
                    <span className="font-bold text-amber-400">{props?.saldo ? props.saldo : 0}</span>
                  </div>
                </li> 

                <label htmlFor='nombre' className="text-base text-slate-700 font-bold">Saldo a enviar:</label><br/>
                <span>Escriba la cantidad de fichas que quiere enviar.</span>
                <span className="text-base text-red-500 py-3 w-full flex">{mensaje}</span>
                <div className="flex flex-nowrap w-full">
                  <input type='number' className="w-4/6 rounded-full py-2 px-5 bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                    id="nombre" placeholder="Saldo"
                  onChange={(e) => {setBilletera(e.target.value)}} value={billetera} min='100'/>
                  <button id="btn-editar" className="w-2/6 ml-3 py-2 px-5 rounded-full font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white cursor-pointer" 
                  onClick={validarEnviarSaldo}>Enviar</button>
                </div>  
              </form>  
                ) : ''
              }           
            </div>
          </div>
      </div>

    </>
  );
};
export default Transferencias;
