var sex = 0;
$(function() {
    $("#sexBox").on("click", ".label", function() {
        var _me = $(this);
        var _i = _me.children(".icon")[0];
        var _cls = $(_i).attr("class");
        var sib = _me.siblings(".label");
        sex = _me.attr("data-sex");
        sib.children(".icon")
            .removeClass("checked")
            .addClass("uncheck");
        if (_cls.indexOf("checked") == -1) {
            $(_i)
                .removeClass("uncheck")
                .addClass("checked");
        }
    });
    $("#submitBtn").on("click", function() {
        var name = $("#userName")
            .val()
            .trim();
        if (!name || name.length <= 0) {
            alert("姓名不能为空！");
            return;
        }
        window.location.replace("./five_end.html?name=" + encodeURI(name));
    });
});
