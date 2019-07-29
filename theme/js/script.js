$(document).ready(function (){
    //initialize swiper when document ready
    var testimonialSwiper = new Swiper ('.swiper-container.testimonial-container', {
      // Optional parameters
      slidesPerView: 3,
      spaceBetween: 40,
      grabCursor: true,
      pagination: {
      	el: '.swiper-pagination',
      	type: 'progressbar',
      },
    });
});
