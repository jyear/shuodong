var saveUrl = "";
function setQrcode() {
    new QRCode(
        document.getElementById("qrcodeBox"),
        window.location.href.replace("_end", "_start")
    );
}
var setAd = function() {
    var platform = phonePlatform();
    platform = platform == "iphone" ? "iphone" : "android";
    var adRandom = Math.floor(Math.random() * adData.length);
    var url = adData[adRandom][platform];
    var adBox = $("#adImgBox");
    adBox.attr("href", url);
    // if(adRandom==0){
    //     adBox.attr('onclick','onclick="MtaH5.clickStat()')
    // }
    adBox.html(
        '<img src="./images/ad_small' +
            adRandom +
            "." +
            adData[adRandom].imageType +
            '" />'
    );
};
setAd();
function drawImage() {
    html2canvas(document.querySelector("#imgDom"), {
        allowTaint: true,
        async: false,
        backgroundColor: "#f0dec1",
        scale: 3,
        dpi: window.devicePixelRatio * 2
    }).then(function(canvas) {
        var context = canvas.getContext("2d");
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        var height = canvas.height;
        var width = canvas.width;
        context.clearRect(0, height - 2, width, height);
        var img = new Image();
        img.src = canvas.toDataURL("image/jpeg");
        img.alt = "解签";
        img.className = "canvasimg";
        img.onload = function() {
            document.querySelector("#imgLayerBox").innerHTML = "";
            document.querySelector("#imgLayerBox").innerHTML =
                '<img class="canvasimg" src="' + img.src + '" />';
            document.querySelector("#imgDom").innerHTML = "";
            document.querySelector("#imgDom").innerHTML =
                '<img class="canvasimg" src="' + img.src + '" />';
            document.querySelector("#imgDom").style.paddingBottom = "10px";
            $.ajax({
                type: "post",
                url: "http://www.bxwjt.cn/api.php",
                data: {
                    title: "新年签",
                    desc: "新年签_draw",
                    image: img.src,
                    act: "set"
                },
                success: function(res) {
                    var data = JSON.parse(res);
                    if (data && data.code == "0000") {
                        wx.ready(function() {
                            var domain = getDomain();
                            var shareData = {
                                title: "新年签",
                                desc: "新年第一签，我抽中了这个，真是太幸运了!",
                                link: domain + "/show.html?id=" + data.id,
                                imgUrl: domain + "/images/draw_logo.jpg",
                                success: function(res) {
                                    console.log(res);
                                }
                            };
                            wx.updateAppMessageShareData(shareData);
                            wx.updateTimelineShareData(shareData);
                            wx.onMenuShareAppMessage(shareData);
                            wx.onMenuShareTimeline(shareData);
                        });
                    }
                }
            });
        };
    });
}
$(function() {
    setQrcode();
    var randomNumber = Math.floor(Math.random() * 18);
    var img = "./images/draw_" + randomNumber + ".png";
    $("#drawText").html('<img src="' + img + '"/>');
    $("#saveBtn").on("click", function() {
        var saveBox = $("#saveBox");
        $("html,body").css({
            overflow: "hidden"
        });
        var imglayer = $("#imgLayerBox");
        saveBox.addClass("show");
        if (imglayer.html().length > 0) {
            return;
        }
    });
    $("#saveBox").on("click", function() {
        $(this).removeClass("show");
        $("html,body").css({
            overflow: "auto"
        });
    });
    $("#shareBtn").on("click", function() {
        $("#shareLayer").addClass("show");
    });
    $("#shareLayer").on("click", function() {
        $(this).removeClass("show");
    });

    //window.history.replaceState(null, "抽签", "./draw_start.html");
});
window.onload = function() {
    drawImage();
};
