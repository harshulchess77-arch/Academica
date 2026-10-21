import anime from 'animejs'
import { accessibilityStore } from '@/store'

export function createEmblemEntrance() {
  if (accessibilityStore.getState().reduceMotion) {
    return { play: () => {}, finished: Promise.resolve() }
  }

  const timeline = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1000,
  })

  timeline
    .add({
      targets: '.emblem-book',
      opacity: [0, 1],
      scale: [0.8, 1],
      rotateY: [-90, 0],
    })
    .add(
      {
        targets: '.emblem-circuit',
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
      },
      '-=600'
    )
    .add(
      {
        targets: '.emblem-flame',
        opacity: [0, 1],
        scale: [0.5, 1],
        translateY: [20, 0],
      },
      '-=400'
    )
    .add(
      {
        targets: '.emblem-flame',
        scale: [
          { value: 1.1, duration: 200 },
          { value: 1, duration: 200 },
        ],
        repeat: 2,
      },
      '-=800'
    )

  return timeline
}

export function createSkillNodeUnlock(targetEl: HTMLElement) {
  if (accessibilityStore.getState().reduceMotion) {
    targetEl.style.opacity = '1'
    return { play: () => {}, finished: Promise.resolve() }
  }

  return anime({
    targets: targetEl,
    scale: [0.8, 1.2, 1],
    opacity: [0.5, 1],
    boxShadow: [
      '0 0 0 rgba(0, 191, 165, 0)',
      '0 0 20px rgba(0, 191, 165, 0.5)',
      '0 0 0 rgba(0, 191, 165, 0)',
    ],
    duration: 600,
    easing: 'easeOutElastic(1, .8)',
  })
}

export function createDigitFlip(
  el: HTMLElement,
  from: number,
  to: number
) {
  if (accessibilityStore.getState().reduceMotion) {
    el.textContent = to.toString()
    return { play: () => {}, finished: Promise.resolve() }
  }

  return anime({
    targets: el,
    innerHTML: [from, to],
    round: 1,
    easing: 'easeInOutQuad',
    duration: 500,
  })
}

export function createSpotlightMove(
  fromRect: DOMRect,
  toRect: DOMRect
) {
  if (accessibilityStore.getState().reduceMotion) {
    return { play: () => {}, finished: Promise.resolve() }
  }

  const deltaX = toRect.left - fromRect.left + (toRect.width - fromRect.width) / 2
  const deltaY = toRect.top - fromRect.top + (toRect.height - fromRect.height) / 2

  return anime({
    targets: '.spotlight-overlay',
    translateX: deltaX,
    translateY: deltaY,
    width: [fromRect.width, toRect.width],
    height: [fromRect.height, toRect.height],
    duration: 500,
    easing: 'easeInOutCubic',
  })
}

export function createConfettiBurst(x: number, y: number) {
  if (accessibilityStore.getState().reduceMotion) {
    return
  }

  const particleCount = 50
  const colors = ['#FFC107', '#6200EA', '#00BFA5', '#1A237E']

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 9999;
      border-radius: 2px;
    `
    document.body.appendChild(particle)

    const angle = (Math.PI * 2 * i) / particleCount
    const velocity = 100 + Math.random() * 100
    const tx = Math.cos(angle) * velocity
    const ty = Math.sin(angle) * velocity

    anime({
      targets: particle,
      translateX: tx,
      translateY: ty,
      opacity: [1, 0],
      rotate: [0, 720],
      duration: 1000 + Math.random() * 500,
      easing: 'easeOutExpo',
      complete: () => particle.remove(),
    })
  }
}
