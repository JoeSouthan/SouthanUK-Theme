jQuery(document).ready(function($) {
    var canvas  = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        sPosts  = $("li[type^=sPost]"),
        posts   = $("div[type^=post]"),
        coords  = {};

    window.addEventListener('resize', resizeCanvas, false);

    $(window).on('scroll',function(){
        drawHandler();
    });
    
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

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawHandler();
    }
    function drawHandler () {
        findC();
        canvas.width = canvas.width;
        $.each(coords, function(index, val) {
            _drawPostLines(val.originX, val.originY, val.endX, val.endY, index);
        });
    }

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
    resizeCanvas();
    drawHandler();
});
