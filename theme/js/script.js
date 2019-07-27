$(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper ('.testimonial-container', {
      // Optional parameters
      slidesPerView: 'auto',
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
  });