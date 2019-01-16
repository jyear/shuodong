$(function() {
    var randomNumber = Math.floor(Math.random() * 12);
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
});
