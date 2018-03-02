import {TimelineLite, TweenLite} from 'gsap';

export default class Rippler {
// eslint-disable-next-line no-useless-constructor,no-empty-function
  constructor() {
    this.rippleContainer = document.getElementsByClassName('rippler-container')[0];
    this.timeline = null;
    this.init();
  }

  init() {
    this.setupRipplePrototype();
    this.bindUIActions();
  }

  setupRipplePrototype() {
    this.ripplePrototype = document.createElement('span');
    this.ripplePrototype.classList.add('ripple');
  }

  bindUIActions() {
    const triggerElements = document.querySelectorAll('a[data-ripple-trigger]');
    for (const element of triggerElements) {
      element.onclick = this.addRipple.bind(this);
    }
  }

  addRipple(e) {
    const _this = this;
    e.preventDefault();
    const ripple = this.ripplePrototype.cloneNode();
    const bodyWidth = document.body.offsetWidth;
    const bodyHeight = document.body.offsetHeight;
    const size = bodyWidth > bodyHeight ? bodyWidth : bodyHeight;
    ripple.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px; height: ${size}px; width: ${size}px;`);
    this.rippleContainer.appendChild(ripple);

    if (this.timeline === null) {
      this.timeline = new TimelineLite({
        onComplete: () => {
          // _this.clearRipples.apply(_this);
          window.location.href = e.target.getAttribute('href');
        },
      });
    }

    const tween = new TimelineLite();
    tween.fromTo(ripple, 0.5, {
      scale: 0,
      xPercent: -50,
      yPercent: -50,
    }, {
      scale: 2,
      xPercent: -50,
      yPercent: -50,
      ease: Power3.easeInOut,
    });
    // .to(ripple, 0.2, {
    //   opacity: 0,
    //   ease: Power3.easeInOut,
    // });
    this.timeline.add(tween);
  }

  clearRipples() {
    this.timeline = null;
    this.rippleContainer.innerHTML = '';
  }
}
