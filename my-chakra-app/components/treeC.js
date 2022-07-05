import Image from 'next/image';
import img from '../public/tree-removebg-preview.png';
import {motion} from 'framer-motion';
import { treeWrapper } from '../variants.ts';

const TreeC = () => {
    return (
        <motion.div variants={treeWrapper} initial="initial" animate="animate" className="bottleWrapper">
            <Image src={img} className='bottle'/>
        </motion.div>
    );
};

export default TreeC;