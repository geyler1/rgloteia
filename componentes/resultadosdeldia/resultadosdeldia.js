const Resultadosdeldia = (props) => {
  return(
    <div className="w-full px-3 py-5 flex justify-center bg-white rounded-xl overflow-hidden flex-wrap shadow mx-3">
        <h3 className="text-2xl text-current font-bold m-0 pb-5 w-full text-center">Resultados de los sorteos</h3>
        
        <div className="text-center w-full pb-3 border-b-2 border-slate-100">
          <span className="text-2xl text-current font-semibold m-0 pb-3">Mediodía</span>
          <div className="text-slate-700 text-base mb-3 ">{props.datos[0]}</div>
          <div className="flex justify-center items-center">
            <span className="flex justify-center items-center rounded-full w-12 h-12 text-3xl font-bold text-white bolita m-1">
              {props.datos[2][0].mediodia.slice(0,1)}
            </span>
            <span className="flex justify-center items-center rounded-full w-12 h-12 text-3xl font-bold text-white bolita m-1">
              {props.datos[2][0].mediodia.slice(1,2)}
            </span>
          </div>
        </div>

        <div className="text-center pt-3 w-full">
          <span className="text-2xl text-current m-0 font-semibold pb-3">Noche</span>
          <div className="text-slate-700 text-base mb-3">{props.datos[1]}</div>
          <div className="flex justify-center items-center">
            <span className="flex justify-center items-center rounded-full w-12 h-12 text-3xl font-bold text-white bolita m-1">
              {props.datos[2][0].noche.slice(0,1)}
            </span>
            <span className="flex justify-center items-center rounded-full w-12 h-12 text-3xl font-bold text-white bolita m-1">
              {props.datos[2][0].noche.slice(1,2)}
            </span>
          </div>
        </div>

    </div>
  )
}
export default Resultadosdeldia;