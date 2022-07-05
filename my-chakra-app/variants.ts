import {Variants} from "framer-motion";

export const fadeInUp: Variants = {
    initial: {
        y: 40,
        opacity: 0,
    },

    animate: {
        y: 0,
        opacity: 1,

        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

export const fadeInDown: Variants = {
    initial: {
        y: -60,
        opacity: 0,
    },

    animate: {
        y: 0,
        opacity: 1,

        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren:0.5,
            delayChildren:0.7,
        },
    },
};

export const treeWrapper: Variants = {
    initial: {
        y: -1000,
    },
    animate: {
        y: 0,
        transition: {
            type: "spring",
        },
    },
};

export const tree: Variants = {
    initial: {},
    animate: {
        y:[30,0,30],
        transition: {
            duration: 1.6,
            ease: "linear",
            repeat: Infinity,
        },
    },
};

export const leaf: Variants = {
    initial: {
        x: 0,
    },
    animate: (i: number) => ({
        x: [20, 0, 20],
        transition: {
        delay: 2,
        duration: 1,
        ease: "linear",
        repeat: Infinity,
        },
    }),
};

export const leavesContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            delayChildren: 3,
            staggerChildren: 0.2,
        },
    },
};

export const leafWrapper: Variants = {
    initial: {
      y: -900,
    },
    animate: {
      y: 0,
      transition: {
        duration: 0.4,
        type: "spring",
      },
    },
  };