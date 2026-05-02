/*!
=========================================================
* Ailexity Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// navbar scroll effect
$(document).ready(function(){
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
    
    // Handle cross-page navigation to contact section
    if (window.location.hash === '#contact' || sessionStorage.getItem('scrollToContact') === 'true') {
        sessionStorage.removeItem('scrollToContact');
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: $('#contact').offset().top
            }, 700);
        }, 500); // Small delay to ensure page is fully loaded
    }
});

// protfolio filters
$(window).on("load", function() {
    var t = $(".portfolio-container");
    if (t.length) {
        t.isotope({
            filter: ".new",
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), $(".filters a").click(function() {
            $(".filters .active").removeClass("active"), $(this).addClass("active");
            var i = $(this).attr("data-filter");
            return t.isotope({
                filter: i,
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: !1
                }
            }), !1
        })
    }
})


  
  