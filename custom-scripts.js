      gsap.registerPlugin(ScrollTrigger);

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

      // Apply letter splitting
      splitLetters(".heading-animate");

      // Animate letters
      gsap.utils.toArray(".heading-animate").forEach((heading) => {
        gsap.fromTo(
          heading.querySelectorAll(".letter"),
          { opacity: 0, x: 50 }, // start from right
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.05, // letters stagger one by one
            scrollTrigger: {
              trigger: heading,
              start: "top 80%",
            },
          }
        );
      });

      gsap.utils.toArray(".subheading-animate").forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.5,
            ease: "power1.inOut",
            yoyo: true, // fade in then fade out
            repeat: -1, // infinite loop
            repeatDelay: 0.5, // small delay between fades
            scrollTrigger: {
              trigger: heading,
              start: "top 80%",
            },
          }
        );
      });


      // Border heading animation
gsap.utils.toArray(".border-heading").forEach((heading) => {
  gsap.from(heading, {
    y: 100,         // নিচ থেকে আসবে
    opacity: 0,     // ফেড ইন হবে
    duration: 1.5,  // সময়
    ease: "power3.out",
    scrollTrigger: {
      trigger: heading,
      start: "top 80%",      // যখন element viewport এর 80% এ আসবে
      toggleActions: "play none none reverse", 
    },
  });
});



      // For Slick Slider
      $(document).ready(function () {
        var $slider = $(".slider_slick_custom");

        $slider.slick({
          slidesToShow: 5, // desktop
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          speed: 600,
          arrows: false, // arrows removed
          dots: false,
          infinite: true,
          responsive: [
            {
              breakpoint: 1024, // Tablet
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768, // Mobile
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
          ],
        });

        // custom loop for changing scroll counts
        let scrollModes = [1, 3, 2, 1];
        let index = 0;

        setInterval(function () {
          index = (index + 1) % scrollModes.length;
          $slider.slick(
            "slickSetOption",
            "slidesToScroll",
            scrollModes[index],
            true
          );
        }, 6000);
      });


      // Menu Toggle 
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.getElementById("hamburger");
  const closeIcon = document.getElementById("close");

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    hamburger.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  });



  const cursor = document.querySelector('.cursor-circle');

document.addEventListener('mousemove', e => {
  const x = e.clientX;
  const y = e.clientY;
  cursor.style.transform = `translate(${x}px, ${y}px)`;
});

// For Header
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("bg-black/90", "backdrop-blur-md"); // Black + blur effect
      header.classList.remove("bg-transparent");
    } else {
      header.classList.add("bg-transparent");
      header.classList.remove("bg-black/90", "backdrop-blur-md");
    }
  });

// Page Transition
window.addEventListener("load", () => {
    let tl = gsap.timeline({
      onComplete: () => {
        gsap.to("#page-transition", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            document.getElementById("page-transition").remove();
          }
        });
      }
    });

    tl.to(".frist-div", {
      y: "100%",  // পুরোপুরি নিচে নামবে
      duration: 0.8,
      ease: "power3.inOut"
    })
tl.to(".frist-div, .second-div, .third-div, .forth-div", {
  y: "100%",
  duration: 1,
  ease: "power4.inOut",
  stagger: 0.15
})
tl.to(".frist-div, .second-div, .third-div, .forth-div", {
  y: "115%",   // একটু বেশি নামবে
  duration: 1.2,
  ease: "back.in(3)", // 3 মানে বেশি bounce
  stagger: 0.25
})
.to("#page-transition", {
  backgroundColor: "transparent", 
  duration: 0.5, 
  ease: "power2.out"
}, "-=0.8")
    .to(".second-div", {
      y: "100%",
      duration: 0.8,
      ease: "power3.inOut"
    }, "-=0.6") // overlap effect, train এর মতো
    .to(".third-div", {
      y: "100%",
      duration: 0.8,
      ease: "power3.inOut"
    }, "-=0.6")
    .to(".forth-div", {
      y: "100%",
      duration: 0.8,
      ease: "power3.inOut"
    }, "-=0.6");
  });




    window.onload = () => {
    const allElements = document.querySelectorAll('#logo-elements path, #logo-elements line, #logo-elements polygon');

    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power1.inOut' } });

    // Initial setup: stroke hide + fill hide
    allElements.forEach(el => {
      let length = 1000;
      if (el.getTotalLength) {
        try { length = el.getTotalLength(); } catch(e){}
      }
      el.dataset.originalFill = el.getAttribute("fill") || window.getComputedStyle(el).fill;

      gsap.set(el, {
        stroke: "#fff",
        strokeWidth: 2,
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: "none"
      });
    });

    // Step 1: Stroke draw
    tl.to(allElements, { strokeDashoffset: 0, stagger: 0.15 });

    // Step 2: Fill show
    tl.to(allElements, {
      fill: (i, el) => el.dataset.originalFill || "#fff",
      stroke: "none",
      duration: 1,
      stagger: 0.1
    });

    // Step 3: Overlay slide up AFTER fill animation
    tl.to("#page-transition", {
      y: "-100%",       // slide up
      duration: 1.2,
      ease: "expo.inOut",
      onComplete: () => {
        // overlay remove
        document.getElementById('page-transition').remove();

        // SVG fill hide করা হবে overlay remove হওয়ার পর
        allElements.forEach(el => {
          gsap.set(el, { fill: "none" });
        });
      }
    });
  };