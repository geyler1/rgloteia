const BolaBoton = function (props) {

  return(
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

                  <div className="w-full rounded-full py-2 px-5 cursor-pointer font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white text-center"
                   onClick={() => paso2(precio, 'TRX', 'TRX')}>
                    <span>{precio + ' '}</span> TRX
                  </div>

                  <div className="w-full rounded-full mt-5 py-2 px-5 cursor-pointer font-semibold bg-slate-700 hover:bg-slate-900 transition-colors text-white text-center"
                   onClick={() => paso2(precioCUP, 'CUP', 'CUP')}>
                    <span>{precioCUP + ' '}</span> CUP
                  </div>
                  
                  {/*
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
                  </div
                  */}
                  
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
                    Total en {codeAPagar}
                  </div>
                  <div>
                    {aPagar}
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
  )
}
export default BolaBoton;