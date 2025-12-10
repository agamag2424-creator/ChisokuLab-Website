import { Variants } from "framer-motion";

/**
 * Zen-AI Animation Variants for ChisokuLab
 * Calm, purposeful animations that enhance without distracting
 */

export const zenVariants = {
  /**
   * Fade in and slide up animation
   */
  fadeInUp: {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
      },
    },
  } as Variants,

  /**
   * Subtle breathing animation for CTAs and important elements
   */
  breathe: {
    initial: {
      scale: 1,
    },
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  } as Variants,

  /**
   * Container for staggering child animations
   */
  staggerContainer: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as Variants,

  /**
   * Stagger child variant (used with staggerContainer)
   */
  staggerChild: {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as Variants,

  /**
   * Enso (circle) completion loader animation
   */
  ensoComplete: {
    initial: {
      pathLength: 0,
      opacity: 0,
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  } as Variants,

  /**
   * Slide in from right (for mobile menu)
   */
  slideInRight: {
    initial: {
      x: "100%",
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as Variants,

  /**
   * Fade transition for tabs/content switching
   */
  fadeTransition: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  } as Variants,
};

