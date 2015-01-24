function toggleLogo() {
  if ($(window).scrollTop() < 50) {
    $('#navbar-logo').slideUp(300, function(){ $(this).hide(); });
  } else {
    $('#navbar-logo').slideDown(300);
  }
}

function startHeaderScroll() {
  var img = new Image(),
      source = $('#img-header').css('background-image').replace(/url\(|\)$/ig, '');
  img.src = source;
  if (img.height > 0) {
    var scrollTo = -(img.height-300);
    $('#img-header').animate({
      'background-position-y': scrollTo
    }, 10000);
  } else {
    console.log('Failed to get img');
  }
}

jQuery(document).ready(function() {
  toggleLogo();

  // Wait until all elements have loaded before firing the scroller
  $(window).load(function() {
    startHeaderScroll();
  });

  $(window).on('scroll', function() {
    // Move the logo on scroll
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() { toggleLogo(); }, 250));
  });

});
