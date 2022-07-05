import Leaf from "./leaf";
import img1 from '../public/leaf01.png';
import img2 from '../public/leaf02.png';
import img3 from '../public/leaf03.png';
import img4 from '../public/leaf04.png';
import img5 from '../public/leaf05.png';
import { motion } from "framer-motion";
import { leavesContainer } from "../variants.ts";


const LeavesC = () => {
    return (
        <motion.div variants={leavesContainer} initial="initial" animate="animate">
            <Leaf className="leafWrapper-1" imageUrl={img1} />

            <Leaf className="leafWrapper-2" imageUrl={img2} />

            <Leaf className="leafWrapper-4" imageUrl={img4} />

            <Leaf className="leafWrapper-5" imageUrl={img5} />
        </motion.div>
    );
};

export default LeavesC;