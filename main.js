const burgerMenu = document.getElementById("burgerMenu");
const nav = document.querySelector("nav");
burgerMenu.addEventListener("click", (evt) => {
  evt.stopPropagation();
  nav.classList.toggle("active");
  if (nav.classList.contains("active")) {
    evt.target.style.backgroundImage = "url(./images/icon-close.svg)";
    nav.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    document.body.addEventListener("click", () => {
      nav.classList.remove("active");
      evt.target.style.backgroundImage = "url(./images/icon-hamburger.svg)";
    });
    window.addEventListener("scroll", (e) => {
      nav.classList.remove("active");
      evt.target.style.backgroundImage = "url(./images/icon-hamburger.svg)";
    });
  } else {
    evt.target.style.backgroundImage = "url(./images/icon-hamburger.svg)";
  }
});

mouseSlideTestimonials();
function mouseSlideTestimonials() {
  let mouseDown = false;
  let startX, scrolltoLeft;
  const testimonials = document.getElementById("testimonialsCont");
  testimonials.scrollTo(0, 0);

  let spanSlider = document.createElement("div");
  spanSlider.classList.add("spanContainer");
  testimonials.appendChild(spanSlider);
  for (let i = 0; i < 4; i++) {
    let element = document.createElement("input");
    element.setAttribute("type", "radio");
    element.setAttribute("name", "slide");
    i === 0 ? (element.checked = true) : null;
    element.dataset.display = i + 1;

    element.addEventListener("change", (e) => {
      testimonials.scrollTo((parseInt(e.target.dataset.display) - 1) * testimonials.offsetWidth + 15 * parseInt(e.target.dataset.display), 0);
    });
    spanSlider.appendChild(element);
  }
  const spanSlidersInput = document.querySelectorAll('input[type="radio"]');
  testimonials.addEventListener("scroll", (e) => {
    let scrolls = e.target.scrollLeft;

    for (let i = 0; i < 4; i++) {
      if (scrolls > (window.innerWidth / 1.5) * i) {
        for (const element of spanSlidersInput) {
          element.dataset.display === (i + 1).toString() ? (element.checked = true) : null;
        }
      }
    }
  });

  const startDragging = (e) => {
    mouseDown = true;
    startX = e.pageX - testimonials.offsetLeft;
    scrolltoLeft = testimonials.scrollLeft;
  };

  const stopDragging = () => {
    mouseDown = false;
  };

  const move = (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - testimonials.offsetLeft;
    const scroll = x - startX;
    testimonials.scrollTo(scrolltoLeft - scroll, 0);
  };

  testimonials.addEventListener("mousemove", move, false);
  testimonials.addEventListener("mousedown", startDragging, false);
  testimonials.addEventListener("mouseup", stopDragging, false);
  testimonials.addEventListener("mouseleave", stopDragging, false);
}
