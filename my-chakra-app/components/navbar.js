import {motion} from 'framer-motion';
import { fadeInDown } from '../variants.ts';

const Header = () => {
    return  (
        <motion.nav variants={fadeInDown} className="header" initial="initial" animate="animate">
            <span className = "header-logo">GREENSTONE</span>
            <ul>
                <li>Experiments</li>
            </ul>
        </motion.nav>
    )
}

export default Header;