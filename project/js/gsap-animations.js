// Custom GSAP animation Library
// https://surferseo.webflow.io/design-system/gsap-animations

// Surfer
// const SurferEase = CustomEase.create("custom", "M0,0 C0,0 0,1 1,1 ");
// Apple
const SurferEase = CustomEase.create(
  "custom",
  "M0,0 C0.3,0 0.2,0.1 0.3,0.3 0.5,1 0.5,1 1,1 "
);

const animationConfig = {
  slideUp: {
    selector: "[animation-slide-up]",
    options: {
      opacity: 0,
      y: "50%",
      ease: SurferEase,
    },
  },
  slideDown: {
    selector: "[animation-slide-down]",
    options: {
      opacity: 0,
      y: "-50%",
      ease: SurferEase,
    },
  },
  slideLeft: {
    selector: "[animation-slide-left]",
    options: {
      opacity: 0,
      x: "25%",
      ease: SurferEase,
    },
  },
  slideRight: {
    selector: "[animation-slide-right]",
    options: {
      opacity: 0,
      x: "-25%",
      ease: SurferEase,
    },
  },
  fadeIn: {
    selector: "[animation-fade-in]",
    options: {
      opacity: 0,
      ease: SurferEase,
    },
  },
  scaleIn: {
    selector: "[animation-scale-in]",
    options: {
      opacity: 0,
      scale: 1.5,
      ease: SurferEase,
    },
  },
  defaultOptions: {
    duration: 1,
    delay: 0,
  },
};

function animateElements() {
  const animationWraps = document.querySelectorAll("[animation-wrap]");

  animationWraps.forEach((animationWrap) => {
    const animations = Object.keys(animationConfig);
    const isDebug = animationWrap.getAttribute("animation-wrap") === "debbug"; // Check if the "debbug" attribute is set

    animations.forEach((animation) => {
      const elementsToAnimate = animationWrap.querySelectorAll(
        animationConfig[animation].selector
      );

      if (elementsToAnimate.length > 0) {
        const timeline = gsap.timeline({ paused: true });
        let animationOrder = [...elementsToAnimate];

        if (animationWrap.hasAttribute("animation-random")) {
          animationOrder = shuffleArray(animationOrder);
        }

        const staggerAttr = animationWrap.getAttribute("animation-stagger");
        let animationStagger = staggerAttr ? parseFloat(staggerAttr) : 0.1;

        const animationDuration =
          animationWrap.getAttribute("animation-duration") ||
          animationConfig.defaultOptions.duration;
        const animationDelay =
          animationWrap.getAttribute("animation-delay") ||
          animationConfig.defaultOptions.delay;

        timeline.from(animationOrder, {
          ...animationConfig[animation].options,
          duration: animationDuration,
          delay: animationDelay,
          stagger: animationStagger,
        });

        createScrollTrigger(animationWrap, timeline, isDebug);
      }
    });
  });
}

function createScrollTrigger(triggerElement, timeline, isDebug) {
  const hasScrub = triggerElement.hasAttribute("animation-scrub");
  const animationStart =
    triggerElement.getAttribute("animation-start") || "top 60%";
  const animationEnd =
    triggerElement.getAttribute("animation-end") || "bottom 40%";

  if (hasScrub) {
    ScrollTrigger.create({
      animation: timeline,
      trigger: triggerElement,
      start: animationStart,
      end: animationEnd,
      scrub: true,
      markers: isDebug,
    });
  } else {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: animationStart,
      onEnter: () => timeline.play(),
      markers: isDebug,
    });
  }
}

function shuffleArray(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

window.addEventListener("DOMContentLoaded", (event) => {
  if (window.innerWidth > 991) {
    animateElements();
  }
});
