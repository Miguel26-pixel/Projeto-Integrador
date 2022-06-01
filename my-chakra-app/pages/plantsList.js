import react from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';     


export default function PlantsList() {
    const router = useRouter();

    return <><div className={styles.container}>
            <Head>
                <title>GREENSTONE</title>
                <meta name="description" content="Plants app" />
                <link rel="icon" href="/plant.ico" />
            </Head>

            <div className={styles.main}>
                <h1 className={styles.title}>
                    <a onClick={() => router.push('/index')}>GREENSTONE</a>
                </h1>
            </div>
            <div>

                <div className={styles.plantsorg}>
                    <button className={styles.plantbtn} type="button" onClick={() => router.push('/card')}></button>
                    <button className={styles.plantbtn} type="button" onClick={() => router.push('/card')}></button>
                    <button className={styles.plantbtn} type="button" onClick={() => router.push('/card')}></button>      
                    <button className={styles.plantbtn} type="button" onClick={() => router.push('/card')}></button>
                    <button className={styles.plantbtn} type="button" onClick={() => router.push('/card')}></button>
                    <button className={styles.plantbtn} type="button" onClick={() => router.push('/card')}></button>
                    <button className={styles.plantbtn} type="button" onClick={() => router.push('/card')}></button>
            </div>

        </div>
  
      </div></>
        
  }