var data = {
    0: ["恋爱", "结婚", "生孩子", "养一只猫", "养一只狗"],
    1: ["辛勤工作", "事业上升", "突然破产", "中1500万大奖", "成为人生赢家"],
    2: ["胖30斤", "下决心减肥", "成为健身达人", "进军模特界", "创立潮牌"],
    3: ["桃花债上门", "参加非诚勿扰", "牵手成功", "闪婚", "生娃"],
    4: ["摄影", "钻研摄影", "继续钻研摄影", "成为知名摄影师", "环球旅拍"],
    5: ["恋爱", "恢复单身", "单身", "继续单身", "成为单身大佬"],
    6: ["被星探挖掘", "入团出道", "单飞", "身价上亿", "退圈"],
    7: ["一夜暴富", "突然破产", "重新创业", "身家过亿", "写成自传"],
    8: ["被朋友催婚", "被父母催婚", "被亲戚催婚", "一直被催婚", "从未停止"],
    9: [
        "被嘲单身狗",
        "恋爱脱单",
        "陷入三角恋关系",
        "陷入四角恋关系",
        "看破红尘，出家静修"
    ],
    10: ["恋爱", "热恋", "开始厌烦", "持续厌烦", "恢复单身"],
    11: ["恋爱", "恋爱", "把恋爱经历写成小说", "小说大卖", "成为知名作家"],
    12: ["工作", "工作", "工作", "工作", "工作"],
    13: ["吃", "吃吃", "吃吃吃", "吃吃吃吃吃", "吃不胖"],
    14: ["旅游", "旅游", "旅游", "旅游", "旅游"],
    15: ["反思自己", "充实自己", "做自由职业", "赚不到签", "老实打工搬砖"],
    16: ["恋爱", "恋爱", "恋爱", "恋爱", "单身"],
    17: ["犯桃花", "犯桃花", "犯桃花", "犯桃花", "成为情感专家"],
    18: ["穷", "穷", "穷", "穷", "大穷鬼"],
    19: ["减肥", "减肥", "减肥", "狂吃", "胖十斤"],
    20: ["赚钱", "暴富", "各种应酬", "尝试养生", "胖30斤"],
    21: ["热爱生活", "努力工作", "遇到真爱", "旅行读书", "人生圆满"],
    22: ["尝试养生", "尝试健身", "尝试不再宅", "尝试赚钱", "尝试都失败了"],
    23: ["涨粉", "涨粉", "涨粉", "涨粉", "超级大V"],
    24: ["无聊煎熬", "家里拆迁", "暴富离职", "顺利脱单", "和思聪成为好朋友"],
    25: ["去旅游", "偶遇暗恋对象", "被告白", "陷入热恋", "顺利脱单"],
    26: ["高5cm", "瘦5斤", "彩票中奖", "升职", "涨工资"],
    27: ["单身", "还是单身", "继续单身", "一直单身", "彻底单身"],
    28: ["学习", "充电", "拿证", "涨薪", "升职"],
    29: ["去马尔代夫", "去韩国", "去日本", "去瑞士", "去迪拜"],
    30: ["旅游", "偶遇爱豆", "被表白", "恋爱", "被求婚"],
    31: ["恋爱", "热恋", "开始厌烦", "持续厌烦", "恢复单身"],
    32: ["有人请吃饭", "又有人请吃饭", "胖三斤", "胖五斤", "胖十斤"],
    33: ["尝试赚钱", "尝试暴富", "尝试自我提升", "尝试优雅的活着", "活着"]
};
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
function setQrcode() {
    new QRCode(document.getElementById("qrcodeBox"), {
        text: window.location.href.replace("_end", "_start"),
        width: 76,
        height: 76
    });
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
        img.alt = "新年五件事";
        img.className = "canvasimg";
        img.onload = function() {
            document.querySelector("#imgLayerBox").innerHTML = "";
            document.querySelector("#imgLayerBox").appendChild(img);
            console.log($);
            $.ajax({
                type: "post",
                url: "http://app.yjmob.com/api.php",
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                data: {
                    title: "2019会发生的五件事五件事",
                    desc: "2019会发生的五件事五件事",
                    image: img.src
                },
                function(res) {
                    console.log(res);
                    //window.history.replaceState(null, "五件事", "./five_start.html");
                }
            });
        };
    });
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
