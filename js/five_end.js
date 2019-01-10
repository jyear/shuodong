$(function() {
    var cont = $("#content");
    var ww = document.body.clientWidth;
    var x = (ww / 375) * 21;
    cont.css({
        marginLeft: x + "px",
        marginRight: x + "px",
        top: 0 - x - 5 + "px"
    });

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
        img.className = "canvasimg";
        img.onload = function() {
            $("#renderingBox").remove();
            document.querySelector("#showImgBox").innerHTML = "";
            document.querySelector("#showImgBox").appendChild(img);
        };
    });
});
