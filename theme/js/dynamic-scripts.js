$(document).ready(function() {
    getBlogCardComponentData();

    appendCountryData();

    getBlogContentData();

    getDonationSumData();
});

function getBlogCardComponentData() {
    $.getJSON('theme/json/posts.json', function(data) {
        // Run function for each card. The post variable here represents the json dataset.
        $.each(data, function(i, post) {
            $('.card-component-container .row-container--horizontal')
            // Insert the following markup and json data into the card-component-container div.
                .append('<div class="card-wrapper"><div class="card card-one clickable card--horizontal"><div class="card-image-wrapper"><img src="'+post.imageLink+'" alt="'+post.imageAltText+'" class="card-image responsive-image"></div><div class="card-text-container"><h3>'+post.title+'</h3><p>'+post.datePosted+'</p><p>'+post.summary+'</p><a href="'+post.link+'?postId='+post.id+'">'+post.linkText+'</a></div></div></div>');
        });
    });
    setTimeout(function(){
        clickableElement($('.card-component-container--horizontal .card-wrapper'));
    }, 100);
}

function appendCountryData() {
    // Run function only on the help page.
    if (window.location.pathname === '/help.php') {
        // Link to json data.
        $.getJSON('http://vocab.nic.in/rest.php/country/json', {
            format: "json"
            // Once the json has been loaded, trigger the following function.
        }).done(function (data) {
            /* Run function for each country in the json data.
            countryData is a variable representing the json dataset at the countries array level.*/
            $.each(data['countries'], function (i, countryData) {

                // Insert markup and json data into the select element.
                $('.select-country')
                    .append('<option value="' + countryData.country.country_id + '">' + countryData.country.country_name + '</option>');
            });
            // If the json data cannot be loaded, display an error message.
        }).fail(function (data, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    }
}

function getBlogContentData() {
    // Run function only on the blog-content page.
    if (window.location.pathname === '/blog/blog-content.php') {
        // Setting the variable postId to equal the postId taken from the URL.
        var postId = $.getUrlParameter('postId');
        // If the postId variable is empty, set it to 0.
        if (postId === null) {
            postId = 0;
        }
        $.getJSON('/theme/json/posts.json', function (data) {
            // Sets variable post to equal the dataset with a specific id.
            var post = data[postId];
            // Inserts content into blog-content-container.
            $('.blog-content-hero-container').append('<div class="blog-hero-image full-width bottom-spacer" style="background-image: url('+post.imageLink+')"></div>');
            $('.blog-content-container').append('<h2>' + post.title + '</h2><p>Posted On: ' + post.datePosted + '</p><div class="blog-content-text-container bottom-spacer">' + post.body + '</div>');
            $('.sidebar .author-container').append('<div class="author-image-container"><img src="' + post.author[0].image + '" alt="author image"></div><h3>' + post.author[0].name + '</h3>');
        });
    }
}

function getDonationSumData() {
    var donationSum = $.getUrlParameter('donationSum');
    $('.donation-success-message').append('<p>Your donation of '+ donationSum +' goes a long way in helping our mission.</p>');
}
