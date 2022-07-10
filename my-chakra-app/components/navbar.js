import {motion} from 'framer-motion';
import { fadeInDown } from '../variants.ts';
import { useRouter } from 'next/router';

const Header = () => {
    const router = useRouter();
    return  (
        <motion.nav variants={fadeInDown} className="header" initial="initial" animate="animate">
            <span className = "header-logo cursor-pointer" onClick={() => router.push('/')}>GREENSTONE</span>
            <ul>
                <li className="cursor-pointer" onClick={() => router.push('/experimentsList')}>Experiments</li>
            </ul>
        </motion.nav>
    )
}

export default Header;