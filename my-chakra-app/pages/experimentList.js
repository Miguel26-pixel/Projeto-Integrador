import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router'; 

export default function ExperimentList() {
  const router = useRouter();

    return (
      <div className={styles.expsorg}>
            <div><button className={styles.expbtn} onClick={() => router.push('/plantsList')}></button></div>
            <div><button className={styles.expbtn} onClick={() => router.push('/plantsList')}></button></div>
            <div><button className={styles.expbtn} onClick={() => router.push('/plantsList')}></button></div>
            <div><button className={styles.expbtn} onClick={() => router.push('/plantsList')}></button></div>
            <div><button className={styles.expbtn} onClick={() => router.push('/plantsList')}></button></div>
            <div><button className={styles.expbtn} onClick={() => router.push('/plantsList')}></button></div>
            <div><button className={styles.expbtn} onClick={() => router.push('/plantsList')}></button></div>
      </div>
    )
}