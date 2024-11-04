import about from "../../assets/about.jpg"
import styles from "./About.module.css";
const Home = () => {
    return (
      <main className={styles.aboutContainer}>
        <h2>Acerca de Nosotros</h2>
        <section>
          <div>
            <h3>LA COMIDA NO ES SOLO OBTENER ENERGÍA, ES VIVIR UNA EXPERIENCIA
            </h3>
            <p>Mi Tierra nace como la primera cadena de restaurantes de carnes brindando la más fina selección de carnes asadas y servidas en espadas, acompañados de un variado buffet, así como bebidas y vinos nacionales e internacionales. <br />El éxito de Rodizio proviene del servicio de alta calidad , exquisitas y diversas carnes , excelentes platos criollos, pastas, ensaladas , guarniciones y una deleitable piña asada además de un agradable ambiente. Cada día nos encontramos en la búsqueda de la excelencia para nuestros clientes que nos vienen acompañando desde hace 18 años.
            </p>
          </div>
          <img src={about} alt="" />
        </section>
      </main>
    )
  }
  
  export default Home;