// http://upshots.org/javascript/jquery-test-if-element-is-in-viewport-visible-on-screen
$.fn.isOnScreen = function(){
  var viewport = {};
  viewport.top = $(window).scrollTop();
  viewport.bottom = viewport.top + $(window).height();
  var bounds = {};
  bounds.top = this.offset().top;
  bounds.bottom = bounds.top + this.outerHeight();
  return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

function toggleLogo() {
  if ($('#logo').isOnScreen()) {
    $('#sidebar-wrapper .logo').slideUp(300);
  } else {
    $('#sidebar-wrapper .logo').slideDown(300);
  }
}

function setHeader() {
  // Check the image header
  if ($(window).width() > 767) {
    var headerOffset = -$('#img-header').offset().top / 2 || 0;
    headerOffset = headerOffset > 0 ? 0 : headerOffset;
    $('#img-header').css('top', headerOffset);
    $('.show-full').css('top', headerOffset);
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
  setHeader();
  toggleLogo();

  // Wait until all elements have loaded before firing the scroller
  $(window).load(function() {
    startHeaderScroll();
  });

  $(document).on('scroll', function() {
    setHeader();
    // Move the logo on scroll
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() { toggleLogo(); }, 250));
  });

});
