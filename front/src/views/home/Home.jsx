import rodizioCarnes from "../../assets/rodizio-carne.jpg"
import reservas from "../../assets/reserva.jpg"
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.homeContainer}>
      <section >
        <img src={rodizioCarnes} alt="" />
        <div>
          <h2>Mi Tierra</h2>
          <p>Mi Tierra es un concepto diferente y sinónimo de calidad en gastronomía, además de la más cordial atenciónRestaurante Especializado en Carnes a la Parrilla y Servicio de Buffet.
          </p>
        </div>
      </section>
      <section >
        <img src={reservas} alt="" />
        <div>
          <h2>Realializa tus reservas</h2>
          <p> Para poder gozar de nuestra atención, realiza tu reserva con anticipación.
          </p>
        </div>
      </section>
      
    </main>
  )
}

export default Home;