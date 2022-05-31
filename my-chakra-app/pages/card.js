import styles from '../styles/Home.module.css';

export default function Card() {
    return (
            <div className={styles.grid}>

            <div className={styles.description}>
            [Nome da planta]
            </div>

            <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Documentation about the plant</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Data Coming &rarr;</h2>
            <p>Current dashboard</p>
            </a>

            </div>
    )
  }