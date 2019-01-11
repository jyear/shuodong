$(function() {
    $("#openStartBtn").on("click", function() {
        $("#startBox").addClass("show");
    });
    $("#beginBtn").on("click", function() {
        $(this).remove();
        $("#drawAnimatedBox").addClass("animated");
    });
});
