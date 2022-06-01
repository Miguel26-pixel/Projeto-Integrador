import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router'; 
import ExpList from './experimentList.js';    

export default function Home() {
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
          <a type='button' onClick={() => router.push('/')}>GREENSTONE</a>
        </h1>
      </div>
      <div>
        <ExpList />
      </div>

    </div>
  )
}
