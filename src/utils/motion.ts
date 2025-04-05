export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
      when: 'beforeChildren',
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
      when: 'afterChildren',
      duration: 0,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 350,
      damping: 25,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      delay: 0.05,
    },
  },
};

export const dividerVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
      delay: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scaleX: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const formVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.05,
      delayChildren: 0.05,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
      staggerChildren: 0.04,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
};

export const formItemVariants = {
  hidden: { opacity: 0, y: 8, x: 0 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 450,
      damping: 28,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
};

export const buttonGroupVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 450,
      damping: 28,
      mass: 0.8,
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.12,
      ease: 'easeInOut',
    },
  },
};

export const emptyWrapperVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const emptyTextVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const emptyButtonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const noResultWrapperVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const noResultTextVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};

export const noResultButtonVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};
