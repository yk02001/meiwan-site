/**
 * 1.1 version of theme custom js
 * Support for Navpane plugin
 */

jQuery(function($) {

  // Define Theme specific functions
  var Theme = {
    // Swiping mobile galleries wwith Hammer.js
    swipeGallery: function() {
      setTimeout(function() {
        var touchGallery = document.getElementsByClassName("fancybox-wrap")[0];
        var mc = new Hammer(touchGallery);
        mc.on("panleft panright", function(ev) {
          if (ev.type == "panleft") {
            $("a.fancybox-next").trigger("click");
          } else if (ev.type == "panright") {
            $("a.fancybox-prev").trigger("click");
          }
          Theme.swipeGallery();
        });
      }, 500);
    },
    swipeInit: function() {
      if ('ontouchstart' in window) {
        $("body").on("click", "a.w-fancybox", function() {
          Theme.swipeGallery();
        });
      }
    },
    // Hide minicart better on mobile
    hideCart: function(){
      if ('ontouchstart' in window) {
        $('.wsite-background, #banner, #main, #footer').on('click', function () {
            $('#wsite-mini-cart').fadeOut("fast");
        });
      }
    },
    toggleClick: function(click, target, classname){
      $(click).click(function(){
        $(target).toggleClass(classname);
      });
    },
    interval: function(condition, action, duration, limit) {
      var counter = 0;
      var looper = setInterval(function(){
        if (counter >= limit || condition()) {
          clearInterval(looper);
        } else {
          action();
          counter++;
        }
      }, duration);
    },
    checkCart: function() {
      return $("#weebly-footer-signup-container").length;
    },
    checkFreeFooter: function() {
      return $("#panel-one #wsite-mini-cart").css("display") === "block";
    },
    unbindFreeFooter: function() {
      $(window).unbind("scroll");
    },
    moveMinicart: function() {
      var cart = $('#wsite-mini-cart').detach();
      $(".wsite-nav-cart").after(cart);
      $('#wsite-mini-cart').removeClass("arrow-left").addClass("arrow-top");
      Weebly.Menus = false;
    },
    checkLogin: function() {
      return $("#nav #member-login").length;
    },
    cloneLogin: function() {
      var login = $('#member-login').clone(true);
      $("#nav .wsite-menu-default li:last-child").after(login);
    },
    topButton: function(container, offset) {
      $(container).append('<a class="scrolltop" href="#">^ TOP</a>');
      $(".scrolltop").click(function(e){
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 900);
      })
    },
    footerCheck: function(){
      setTimeout(function() {
        var contentHeight = $("#banner").height() + $("#main").height();
        if (contentHeight >  $("#panel-two").height()) {
          $("#footer > div:not(.wsite-footer)").addClass("auto");
        }
      }, 500);
    }
  }

  $(document).ready(function() {
    $('body').addClass('postload');
    Theme.toggleClick(".wsite-com-sidebar", ".wsite-com-sidebar", "open");
    Theme.topButton("#footer > div", 100);
    Theme.swipeInit();
    Theme.hideCart();
    Theme.interval(Theme.checkCart, Theme.moveMinicart, 500, 8);
    Theme.interval(Theme.checkLogin, Theme.cloneLogin, 500, 8);
    Theme.footerCheck();
    Theme.interval(Theme.checkFreeFooter, Theme.unbindFreeFooter, 500, 8);
  });

});
