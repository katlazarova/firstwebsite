$(document).ready(function () {
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

    addPageNameToBody();

    addActiveClassToNavbar();

    accordionFunctionality();

    validateForm();

    getFormData();

    countCharacter();

    /* Calling the clickableElement function on card-wrapper.
    This function needs parameters running through it to work. */
    clickableElement($('.card-component-container .card-wrapper'));

    openDonationText();

});

// Renders different elements to assume the height of the tallest element - mathches their heights.
function matchItemsHeights() {
    $('.card-component-container .card-text-container').matchHeight();
}

function menuFunctionality() {
    $('nav ul li a:not(:only-child)').click(function (e) {
        // If anchor is not an only child, it’s sibling must be a drop down list - when clicked, toggle hide and show.
        $(this).siblings('.nav-dropdown').toggle();
        $('.dropdown').not($(this).siblings()).hide();
        e.stopPropagation();
    });
    $('html').click(function () {
        // When anywhere on the page is clicked, the dropdown menu hides.
        $('.nav-dropdown').hide();
    });
    $('#nav-toggle').click(function () {
        // When clicking on the element, the nav ul shows or hides with a sliding motion.
        $('nav ul').slideToggle();
    });
    $('#nav-toggle').on('click', function () {
        // Toggles 'is-active' class on click. 
        $(this).toggleClass('is-active');
    });
}

function clickableElement($cElement) {
    // Inside cElement, find clickable class.
    $cElement.find('.clickable').click(function () {
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
    $('.nav-list li a').each(function () {
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

function accordionFunctionality() {
    // For each accordion component, run a click function.
    $('.accordion-component .accordion').each(function () {
        $(this).click(function () {
            // Toggle the panel content on click.
            $(this).next('.panel').slideToggle();
            // With each click on the accordion, toggle the active class.
            $(this).toggleClass('active');
        });
    });
}

function validateForm() {
    var requiredField = $('.form-control:required');
    $('form .submit').click(function () {
        // If a required field is empty when submit button is clicked, add class invalid to the required field.
        if (requiredField.val().length === 0) {
            requiredField.addClass('invalid');
            // Add class invalid to the sibling element "label".
            requiredField.siblings('label').addClass('invalid');
        }
    });
}

function getFormData() {
    var firstName = $.getUrlParameter('firstname');
    var email = $.getUrlParameter('email');

    if (firstName !== null) {
        firstName = firstName.replace('+', ' ');
        $('.thank-you-message .first-name').append(firstName);
    }

    if (email !== null) {
        email = email.replace(/%40/g, '@');
        $('.thank-you-message .email').append('on ' + email);
    }
}

$.getUrlParameter = function (name) {
    /* Variable results is set to equal to the result of the search using RegExp.
    RegExp defines the characters which can be before the word, the word, and characters which can appear after the word.
    RegExp is the search term used by the .exec function which looks for the result in the url. */
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
};

function countCharacter() {
    $('.text-area').on('input', function () {
        var maxlength = $(this).attr('maxlength');
        var currentLength = $(this).val().length;
        var charCounter = $('.contact-form-container .character-counter');

        if (currentLength >= maxlength) {
            // If the current length of the text is 500 or more characters, display the specified text.
            charCounter.text('You have reached the maximum number of characters.');
        } else {
            // If the length of the text is less than 500 characters, display the number of characters remaining.
            charCounter.text(maxlength - currentLength + ' characters remaining');
        }

        if (currentLength >= 250) {
            // Add class "limit-warning" to the character counter when there are 50 characters remaining or less.
            charCounter.addClass('limit-warning');
        }
    });
}

function openDonationTab(evt, donationType) {
    var i, tabcontent, tablinks;

    // Get all elements with class tabcontent and hide them.
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    // Get all elements with class tablinks and remove the active class.
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    /* Show the current tab, and add an active class to the tab and the button that opened the tab.
    donationType is a variable representing the monthly and single tabcontent ids.
    This function needs this parameter passing through it. */
    document.getElementById(donationType).style.display = 'block';
    document.getElementById(donationType).className += ' active';
    evt.currentTarget.className += ' active';


    // Typing into the input field adds active class to the input field and removes the active class from other buttons.
    $('.form-item-other .donate-form-input').on('input', function () {
        $(this).addClass('active');
        $('.donate-form-buttons .donate-sum').not('.donate-sum.active').removeClass('active');
    });

    // Clicking the donate button redirects to a thank you page.
    $('.tabcontent .donate-button').click(function () {
        var donationSum = $('.tabcontent.active .donate-sum.active').text();
        var donationSumOther = $('.tabcontent.active .donate-form-input.active').val();

        if (donationSum == null) {
            window.location.href = '/thank-you-page.php?donationSum=' + donationSum + '';
        }

        if (donationSum === 'Other') {
            window.location.href = '/thank-you-page.php?donationSum=£' + donationSumOther + '';
        }
    });

    // Add active class on current donate-sum button.
    $('.donate-form-buttons .donate-sum').each(function () {
        $(this).click(function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });
    });
}

function openDonationText(evt, donationAmount) {
    var i, donationText, donateSum;

    // Get all elements with class donate-form-text and hide them.
    donationText = document.getElementsByClassName('donate-form-text');
    for (i = 0; i < donationText.length; i++) {
        donationText[i].style.display = 'none';
    }

    // Get all elements with class donate-sum and remove the active class.
    donateSum = document.getElementsByClassName('donate-sum');
    for (i = 0; i < donateSum.length; i++) {
        donateSum[i].className = donateSum[i].className.replace(' active', '');
    }

    /* Show the current text, and add an active class to it, and the button that opened it.
    donationAmount is a variable representing the donate-sum ids.
    This function needs this parameter passing through it. */
    document.getElementById(donationAmount).style.display = 'inline-block';
    document.getElementById(donationAmount).className += ' active';
    evt.currentTarget.className += ' active';
}
