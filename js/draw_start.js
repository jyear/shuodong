var SHAKE_THRESHOLD = 3000;
var last_update = 0;
var x = (y = z = last_x = last_y = last_z = 0);
var setAd = function() {
    var platform = phonePlatform();
    platform = platform == "iphone" ? "iphone" : "android";
    var adRandom = Math.floor(Math.random() * adData.length);
    var url = adData[adRandom][platform];
    var adBox = $("#adImgBox");
    adBox.attr("href", url);
    if (adRandom == 0) {
        adBox.attr("onclick", 'MtaH5.clickStat("4")');
    }
    adBox.html(
        '<img src="./images/ad_small' +
            adRandom +
            "." +
            adData[adRandom].imageType +
            '" />'
    );
};
setAd();
function init() {
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", deviceMotionHandler, false);
    } else {
        alert("not support mobile event");
    }
}
function deviceMotionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if (curTime - last_update > 100) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed =
            (Math.abs(x + y + z - last_x - last_y - last_z) / diffTime) * 10000;

        if (speed > SHAKE_THRESHOLD) {
            if ($("#startBox").hasClass("show")) {
                goStep3();
            }
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}
function goStep3() {
    $("#beginBtn").remove();
    $("#drawAnimatedBox").addClass("animated");
    setTimeout(function() {
        $("#startBox").removeClass("show");
        $("#openBox").addClass("show");
    }, 2000);
}
$(function() {
    init();
    $("#openStartBtn").on("click", function() {
        $("#startBox").addClass("show");
    });
    $("#drawAnimatedBox").on("click", function() {
        goStep3();
    });

    $("#drawOpenBtn").on("click", function() {
        window.location.replace("./draw_end.html");
    });
});
