import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Card() {
        const router = useRouter();

    return (

        <div className={styles.container}>
        <Head>
                <title>GREENSTONE</title>
                <meta name="description" content="Plants app" />
                <link rel="icon" href="/plant.ico" />
        </Head>

        <div className={styles.main}>
                <h1 className={styles.title}>
                <a onClick={() => router.push('/')}>GREENSTONE</a>
                </h1>
        </div>
        <div>
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
        </div>

        </div>
        
    )
  }