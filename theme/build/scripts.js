$(document).ready(function() {
    //initialize swiper when document ready
    var testimonialSwiper = new Swiper('.swiper-container.testimonial-container', {
        // Optional parameters
        slidesPerView: 3,
        spaceBetween: 40,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
    });

     $('nav ul li a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      $('.dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    $('html').click(function() {
      $('.nav-dropdown').hide();
    });
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
});

function myFunction() {
    var x = document.getElementById("nav-menu");
    if (x.className === "header-links") {
        x.className += "responsive";
    } else {
        x.className = "header-links";
    }
}
