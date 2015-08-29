$(document).ready(function() {

    var toggleClick = function() {

        var divObj = $(this).next();
        var nstyle = divObj.css("display");

        if (nstyle == "none") {
            divObj.slideDown(false, function() {
                $("html").bind("click", function() {
                    divObj.slideUp();
                    $("html").unbind("click");
                });
            });
        }
    };

    $(".clickme").click(toggleClick);
});