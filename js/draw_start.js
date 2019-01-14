$(function() {
    $("#openStartBtn").on("click", function() {
        $("#startBox").addClass("show");
    });
    $("#beginBtn").on("click", function() {
        var _me = $(this);
        _me.remove();
        $("#drawAnimatedBox").addClass("animated");
        setTimeout(function() {
            $("#startBox").removeClass("show");
            $("#openBox").addClass("show");
        }, 2000);
    });
});
