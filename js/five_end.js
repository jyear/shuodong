var data = {
    0: ["恋爱", "恢复单身", "单身", "继续单身", "成为单身大佬"],
    1: ["恋爱", "失恋", "把恋爱经历写成小说", "小说大卖", "成为知名作家"],
    2: ["恋爱", "热恋", "开始厌烦", "持续厌烦", "恢复单身"],
    3: ["被星探挖掘", "入团出道", "单飞", "身价上亿", "退圈"],
    4: ["被星探挖掘", "成为练习生", "磕磕绊绊出道", "不温不火", "退圈转行"],
    5: ["一夜暴富", "吃吃吃", "买买买", "肉变多了", "钱花完了"],
    6: ["一夜暴富", "创业投资", "突然破产", "东山再起", "写出自传"],
    7: [
        "被朋友催婚",
        "被父母催婚",
        "被亲戚催婚",
        "一直被催婚",
        "从未停止被催婚"
    ],
    8: ["被催婚", "无奈相亲", "遇见真爱", "每天撒狗粮", "被催生孩子"],
    9: [
        "被嘲单身狗",
        "恋爱脱单",
        "陷入三角恋关系",
        "陷入四角恋关系",
        "看破红尘,出家静修"
    ],
    10: [
        "被嘲单身狗",
        "继续沉迷工作",
        "继续沉迷游戏",
        "继续沉迷自己的小爱好",
        "依然单身"
    ],
    11: ["加班", "又加班", "再次加班", "拿到加班费了", "我还能继续加班"],
    12: ["学习", "热爱学习", "沉迷学习", "成绩变好", "我爱学习"],
    13: ["吃", "吃吃", "吃吃吃", "吃吃吃吃", "吃不胖"],
    14: [
        "去好吃的地方旅游",
        "去好玩的地方旅游",
        "去好风景的地方旅游",
        "去梦想中的城市旅游",
        "去喜欢的人所在地旅游"
    ],
    15: ["反思自己", "充实自己", "做自由职业", "赚不到钱", "老实打工搬砖"],
    16: [
        "反思自己",
        "我行我素",
        "深夜反思自己",
        "依然我行我素",
        "活得和2018一样"
    ],
    17: ["恋爱X1", "恋爱X2", "恋爱X3", "恋爱X4", "单身"],
    18: [
        "穷了一个春季",
        "穷了一个夏季",
        "穷了一个秋季",
        "穷了一个冬季",
        "完成大穷鬼成就"
    ],
    19: ["节食减肥", "运动减肥", "养生减肥", "我就不吃", "成功变瘦变美"],
    20: ["热爱生活", "努力工作", "遇到真爱", "旅行读书", "人生圆满"],
    21: ["尝试养生", "尝试健身", "尝试不再宅", "尝试赚钱", "尝试都失败了"],
    22: ["学习新技能", "进度0%", "进度60%", "进度90%", "一觉醒来,进度0%"],
    23: ["无所事事", "家里拆迁", "暴富离职", "顺利脱单", "和思聪成为好朋友"],
    24: ["去旅游", "偶遇暗恋对象", "被告白", "陷入热恋", "顺利脱单"],
    25: ["高5cm", "瘦10斤", "彩票中奖", "升职", "涨工资"],
    26: ["单身", "还是单身", "继续单身", "一直单身", "彻底单身"],
    27: ["学习", "充电", "拿证", "涨薪", "升职"],
    28: ["旅游", "偶遇前任", "被表白", "无情拒绝", "大仇得报"],
    29: ["恋爱", "热恋", "开始厌烦", "持续厌烦", "恢复单身"],
    30: ["有人请吃饭", "又有人请吃饭", "胖三斤", "胖五斤", "胖十斤"],
    31: ["尝试赚钱", "尝试暴富", "尝试自我提升", "尝试优雅的活着", "还活着"],
    32: ["下决心减肥", "管住嘴迈开腿", "减肥成功", "有马甲线", "走桃花运"],
    33: ["桃花债上门", "参加非诚勿扰", "牵手成功", "闪婚", "生娃"],
    34: ["沉迷学习", "日渐消瘦", "渐消瘦", "消瘦", "瘦"]
};
var setAd = function() {
    var platform = phonePlatform();
    platform = platform == "iphone" ? "iphone" : "android";
    var adRandom = Math.floor(Math.random() * adData.length);
    var url = adData[adRandom][platform];
    var adBox = $("#adImgBox");
    adBox.attr("href", url);
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
                    title: "2019会发生的五件事五件事",
                    desc: "2019会发生的五件事五件事_five",
                    image: img.src,
                    act: "set"
                },
                success: function(res) {
                    var resData = JSON.parse(res);
                    if (resData && resData.code == "0000") {
                        wx.ready(function() {
                            var domain = getDomain();
                            var shareData = {
                                title: "2019会发生的五件事五件事",
                                desc:
                                    "惊了，这是我2019会发生这五件事！快来围观吧！",
                                link: domain + "/show.html?id=" + resData.id,
                                imgUrl: domain + "/images/five_logo.png",
                                success: function(res) {
                                    console.log(res);
                                }
                            };
                            wx.updateAppMessageShareData(shareData);
                            wx.updateTimelineShareData(shareData);
                        });
                        window.history.replaceState(
                            null,
                            "2019会发生的五件事五件事",
                            "./show.html?id=" + resData.id
                        );
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
