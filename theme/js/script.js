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

    getFormData();

    countChar();

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

$.getUrlParam = function(name){
    /* Variable results is set to equal to the result of the search using RegExp.
    RegExp defines the characters which can be before the word, the word, and characters which can appear after the word.
    RegExp is the search term used by the .exec function which looks for the result in the url. */
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
};

function getFormData() {
    var firstName = $.getUrlParam('firstname');
    var email = $.getUrlParam('email');

    $('.thank-you-message .first-name').append(firstName);

    if (email !== null) {
        $('.thank-you-message .email').append('on ' + email);
    }
}

function countChar() {
    $('.text-area').on("input", function(){
        var maxlength = $(this).attr("maxlength");
        var currentLength = $(this).val().length;
        var charCounter = $('.contact-form-container .character-counter');

        if( currentLength >= maxlength ){
            // If the current length of the text is 500 or more characters, display the specified text.
            charCounter.text('You have reached the maximum number of characters.');
        } else{
            // If the length of the text is less than 500 characters, display the number of characters remaining.
            charCounter.text(maxlength - currentLength + " characters remaining");
        }

        if( currentLength >= 450) {
            // Add class "limit-warning" to the character counter when there are 50 characters remaining or less.
            charCounter.addClass('limit-warning');
        }
    });
}