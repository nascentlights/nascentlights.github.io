$(document).ready(function () {
    $('a.poplight[href^=#]').click(function (e) {
        var popID = $(this).attr('rel');
        var popURL = $(this).attr('href');
        var query = popURL.split('?');
        var dim = query[1].split('&');
        var popWidth = dim[0].split('=')[1];
        $('#' + popID).fadeIn().css({ 'width': Number(popWidth) }).prepend('<a href="#" class="close" title="Close"><img src="https://33550336.neocities.org/hsrsorter/img/close.png"/></a>');
        var popMargTop = ($('#' + popID).innerHeight() + 0) / 2;
        var popMargLeft = ($('#' + popID).innerWidth() - 0) / 2;
        $('#' + popID).css({
            'margin-top': -popMargTop,
            'margin-left': -popMargLeft
        });
        $('body').append('<div id="fade"></div>');
        $("body").css({ "overflow-y": "hidden", "overflow-x": "hidden" });
        $('#fade').fadeIn();
        e.preventDefault();
    });
    $("body").on('click', 'a.close, #fade', function () {
        $("body").css({ "overflow-y": "auto", "overflow-x": "auto" });
        $('#fade,.popup_block').fadeOut(function () {
            $('#fade, a.close').remove();
        });
        return false;
    });
});