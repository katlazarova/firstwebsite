$(document).ready(function() {
    // Initialize swiper when document ready.
    var testimonialSwiper = new Swiper('.swiper-container.testimonial-container', {
        // Optional parameters.
        slidesPerView: 3.3,
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
    // Calling the menuFunctionality.
    menuFunctionality();
    // Calling the clickableElement function on card-wrapper. 
    clickableElement($('.card-component-container .card-wrapper'));

    addPageNameToBody();

    addActiveClassToNavbar();

    postCardComponentJsonData();

    accordionFunctionality();

    validateForm();

});

// Renders different elements to assume the height of the tallest element - mathches their heights.
function matchItemsHeights() {
    $('.card-component-container .card-text-container').matchHeight();
}
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
}
function clickableElement($cElement) {
    // Inside cElement, find clickable class. 
    $cElement.find('.clickable').click(function() {
        var $item = $(this);
        // If there is an anchor inside this item, go to new page using URL from first anchor. 
        if ($item.find('a').length) {
            window.location = $item.find('a:first').attr('href');
        }
    });
}
function addPageNameToBody() {
    // Identifying the location path.
    var url = window.location.pathname;

    /* Removing the first charachter, which is "/", replacing each "/" with a "-",
    The last item is then separated at the "." and shift gets the first item in the array,
    This is identified as the name of current page. */
    var nameOfPage = url.substring(1).replace(/[/\\]/g, '-').split('.').shift();

    // If the variable === empty string, the class of "home" is added to body, else nameOfPage is added to body. 
    if (nameOfPage === '') {
        $('body').addClass('page-home');
    } else {
        $('body').addClass('page-' + nameOfPage);
    }
}
function addActiveClassToNavbar() {
    var currentPath = location.pathname;
    // Run function for each anchor tag in the nav-list. 
    $('.nav-list li a').each(function() {
        // Sets the variable to equal $(this).
        var $this = $(this);

        // If the current path matches $this link.
        if ($this.attr('href').indexOf(currentPath) !== -1) {
            // If the current page is not the homepage. 
            if (currentPath !== '/') {
                // If the parent of the parent of the anchor has the class of nav-dropdown, add an active class to the previous sibling.
                if ($this.parent().parent().hasClass('nav-dropdown')) {
                    $('.nav-list .nav-dropdown').prev().addClass('active');
                } else {
                    $this.addClass('active');
                }
            } else {
                // If the current page is the homepage, add an active class to the first link in the navlist (the homepage). 
                $('.nav-list li:first a').addClass('active');
            }
        }
    });
}
function postCardComponentJsonData() {
    $.getJSON('theme/json/posts.json', function(data) {
        $.each(data, function(i, post) {
            $('.card-component-container .row-container--horizontal')
                .append('<div class="card-wrapper"><div class="card card-one clickable card--horizontal"><div class="card-image-wrapper"><img src="'+post.imageLink+'" alt="'+post.imageAltText+'" class="card-image responsive-image"></div><div class="card-text-container"><h3>'+post.title+'</h3><p>'+post.date+'</p><p>'+post.body+'</p><a href="'+post.link+'">'+post.linkText+'</a></div></div></div>');
        });
    });
}
function accordionFunctionality() {
    // For each accordion component, run a click function.
    $('.accordion-component .accordion').each(function() {
        $(this).click(function() {
            // Toggle the panel content on click.
            $(this).next('.panel').slideToggle();
            // With each click on the accordion, toggle the active class.
            $(this).toggleClass('active');
        });
    });
}

function validateForm() {
    var requiredField = $('.form-control:required');
    $('form .submit').click(function() {
        // If a required field is empty when submit button is clicked, add class invalid to the required field.
        if (requiredField.val().length === 0) {
            requiredField.addClass('invalid');
            // Add class invalid to the sibling element "label".
            requiredField.siblings('label').addClass('invalid');
        }
    });
}