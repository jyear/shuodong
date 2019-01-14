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
    date: time
};
var newObject = {};
var lookRenderObj = function() {
    function objectHandler(obj, key) {
        switch (key) {
            case "show":
                $(".page").removeClass("show");
                $("#" + obj[key]).addClass("show");
                break;
            case "date":
                var date = obj[key];
                for (var k in date) {
                    $("#" + k + "Number").html(date[k]);
                }
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
    //时间显示
    setInterval(
        function() {
            renderObj.date = setTime();
        }.bind(this, 1000)
    );
    renderObj.show = "step2";
});
