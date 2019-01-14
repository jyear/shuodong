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
            text: "张三丰",
            isChecked: false,
            id: 0
        },
        {
            text: "张三丰",
            isChecked: false,
            id: 0
        },
        {
            text: "张三丰",
            isChecked: false,
            id: 0
        },
        {
            text: "张三丰",
            isChecked: false,
            id: 0
        },
        {
            text: "张三丰",
            isChecked: false,
            id: 0
        }
    ],
    checkedData: []
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
                if (data && data.length > 0) {
                    data.map(function(item, index) {
                        res.push(
                            '<div class="checked-item" data-index="checkeditem_' +
                                index +
                                '">' +
                                '<div class="text">' +
                                item.text +
                                "</div>" +
                                '<div class="delete">x</div>' +
                                "</div>"
                        );
                    });
                }
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
        $("#checkedNumber").html(newCheckList.length);
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
        var _idx = _me.attr("data-index");
        let list = renderObj.checkedData;
        list.splice(_idx, 0);
        renderObj.checkedData = JSON.parse(JSON.stringify(list));
    });
    $("#goStep2").on("click", function() {
        renderObj.show = "step2";
    });
});
