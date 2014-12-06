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

jQuery(document).ready(function() {
  $(document).on('scroll', function(event) {
    // Check the image header
    var headerOffset = -$("#img-header").offset().top / 2 | 0;
    headerOffset = headerOffset > 0 ? 0 : headerOffset;
    $("#img-header").css('top', headerOffset);

    // Move the logo on scroll
    var logo = '<img src="images/smalllogo.png" class="img-responsive" alt="Logo" id="logo-sidebar" />';
    if ($("#logo").isOnScreen()) {
      $("#logo-sidebar").length ? $("#logo-sidebar").slideUp(300, function() {$(this).remove()}) : null;
    } else {
      $("#logo-sidebar").length ? null : $(logo).prependTo('#sidebar-wrapper').hide().slideDown(300);
    }
  });
});
