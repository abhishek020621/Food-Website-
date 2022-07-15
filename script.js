"use script";
//////////////////////////////////////////////////////////////
const btnOpen = document.querySelector(".btn-mobile-nav");
const headerEL = document.querySelector(".header");
btnOpen.addEventListener("click", function () {
  headerEL.classList.toggle("nav-open");
});

//////////////////////////////////////////////////////////
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

//////////////////////////////////////////////////////////
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    if (href !== "#" && href.startsWith("#")) {
      const sectionEL = document.querySelector(href);
      sectionEL.scrollIntoView({ behavior: "smooth" });
      if (link.classList.contains("main-nav-link")) {
        headerEL.classList.toggle("nav-open");
      }
    }
  });
});

//////////////////////////////////////////////////////////////
const mainNav = document.querySelector(".main-nav");
const handleHover = function (e) {
  if (e.target.classList.contains("main-nav-link")) {
    const link = e.target;
    const sibling = link
      .closest(".main-nav")
      .querySelectorAll(".main-nav-link");
    const logo = link.closest(".header").querySelector("img");
    sibling.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
mainNav.addEventListener("mouseover", handleHover.bind(0.5));
mainNav.addEventListener("mouseout", handleHover.bind(1));

/////////////////////////////////////////////////////////////////
const sectionHero = document.querySelector(".section-hero");
const navHeight = headerEL.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    document.body.classList.add("sticky");
  } else {
    document.body.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-80px`,
});
headerObserver.observe(sectionHero);

/////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";


  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

//

////////////////////////////////////////////////////////////////////
// document.addEventListener("mousemove", function (e) {
//   let body = document.querySelector("body");
//   let circle = document.getElementById("circle");
//   let left = e.pageX;
//   let top = e.pageY;
//   circle.style.left = left + "px";
//   circle.style.top = top + "px";
// });

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  // const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  console.log();
  curSlide;
  const maxSlide = slides.length;
  console.log(maxSlide);

  // Functions
  // const createDots = function () {
  //   slides.forEach(function (_, i) {
  //     dotContainer.insertAdjacentHTML(
  //       "beforeend",
  //       `<button class="dots__dot" data-slide="${i}"></button>`
  //     );
  //   });
  // };

  // const activateDot = function (slide) {
  //   document
  //     .querySelectorAll(".dots__dot")
  //     .forEach((dot) => dot.classList.remove("dots__dot--active"));

  //   document
  //     .querySelector(`.dots__dot[data-slide="${slide}"]`)
  //     .classList.add("dots__dot--active");
  // };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    // activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    // activateDot(curSlide);
  };

  // const init = function () {
  //   goToSlide(0);
  //   createDots();

  //   activateDot(0);
  // };
  // init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  // dotContainer.addEventListener("click", function (e) {
  //   if (e.target.classList.contains("dots__dot")) {
  //     const { slide } = e.target.dataset;
  //     goToSlide(slide);
  //     activateDot(slide);
  //   }
  // });
};
slider();
