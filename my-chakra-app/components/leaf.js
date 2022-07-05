import Image from 'next/image';
import { motion } from "framer-motion";
import { leafWrapper, leaf } from "../variants.ts";

const Leaf = ({className, imageUrl}) => {

    return (
        <motion.div variants={leafWrapper} className={className}>
            <Image src={imageUrl} className="leaf"/>
        </motion.div>
    );
};

export default Leaf;