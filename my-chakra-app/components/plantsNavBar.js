import * as React from 'react';
import {motion} from 'framer-motion';
import { fadeInDown } from '../variants.ts';
import { useRouter } from 'next/router';
import { fetcher } from '../pages/api/fetcher';
import { useEffect } from 'react';


const PHeader = () => {
    const router = useRouter();
    const [plant, setPlant] = React.useState(null);
    const { id } = router.query;

    // useEffect(() => {
    //     async function fetchData() {
    //         if (id === undefined) return;

    //         let plant = await fetcher(window.location.origin + "/api/plant/" + id + "/index");


    //         console.log(plant);
    //         console.log("ola");

    //     }

    //     fetchData();
    // }, [id])
    return  (
        <motion.nav variants={fadeInDown} className="header" initial="initial" animate="animate">
            <span className = "header-logo" onClick={() => router.push('/')}>GREENSTONE</span>
            <ul>
                <li onClick={() => router.push('/experimentsList')}>Experiments</li>
            </ul>
            <ul>
                <li onClick={() => history.back()}>Plants</li>
                {console.log(id)}
            </ul>
        </motion.nav>
    )
}

export default PHeader;