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

var renderData = new RenderData({
    data: {
        show: "step1"
    }
});
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
$(function() {
    //renderData.show = "step3";
    countStep1Btn();
    $("#groupContainer").on("touchstart", ".group-item", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass("cur");
        if (!timer) {
            timer = setTimeout(
                function() {
                    $(this)
                        .addClass("edit")
                        .addClass("cur");
                    $("#InputBoxContent").val($(this).html());
                    $("#InputBox").addClass("show");
                }.bind(this),
                1000
            );
        }
    });
    $("#InputBoxBtn").on("click", function() {
        var _val = $("#InputBoxContent").val();
        if ($("#groupContainer .group-item.edit").length > 0) {
            $("#groupContainer .group-item.edit")
                .html(_val)
                .removeClass("edit");
        } else {
            $('<div  class="group-item">' + _val + "</div>").insertBefore(
                $("#groupContainer .group-add.edit")
            );
            $("#groupContainer .group-add.edit").removeClass("edit");
            $("#InputBoxContent").val("");
        }
        $("#InputBox").removeClass("show");
    });
    $("#groupContainer").on("touchend", ".group-item", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    });
    $("#groupContainer").on("click", ".group-add", function() {
        $(this).addClass("edit");
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
    });
    var h = document.body.clientHeight;
    $("#innerBox").css("min-height", h - 150 + "px");
    //生成图片
    $("#saveBtn").on("click", function(e) {
        e.stopPropagation();
        var saveBox = $("#saveBox");
        $("html,body").css({
            overflow: "hidden"
        });
        var imglayer = $("#imgLayerBox");
        saveBox.addClass("show");
        if (imglayer.html().length > 0) {
            return;
        }
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
                document.querySelector("#imgLayerBox").appendChild(img);
            };
        });
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
