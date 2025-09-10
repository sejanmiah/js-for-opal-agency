// custom-scripts.js

gsap.registerPlugin(ScrollTrigger);

// Letter splitting function
function splitLetters(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    const letters = el.innerText.split("");
    el.innerHTML = letters
      .map((letter) => {
        if (letter === " ") return "&nbsp;";
        return `<span class="letter inline-block opacity-0">${letter}</span>`;
      })
      .join("");
  });
}
splitLetters(".heading-animate");

// Letter animation
gsap.utils.toArray(".heading-animate").forEach((heading) => {
  gsap.fromTo(
    heading.querySelectorAll(".letter"),
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
      },
    }
  );
});

// Subheading animation
gsap.utils.toArray(".subheading-animate").forEach((heading) => {
  gsap.fromTo(
    heading,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.5,
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
      },
    }
  );
});

// Border heading
gsap.utils.toArray(".border-heading").forEach((heading) => {
  gsap.from(heading, {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: heading,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
});

// Slick slider
$(document).ready(function () {
  var $slider = $(".slider_slick_custom");

  $slider.slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 600,
    arrows: false,
    dots: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });

  let scrollModes = [1, 3, 2, 1];
  let index = 0;

  setInterval(function () {
    index = (index + 1) % scrollModes.length;
    $slider.slick("slickSetOption", "slidesToScroll", scrollModes[index], true);
  }, 6000);
});

// Menu toggle
const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const hamburger = document.getElementById("hamburger");
const closeIcon = document.getElementById("close");

toggleBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  hamburger.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

// Cursor circle
const cursor = document.querySelector(".cursor-circle");
document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  cursor.style.transform = `translate(${x}px, ${y}px)`;
});

// Header background on scroll
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("bg-black/90", "backdrop-blur-md");
    header.classList.remove("bg-transparent");
  } else {
    header.classList.add("bg-transparent");
    header.classList.remove("bg-black/90", "backdrop-blur-md");
  }
});

// Page transition
window.addEventListener("load", () => {
  let tl = gsap.timeline({
    onComplete:
