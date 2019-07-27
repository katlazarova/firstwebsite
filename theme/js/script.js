$(document).ready(function (){
    //initialize swiper when document ready
    var testimonialSwiper = new Swiper ('.swiper-container.testimonial-container', {
      // Optional parameters
      slidesPerView: 'auto',
      spaceBetween: 30,
      pagination: {
      	el: '.swiper-pagination',
      	clickable: true,
      },
      navigation: {
      	nextEl: '.swiper-button-next',
      	prevEl: '.swiper-button-prev',
      },
    }),
});