import Head from 'next/head';
import styles from '../styles/Home.module.css';
import react from 'react';
import Card from './card.js'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>GREENSTONE</title>
        <meta name="description" content="Plants app" />
        <link rel="icon" href="/plant.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          GREENSTONE
        </h1>

        <Card />
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
