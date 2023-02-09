import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import HorasUTC from "datos/horasUTC";
const Ayuda = function (props) {
  var Horas = HorasUTC()
  return(
    <>
      <div className="flex flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
        <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold">
          ¿Qué es “R&G Loteria”?
        </h3>
        <p>
        “R&G Lotería” es un servicio gratuito que informa los resultados del juego de “La Bolita”,
         como se le conoce popularmente en Cuba.<br/>
         La web “R&G Lotería” contiene compras integradas para los que gusten de jugar a “La Bolita” en línea.
        </p>

        <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold mt-6">
          ¿En qué consiste el Juego de La Bolita?
        </h3>
        <p>El juego de “La Bolita” consiste en comprar un número para un sorteo y esperar el resultado
           del mismo, si el número que compró sale como ganador, la cantidad de fichas con la
            que compró el número, se multiplicará por 50 y estará en su saldo principal al instante.
             Mientras más números compre para cada sorteo más posibilidades tendrás de obtener el próximo
              número ganador.</p><br/>

        <p>Jugar a “La Bolita” es muy fácil. Es un juego en el cual juegas hoy y puedes recibir pagos hoy.
           Puede ganar un premio mayor de 50 fichas con una jugada directa de 1 ficha, y aumentar
            probabilidades de ganar comprando múltiples números para cada sorteo ¡Hay muchas opciones para probar!
             Simplemente seleccione sus números de la suerte y juegue a su manera cualquier día,
            dos veces al día. Los sorteos del mediodía y de la noche ofrecen dos oportunidades para jugar y ganar.
        </p>

        <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold mt-6">
          ¿Cómo Jugar?
        </h3>
        <p>
        Para jugar debe dirigirse a la "Sección de juego" desde el botón (Jugar en el menú), Aparece un listado
         de números donde podrá seleccionar 1 o más según desee. Al seleccionar un número para comprar le sale
          una ventana y dependiendo del horario le va a aparecer si tiene capacidad para el día o la noche o
           de forma independiente selecciona el botón del sorteo correspondiente, coloca la cantidad de fichas
            que jugara a su número y le da clic en el botón comprar número.
        </p>

        <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold mt-6">
          ¿Cómo recargar?
        </h3>
        <p>
        Para agregar fichas a su cuenta lo primero que tiene que hacer es ir a la tienda de fichas, puede acceder
         desde la barra de navegación, el botón con el signo (+), una vez en la tienda puedes escoger uno entre
          varios paquetes de fichas que hay disponibles.
        <br/>
        <br/>
        <span className="mr-2 text-xl text-yellow-500"><FontAwesomeIcon icon={faTriangleExclamation}/></span>
        Antes de confirmar el envío de saldo a la billetera de depósito cerciórese que haya enviado sus TRX correctamente
         desde la dirección de billetera personal agrego en su perfil, de no ser así existen posibilidades de que no se
          concrete la recarga. Para solucionar este error se contacta con soporte y se presentan las evidencias pertinentes
           del envío. Para así agregar sus fichas o devolverle el saldo.
        <br/>
        <br/>
        <span className="mr-2 text-xl text-yellow-500"><FontAwesomeIcon icon={faTriangleExclamation}/></span>
          Si solicitas una recarga de fichas sin transferir los TRX lo consideramos como intento de fraude.
        </p>

      <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold mt-6">
        ¿Cómo retirar?
      </h3>
      <p>
      Para retirar saldo hacia su billetera debe dirigirse hasta la sección (Retirar Saldo), una vez
       ahí puedes agregar la billetera a la que quieres que te enviemos los TRX o omitir esa parte y
        te enviaremos el saldo a la billetera que tienes guardada en tu perfil, luego escribes la cantidad
         que deseas retirar y haces clic en enviar la solicitud, El mínimo de retiro es de 50 Fichas.
      </p>

      <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold mt-6">
      ¿Cuánto demoran las recargas y los retiros?
      </h3>
      <p>
      Cuando usted solicita una recarga de fichas o un retiro suele demorar un par de minutos pero también puede demorar
       varias horas en completarse la solicitud, esto depende de varios factores como la cantidad de solicitudes
        que tengamos en el momento para procesar o la hora en que realizó la solicitud.
      </p>

      <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold mt-6">
      Transferencias internas
      </h3>
      <p>
      Usted y todos los usuarios pueden realizar transferencias internas entre sí, en el perfil aparece su ID,
       con este su amigo lo puede buscar en la sección de transferencias y enviarle todas las fichas que desee,
        el mínimo de transferencia es de 5 fichas y las comisiones son del 0%.
      </p>

      <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold mt-6">
        Métodos de pago
      </h3> 
      <p>
      En  “R&G Lotería” tenemos un método de pago por el momento, estamos usando el Tron (TRX) como moneda
       para realizar las compras de fichas, y cuando solicite un retiro le pagaremos a la billetera que desee en TRX.
      </p> 

      <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold mt-6">
      ¿Qué es la comisión de referido?
      </h3>
      <p>
        Cuando alguien a quien usted invitó realice su primera compra de fichas a usted le llegará automáticamente a su
         cuenta el 5% de las fichas que su referido compró.
      </p>

      <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold mt-6">
      ¿Cómo conseguir referidos?
      </h3>
      <p>En la sección de referido y también en su perfil tiene su enlace de referidos, puede enviarle ese enlace
         a todos los amigos que quiera invitar, cuando entren por ese enlace especial esas personas se convertirán
          en sus referidos, pero no quedarán reflejados en su listado de referidos hasta que no realicen su
           primera compra de fichas.
      </p>

      <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold mt-6">
      Datos que podría recopilar esta web y porque motivos
      </h3>
      <p>
      <b>Información personal</b><br/>
      Dirección de correo electrónico (Opcional), ID de usuario, Otra información.<br/>
      Funciones de la app, Estadísticas, Comunicaciones del desarrollador, Publicidad o marketing, Seguridad,
       cumplimiento y prevención de fraudes, Personalización y Administración de la cuenta.
      <br/>
      <br/>
      <b>Información financiera</b><br/>
      Historial de recargas y historial de retiros.
      <br/>
      <br/>
      <b>Historial de búsqueda en la app (Opcional), Otro contenido generado por usuarios (Opcional),
         Otras acciones (Opcional).</b><br/>
      Funciones de la app, Estadísticas y Seguridad, cumplimiento y prevención de fraudes.
      </p>

      <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold mt-6">
      Soy un Hacker
      </h3>
      <p>
      Entonces, ¿es usted un hacker? ¡Qué bien!<br/>
      En serio, nos encantan los hackers. ¡Por eso pensamos mucho en usted!<br/><br/>

      Los hackers tendrán atención especial por parte de nuestro sistema. Solo para usted, hemos implementado
       uno de los sistemas de protección anti-fraude más fuertes de la industria, para que tenga que esforzarse
        más en hacer trampas.<br/><br/>

      <span className="mr-2 text-xl text-yellow-500"><FontAwesomeIcon icon={faTriangleExclamation}/></span>
       Seremos avisados cuando intente hacer trampas, Si nuestro sistema descubre que es un hacker,
       éste responderá de forma poco amigable. No se preocupe, no habrá violencia... solo se le denegará el
        acceso a solicitar retiros.
      </p>


      </div>
      <div className="hidden flex-wrap flex-initial bg-white shadow p-3 mx-3 mt-6 mb-3 relative rounded-xl">
        <h3 className="text-2xl w-full text-current pb-2 m-0 font-semibold">

        </h3>
        <p>

        </p>
      </div>
      
    </>
  )
}
export default Ayuda;