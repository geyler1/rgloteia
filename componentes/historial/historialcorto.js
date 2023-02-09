const HistorialCorto = (props) => {
  return(
    <>
        <ul className="flex flex-col bg-white shadow p-3 rounded-xl overflow-hidden mx-3">
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <h3 className="text-2xl p-0 text-current font-semibold">Historial últimos 7 días.</h3> 
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3 text-center"><b>Fecha</b></div>
            <div className="w-1/3 text-center"><b>Mediodía</b></div>
            <div className="w-1/3 text-center"><b>Noche</b></div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3"><b>Mes/Día/Año</b></div>
            <div className="w-1/3 text-center"></div>
            <div className="w-1/3 text-center"></div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h7fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h7dia}</div>
            <div className="w-1/3 text-center">{props.datos.h7noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h6fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h6dia}</div>
            <div className="w-1/3 text-center">{props.datos.h6noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h5fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h5dia}</div>
            <div className="w-1/3 text-center">{props.datos.h5noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h4fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h4dia}</div>
            <div className="w-1/3 text-center">{props.datos.h4noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h3fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h3dia}</div>
            <div className="w-1/3 text-center">{props.datos.h3noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h2fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h2dia}</div>
            <div className="w-1/3 text-center">{props.datos.h2noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center">
            <div className="w-1/3">{props.datos.h1fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h1dia}</div>
            <div className="w-1/3 text-center">{props.datos.h1noche}</div>  
          </li>
        </ul>
    </>
  )
}
export default HistorialCorto;