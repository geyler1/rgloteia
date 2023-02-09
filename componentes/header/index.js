import Link from "next/link";
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState, useEffect , useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightFromBracket,
  faBars,
  faXmark,
  faPlus,
  faHouse,
  faClockRotateLeft,
  faPlay,
  faStar,
  faBullhorn,
  faMoneyBillTransfer,
  faWallet,
  faCircleInfo,
  faQuestion
} from "@fortawesome/free-solid-svg-icons";

const Header = function (props) {
  const user = props.perfil

  var saldo = `${props.saldo}`;
  if(saldo){
    if(saldo > 9999999){
      var saldo = `${saldo.slice(0,2)}.${saldo.slice(2,3)}M`
    }
    if(saldo > 999999){
      var saldo = `${saldo.slice(0,1)}.${saldo.slice(1,2)}M`
    }
    if(saldo > 99999){
      var saldo = `${saldo.slice(0,3)}.${saldo.slice(3,4)}K`
    }
    if(saldo > 9999){
      var saldo = `${saldo.slice(0,2)}.${saldo.slice(2,3)}K`
    }
    if(saldo > 999){
      var saldo = saldo
    }
    if(saldo < 999){
      var saldo = saldo
    }
  }

  const refMenuPerfil = useRef(null)
  const refMenuPerfilMovil = useRef(null)

  const [menuPerfil, setMenuPerfil ] = useState(false)
  const [menuPerfilMovil, setMenuPerfilMovil ] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState()
  const [headerVisible, setHeaderVisible] = useState(true)

  /* PREGUNTAR POR WINDOWS */
  if(typeof window !== "undefined"){
    window.addEventListener("scroll", function(){
      var st = window.pageYOffset || document.documentElement.scrollTop; 
      if (st > lastScrollTop){
        setHeaderVisible(false)
      } else if(st < lastScrollTop){
        setHeaderVisible(true)
      }
      setLastScrollTop(st);
   }, false);
  }

  const cerrarMenus = () => {
    setMenuPerfil(false)
    setMenuPerfilMovil(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(refMenuPerfil.current && !refMenuPerfil.current.contains(e.target)){
        setMenuPerfil(false)
      }
    }
    if(menuPerfil){
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {document.removeEventListener("mousedown", handleClickOutside);}
  },[menuPerfil])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(refMenuPerfilMovil.current && !refMenuPerfilMovil.current.contains(e.target)){
        setMenuPerfilMovil(false)
      }
    }
    if(menuPerfilMovil){
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {document.removeEventListener("mousedown", handleClickOutside);}
  },[menuPerfilMovil])

  return (
    <>
    <header className={`fixed w-screen min-w-full max-w-full left-0 z-10 transition-all duration-300 bg-gradient-to-br from-slate-900 to-slate-700 py-2 px-3 
    ${headerVisible ? 'top-0'
    :'-top-14'}`}>
      
      <div className="flex justify-between flex-nowrap h-10 w-full max-w-3xl mx-auto relative px-0 md:px-3">

        {/*boton abrir cerrar menu movil*/}
        <div className="flex items-center">
          {
          props.perfil ? (
          <div className="pr-3">
            <div className={`${menuPerfilMovil ? 'hidden' : 'flex'} text-2xl w-6 justify-center items-center text-slate-50 font-semibold cursor-pointer hover:text-slate-300 transition`}  
              onClick={() => {
                menuPerfilMovil ? setMenuPerfilMovil(false) : setMenuPerfilMovil(true)
              }}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={`${menuPerfilMovil ? 'flex' : 'hidden'} text-2xl w-6 justify-center items-center text-slate-50 font-semibold cursor-pointer hover:text-slate-300 transition`}  
              onClick={() => {
                menuPerfilMovil ? setMenuPerfilMovil(false) : setMenuPerfilMovil(true)
              }}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
            ) : ''
          }

          <div className="h-10 w-20">
            <Link href='/'><a><img src="/logoweb.png"/></a></Link>
          </div>
        </div>

        <nav>
          <ul className="flex">

            {
              props.perfil ? (
              <li className="flex justify-between items-center flex-nowrap">
                <div className="flex text-slate-50 text-base items-center">
                  <div className="hidden sm:block">Mi balance:</div> 
                  <span className="ml-3 mr-1 mt-1"><Image src='/moneda.svg' alt='moneda' width={16} height={16}/></span>
                  <span className="font-bold text-amber-400">{saldo == 'undefined' ? '0' : saldo}</span>
                </div> 
                <a className='flex w-9 h-9 text-semibold text-base my-1 mx-3 py-2 px-2 rounded-full justify-center items-center 
                text-slate-50 hover:text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition'
                  href='/recargar'>
                  <FontAwesomeIcon icon={faPlus}  onClick={cerrarMenus}/>
                </a>
              </li>
            ) : ''
            }

            {props.perfil ? (
            <>
              <li className={`cursor-pointer ${menuPerfil ? 'hidden' : 'flex'} 
                w-10 h-10`} onClick={() => {
                menuPerfil ? setMenuPerfil(false) : setMenuPerfil(true)
                }}>
                <Image src={user?.image} alt={user?.name} width={40} height={40}/>
              </li>
              <li className={`${menuPerfil ? 'flex' : 'hidden'} 
                w-10 h-10 justify-center items-center text-2xl text-slate-50 cursor-pointer`} onClick={() => {
                menuPerfil ? setMenuPerfil(false) : setMenuPerfil(true)
                }}>
                <FontAwesomeIcon icon={faXmark} />
              </li>
            </>) : (
            <li>
              <Link href="/login">
                <a className="flex text-semibold text-base my-1 mx-0 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/60 transition hover:text-slate-50">
                  <FontAwesomeIcon icon={faRightFromBracket}  onClick={cerrarMenus}  className='mr-2'/> Acceder
                </a>
              </Link>
            </li>)}  
          </ul>
        </nav>

      </div>
    </header>

    <div className="w-full h-12"></div>

    <div className={`fixed w-screen h-screen top-0 left-0 flex justify-center ${menuPerfilMovil ? 'z-10' : 'hidden'}`}>
        <div className="relative max-w-3xl w-full mx-auto">  
          <div ref={refMenuPerfilMovil} className={menuPerfilMovil ? 
            `absolute left-0 flex w-72 z-10 bg-gradient-to-br from-slate-900 to-slate-700 p-3 box-border transition-all duration-300 sm:left-3
            ${headerVisible ? 'top-14' : 'top-0'}` : `hidden`}>

            <ul className="flex flex-col w-full h-screen min-h-screen overflow-y-scroll pb-16">
              
              {props.perfil ? (<li className="flex items-center justify-start flex-nowrap w-full border-b border-slate-500 pb-3 mb-3">
                  <Image src={user?.image} alt={user?.name} width={40} height={40}/>
                  <span className="pl-3 text-slate-100 text-lg font-semibold">{user?.name}</span>
              </li> ) : (<li className="iniciar-session-movil">
                <Link href="/login">
                  <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition">
                    <FontAwesomeIcon icon={faRightFromBracket}  onClick={cerrarMenus} className='mr-2'/> Acceder
                  </a>
                </Link>
              </li>)}

              <li onClick={cerrarMenus}><Link href="/">
                <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition">
                <FontAwesomeIcon icon={faHouse} className='mr-2'/> Inicio</a></Link></li>

              <li className="nav-li-menu-movil" onClick={cerrarMenus}><Link href="/jugar">
                <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition">
              <FontAwesomeIcon icon={faPlay} className='mr-2'/> Jugar</a></Link></li>

              <li className="nav-li-menu-movil" onClick={cerrarMenus}><Link href="/charada">
                <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition">
              <FontAwesomeIcon icon={faStar} className='mr-2'/> Charada</a></Link></li>

              <li className="nav-li-menu-movil" onClick={cerrarMenus}><Link href="/historial-de-juego">
                <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition">
              <FontAwesomeIcon icon={faClockRotateLeft} className='mr-2'/> Historial de Juego</a></Link></li>
 
              <li className="nav-li-menu-movil" onClick={cerrarMenus}><Link href="/historial">
                <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition">
              <FontAwesomeIcon icon={faClockRotateLeft} className='mr-2'/> Historial de Resultados</a></Link></li>

              <li className="nav-li-menu-movil" onClick={cerrarMenus}><Link href="/p/ayuda">
                <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition">
              <FontAwesomeIcon icon={faQuestion} className='mr-2'/> Ayuda</a></Link></li>
              
              <div className="w-full h-10"></div>
            </ul> 
          </div>
        </div>  
      </div>

      <div className={`fixed w-screen h-screen top-0 left-0 flex justify-center ${menuPerfil ? 'z-10' : 'hidden'}`}>
        <div className="relative max-w-3xl w-full mx-auto">  

          {props.perfil ? (
          <div ref={refMenuPerfil} className={menuPerfil ? 
            `absolute flex w-72 z-10 right-0 bg-gradient-to-br from-slate-900 to-slate-700 p-3 box-border transition-all duration-300 sm:right-3
          ${headerVisible ? 'top-14' : 'top-0'}` : `hidden`}> 

            <ul className="flex flex-col w-full h-screen min-h-screen overflow-y-scroll pb-16">
              <li className="flex items-center justify-start flex-nowrap w-full mb-3" >
                <Image src={user?.image} alt={user?.name} width={40} height={40}/>
                <span className="pl-3 text-slate-100 text-lg font-semibold">{user?.name}</span>
              </li>

              <li className="flex justify-between items-center text-base text-slate-50 pb-3 mb-3 border-b border-slate-500">
                <div className="flex text-slate-50 text-base items-center">
                  <div>Mi balance:</div> 
                  <span className="ml-3 mr-1 mt-1"><Image src='/moneda.svg' alt='moneda' width={16} height={16}/></span>
                  <span className="font-bold text-amber-400">{saldo == 'undefined' ? '0' : saldo}</span></div> 
                <a className="flex w-9 h-9 text-semibold text-base my-1 py-2 px-2 rounded-full justify-center items-center
                text-slate-50 hover:text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition"
                  href='/recargar'><FontAwesomeIcon icon={faPlus} onClick={cerrarMenus}/>
                </a>
              </li>

              <li  onClick={cerrarMenus}><Link href="/perfil">
                <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition"
                  ><FontAwesomeIcon icon={faUser} className='mr-2'/>  Perfil</a></Link>
              </li>

              <li  onClick={cerrarMenus}><Link href="/transferencias">
                <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition"
                  ><FontAwesomeIcon icon={faMoneyBillTransfer} className='mr-2'/>  Transferir</a></Link>
              </li>

              <li  onClick={cerrarMenus}><Link href="/retirar">
                <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition"
                  ><FontAwesomeIcon icon={faWallet} className='mr-2'/>  Retirar Saldo</a></Link>
              </li>

              <li  onClick={cerrarMenus}><Link href="/referidos">
                <a className="flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition"
                  ><FontAwesomeIcon icon={faBullhorn} className='mr-2'/>  Referidos</a></Link>
              </li>

              <li><a className="cursor-pointer flex w-full text-semibold text-base my-1 py-2 rounded-full justify-center items-center 
                text-slate-50 border-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/40 transition"
                onClick={() => signOut()}>
                  <FontAwesomeIcon icon={faRightFromBracket}  onClick={cerrarMenus} className='mr-2'/>  Cerrar Sesión</a>
              </li>
              <div className="w-full h-10"></div>
            </ul> 

          </div>) : ''}

        </div>
      </div> 

    </>
  );
};
export default Header;