import Head from "next/head";
import { getSession } from 'next-auth/react'
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import copy from "copy-to-clipboard";  
import Paginado from "componentes/paginado";

export default function Admin(props) {
  const laUrl = props?.urlBase;
  const pagActual = props?.pagina;

  console.log(laUrl, pagActual)

  const [recargasPend, setRecargasPend] = useState();
  const [retirosPend, setRetirosPend] = useState();
  const [paginado, setPaginado] = useState({});
  const pag = parseInt(props.pagina)

  const buscarRecargas = async () => {
    var { data: recargas } = await axios.post(
      `/api/datos/admin/recargas`,{
        pagina: 1
      }
    );
    setPaginado({
      nextPage: recargas?.nextPage,
      prevPage: recargas?.prevPage,
    })
    if(recargas.docs[0] != undefined){
      setRecargasPend(recargas.docs);
    }else{
      setRecargasPend(null);
    }
  };

  const buscarRetiros = async () => {
    var { data: retiros } = await axios.post(
      `/api/datos/admin/recargas/retiros`,{
        pagina: 1
      }
    );
    setPaginado({
      nextPage: retiros?.nextPage,
      prevPage: retiros?.prevPage,
    })
    if(retiros.docs[0] != undefined){
      setRetirosPend(retiros.docs);
    }else{
      setRetirosPend(null);
    }
  };

  const borrarRegistro = async (id) => {
    await axios.delete(
      `/api/datos/admin/recargas/borrar`,{
        _id: id
    })
    buscarRecargas();
  };
  const borrarRetiros = async (id) => {
    await axios.delete(
      `/api/datos/admin/recargas/borrarRetiros`,{
        _id: id
    })
    buscarRetiros();
  };

  const crearRecarga = async (uid, saldo, id, referido) => {
    await axios.post(
      `/api/datos/admin/recargas/recargar`,{
        uid: uid,
        saldo: saldo,
        id: id,
        referido: referido
    })
    buscarRecargas();
  };

  const crearRetiro = async (uid, saldo, id, referido) => {
    await axios.post(
      `/api/datos/admin/recargas/retirar`,{
        uid: uid,
        saldo: saldo,
        id: id,
        referido: referido
    })
    buscarRetiros();
  };
  

  
  const copyToClipboard = (copiar) => {
    copy(copiar);
    copyAlert()
 }
  const [copyText, setCopyText] = useState(false);
  const copyAlert = () => {
    setCopyText(true)
    setTimeout(()=>{setCopyText(false)}, 2500)
  }

  const buscarUsuarios = async () => {
    var { data: usuarios } = await axios.post(
      `/api/datos/admin/estadisticas/users`,{
        pagina: pagActual
      }
    );
    console.log(usuarios?.users?.nextPage)
    setPaginado({
      nextPage: usuarios?.users?.nextPage,
      prevPage: usuarios?.users?.prevPage,
      totalDocs: usuarios?.users?.totalDocs,
    })
    if(usuarios?.users?.docs[0] != undefined){
      setRecargasPend(usuarios?.users?.docs);
    }else{
      setRecargasPend(null);
    }
  };

  const buscarNumeros = async () => {
    var { data: numeros } = await axios.post(
      `/api/datos/admin/estadisticas/numeros`,{
        pagina: pagActual
      }
    );
    console.log(numeros?.users)
    setPaginado({
      nextPage: numeros?.users?.nextPage,
      prevPage: numeros?.users?.prevPage,
      totalDocs: numeros?.users?.totalDocs,
    })
    if(numeros?.users?.docs[0] != undefined){
      setRecargasPend(numeros?.users?.docs);
    }else{
      setRecargasPend(null);
    }
  };

  const buscarNumerosGanadores = async () => {
    var { data: numeros } = await axios.post(
      `/api/datos/admin/estadisticas/numerosGanadores`,{
        pagina: pagActual
      }
    );
    console.log(numeros?.users)
    setPaginado({
      nextPage: numeros?.users?.nextPage,
      prevPage: numeros?.users?.prevPage,
      totalDocs: numeros?.users?.totalDocs,
    })
    if(numeros?.users?.docs[0] != undefined){
      setRecargasPend(numeros?.users?.docs);
    }else{
      setRecargasPend(null);
    }
  };

  const buscarNumerosHoy = async () => {
    var { data: numeros } = await axios.post(
      `/api/datos/admin/estadisticas/numerosHoy`,{
        pagina: pagActual
      }
    );
    console.log(numeros?.users)
    setPaginado({
      nextPage: numeros?.users?.nextPage,
      prevPage: numeros?.users?.prevPage,
      totalDocs: numeros?.users?.totalDocs,
    })
    if(numeros?.users?.docs[0] != undefined){
      setRecargasPend(numeros?.users?.docs);
    }else{
      setRecargasPend(null);
    }
  };

  const buscarTransferencias = async () => {
    var { data: transfers } = await axios.post(
      `/api/datos/admin/estadisticas/transferencias`,{
        pagina: pagActual
      }
    );
    console.log(transfers?.users)
    setPaginado({
      nextPage: transfers?.users?.nextPage,
      prevPage: transfers?.users?.prevPage,
      totalDocs: transfers?.users?.totalDocs,
    })
    if(transfers?.users?.docs[0] != undefined){
      setRecargasPend(transfers?.users?.docs);
    }else{
      setRecargasPend(null);
    }
  };

  useEffect(() => {
    setRecargasPend()
    setRetirosPend()
    setPaginado()
    if(laUrl == 'recargas'){  
      buscarRecargas();
    }
    if(laUrl == 'retiros'){  
      buscarRetiros();
    }
    if(laUrl == 'usuarios'){  
      buscarUsuarios();
    }
    if(laUrl == 'numeros'){  
      buscarNumeros();
    }
    if(laUrl == 'numeros-ganadores'){  
      buscarNumerosGanadores();
    }
    if(laUrl == 'numeros-hoy'){  
      buscarNumerosHoy();
    }
    if(laUrl == 'transferencias'){  
      buscarTransferencias()
    }
  }, [pag, laUrl]);

  return (
    <div className="bg-slate-100 w-screen min-h-screen flex flex-wrap min-w-full">
      <Head>
        <title>4dm1n1strac10n</title>
        <meta name="description" content=".... 4dm1n1strac10n ...." />
        <meta name="robots" content="noindex,nofollow"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

      <main className="w-full max-w-3xl mx-auto my-3">
        <ul className="flex m-3 flex-wrap">
          <li className={`px-5 mb-3 py-2 block text-base relative bg-green-700 border-2 border-transparent hover:bg-black text-white rounded-full mr-3`}>
            <Link href='/'>
            <a>rgloteria.com</a>
            </Link>
          </li>
          <li className="px-5 py-2 mb-3 text-base border-2 border-transparent bg-slate-700 hover:bg-black text-white rounded-full mr-3">
            <Link href='/4dm1n1str4c10n'>
            <a>Inicio</a>
            </Link>
          </li>
          <li className={`px-5 py-2 mb-3 text-base rounded-full mr-3 
            ${laUrl=='recargas'? 'bg-transparent text-green-700 border-2 border-green-700': 'text-white bg-slate-700 border-2 border-transparent  hover:bg-black'}`}>
            <Link href='/4dm1n1str4c10n/recargas'>
            <a>Recargas</a>
            </Link>
          </li>
          <li className={`px-5 mb-3 py-2 text-base rounded-full mr-3 
            ${laUrl=='retiros'? 'bg-transparent text-red-700 border-2 border-red-700': 'text-white border-2 border-transparent bg-slate-700 hover:bg-black'}`}>
            <Link href='/4dm1n1str4c10n/retiros'>
            <a>Retiros</a>
            </Link>
          </li>
          <li className={`px-5 py-2 mb-3 text-base rounded-full mr-3 
            ${laUrl=='usuarios'? 'bg-transparent text-green-700 border-2 border-green-700': 'text-white bg-slate-700 border-2 border-transparent  hover:bg-black'}`}>
            <Link href='/4dm1n1str4c10n/usuarios'>
            <a>Usuarios</a>
            </Link>
          </li>
          <li className={`px-5 py-2 mb-3 text-base rounded-full mr-3 
            ${laUrl=='numeros'? 'bg-transparent text-green-700 border-2 border-green-700': 'text-white bg-slate-700 border-2 border-transparent  hover:bg-black'}`}>
            <Link href='/4dm1n1str4c10n/numeros'>
            <a># Comprados</a>
            </Link>
          </li>
          <li className={`px-5 py-2 mb-3 text-base rounded-full mr-3 
            ${laUrl=='numeros-ganadores'? 'bg-transparent text-green-700 border-2 border-green-700': 'text-white bg-slate-700 border-2 border-transparent  hover:bg-black'}`}>
            <Link href='/4dm1n1str4c10n/numeros-ganadores'>
            <a># Ganadores</a>
            </Link>
          </li>
          <li className={`px-5 py-2 mb-3 text-base rounded-full mr-3 
            ${laUrl=='numeros-hoy'? 'bg-transparent text-green-700 border-2 border-green-700': 'text-white bg-slate-700 border-2 border-transparent  hover:bg-black'}`}>
            <Link href='/4dm1n1str4c10n/numeros-hoy'>
            <a># Jugados Hoy</a>
            </Link>
          </li>
          <li className={`px-5 py-2 mb-3 text-base rounded-full mr-3 
            ${laUrl=='transferencias'? 'bg-transparent text-green-700 border-2 border-green-700': 'text-white bg-slate-700 border-2 border-transparent  hover:bg-black'}`}>
            <Link href='/4dm1n1str4c10n/transferencias'>
            <a>Transferencias</a>
            </Link>
          </li>
        </ul>

        <div className="">
        {laUrl == 'recargas' ? (
              <>
              {recargasPend?.[0] ? (<div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                  <ul className="w-full">
                    <li>
                      <h3 className="pb-3 text-current text-2xl w-full font-semibold text-green-700">Recargas pendientes</h3>
                    </li>
                    {
                      recargasPend.map((rec, i) => (
                        <li key={rec._id} className='border-t pt-2 border-slate-200 mt-3 flex w-full justify-between
                        flex-wrap sm:flex-nowrap items-center'>
                          <div className="flex flex-col text-base text-slate-800">
                            <span>Email: {rec.email}</span>
                            <span className="line-clamp-1 mr-3">Billetera:</span>
                            <div className="flex items-center w-full max-w-full"> 
                              <span className="line-clamp-1 w-48 mr-3 overflow-hidden">{rec.billetera}</span>
                              <div className="text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer" 
                                onClick={() => copyToClipboard(rec.billetera)}>
                                <FontAwesomeIcon icon={faCopy} />
                              </div>
                            </div>
                            
                            <span className="line-clamp-1 mr-3">Tarjeta:</span>
                            <div className="flex items-center w-full max-w-full"> 
                              <span className="line-clamp-1 w-48 mr-3 overflow-hidden">{rec.tarjetaCUP}</span>
                              <div className="text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer" 
                                onClick={() => copyToClipboard(rec.tarjetaCUP)}>
                                <FontAwesomeIcon icon={faCopy} />
                              </div>
                            </div>

                            <span className="text-slate-700">Recargarle: {rec.fichas} fichas.</span>
                            <span className="text-green-700 font-semibold">Pago con: {rec.saldoCrypto}.</span>
                          </div>
                          <div className="flex py-3">
                            <div className='py-2 px-4 bg-red-400 text-white rounded-full mr-3 cursor-pointer hover:bg-red-500 transition-all'
                            onClick={() => borrarRegistro(rec._id)}>Borrar</div>
                            <div className='py-2 px-4 bg-slate-700 text-white rounded-full cursor-pointer hover:bg-black transition-all'
                            onClick={() => {
                              crearRecarga(rec?.uid, rec?.fichas, rec?._id, rec?.referido);
                            }}>
                              Confirmar</div>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>) : (
                  <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                    <span className="text-current text-base w-full font-semibold text-center py-8">
                      No hay solicitudes de recargas pendientes
                    </span>
                  </div>
                )
                }
              </>
            ) : ''}

          {laUrl == 'retiros' ? (
              <>
              {retirosPend?.[0] ? (<div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                  <ul className="w-full">
                    <li>
                      <h3 className="pb-3 text-current text-2xl w-full font-semibold text-red-700">Retiros pendientes</h3>
                    </li>
                    {
                      retirosPend.map((rec, i) => (
                        <li key={rec._id} className='border-t pt-2 border-slate-200 mt-3 flex w-full justify-between
                        flex-wrap sm:flex-nowrap items-center'>
                          <div className="flex flex-col text-base text-slate-800">
                            <span>Email: {rec.email}</span>
                            <span className="line-clamp-1 mr-3">Billetera:</span>
                            <div className="flex items-center w-full max-w-full"> 
                              <span className="line-clamp-1 w-48 mr-3 overflow-hidden">{rec.billetera}</span>
                              <div className="text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer" 
                                onClick={() => copyToClipboard(rec.billetera)}>
                                <FontAwesomeIcon icon={faCopy} />
                              </div>
                            </div>
                            <span className="text-red-700 font-semibold">Solicito: {rec.saldo} {rec.saldoCrypto}</span>
                          </div>
                          <div className="flex py-3">
                            <div className='py-2 px-4 bg-red-400 text-white rounded-full mr-3 cursor-pointer hover:bg-red-500 transition-all'
                            onClick={() => borrarRetiros(rec._id)}>Borrar</div>
                            <div className='py-2 px-4 bg-slate-700 text-white rounded-full cursor-pointer hover:bg-black transition-all'
                            onClick={() => {crearRetiro(rec.uid, rec.saldo, rec._id, rec.referido)}}>
                              Confirmar</div>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>) : (
                  <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                    <span className="text-current text-base w-full font-semibold text-center py-8">
                      No hay solicitudes de retiros pendientes
                    </span>
                  </div>
                )
                }
              </>
            ) : ''}


            {laUrl == 'usuarios' ? (
              <>
              {recargasPend?.[0] ? (<div className=" flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                  <ul className="w-full">
                    <li>
                      <h3 className="pb-3 text-current text-2xl w-full font-semibold text-green-700">Usuarios Registrados</h3>
                    </li>
                    <span>Total registrados: <b>{paginado?.totalDocs}</b></span>
                    {
                      recargasPend.map((rec, i) => (
                        <li key={rec._id} className='border-t pt-2 border-box border-slate-200 mt-3 flex w-full justify-start
                        flex-wrap sm:flex-nowrap items-start flex-col overflow-hidden'>
                          <span><b>{rec?.name?rec.name:'NO'}</b></span>
                          <span>Email: {rec?.email?rec.email:'NO'}</span>
                          <span><b>Saldo: {rec?.saldo?rec.saldo:'NO'}</b></span>
                          <span>ID: {rec?.username?rec.username:'NO'}</span>
                          <span>Recarga? {rec?.recarga? 'SI':'NO'}</span>
                          <span>Bill: {rec?.billetera?rec.billetera:'NO'}</span>
                          <span>Tarj: {rec?.tarjetaCUP?rec.tarjetaCUP:'NO'}</span>
                          <span>Es Ref? {rec?.referido?'SI':'NO'}</span>
                          <span>Ref dono: {rec?.donado?rec.donado:'0'}</span>
                          <span>{rec?.updatedAt?rec.updatedAt:'null'}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>) : (
                  <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                    <span className="text-current text-base w-full font-semibold text-center py-8">
                      No hay usuarios
                    </span>
                  </div>
                )
                }
                <Paginado pag={pagActual} urlBase={`4dm1n1str4c10n/${laUrl}`}
                 nextPage={paginado?.nextPage} prevPage={paginado?.prevPage}/>
                 <div className="h-8"></div>
              </>
            ) : ''}

            {laUrl == 'numeros' ? (
              <>
              {recargasPend?.[0] ? (<div className=" flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                  <ul className="w-full">
                    <li>
                      <h3 className="pb-3 text-current text-2xl w-full font-semibold text-green-700">Todos los Numeros Comprados</h3>
                    </li>
                    <span>Total comprados: <b>{paginado?.totalDocs}</b></span>
                    {
                      recargasPend.map((rec, i) => (
                        <li key={rec._id} className='border-t pt-2 border-box border-slate-200 mt-3 flex w-full justify-start
                        flex-wrap sm:flex-nowrap items-start flex-col'>
                          <span>Nombre: {rec?.name?rec.name:'NO'}</span>
                          <span><b>{rec?.email?rec.email:'NO'}</b></span>
                          <span>username: {rec?.id?rec.id:'NO'}</span>
                          <span><b>Apuesta $: {rec?.saldo?rec.saldo:'NO'}</b></span>
                          <span><b>Numero: {rec?.numero?rec.numero:'NO'}</b></span>
                          <span>Sorteo: {rec?.sorteo=='1'?'Mediodia':'Noche'}</span>
                          <span>Fecha: {rec?.fecha? rec?.fecha:''} Hora: {rec?.hora? rec?.hora:''}</span>
                          <span>Revisado: {rec?.checked?'SI':'NO'}</span>
                          <span><b>Ganador? {rec?.victoria?'SI':'NO'}</b></span>
                          <span>Creado: {rec?.createdAt?rec.createdAt:'null'}</span>
                          <span>Revisado: {rec?.updatedAt?rec.updatedAt:'null'}</span>

                        </li>
                      ))
                    }
                  </ul>
                </div>) : (
                  <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                    <span className="text-current text-base w-full font-semibold text-center py-8">
                      No hay numeros comprados
                    </span>
                  </div>
                )
                }
                <Paginado pag={pagActual} urlBase={`4dm1n1str4c10n/${laUrl}`}
                 nextPage={paginado?.nextPage} prevPage={paginado?.prevPage}/>
                 <div className="h-8"></div>
              </>
            ) : ''}

            {laUrl == 'numeros-ganadores' ? (
              <>
              {recargasPend?.[0] ? (<div className=" flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                  <ul className="w-full">
                    <li>
                      <h3 className="pb-3 text-current text-2xl w-full font-semibold text-green-700">Todos los Numeros Ganadores</h3>
                    </li>
                    <span>Total Numeros Ganadores: <b>{paginado?.totalDocs}</b></span>
                    {
                      recargasPend.map((rec, i) => (
                        <li key={rec._id} className='border-t pt-2 border-box border-slate-200 mt-3 flex w-full justify-start
                        flex-wrap sm:flex-nowrap items-start flex-col'>
                          <span>Nombre: {rec?.name?rec.name:'NO'}</span>
                          <span><b>{rec?.email?rec.email:'NO'}</b></span>
                          <span>username: {rec?.id?rec.id:'NO'}</span>
                          <span><b>Apuesta $: {rec?.saldo?rec.saldo:'NO'}</b></span>
                          <span><b>Numero: {rec?.numero?rec.numero:'NO'}</b></span>
                          <span>Sorteo: {rec?.sorteo=='1'?'Mediodia':'Noche'}</span>
                          <span>Fecha: {rec?.fecha? rec?.fecha:''} Hora: {rec?.hora? rec?.hora:''}</span>
                          <span>Revisado: {rec?.checked?'SI':'NO'}</span>
                          <span><b>Ganador? {rec?.victoria?'SI':'NO'}</b></span>
                          <span>Creado: {rec?.createdAt?rec.createdAt:'null'}</span>
                          <span>Revisado: {rec?.updatedAt?rec.updatedAt:'null'}</span>

                        </li>
                      ))
                    }
                  </ul>
                </div>) : (
                  <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                    <span className="text-current text-base w-full font-semibold text-center py-8">
                      No hay numeros ganadores
                    </span>
                  </div>
                )
                }
                <Paginado pag={pagActual} urlBase={`4dm1n1str4c10n/${laUrl}`}
                 nextPage={paginado?.nextPage} prevPage={paginado?.prevPage}/>
                 <div className="h-8"></div>
              </>
            ) : ''}

            {laUrl == 'numeros-hoy' ? (
              <>
              {recargasPend?.[0] ? (<div className=" flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                  <ul className="w-full">
                    <li>
                      <h3 className="pb-3 text-current text-2xl w-full font-semibold text-green-700">Los Numeros jugados hoy</h3>
                    </li>
                    <span>Numeros jugados hoy: <b>{paginado?.totalDocs}</b></span>
                    {
                      recargasPend.map((rec, i) => (
                        <li key={rec._id} className='border-t pt-2 border-box border-slate-200 mt-3 flex w-full justify-start
                        flex-wrap sm:flex-nowrap items-start flex-col'>
                          <span>Nombre: {rec?.name?rec.name:'NO'}</span>
                          <span><b>{rec?.email?rec.email:'NO'}</b></span>
                          <span>username: {rec?.id?rec.id:'NO'}</span>
                          <span><b>Apuesta $: {rec?.saldo?rec.saldo:'NO'}</b></span>
                          <span><b>Numero: {rec?.numero?rec.numero:'NO'}</b></span>
                          <span>Sorteo: {rec?.sorteo=='1'?'Mediodia':'Noche'}</span>
                          <span>Fecha: {rec?.fecha? rec?.fecha:''} Hora: {rec?.hora? rec?.hora:''}</span>
                          <span>Revisado: {rec?.checked?'SI':'NO'}</span>
                          <span><b>Ganador? {rec?.victoria?'SI':'NO'}</b></span>
                          <span>Creado: {rec?.createdAt?rec.createdAt:'null'}</span>
                          <span>Revisado: {rec?.updatedAt?rec.updatedAt:'null'}</span>

                        </li>
                      ))
                    }
                  </ul>
                </div>) : (
                  <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                    <span className="text-current text-base w-full font-semibold text-center py-8">
                      No hay numeros jugados hoy
                    </span>
                  </div>
                )
                }
                <Paginado pag={pagActual} urlBase={`4dm1n1str4c10n/${laUrl}`}
                 nextPage={paginado?.nextPage} prevPage={paginado?.prevPage}/>
                 <div className="h-8"></div>
              </>
            ) : ''}

            {laUrl == 'transferencias' ? (
              <>
              {recargasPend?.[0] ? (<div className=" flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                  <ul className="w-full">
                    <li>
                      <h3 className="pb-3 text-current text-2xl w-full font-semibold text-green-700">Historial de transferencias</h3>
                    </li>
                    <span>Total de transferencias: <b>{paginado?.totalDocs}</b></span>
                    {
                      recargasPend.map((rec, i) => (
                        <li key={rec._id} className='border-t pt-2 border-box border-slate-200 mt-3 flex w-full justify-start
                        flex-wrap sm:flex-nowrap items-start flex-col'>
                          <span>nombre Envia: {rec?.nombreEnvia?rec.nombreEnvia:'NO'}</span>
                          <span><b>nombre Recibe: {rec?.nombreRecibe?rec.nombreRecibe:'NO'}</b></span>
                          <span>username Envia: {rec?.usernameEnvia?rec.usernameEnvia:'NO'}</span>
                          <span>username Recibe: {rec?.usernameRecibe?rec?.usernameRecibe:'NO'}</span>
                          <span><b>Saldo: {rec?.saldo?rec?.saldo:'0'}</b></span>
                          <span>Creado: {rec?.createdAt?rec.createdAt:'null'}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>) : (
                  <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
                    <span className="text-current text-base w-full font-semibold text-center py-8">
                      No hay numeros jugados hoy
                    </span>
                  </div>
                )
                }
                <Paginado pag={pagActual} urlBase={`4dm1n1str4c10n/${laUrl}`}
                 nextPage={paginado?.nextPage} prevPage={paginado?.prevPage}/>
                 <div className="h-8"></div>
              </>
            ) : ''}


        </div>
      </main>
    </div>

  );
}

export const getServerSideProps = async (context) => {

  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  var {data} = session ? await axios.get(`${process.env.NEXTAUTH_URL}/api/datos/perfil/${session.user.email}`) : ({data:null});
  if(data?.docs?.[0]?.email != 'mismonedasbtc@gmail.com' &&
    data?.docs?.[0]?.email != 'geylerps@gmail.com'){
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (
    context.query.admin != "recargas" &&
    context.query.admin != "retiros" &&
    context.query.admin != "usuarios" &&
    context.query.admin != "numeros" &&
    context.query.admin != "numeros-ganadores" &&
    context.query.admin != "numeros-hoy" &&
    context.query.admin != "transferencias"
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }


const pagina = context?.query?.pag?context?.query?.pag:1;
const urlBase = context?.query?.admin

return {
    props: {
      session,
      pagina,
      urlBase
    },
  };
};