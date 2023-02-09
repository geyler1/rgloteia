const HistorialCorto = (props) => {
  return(
    <>
        <ul className="flex flex-col bg-white shadow p-3 rounded-xl overflow-hidden mx-3 my-6">
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <h3 className="text-2xl p-0 text-current font-semibold">Historial últimos 30 días.</h3> 
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
            <div className="w-1/3">{props.datos.h30fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h30dia}</div>
            <div className="w-1/3 text-center">{props.datos.h30noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h29fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h29dia}</div>
            <div className="w-1/3 text-center">{props.datos.h29noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h28fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h28dia}</div>
            <div className="w-1/3 text-center">{props.datos.h28noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h27fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h27dia}</div>
            <div className="w-1/3 text-center">{props.datos.h27noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h26fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h26dia}</div>
            <div className="w-1/3 text-center">{props.datos.h26noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h25fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h25dia}</div>
            <div className="w-1/3 text-center">{props.datos.h25noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h24fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h24dia}</div>
            <div className="w-1/3 text-center">{props.datos.h24noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h23fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h23dia}</div>
            <div className="w-1/3 text-center">{props.datos.h23noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h22fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h22dia}</div>
            <div className="w-1/3 text-center">{props.datos.h22noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h21fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h21dia}</div>
            <div className="w-1/3 text-center">{props.datos.h21noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h20fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h20dia}</div>
            <div className="w-1/3 text-center">{props.datos.h20noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h19fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h19dia}</div>
            <div className="w-1/3 text-center">{props.datos.h19noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h18fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h18dia}</div>
            <div className="w-1/3 text-center">{props.datos.h18noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h17fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h17dia}</div>
            <div className="w-1/3 text-center">{props.datos.h17noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h16fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h16dia}</div>
            <div className="w-1/3 text-center">{props.datos.h16noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h15fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h15dia}</div>
            <div className="w-1/3 text-center">{props.datos.h15noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h14fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h14dia}</div>
            <div className="w-1/3 text-center">{props.datos.h14noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h13fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h13dia}</div>
            <div className="w-1/3 text-center">{props.datos.h13noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h12fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h12dia}</div>
            <div className="w-1/3 text-center">{props.datos.h12noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h11fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h11dia}</div>
            <div className="w-1/3 text-center">{props.datos.h11noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h10fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h10dia}</div>
            <div className="w-1/3 text-center">{props.datos.h10noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h9fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h9dia}</div>
            <div className="w-1/3 text-center">{props.datos.h9noche}</div>  
          </li>
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h8fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h8dia}</div>
            <div className="w-1/3 text-center">{props.datos.h8noche}</div>  
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
          <li className="flex py-3 justify-between items-center border-b border-slate-200">
            <div className="w-1/3">{props.datos.h1fecha}</div>
            <div className="w-1/3 text-center">{props.datos.h1dia}</div>
            <div className="w-1/3 text-center">{props.datos.h1noche}</div>  
          </li>
        </ul>
    </>
  )
}
export default HistorialCorto;