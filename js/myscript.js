$(document).ready(function(){
  "use strict";

  var topoffset = 50; // variable for menu height
  var slideQuanity = $('#featured .item').length;
  var windowheight = $(window).height();
  var randomSlide = Math.floor(Math.random()*slideQuanity);

  for (var i = 0; i < 100; i++) {
    $("#featured .item").eq(randomSlide).addClass('active');
  }

  //Replace IMG inside carousels with a background image
  $('.fullheight').css('height', windowheight);
  $('#featured .item img').each(function(){
    var imgSrc = $(this).attr('src');
    $(this).parent().css({'background-image': 'url('+ imgSrc + ')'})
    $(this).remove();
  })

  //adjust height of .fullheight elements on window resize
  $(window).resize(function(){
    windowheight = $(window).height();    
    $('.fullheight').css('height', windowheight);
  })

  //Activate Scrollspy
  $('body').scrollspy({
    target: 'header .navbar',
    offset: topoffset
  })

  //Toggle to Add/Remove CSS class of inbody
  var selectActive = $("header li.active a").attr("href");
  if (selectActive !== '#featured') {
    $('header nav').addClass('inbody');
  }

 // toggleInbody();
  $('.navbar-fixed-top').on('activate.bs.scrollspy', function(){
    var hash = $(this).find('li.active a').attr("href");
    if (hash !== '#featured') {
      $('header nav').addClass('inbody');
    } else {
      $('header nav').removeClass('inbody');
    }
  })

//Use smooth scrolling when clicking on navigation
  $('.navbar a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === 
      this.pathname.replace(/^\//,'') && 
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

  //Automatically generate carousel indicators
  for (var i = 0; i < slideQuanity; i++) {
    var insertText = '<li data-target="#featured" data-slide-to="'+ i + '"';
      if (i === randomSlide) {
        insertText += ' class="active" ';
      }
    insertText += '></li>';
    $('#featured ol').append(insertText);
  }

  $('.carousel').carousel({
    pause: false
  })
});