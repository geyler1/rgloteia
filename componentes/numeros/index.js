import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faArrowLeft,
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import BolaBoton from "componentes/bolaBoton";
import axios from "axios";
import HorasUTC from "datos/horasUTC";
const Numeros = (props) => {
  const [miSaldo, setMiSaldo] = useState(props.saldo)
  const [comprar, setCompar] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [numActual, setNumActual] = useState('')
  const [selecSorteo, setSelecSorteo] = useState(false)
  const [unidades, setUnidades] = useState(1)
  const [sorteoMediodia, setSorteoMediodia] = useState(false)
  const [sorteoNoche, setSorteoNoche] = useState(false)
  const [paso1, setPaso1] = useState(false)
  const [sorteo, setSorteo] = useState('')

  const horasUTC = HorasUTC();

  var comprarMediodia = () => {
    if(horasUTC.hora_UTC < horasUTC.horaInicianSorteos_UTC){
      setMensaje(`El sortedo del mediodia no esta disponible hasta las ${horasUTC.horaInicianSorteos} horas.`)
      return
    }
    if(horasUTC.hora_UTC > horasUTC.horaSaleMediodia_UTC - 2){
      setMensaje(`El sortedo del mediodia solo esta disponible hasta las ${horasUTC.horaMediodiadisponibleHasta} horas.`)
      return
    } 
    setSorteoMediodia(true)
  }

  var comprarNoche = () => {
    if(horasUTC.hora_UTC < horasUTC.horaInicianSorteos_UTC && horasUTC.hora_UTC > horasUTC.horaSaleNoche_UTC - 2){
      setMensaje(`El sortedo de la noche no esta disponible hasta las ${horasUTC.horaInicianSorteos} horas.`)
      return
    }
    setSorteoNoche(true)
  }

  const calcHoras = () => {
    comprarMediodia()
    comprarNoche()
  }

  const lamodal = (num) => {
    calcHoras()
    setPaso1(false)
    setSelecSorteo(false)
    setUnidades(1)

    if(comprar){
      setCompar(false)
    }else{
      setCompar(true)
      setNumActual(`${num<=9?'0':''}`+num)
    }
    setMensaje('')
  }

  const [sorteoes, setSorteoes] = useState(1)
  const seleccionSorteo = (props) => {
    setPaso1(true)
    setSorteo(props)
    setSelecSorteo(true)
    if(props == 'Mediodía'){
      setSorteoes(1)
    }else{
      setSorteoes(2)
    }
    setMensaje('')
  }
  const desSeleccionSorteo = () => {
    setPaso1(false)
    setSelecSorteo(false)
    setMensaje('')
  }

  const [copyText, setCopyText] = useState(false);
  const copyAlert = () => {
  setCopyText(true)
  setTimeout(()=>{setCopyText(false)}, 2500)
  }

  const [num, setNum] = useState(0)
  const validarComprar = () => {
    if(parseInt(unidades) > 20){
      setMensaje('Selecciona un numero entre 1 y 20')
      return
    }
    if(parseInt(props.saldo < parseInt(unidades))){
      setMensaje(`El saldo disponible no le alcanza para comprar ${unidades} unidades`)
      return
    }
    setNum(numActual)
    comprarNumero(numActual)
  }

  const [botonCargando, setBotonCargando] = useState(false);
  const comprarNumero = async (numero) => {
      setBotonCargando(true)
      try {
        const res = await axios.post('/api/datos/comprarNumero/comprarNumero', {
          id: props.id,
          unidades: unidades,
          numero: numero,
          sorteo: sorteoes,
        });
        const data = res;

        setMensaje('')
        setCompar(false)
        setPaso1(false)
        setSelecSorteo(false)
        copyAlert()
        setBotonCargando(false)
        setMiSaldo(data?.data?.Comprado?.restarSaldo?.saldo)
        
      } catch (error) {
        setBotonCargando(false)
        setMensaje(error?.response?.data?.error)
      }
  };

  return(
    <>
    {
      copyText ? (
        <div className="fixed top-0 left-0 w-screen max-w-full z-50 ">
          <div className="relative w-full max-w-3xl mx-auto">
            <span className="p-3 mt-6 mr-3 absolute right-0 top-0 bg-green-500 text-slate-50 rounded-xl shadow">
              Número {num} Comprado.
            </span>
          </div>
        </div>
      ) : ''
    }

    <div className="flex flex-wrap  bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
      <h3 className="text-current text-2xl w-full font-semibold">Compra un número.</h3>
      <p className="text-base text-slate-700 w-full pb-5 pt-2 mb-5 border-b border-slate-200">
      Al hacer clic encima del número que quieres comprar saldrán las opciones de compra, como la cantidad de unidades
        de números que quedan disponibles para la compra, así como también para que sorteo lo quieres, el mediodía 
        o la noche, siempre que se encuentren disponibles.</p>

      {horasUTC.hora_UTC < horasUTC.horaInicianSorteos_UTC && horasUTC.hora_UTC > horasUTC.horaSaleNoche_UTC -2 ? (
          <div className="w-full text-center font-semibold text-slate-700 text-xl">
            No hay sorteos disponibles hasta las {horasUTC.horaInicianSorteos} horas. 
          </div>
        ) : (
    <div className="w-full flex flex-wrap justify-center">
      <div  onClick={() => lamodal(0)}><BolaBoton num={0}/></div>
      <div  onClick={() => lamodal(1)}><BolaBoton num={1}/></div>
      <div  onClick={() => lamodal(2)}><BolaBoton num={2}/></div>
      <div  onClick={() => lamodal(3)}><BolaBoton num={3}/></div>
      <div  onClick={() => lamodal(4)}><BolaBoton num={4}/></div>
      <div  onClick={() => lamodal(5)}><BolaBoton num={5}/></div>
      <div  onClick={() => lamodal(6)}><BolaBoton num={6}/></div>
      <div  onClick={() => lamodal(7)}><BolaBoton num={7}/></div>
      <div  onClick={() => lamodal(8)}><BolaBoton num={8}/></div>
      <div  onClick={() => lamodal(9)}><BolaBoton num={9}/></div>
      <div  onClick={() => lamodal(10)}><BolaBoton num={10}/></div>

      <div  onClick={() => lamodal(11)}><BolaBoton num={11}/></div>
      <div  onClick={() => lamodal(12)}><BolaBoton num={12}/></div>
      <div  onClick={() => lamodal(13)}><BolaBoton num={13}/></div>
      <div  onClick={() => lamodal(14)}><BolaBoton num={14}/></div>
      <div  onClick={() => lamodal(15)}><BolaBoton num={15}/></div>
      <div  onClick={() => lamodal(16)}><BolaBoton num={16}/></div>
      <div  onClick={() => lamodal(17)}><BolaBoton num={17}/></div>
      <div  onClick={() => lamodal(18)}><BolaBoton num={18}/></div>
      <div  onClick={() => lamodal(19)}><BolaBoton num={19}/></div>
      <div  onClick={() => lamodal(20)}><BolaBoton num={20}/></div>

      <div  onClick={() => lamodal(21)}><BolaBoton num={21}/></div>
      <div  onClick={() => lamodal(22)}><BolaBoton num={22}/></div>
      <div  onClick={() => lamodal(23)}><BolaBoton num={23}/></div>
      <div  onClick={() => lamodal(24)}><BolaBoton num={24}/></div>
      <div  onClick={() => lamodal(25)}><BolaBoton num={25}/></div>
      <div  onClick={() => lamodal(26)}><BolaBoton num={26}/></div>
      <div  onClick={() => lamodal(27)}><BolaBoton num={27}/></div>
      <div  onClick={() => lamodal(28)}><BolaBoton num={28}/></div>
      <div  onClick={() => lamodal(29)}><BolaBoton num={29}/></div>
      <div  onClick={() => lamodal(30)}><BolaBoton num={30}/></div>

      <div  onClick={() => lamodal(31)}><BolaBoton num={31}/></div>
      <div  onClick={() => lamodal(32)}><BolaBoton num={32}/></div>
      <div  onClick={() => lamodal(33)}><BolaBoton num={33}/></div>
      <div  onClick={() => lamodal(34)}><BolaBoton num={34}/></div>
      <div  onClick={() => lamodal(35)}><BolaBoton num={35}/></div>
      <div  onClick={() => lamodal(36)}><BolaBoton num={36}/></div>
      <div  onClick={() => lamodal(37)}><BolaBoton num={37}/></div>
      <div  onClick={() => lamodal(38)}><BolaBoton num={38}/></div>
      <div  onClick={() => lamodal(39)}><BolaBoton num={39}/></div>
      <div  onClick={() => lamodal(40)}><BolaBoton num={40}/></div>

      <div  onClick={() => lamodal(41)}><BolaBoton num={41}/></div>
      <div  onClick={() => lamodal(42)}><BolaBoton num={42}/></div>
      <div  onClick={() => lamodal(43)}><BolaBoton num={43}/></div>
      <div  onClick={() => lamodal(44)}><BolaBoton num={44}/></div>
      <div  onClick={() => lamodal(45)}><BolaBoton num={45}/></div>
      <div  onClick={() => lamodal(46)}><BolaBoton num={46}/></div>
      <div  onClick={() => lamodal(47)}><BolaBoton num={47}/></div>
      <div  onClick={() => lamodal(48)}><BolaBoton num={48}/></div>
      <div  onClick={() => lamodal(49)}><BolaBoton num={49}/></div>
      <div  onClick={() => lamodal(50)}><BolaBoton num={50}/></div>

      <div  onClick={() => lamodal(51)}><BolaBoton num={51}/></div>
      <div  onClick={() => lamodal(52)}><BolaBoton num={52}/></div>
      <div  onClick={() => lamodal(53)}><BolaBoton num={53}/></div>
      <div  onClick={() => lamodal(54)}><BolaBoton num={54}/></div>
      <div  onClick={() => lamodal(55)}><BolaBoton num={55}/></div>
      <div  onClick={() => lamodal(56)}><BolaBoton num={56}/></div>
      <div  onClick={() => lamodal(57)}><BolaBoton num={57}/></div>
      <div  onClick={() => lamodal(58)}><BolaBoton num={58}/></div>
      <div  onClick={() => lamodal(59)}><BolaBoton num={59}/></div>
      <div  onClick={() => lamodal(60)}><BolaBoton num={60}/></div>

      <div  onClick={() => lamodal(61)}><BolaBoton num={61}/></div>
      <div  onClick={() => lamodal(62)}><BolaBoton num={62}/></div>
      <div  onClick={() => lamodal(63)}><BolaBoton num={63}/></div>
      <div  onClick={() => lamodal(64)}><BolaBoton num={64}/></div>
      <div  onClick={() => lamodal(65)}><BolaBoton num={65}/></div>
      <div  onClick={() => lamodal(66)}><BolaBoton num={66}/></div>
      <div  onClick={() => lamodal(67)}><BolaBoton num={67}/></div>
      <div  onClick={() => lamodal(68)}><BolaBoton num={68}/></div>
      <div  onClick={() => lamodal(69)}><BolaBoton num={69}/></div>
      <div  onClick={() => lamodal(70)}><BolaBoton num={70}/></div>

      <div  onClick={() => lamodal(71)}><BolaBoton num={71}/></div>
      <div  onClick={() => lamodal(72)}><BolaBoton num={72}/></div>
      <div  onClick={() => lamodal(73)}><BolaBoton num={73}/></div>
      <div  onClick={() => lamodal(74)}><BolaBoton num={74}/></div>
      <div  onClick={() => lamodal(75)}><BolaBoton num={75}/></div>
      <div  onClick={() => lamodal(76)}><BolaBoton num={76}/></div>
      <div  onClick={() => lamodal(77)}><BolaBoton num={77}/></div>
      <div  onClick={() => lamodal(78)}><BolaBoton num={78}/></div>
      <div  onClick={() => lamodal(79)}><BolaBoton num={79}/></div>
      <div  onClick={() => lamodal(80)}><BolaBoton num={80}/></div>

      <div  onClick={() => lamodal(81)}><BolaBoton num={81}/></div>
      <div  onClick={() => lamodal(82)}><BolaBoton num={82}/></div>
      <div  onClick={() => lamodal(83)}><BolaBoton num={83}/></div>
      <div  onClick={() => lamodal(84)}><BolaBoton num={84}/></div>
      <div  onClick={() => lamodal(85)}><BolaBoton num={85}/></div>
      <div  onClick={() => lamodal(86)}><BolaBoton num={86}/></div>
      <div  onClick={() => lamodal(87)}><BolaBoton num={87}/></div>
      <div  onClick={() => lamodal(88)}><BolaBoton num={88}/></div>
      <div  onClick={() => lamodal(89)}><BolaBoton num={89}/></div>
      <div  onClick={() => lamodal(90)}><BolaBoton num={90}/></div>

      <div  onClick={() => lamodal(91)}><BolaBoton num={91}/></div>
      <div  onClick={() => lamodal(92)}><BolaBoton num={92}/></div>
      <div  onClick={() => lamodal(93)}><BolaBoton num={93}/></div>
      <div  onClick={() => lamodal(94)}><BolaBoton num={94}/></div>
      <div  onClick={() => lamodal(95)}><BolaBoton num={95}/></div>
      <div  onClick={() => lamodal(96)}><BolaBoton num={96}/></div>
      <div  onClick={() => lamodal(97)}><BolaBoton num={97}/></div>
      <div  onClick={() => lamodal(98)}><BolaBoton num={98}/></div>
      <div  onClick={() => lamodal(99)}><BolaBoton num={99}/></div>
      </div>)}

    </div>

        <div className={`${comprar ? 'w-screen h-screen block fixed z-20 top-0 left-0 backdrop-blur-sm overflow-y-scroll bg-black bg-opacity-50' : 'hidden'}`}>
          <div className="relative max-w-3xl mx-auto">
            <div className="text-slate-700 text-base z-20 w-10 h-10 border-2 absolute top-9 right-6 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer flex justify-center items-center" 
            onClick={lamodal}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>

          <div className="shadow bg-white rounded-xl mb-16 mt-6 h-max px-3 py-6 max-w-3xl mx-3 md:mx-auto">
              
              {
               selecSorteo ? (
                <div className="w-full max-w-md mx-auto relative">
                  <div onClick={() => {desSeleccionSorteo()}}
                    className="absolute -top-3 text-sm text-slate-700 border-2 border-slate-300 rounded-full px-3 py-2 hover:bg-slate-100 cursor-pointer">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </div>
                </div>
                ) : ''
              }

              <form className="w-full max-w-md mx-auto flex flex-wrap mt-6">
                <h3 className="pb-3 text-2xl text-slate-700 w-full font-semibold flex mt-2">Comprar Número:
                  <span className="text-slate-900 font-bold pl-2">{numActual}</span>
                </h3>

                <li className="flex">
                  <div className="flex text-base text-current items-center">
                    <div className="text-slate-600">Mi balance:</div>
                    <span className="ml-2 mr-1 pt-1">
                      <Image src="/moneda.svg" alt="moneda" width={16} height={16} />
                    </span>
                    <span className="font-bold text-amber-400">{miSaldo ? miSaldo : 0}</span>
                  </div>
                </li>

                <span className="text-base text-red-500 py-3 w-full flex">{mensaje}</span>
                  
                  {
                    selecSorteo ? (
                    <div className="flex flex-wrap w-full">
                      <p className="w-full py-3">Para terminar con la compra del número {numActual} para el sorteo
                       de {sorteo}, selecciona la cantidad de unidades que desea comprar y luego haga clic en el botón (Comprar Número).</p>
                       
                       <input type='number' min='1' max='10' className="rounded-full mb-3 py-2 px-5 bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent w-full" 
                        id="nombre" placeholder={`Min 1, Max 10`} onChange={(e) => {setUnidades(e.target.value)}} value={unidades}/>

                      {
                        botonCargando ? (
                        <div id="btn-editar" className="mt-2 text-center w-full py-2 cursor-pointer px-5 rounded-full font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white">
                        Comprando...</div>
                        ):(
                        <div id="btn-editar" className="mt-2 text-center w-full py-2 cursor-pointer px-5 rounded-full font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white"
                          onClick={() => validarComprar()}>
                        Comprar Número</div>
                        )
                      }
                      
                    </div>
                    ) : (
                      <div className="flex flex-wrap w-full justify-center">
                        
                        <p className="pt-3 text-base text-current w-full">
                          Escoge el sorteo para el que desea comprar el número {numActual},
                          <span className="font-semibold">(mediodía o noche)</span>, según estén disponibles.
                        </p>
                        
                        {
                          sorteoMediodia ? (
                            <div id="btn-editar" onClick={() => {seleccionSorteo('Mediodía')}}
                            className="mt-5 w-full text-center py-2 cursor-pointer px-5 rounded-full font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white">
                            Mediodía</div>
                          ) : ''
                        }
                        {
                          sorteoNoche ? (
                            <div id="btn-editar" onClick={() => {seleccionSorteo('Noche')}} 
                            className="mt-5 w-full text-center py-2 cursor-pointer px-5 rounded-full font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white">
                            Noche</div>
                          ) : ''
                        }
                        
                      </div>
                    )
                  }
              </form> 
          </div>
      </div>
    </>
  )
}
export default Numeros