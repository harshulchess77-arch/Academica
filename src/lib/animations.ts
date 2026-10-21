import anime from 'animejs';
import { useAccessibilityStore } from '../store';

// Respect reduced motion preference
const shouldAnimate = (): boolean => {
  const reduceMotion = useAccessibilityStore.getState().reduceMotion;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return !reduceMotion && !prefersReducedMotion;
};

// Emblem entrance animation (flame flicker + circuit trace draw-on)
export const createEmblemEntrance = (element: HTMLElement): anime.AnimeInstance | null => {
  if (!shouldAnimate()) return null;

  const tl = anime.timeline({
    targets: element,
    easing: 'easeOutExpo',
    duration: 1000,
  });

  // Draw circuit traces
  tl.add({
    targets: '.circuit-trace',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: anime.stagger(100),
  });

  // Flame flicker effect
  tl.add(
    {
      targets: '.flame',
      opacity: [0.8, 1, 0.9, 1],
      duration: 200,
      easing: 'easeInOutQuad',
      loop: 3,
    },
    '-=1200'
  );

  // Scale in the book
  tl.add(
    {
      targets: '.book',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutBack',
    },
    '-=1000'
  );

  return tl;
};

// Skill node unlock pulse cascade
export const createSkillNodeUnlock = (element: HTMLElement): anime.AnimeInstance | null => {
  if (!shouldAnimate()) return null;

  return anime({
    targets: element,
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
    boxShadow: [
      '0 0 0 rgba(255, 193, 7, 0)',
      '0 0 20px rgba(255, 193, 7, 0.8)',
      '0 0 0 rgba(255, 193, 7, 0)',
    ],
    duration: 600,
    easing: 'easeOutElastic(1, .8)',
  });
};

// Digit flip animation for countdown
export const createDigitFlip = (
  element: HTMLElement,
  from: number,
  to: number
): anime.AnimeInstance | null => {
  if (!shouldAnimate()) {
    element.textContent = String(to);
    return null;
  }

  return anime({
    targets: element,
    innerHTML: [from, to],
    round: 1,
    duration: 500,
    easing: 'easeOutQuad',
  });
};

// Spotlight movement easing between walkthrough targets
export const createSpotlightMove = (
  fromRect: DOMRect,
  toRect: DOMRect,
  element: HTMLElement
): anime.AnimeInstance | null => {
  if (!shouldAnimate()) return null;

  return anime({
    targets: element,
    left: [fromRect.left, toRect.left],
    top: [fromRect.top, toRect.top],
    width: [fromRect.width, toRect.width],
    height: [fromRect.height, toRect.height],
    duration: 400,
    easing: 'easeInOutCubic',
  });
};

// Confetti-like celebration burst
export const createCelebrationBurst = (element: HTMLElement): anime.AnimeInstance | null => {
  if (!shouldAnimate()) return null;

  const particles = Array.from({ length: 20 }, () => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background: ${['#FFC107', '#6200EA', '#00BFA5', '#1A237E'][Math.floor(Math.random() * 4)]};
      border-radius: 50%;
      left: 50%;
      top: 50%;
    `;
    element.appendChild(el);
    return el;
  });

  const tl = anime.timeline({
    complete: () => {
      particles.forEach((p) => p.remove());
    },
  });

  tl.add({
    targets: particles,
    translateX: () => anime.random(-100, 100),
    translateY: () => anime.random(-100, 100),
    scale: [1, 0],
    opacity: [1, 0],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: anime.stagger(20),
  });

  return tl;
};

// Progress bar fill animation
export const createProgressFill = (element: HTMLElement, from: number, to: number): anime.AnimeInstance | null => {
  if (!shouldAnimate()) {
    element.style.width = `${to}%`;
    return null;
  }

  return anime({
    targets: element,
    width: [`${from}%`, `${to}%`],
    duration: 800,
    easing: 'easeOutCubic',
  });
};

// Staggered list reveal
export const createStaggeredReveal = (elements: HTMLElement[]): anime.AnimeInstance | null => {
  if (!shouldAnimate()) return null;

  return anime({
    targets: elements,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 400,
    easing: 'easeOutQuad',
    delay: anime.stagger(50),
  });
};

// XP counter animation
export const createXPCounter = (element: HTMLElement, from: number, to: number): anime.AnimeInstance | null => {
  if (!shouldAnimate()) {
    element.textContent = String(to);
    return null;
  }

  return anime({
    targets: element,
    innerHTML: [from, to],
    round: 1,
    duration: 1500,
    easing: 'easeOutExpo',
  });
};

// Level up flash
export const createLevelUpFlash = (element: HTMLElement): anime.AnimeInstance | null => {
  if (!shouldAnimate()) return null;

  return anime({
    targets: element,
    scale: [1, 1.5, 1],
    opacity: [1, 0.5, 1],
    filter: ['brightness(1)', 'brightness(2)', 'brightness(1)'],
    duration: 600,
    easing: 'easeOutElastic(1, .8)',
  });
};
