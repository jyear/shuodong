var sex = 0;

var setAd = function() {
    var platform = phonePlatform();
    platform = platform == "iphone" ? "iphone" : "android";
    var adRandom = Math.floor(Math.random() * adData.length);
    var url = adData[adRandom][platform];
    var adBox = $("#adImgBox");
    adBox.attr("href", url);
    if (adRandom == 0) {
        adBox.attr("onclick", 'onclick="MtaH5.clickStat("1")"');
    }
    adBox.html(
        '<img src="./images/ad_big' +
            adRandom +
            "." +
            adData[adRandom].imageType +
            '" />'
    );
};
setAd();
$(function() {
    $("#sexBox").on("click", ".label", function() {
        var _me = $(this);
        var _i = _me.children(".icon")[0];
        var _cls = $(_i).attr("class");
        var sib = _me.siblings(".label");
        sex = _me.attr("data-sex");
        sib.children(".icon")
            .removeClass("checked")
            .addClass("uncheck");
        if (_cls.indexOf("checked") == -1) {
            $(_i)
                .removeClass("uncheck")
                .addClass("checked");
        }
    });
    $("#submitBtn").on("click", function() {
        var name = $("#userName")
            .val()
            .trim();
        if (!name || name.length <= 0) {
            alert("姓名不能为空！");
            return;
        }
        if (!name || name.length > 6) {
            alert("姓名长度不能超过6位");
            return;
        }
        window.location.replace("./five_end.html?name=" + encodeURI(name));
    });
});
