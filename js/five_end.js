$(function() {
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
                };
            });
        }
    });
});
