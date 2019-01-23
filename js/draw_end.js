var saveUrl = "";
function setQrcode() {
    new QRCode(
        document.getElementById("qrcodeBox"),
        window.location.href.replace("_end", "_start")
    );
    setTimeout(function() {
        drawImage();
    }, 100);
}
function drawImage() {
    html2canvas(document.querySelector("#imgDom"), {
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
        img.alt = "解签";
        img.className = "canvasimg";
        img.onload = function() {
            document.querySelector("#imgLayerBox").innerHTML = "";
            document.querySelector("#imgLayerBox").innerHTML =
                '<img class="canvasimg" src="' + img.src + '" />';
            document.querySelector("#imgDom").innerHTML = "";
            document.querySelector("#imgDom").innerHTML =
                '<img class="canvasimg" src="' + img.src + '" />';
            document.querySelector("#imgDom").style.paddingBottom = "10px";
            $.ajax({
                type: "post",
                url: "http://app.yjmob.com/api.php",
                data: {
                    title: "新年签",
                    desc: "新年签_draw",
                    image: img.src,
                    act: "set"
                },
                success: function(res) {
                    var data = JSON.parse(res);
                    if (data && data.code == "0000") {
                        window.history.replaceState(
                            null,
                            "新年签",
                            "./show.html?id=" + data.id
                        );
                    }
                }
            });
        };
    });
}
$(function() {
    setQrcode();
    var randomNumber = Math.floor(Math.random() * 18);
    var img = "./images/draw_" + randomNumber + ".png";
    $("#drawText").html('<img src="' + img + '"/>');
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
    //window.history.replaceState(null, "抽签", "./draw_start.html");
});
