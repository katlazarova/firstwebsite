$(document).ready(function() {
    // Initialize swiper when document ready.
    var testimonialSwiper = new Swiper('.swiper-container.testimonial-container', {
        // Optional parameters.
        slidesPerView: 'auto',
        spaceBetween: 40,
        breakpoints: {
            576: {
                slidesPerView: 1.3,
                spaceBetween: 20,
                centeredSlides: true
            },

            768: {
                slidesPerView: 2.3,
                spaceBetween: 30,
                centeredSlides: true

            },

            1024: {
                slidesPerView: 3.3,
                spaceBetween: 40
            },
        },
        // Cursor changes when entering the swiper to alert the user that the slide is grabable.
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
    });
    // Calling the matchHeight function.
    matchItemsHeights();
    // Calling the menuFnctionality.
    menuFunctionality();

});

// Renders different elements to assume the height of the tallest element - mathches their heights.
function matchItemsHeights() {
    $('.card-component-container .card-text-container').matchHeight();
};

function menuFunctionality() {
    $('nav ul li a:not(:only-child)').click(function(e) {
        // If anchor is not an only child, it’s sibling must be a drop down list - when clicked, toggle hide and show.
        $(this).siblings('.nav-dropdown').toggle();
        $('.dropdown').not($(this).siblings()).hide();
        e.stopPropagation();
    });
    $('html').click(function() {
        // When anywhere on the page is clicked, the dropdown menu hides.
        $('.nav-dropdown').hide();
    });
    $('#nav-toggle').click(function() {
        // When clicking on the element, the nav ul shows or hides with a sliding motion.
        $('nav ul').slideToggle();
    });
    $('#nav-toggle').on('click', function() {
        // Toggles 'is-active' class on click. 
        $(this).toggleClass('is-active');
    });
};