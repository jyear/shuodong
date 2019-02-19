var data = {
    0: ["暗恋", "被暗恋的人表白", "在一起", "成功见家长", "每天撒狗粮"],
    1: ["沉迷游戏", "成为大佬", "开启网恋", "成功奔现", "确认过眼神就是对的人"],
    2: ["被星探挖掘", "成为练习生", "成功出道", "当上C位", "和爱豆同台演出"],
    3: [
        "一夜暴富",
        "实现财务自由",
        "完成童年心愿",
        "追到喜欢的人",
        "变成人生赢家"
    ],
    4: [
        "被朋友催婚",
        "被父母催婚",
        "被亲戚催婚",
        "一直被催婚",
        "从未停止被催婚"
    ],
    5: ["被嘲单身狗", "遇见意中人", "被意中人追求", "火速脱单", "实力打脸"],
    6: ["加班", "又加班", "再次加班", "加个毛的班", "盘他！"],
    7: ["刻苦学习", "成为学霸", "考题全做过", "考试全高分", "考证一次过"],
    8: [
        "捡到一分钱",
        "捡到一毛钱",
        "捡到一块钱",
        "捡到十块钱",
        "什么时候捡到一百块？"
    ],
    9: [
        "去好吃的地方旅游",
        "去好玩的地方旅游",
        "去好风景的地方旅游",
        "去梦想中的城市旅游",
        "去喜欢的人所在地旅游"
    ],
    10: ["同学结婚了", "同事结婚了", "朋友结婚了", "亲戚结婚了", "我要破产了"],
    11: ["我要减肥", "不吃零食", "不吃夜宵", "不喝奶茶", "真香"],
    12: [
        "下决心改变自己",
        "设置目标",
        "制定计划",
        "找人监督",
        "一秒完成从开始到放弃"
    ],
    13: ["喝一点点", "喝coco", "喝鹿角巷", "喝喜茶", "变成肥宅"],
    14: ["尝试养生", "尝试健身", "尝试不再宅", "尝试赚钱", "尝试都失败了"],
    15: ["学习新技能", "进度0%", "进度60%", "进度90%", "一觉醒来,进度0%"],
    16: ["一事无成", "家里拆迁", "暴富离职", "顺利脱单", "和思聪成为好朋友"],
    17: ["认识沙雕朋友", "哈哈哈", "哈哈哈哈哈", "哈哈哈哈哈哈哈", "笑skr人"],
    18: ["高5cm", "瘦10斤", "彩票中奖", "升职", "涨工资"],
    19: ["单身", "还是单身", "继续单身", "一直单身", "彻底单身"],
    20: [
        "集齐五福",
        "抽到花花卡",
        "五福分到巨款",
        "中了花呗大奖",
        "我就是欧皇"
    ],
    21: ["手机配齐", "电脑配齐", "车配齐", "房子配齐", "对象配齐"],
    22: ["有人请吃饭", "又有人请吃饭", "胖三斤", "胖五斤", "胖十斤"],
    23: ["尝试赚钱", "尝试暴富", "尝试自我提升", "尝试优雅的活着", "还活着"],
    24: ["想要好身材", "管住嘴迈开腿", "减肥成功", "有马甲线", "走桃花运"],
    25: ["沉迷学习", "日渐消瘦", "渐消瘦", "消瘦", "瘦"]
};
var setAd = function() {
    var platform = phonePlatform();
    platform = platform == "iphone" ? "iphone" : "android";
    var adRandom = Math.floor(Math.random() * adData.length);
    var url = adData[adRandom][platform];
    var adBox = $("#adImgBox");
    adBox.attr("href", url);
    if (adRandom == 0) {
        adBox.attr("onclick", 'MtaH5.clickStat("1")');
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
function getQuery() {
    var href = window.location.href;
    var query = href.split("?")[1];
    var res = {};
    if (query && query.length > 0) {
        var qarr = query.split("&");
        if (qarr && qarr.length > 0) {
            qarr.map(function(item) {
                var iarr = item.split("=");
                res[iarr[0]] = iarr[1];
            });
        }
    }
    return res;
}

function drawImage() {
    html2canvas(document.querySelector("#showImgBox"), {
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
        img.onload = function() {
            $("#showImgBox").html("");
            $("#showImgBox").html(
                '<img class="canvasimg" src="' + img.src + '" />'
            );
            $("#imgLayerBox").html("");
            $("#imgLayerBox").html(
                '<img class="canvasimg"  src="' + img.src + '" />'
            );
            $.ajax({
                type: "post",
                url: "http://www.bxwjt.cn/api.php",
                data: {
                    title: "2019会发生的五件事",
                    desc: "2019会发生的五件事_five",
                    image: img.src,
                    act: "set"
                },
                success: function(res) {
                    var resData = JSON.parse(res);
                    if (resData && resData.code == "0000") {
                        wx.ready(function() {
                            var domain = getDomain();
                            var shareData = {
                                title:
                                    "2019会发生的五件事 | 惊了，这是我2019会发生这五件事！快来围观吧！",
                                // desc:
                                //     "惊了，这是我2019会发生这五件事！快来围观吧！",
                                link: domain + "/show.html?id=" + resData.id,
                                imgUrl: domain + "/images/five_logo.jpg",
                                success: function(res) {
                                    console.log(res);
                                }
                            };
                            wx.updateAppMessageShareData(shareData);
                            wx.updateTimelineShareData(shareData);
                            wx.onMenuShareAppMessage(shareData);
                            wx.onMenuShareTimeline(shareData);
                        });
                        // window.history.replaceState(
                        //     null,
                        //     "2019会发生的五件事五件事",
                        //     "./show.html?id=" + resData.id
                        // );
                    }
                }
            });
        };
    });
}
function setQrcode() {
    new QRCode(document.getElementById("qrcodeBox"), {
        text: window.location.href.replace("_end", "_start")
        // width: 76,
        // height: 76
    });
    setTimeout(
        function() {
            drawImage();
        }.bind(this),
        100
    );
}
$(function() {
    setQrcode();
    var name = getQuery().name;
    $("#userName").html(decodeURI(name));
    var randomNumber;
    if (window.localStorage.getItem(encodeURI(name)) != undefined) {
        randomNumber = window.localStorage.getItem(encodeURI(name));
    } else {
        randomNumber = Math.floor(Math.random() * Object.keys(data).length);
        window.localStorage.setItem(encodeURI(name), randomNumber);
    }

    var renderDom = [];

    data[randomNumber].map(function(item, index) {
        renderDom.push(
            '<div class="over-item">' +
                '<div class="name">' +
                (index + 1) +
                "." +
                item +
                "</div>" +
                '<img src="./images/five_over.png" class="icon-cover" />' +
                "</div>"
        );
    });
    $("#renderBox").html(renderDom.join(""));

    var cont = $("#content");
    var ww = document.body.clientWidth;
    var x = (ww / 375) * 21;
    cont.css({
        marginLeft: x + "px",
        marginRight: x + "px",
        top: 0 - x - 5 + "px"
    });
    $("#saveLayerBox").on("click", function() {
        $(this).css("display", "none");
        $("html,body").css({
            overflow: "auto"
        });
    });

    $("#shareLayer").on("click", function() {
        $(this).removeClass("show");
    });
    $("#ShareBtn").on("click", function() {
        $("#shareLayer").addClass("show");
    });
    $("#saveBtn").on("click", function() {
        $("#saveLayerBox").css("display", "block");
        $("html,body").css({
            overflow: "hidden"
        });
        var imglayer = $("#imgLayerBox");
        if (imglayer.html().length <= 0) {
        }
    });
    $("#frashBtn").on("click", function() {
        window.location.replace("./five_start.html");
    });
});
