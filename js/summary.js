var RenderData = (function($) {
    var defaultOpts = {
        data: {}
    };
    var result = {};
    var newResult = {};
    function renderDataFunction(opts) {
        this.opts = $.extend({}, defaultOpts, opts);
        this.init.call(this);
        return newResult;
    }
    function objectHandler(obj, key) {
        switch (key) {
            case "show":
                $(".page").removeClass("show");
                $("#" + obj[key]).addClass("show");
                if (obj[key] == "step3") {
                    $("html,body").css("background", "#d93534");
                }
                if (obj[key] == "step2") {
                    $("html,body").css("background", "#1b1732");
                }
                break;
            default:
                break;
        }
    }
    renderDataFunction.prototype = {
        constructor: renderData,
        init: function() {
            var data = this.opts.data;
            result = JSON.parse(JSON.stringify(data));
            Object.getOwnPropertyNames(result).forEach(function(k) {
                objectHandler(result, k);
                Object.defineProperty(newResult, k, {
                    get: function() {
                        return result[k];
                    },
                    set: function(value) {
                        result[k] = value;
                        objectHandler(result, k);
                    }
                });
            });
        }
    };
    return renderDataFunction;
})($);

var setAd = function(dom) {
    var platform = phonePlatform();
    platform = platform == "iphone" ? "iphone" : "android";
    var adRandom = Math.floor(Math.random() * adData.length);
    var url = adData[adRandom][platform];
    dom.attr("href", url);
    dom.html(
        '<img src="./images/ad_small' +
            adRandom +
            "." +
            adData[adRandom].imageType +
            '" />'
    );
};

var adBoxs = $(".ad_box");
adBoxs.each(function() {
    setAd($(this));
});

var renderData = new RenderData({
    data: {
        show: "step1"
    }
});
function setQrcode() {
    new QRCode(document.getElementById("qrcodeBox"), window.location.href);
}
var countStep1Btn = function() {
    var w = document.body.clientWidth;
    var h = document.body.clientHeight;
    var start_x = (w / 750) * 270;
    var end_x = (w / 750) * 710;
    var start_y = (h / 1323) * 1140;
    var end_y = (h / 1323) * 1275;
    $("#goStep2Btn").attr(
        "coords",
        start_x + "," + start_y + "," + end_x + "," + end_y
    );
};
var goStep2Btn = function() {
    renderData.show = "step2";
};
var timer = null;
Array.prototype.distinct = function() {
    var arr = this,
        i,
        j,
        len = arr.length;
    for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                len--;
                j--;
            }
        }
    }
    return arr;
};
var scrollTopWhenOpenInput = 0;
var isCanClose = true;
function drawImage() {
    html2canvas(document.querySelector("#willRenderImage"), {
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
        img.src = canvas.toDataURL("image/png");
        img.alt = "解签";
        img.className = "canvasimg";
        img.onload = function() {
            document.querySelector("#imgLayerBox").innerHTML = "";
            document.querySelector("#imgLayerBox").innerHTML =
                '<img class="canvasimg" src="' + img.src + '" />';
            //willRenderImage
            document.querySelector("#willRenderImage").innerHTML = "";
            document.querySelector("#willRenderImage").innerHTML =
                '<img class="canvasimg" src="' + img.src + '" />';
            $.ajax({
                type: "post",
                url: "http://www.bxwjt.cn/api.php",
                data: {
                    title: "年终总结",
                    desc: "年终总结_summary",
                    image: img.src,
                    act: "set"
                },
                success: function(res) {
                    var data = JSON.parse(res);
                    if (data && data.code == "0000") {
                        wx.ready(function() {
                            console.log(222);
                            wx.updateAppMessageShareData({
                                title: "年终总结",
                                desc: "年终总结",
                                link: "./show.html?id=" + data.id,
                                imgUrl: "../images/share.png"
                            });
                            wx.updateTimelineShareData({
                                title: "年终总结",
                                desc: "年终总结",
                                link: "./show.html?id=" + data.id,
                                imgUrl: "../images/share.png"
                            });
                        });
                        // window.history.replaceState(
                        //     null,
                        //     "年终总结",
                        //     "./show.html?id=" + data.id
                        // );
                    }
                }
            });
        };
    });
}

$(function() {
    countStep1Btn();
    setQrcode();
    $("#groupContainer").on("click", ".group-item", function(e) {
        $(this).toggleClass("cur");
    });
    $("#groupContainer").on("touchstart", ".group-item", function(e) {
        setTimeout(function() {
            e.stopPropagation();
            e.preventDefault();
        }, 350);
        if (!timer) {
            timer = setTimeout(
                function() {
                    isCanClose = false;
                    $(this)
                        .addClass("edit")
                        .addClass("cur");
                    $("#InputBoxContent").val($(this).html());
                    scrollTopWhenOpenInput = $("#step2").scrollTop();
                    $("#InputBox").addClass("show");
                    setTimeout(function() {
                        isCanClose = true;
                    }, 1000);
                }.bind(this),
                1000
            );
        }
    });
    $("#InputBoxBG").on("click", function() {
        if (!isCanClose) {
            return;
        }
        $("#InputBox").removeClass("show");
        $(".group-item").removeClass("edit");
        $("#groupContainer .group-add").removeClass("edit");
        $("#step2").scrollTop(scrollTopWhenOpenInput);
        document.activeElement.scrollIntoViewIfNeeded(true);
    });

    $("#InputBoxBtn").on("click", function(e) {
        var _val = $("#InputBoxContent").val();
        if ($("#groupContainer .group-item.edit").length > 0) {
            $("#groupContainer .group-item.edit")
                .html(_val)
                .removeClass("edit");
        } else {
            $('<div  class="group-item cur">' + _val + "</div>").insertBefore(
                $("#groupContainer .group-add.edit")
            );
            $("#groupContainer .group-add.edit").removeClass("edit");
        }
        $("#InputBoxContent").val("");
        //var winH = document.body.clientHeight;
        document.activeElement.scrollIntoViewIfNeeded(true);
        $("#step2").scrollTop(scrollTopWhenOpenInput);
        //.css("height", winH + "px");
        $("#InputBox").removeClass("show");
    });
    $("#groupContainer").on("touchend", ".group-item", function(e) {
        setTimeout(function() {
            e.stopPropagation();
            e.preventDefault();
        }, 350);
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    });
    $("#groupContainer").on("click", ".group-add", function() {
        isCanClose = true;
        $(this).addClass("edit");
        scrollTopWhenOpenInput = $("#step2").scrollTop();
        document.activeElement.scrollIntoViewIfNeeded(true);
        $("#InputBox").addClass("show");
    });
    $("#goStep3Btn").on("click", function() {
        var list = $("#groupContainer .group-item.cur");
        var stringArr = [];
        var textArr = [];
        list.each(function(index, item) {
            var text = item.innerHTML;
            stringArr.push(text);
        });
        if (!stringArr || stringArr.length <= 0) {
            alert("请选择你的总结");
            return;
        }
        stringArr.distinct().map(function(item, index) {
            textArr.push(
                '<div class="summary-item">' +
                    '<div class="st">' +
                    (index + 1) +
                    "." +
                    item +
                    "</div>" +
                    '<div class="si">' +
                    ' <img src="./images/summary_s3.png" />' +
                    " </div>" +
                    "</div>"
            );
        });
        $("#innerList").html(textArr.join(""));
        renderData.show = "step3";
        setTimeout(function() {
            drawImage();
        }, 100);
    });
    var h = document.body.clientHeight;
    $("#innerBox").css("min-height", h - 230 + "px");
    //生成图片
    $("#saveBtn").on("click", function(e) {
        e.stopPropagation();
        var saveBox = $("#saveBox");
        $("html,body,#step3").css({
            overflow: "hidden"
        });
        var imglayer = $("#imgLayerBox");
        saveBox.addClass("show");
        if (imglayer.html().length > 0) {
            return;
        }
    });
    $("#saveBox").on("click", function(e) {
        e.stopPropagation();
        $(this).removeClass("show");
        $("html,body").css({
            overflow: "auto"
        });
    });
    $("#shareBtn").on("click", function(e) {
        e.stopPropagation();
        $("#shareLayer").addClass("show");
    });
    $("#shareLayer").on("click", function(e) {
        e.stopPropagation();
        $(this).removeClass("show");
    });
});
