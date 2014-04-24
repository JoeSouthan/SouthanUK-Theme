jQuery(document).ready(function($) {
    var canvas  = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        sPosts  = $("li[type^=sPost]"),
        posts   = $("div[type^=post]"),
        coords  = {};

    //Fire these on page load
    resizeCanvas();
    drawHandler();


    //Listeners 
    $(window).on('resize', function() {
        resizeCanvas();
    });
    $(window).on('scroll',function(){
        drawHandler();
        focusPost();
        isTopPost();
    });
    $(document).on('webkitTransitionEnd oTransitionEnd transitionend msTransitionEnd', function() {
        drawHandler();
    });
    

    //Functions - Lines

    //Find Coordinates for each post div
    function findC () {
        $.each(sPosts, function(key , val) {
            var windowOff = Math.round($(window).scrollTop());
            var sel = $(this)[0].id.substring(1);
            var originX = $(this)[0].offsetLeft+249;
            var originY = $(this)[0].offsetTop+40;
            var endX = $("#"+sel).offset().left;
            var endY = $("#"+sel).offset().top-windowOff;
            coords[sel] = {originX:originX, originY:originY, endX:endX, endY:endY};
        });
    }

    //Resize the page canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawHandler();
    }

    //Handles the drawing of the post lines
    function drawHandler () {
        findC();
        canvas.width = canvas.width;
        $.each(coords, function(index, val) {
            _drawPostLines(val.originX, val.originY, val.endX, val.endY, index);
        });
    }

    //Draws the post lines
    function _drawPostLines(originX, originY, endX, endY, selector) {
        context.beginPath();
        context.lineWidth = "1";
        if ($("#s"+selector).hasClass('active')){
            context.strokeStyle= "#fff";
        } else {
            context.strokeStyle= "#333";
        }
        context.moveTo(originX-240, originY);
        context.lineTo(originX,originY);
        context.lineTo(endX,endY);
        context.stroke();
    }
    //Posts

    //Focuses the in view post
    function focusPost () {
        $.each(coords, function(index, val) {
            if (!isInView($("#"+index))){
                $("#"+index).stop().animate({opacity: 0.4},500);
            } else {
                $("#"+index).stop().animate({opacity: 1},200);
            }
        });
    }
    function isInView(elem){
        var windowOff = $(window).scrollTop();
        var windowSize = windowOff + $(window).height()-200;

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height()-200;

        return ((elemBottom >= windowOff) && (elemTop <= windowSize));
    }
    function isTopPost () {

    }

});
