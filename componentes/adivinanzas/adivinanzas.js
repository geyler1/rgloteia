const Adivinanzas = (props) => {
  return(
    <>
    {
      props ? (
        <div className="contenedor-adivinanzas-del-dia">
          <h3>Probabilidad y Adivinanzas</h3>
            {props?.datos[0]?.acertijonoche == '' ? (<div className="acertijo">
            {props?.datos[0]?.acertijodia ? (<div className="acertijo-texto">{props?.datos[0]?.acertijodia}</div>) : ''}
          </div>) : ''}
          <div className="acertijo">{props?.datos[0]?.acertijonoche ? (<div className="acertijo-texto">{props?.datos[0]?.acertijonoche}</div>) : ''}</div>
          <div className="probabilidad">{props?.datos[0]?.provavilidad}</div>
          <div className="palabrasclave">{props?.datos[0]?.palabrasclave}</div>
          <br/>
          <div className="palabrasclave">{props?.datos[0]?.salieron}</div>
          <br/>
          <div className="palabrasclave">{props?.datos[0]?.nosalieron}</div>
        </div>
      ) : ''
    }
    </>
  )
}
export default Adivinanzas;