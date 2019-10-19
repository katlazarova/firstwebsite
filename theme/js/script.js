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

    arrowAnimation();

    processDonation();

    openDonationTab();

});

function processDonation() {
    // Clicking the donate button redirects to a thank you page.
    $('.donate-form-container .donate-button').click(function () {
        var donationSum = $('.donate-form-buttons .form-buttons .donate-sum.active').text();
        var donationSumOther = $('.donate-form-text .donate-form-input.active').val();

        if (donationSum !== '' && donationSum !== 'Other') {
            window.location.href = '/thank-you-page.php?donationSum=' + donationSum;
        }
        if (donationSum === 'Other' && $('.donate-form-text .donate-form-input').hasClass('active')) {
            window.location.href = '/thank-you-page.php?donationSum=£' + donationSumOther;
        }
    });
}

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
    $('.form-group .text-area').on('input', function () {
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

function openDonationTab() {

    setInitialPosition = function(){
        // Defines the variable for the position of the first of the donate form buttons.
        var initialPosition = $('.form-buttons.active button').first().position();
        // Defines the position of the middle of each of the donate sum buttons.
        var buffer = $('.form-buttons.active .donate-sum').outerWidth() / 2;
        // sets the initial position of the arrow to equal the middle of the first button.
        $('.donation-content-panel .triangle-left').css({left: initialPosition.left + buffer});
    };

    tabFunctionality = function(mainAmount, otherAmount) {
        // Show and add an active class to the form buttons depending on which tablinks tab is clicked.
        $('.donate-form-buttons ' +'.'+ mainAmount + '.form-buttons').show().addClass('active');
        // Hide and remove active class from the form buttons of the tab which is not clicked.
        $('.donate-form-buttons ' +'.'+ otherAmount + '.form-buttons').removeClass('active').hide();
        // Remove active class from a previously clicked button of the tab which is not currently active.
        $('.donate-form-buttons ' +'.'+ otherAmount + '.form-buttons .donate-sum').removeClass('active');
        // Add an active class to the first button of the active tab and remove it from its siblings.
        $('.donate-form-buttons ' +'.'+ mainAmount + '.form-buttons .donate-sum').first().addClass('active').siblings().removeClass('active');
        // Add active class to the first donate form text and remove it from the siblings.
        $('.donate-form-text-'+ mainAmount + ' .donate-form-text').first().addClass('active').siblings().removeClass('active');
        // Remove active class from the donate form text in the inactive tab.
        $('.donate-form-text-'+ otherAmount +' .donate-form-text').removeClass('active');
    };

    setInitialPosition();

    $('.tab .tablinks').click(function () {
        //Clicking on tablinks adds an active class and removes it from the sibling element.
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).hasClass('monthly')) {
            var mainAmount = 'monthly';
            var otherAmount = 'single';
            tabFunctionality(mainAmount, otherAmount);
            setInitialPosition();
        } else {
            mainAmount = 'single';
            otherAmount = 'monthly';
            tabFunctionality(mainAmount, otherAmount);
            setInitialPosition();
        }
    });

    $('.donate-form-buttons .donate-sum').click(function () {
        // When a donate-sum button is clicked, add an active class and remove it from the siblings.
        $(this).addClass('active').siblings().removeClass('active');

        var buttonPosition = $('.donate-form-buttons .donate-sum.active').index();
        var targetTextMonthly = $('.donate-form-text-monthly .donate-form-text')[buttonPosition];
        var targetTextSingle = $('.donate-form-text-single .donate-form-text')[buttonPosition];

        if ($(this).parent().hasClass('monthly')) {
            /* If the donation button clicked is in the monthly tab, find the text which has the same position in the array as the clicked button.
            Add an active class to this text.
            Remove active class from the siblings. */
            $('.donate-form-text-monthly').find(targetTextMonthly).addClass('active').siblings().removeClass('active');
            // Remove active class from all text in the single tab.
            $('.donate-form-text-single .donate-form-text').removeClass('active');
        } else {
            $('.donate-form-text-single').find(targetTextSingle).addClass('active').siblings().removeClass('active');
            $('.donate-form-text-monthly .donate-form-text').removeClass('active');
        }
    });

    $('.form-item-other .donate-form-input').on('input', function () {
        // Add an active class to the donate form input field on input.
        $(this).addClass('active');
    });
}

function arrowAnimation() {
    $('.form-buttons .donate-sum').each(function () {

        $(this).click(function () {
            // Sets the position of the clicked button.
            var targetButton = $(this).position();

            // On click of each button, the arrow is moved to the middle of the active button.
            $('.donation-content-panel .triangle-left').animate({left: targetButton.left + 22.5});
        });
    });
}
