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
        iphone: "https://itunes.apple.com/cn/app/id1447476387"
    }
];
