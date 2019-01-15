function setTime() {
    var now = new Date();
    var to = new Date("2019-2-4 23:59:59");
    var s = to.getTime() - now.getTime();
    var res = {};
    let day = s / (1000 * 60 * 60 * 24);
    res.day = Math.floor(day);
    res.hours = Math.floor((s / (1000 * 60 * 60)) % 24);
    res.mins = Math.floor((s / (1000 * 60)) % 60);
    res.secs = Math.floor((s / 1000) % 60);
    res.day = res.day > 10 ? res.day : "0" + res.day;
    res.hours = res.hours >= 10 ? res.hours : "0" + res.hours;
    res.mins = res.mins >= 10 ? res.mins : "0" + res.mins;
    res.secs = res.secs >= 10 ? res.secs : "0" + res.secs;
    return res;
}

var time = setTime();
var renderObj = {
    show: "step1",
    date: time,
    showTab: "tab1",
    tabData: [
        {
            text: "张三丰",
            isChecked: false,
            id: 0
        },
        {
            text: "张三丰1",
            isChecked: false,
            id: 0
        },
        {
            text: "张三丰2",
            isChecked: false,
            id: 0
        },
        {
            text: "张三丰3",
            isChecked: false,
            id: 0
        },
        {
            text: "张三丰4",
            isChecked: false,
            id: 0
        },
        {
            text: "张三丰5",
            isChecked: false,
            id: 0
        }
    ],
    checkedData: [],
    userName: ""
};
var newObject = {};
var lookRenderObj = function() {
    function objectHandler(obj, key) {
        switch (key) {
            case "show":
                $(".page").removeClass("show");
                $("#" + obj[key]).addClass("show");
                break;
            case "showTab":
                $(".tab").removeClass("show");
                $("#" + obj[key]).addClass("show");
                break;
            case "date":
                var date = obj[key];
                for (var k in date) {
                    $("#" + k + "Number").html(date[k]);
                }
                break;
            case "tabData":
                var data = obj[key];
                var res = [];
                if (data && data.length > 0) {
                    data.map(function(item, index) {
                        res.push(
                            '<div class="checktab-item" data-index="item_' +
                                index +
                                '">' +
                                '<div class="text">' +
                                (index + 1) +
                                "." +
                                item.text +
                                "</div>" +
                                '<div class="checkbox">' +
                                (item.isChecked
                                    ? '<img src="./images/flag_check.png" />'
                                    : "") +
                                "</div>" +
                                "</div>"
                        );
                    });
                }
                $("#checkBox").html(res.join(""));
                break;
            case "checkedData":
                var data = obj[key];
                var res = [];
                var imgList = [];
                if (data && data.length > 0) {
                    data.map(function(item, index) {
                        res.push(
                            '<div class="checked-item">' +
                                '<div class="text">' +
                                item.text +
                                "</div>" +
                                '<div class="delete" data-index="checkeditem_' +
                                index +
                                '">x</div>' +
                                "</div>"
                        );
                        imgList.push(
                            '<div class="item">' +
                                (index + 1) +
                                "." +
                                item.text +
                                "</div>"
                        );
                    });
                }
                $("#FlagList").html(imgList.join(""));
                $("#checkedNumber").html(data.length);
                $("#checkedBox").html(res.join(""));
                break;
        }
    }
    var newObject = renderObj ? JSON.parse(JSON.stringify(renderObj)) : {};
    delete renderObj;
    window.renderObj = {};
    Object.getOwnPropertyNames(newObject).forEach(
        function(k) {
            objectHandler(newObject, k);
            Object.defineProperty(renderObj, k, {
                get: function() {
                    return newObject[k];
                },
                set: function(value) {
                    newObject[k] = value;
                    objectHandler(newObject, k);
                }
            });
        }.bind(this)
    );
};
var flagData = new lookRenderObj();
$(function() {
    setInterval(
        function() {
            renderObj.date = setTime();
        }.bind(this, 1000)
    );
    //renderObj.show = "step3";
    $("#checkBox").on("click", ".checktab-item", function() {
        var _me = $(this);
        var _idx = _me.attr("data-index").split("_")[1];
        var list = renderObj.tabData;
        var checkList = renderObj.checkedData;
        list[_idx].isChecked = !list[_idx].isChecked;
        var newCheckList = [];
        if (!list[_idx].isChecked) {
            newCheckList = checkList.filter(function(item) {
                if (item.text != list[_idx].text) {
                    return item;
                }
            });
        } else {
            checkList.push(list[_idx]);
            newCheckList = checkList;
        }

        renderObj.tabData = JSON.parse(JSON.stringify(list));
        renderObj.checkedData = JSON.parse(JSON.stringify(newCheckList));
    });
    $("#tabHeader").on("click", function() {
        if (renderObj.showTab == "tab1") {
            renderObj.showTab = "tab2";
            $("#step2 .top").addClass("show");
        } else {
            renderObj.showTab = "tab1";
            $("#step2 .top").removeClass("show");
        }
    });
    $("#checkedBox").on("click", ".delete", function() {
        var _me = $(this);
        var _idx = _me.attr("data-index").split("_")[1];
        let list = renderObj.checkedData;
        list.splice(_idx, 1);
        renderObj.checkedData = JSON.parse(JSON.stringify(list));
    });
    $("#goStep2").on("click", function() {
        renderObj.show = "step2";
    });
    $("#customerAddBtn").on("click", function() {
        var _input = $("#inputBox");
        var _value = _input[0].value;
        if (_value.trim().length <= 0) {
            return;
        }
        var list = renderObj.checkedData;
        var isHave = false;
        for (var i = 0, l = list.length; i < l; i++) {
            if (list[i].text == _value.trim()) {
                isHave = true;
                break;
            }
        }
        if (isHave) {
            return;
        }

        list.push({
            text: _value.trim()
        });
        renderObj.checkedData = JSON.parse(JSON.stringify(list));
    });
    //生成图片
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
    $("#step3Btn").on("click", function() {
        var _value = $("#userNameInput")[0].value.trim();
        if (_value.length <= 0) {
            return;
        }
        renderObj.show = "step5";
        renderObj.userName = _value;
        $("#userNameText").html(renderObj.userName);
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var mins = date.getMinutes();
        $("#flagTime").html(
            "立于" + year + "/" + month + "/" + day + "/ " + hours + ":" + mins
        );
    });
    $("#step2Btn").on("click", function() {
        if (renderObj.checkedData.length <= 0) {
            return;
        }
        renderObj.show = "step3";
    });
});
