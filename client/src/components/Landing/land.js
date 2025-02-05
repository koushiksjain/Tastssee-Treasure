import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import SplitType from "split-type";
import { CSSRulePlugin } from "gsap/CSSRulePlugin"; // Ensure CSSRulePlugin is imported

gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

export function locomotiveScroll() {
  console.log('Locomotive Scroll initialized');
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

export function loaderAnimation() {
  console.log('Loader Animation initialized');
  const loaderTl = gsap.timeline();
  loaderTl.to(".loaderBg-item", { 
      duration: 1,
      transform: "translateY(-130%)",
      ease: "power1.out",
      stagger: 0.2,
  })
  .then(() => {
      document.querySelector(".loaderAnimate-contain").style.display = "none";
  });
}

export function navBarAnimation() {
  console.log('Navbar Scroll initialized');
  gsap.from('.navbar .logo, .navbar .navbar-right-cntnt', {
    opacity: 0,
    y: -100,
    duration: 1,
    stagger: 0.4,
    delay: 1.5,
  });
}

export function miniInteractElem() {
  console.log('MiniInteraction Scroll initialized');
  const absRightImg_Elem = gsap.utils.toArray(".abs-img-right");
  absRightImg_Elem.forEach(element => {
    gsap.from(element, {
      opacity: 0,
      x: "100px",
      duration: 1,
      ease: 'power1.inOut',
      stagger: 0.5,
      scrollTrigger: {
        trigger: element,
        scroller: "#main",
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
      }
    });
  });

  const absLeftImg_Elem = gsap.utils.toArray(".abs-img-left");
  absLeftImg_Elem.forEach(element => {
    gsap.from(element, {
      opacity: 0,
      x: "-100px",
      duration: 1,
      ease: 'power1.inOut',
      stagger: 0.5,
      scrollTrigger: {
        trigger: element,
        scroller: "#main",
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
      }
    });
  });
}

// Header Section Animation
export function headerSectionAnimation() {
  console.log('Header Scroll initialized');
  let headerSecTl = gsap.timeline();
  let activeItemIndicator = CSSRulePlugin.getRule(".bodyImg::after");
  headerSecTl.from(".bodyText", {
    opacity: 0,
    y: 100,
    duration: 2,
    ease: "power1.out",
  });
  headerSecTl.to(activeItemIndicator, {
    width: "0%",
    duration: 1,
});
}

// Text Slider Animation
export function textSliderAnimation() {
  console.log('TextSlider Scroll initialized');
  gsap.to(".text-slide-contain", {
    x: "-30%",
    duration: 1,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".text-slide-contain",
      scroller: "#main",
      start: "top 90%",
      end: "top 0%",
      scrub: 2,
    },
  });
}

// Featured Section Animation
export function featuredAnimate() {
  console.log('Featured Scroll initialized');
  const featuredElem = gsap.utils.toArray(".hghlt-text");
  featuredElem.forEach((element) => {
    gsap.from(element, {
      y: "100%",
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: element,
        scroller: "#main",
        start: "top 90%",
        end: "top 50%",
      },
    });
  });
}


// Exclusive Deals Animation
export function exclusiveDealsAnimate() {
  console.log('Exclusive Scroll initialized');
  let exDeal_HeadSplit = new SplitType(".deal-cntnt-head", {
    type: "words, chars, lines",
    linesClass: "split-line",
  });

  gsap.from(exDeal_HeadSplit.lines, {
    y: "-100%",
    opacity: 0,
    duration: 1,
    ease: "power3.inOut",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".deal-cntnt-head",
      scroller: "#main",
      start: "top 70%",
      end: "top 20%",
    },
  });

  let exDeal_DesSplit = new SplitType(".deal-cntnt-des", {
    type: "words, chars, lines",
    linesClass: "split-line",
  });

  gsap.from(exDeal_DesSplit.lines, {
    y: "100%",
    opacity: 0,
    duration: 1,
    ease: "power3.inOut",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".deal-cntnt-des",
      scroller: "#main",
      start: "top 70%",
      end: "top 20%",
    },
  });
  let activeItemIndicator = CSSRulePlugin.getRule(".deal-sec-img::after");
        gsap.to(activeItemIndicator, {
            width: "0%",
            duration: 1,
            ease: 'power3.inOut',
            scrollTrigger:{
                trigger: ".deal-sec-img",
                scroller: "#main",
                start: 'top 70%',
                end: "top 20%",
            }
        });
}


// What's Inside Animation
export function whatInsideAnimate() {
  console.log('WhatInside Scroll initialized');
  gsap.from(".what-inside-main-img", {
    scale: 0.5,
    duration: 1,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".what-inside-main-img",
      scroller: "#main",
      start: "top 80%",
      end: "top 50%",
    },
  });

  const rightLayer = gsap.utils.toArray(".layer-right-cntnt");
  rightLayer.forEach((element) => {
    gsap.from(element, {
      x: "100px",
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: element,
        scroller: "#main",
        start: "top 80%",
        end: "top 50%",
      },
    });
  });

  const leftLayer = gsap.utils.toArray(".layer-left-cntnt");
  leftLayer.forEach((element) => {
    gsap.from(element, {
      x: "-100px",
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: element,
        scroller: "#main",
        start: "top 80%",
        end: "top 50%",
      },
    });
  });
}

// Footer Animation
export function footerAnimate() {
  console.log('Footer Scroll initialized');
  gsap.from(".footer-cntnt-contain", {
    scale: 1.1,
    duration: 1,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".footer-cntnt-contain",
      scroller: "#main",
      start: "top 90%",
      end: "top 40%",
      scrub: 2,
    },
  });
}
