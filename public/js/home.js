$(document).ready(function(){
    var h3 = $("#fullCenter h3").text().split(""), h3I = 0,
        h5 = $("#fullCenter h5").text().split(""), h5I = 0,
        typeSpeed = 75,
        changeSpeed = 750;

    $("#fullCenter h3").text("");
    $("#fullCenter h5").text("");

    $("#fullCenter a").hide();

    $("#overlay").css("display", "none");
    $("#fullCenter").css("display", "block");

    var h3Func = function(){
        $("#fullCenter h3").text($("#fullCenter h3").text() + h3[h3I++]);
        if(h3I == h3.length){
            setTimeout(h5Func, changeSpeed);
        }else setTimeout(h3Func, typeSpeed);
    },
        h5Func = function(){
            $("#fullCenter h5").text($("#fullCenter h5").text() + h5[h5I++]);
            if(h5I == h5.length){
                setTimeout(function(){
                    $("body").css({
                        "background-color": "#fafafa",
                        "color": "#1a1a1a"
                    });
                    $("#bg").css("background", "url(/imgs/FormAwesome.gif)");
                    $("#fullCenter a").fadeIn(changeSpeed);
                    $("#fullCenter h1, #fullCenter a").addClass("show");
                }, changeSpeed);
            }else setTimeout(h5Func, typeSpeed);
        };

    setTimeout(h3Func, typeSpeed);

    $(document).keyup(function(){
        typeSpeed = 0;
        changeSpeed = 0;
    }).click(function(){
        typeSpeed = 0;
        changeSpeed = 0;
    })
});
