var phonePlatform = function() {
    var agent = navigator.userAgent.toLocaleLowerCase();
    var result;
    if (agent.indexOf("android") != -1) {
        result = "android";
    }
    if (agent.indexOf("iphone") != -1) {
        result = "iphone";
    }
    if (agent.indexOf("ipad") != -1) {
        result = "ipad";
    }
    return result;
};
var adData = [
    {
        android: "https://www.pgyer.com/TTP0",
        iphone: "https://itunes.apple.com/cn/app/id1447476387",
        imageType: "png"
    },
    {
        android: "https://www.pgyer.com/TTP0",
        iphone: "https://itunes.apple.com/cn/app/id1447476387",
        imageType: "gif"
    }
];

var getDomain = function() {
    var s = window.location.href;
    var str = s.substr(0, s.lastIndexOf("/"));
    return str;
};
var getConfig = function() {
    $.ajax({
        type: "post",
        url: "http://www.bxwjt.cn/api.php",
        data: {
            act: "config",
            url: window.location.href
        },
        success: function(res) {
            var resData = JSON.parse(res);
            if (resData && resData.code == "0000") {
                var data = resData.data;
                wx.config({
                    debug: true,
                    appId: data.appId,
                    timestamp: parseInt(data.timestamp, 10),
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: [
                        "checkJsApi",
                        "updateAppMessageShareData",
                        "updateTimelineShareData"
                    ]
                });
            }
        }
    });
};
getConfig();
wx.error(function(err) {
    console.log("error:", err);
});
