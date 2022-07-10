import {motion} from "framer-motion";
import { fadeInUp, staggerContainer } from "../variants.ts";
import { useRouter } from 'next/router';

const TextC = () => {
    const router = useRouter();
    return (
        <motion.div className="textContainer" variants={staggerContainer} initial="initial" animate="animate">
            <div className="textContainer-top">
                <motion.span variants={fadeInUp} className="text-green-600">See your plant data here</motion.span>            </div>

            <motion.div variants={fadeInUp} initial="initial" animate="animate"
            className="textContainer-middle">
                <span>GREENSTONE</span>
            </motion.div>

            <div className="textContainer-bottom">
                <motion.button variants={fadeInUp} onClick={() => router.push('/experimentsList')}>show all the experiments</motion.button>
                <motion.p variants={fadeInUp}>
                    A new way to see the <span> life </span> <br /> of your plants!
                </motion.p>

            </div>
        </motion.div>
    )
}

export default TextC;