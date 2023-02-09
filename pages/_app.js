import '../styles/globals.css'
import '../styles/header.css'
import '../styles/main.css'
import '../styles/footer.css'
import '../styles/cardresultados.css'
import '../styles/perfil.css'
import '../styles/recargar.css'
import '../styles/referidos.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import NextNProgress from "nextjs-progressbar";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress 
      color="#ffbd00"
      />
      <Component {...pageProps}/>
    </>
  )
}

export default MyApp
