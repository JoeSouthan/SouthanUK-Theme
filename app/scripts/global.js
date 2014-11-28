jQuery(document).ready(function() {
  $(document).on('scroll', function(event) {
    var headerOffset = -$("#img-header").offset().top / 2 | 0;
    headerOffset = headerOffset > 0 ? 0 : headerOffset;
    $("#img-header").css('top', headerOffset);
  });
});