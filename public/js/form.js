$(document).ready(function(){
    var question = 0;

    $($("ol li")).click(function(){
        $("input", this).each(function(){
            if(this.dataset && this.dataset.goto){
                for(var i = question; i < parseInt(this.dataset.goto); i++){
                    $("input", $("ol li")[i]).removeAttr("disabled");
                }
            }
        });
    });

    $("body").css({
        "paddingTop": ($("body")[0].clientHeight / 2 - $($("ol li")[question]).height() / 2) + "px",
        "paddingBottom": ($("body")[0].clientHeight / 2 - $($("ol li")[$("ol li").length - 1]).height() / 2) + "px"
    });

    $("#move i:first-child").click(function(){
        if(question > 0){
            question--;

            $("html, body").animate({
                scrollTop: $($("ol li")[question]).offset().top - parseInt($("body")[0].style.paddingTop.replace("px", "")) + $($("ol li")[question]).height()
            });

            $("input, textarea", $("ol li")[question]).focus();
            $("#progress span").css("width", (question / ($("ol li").length - 1) * 100) + "%");
        }
    });
    $("#move i:last-child").click(function(){
        if(question < $("ol li").length - 1){
            if($("input:checked", $("ol li")[question])[0] && $("input:checked", $("ol li")[question])[0].dataset && $("input:checked", $("ol li")[question])[0].dataset.goto){
                question = parseInt($("input:checked", $("ol li")[question])[0].dataset.goto) - 1;
                $("input", $("ol li")[question - 1]).attr("disabled", "disabled").prop("checked", false);
            }else{
                question++;
            }

            if($("span span", $("ol li")[question]).length)
                $("span span", $("ol li")[question]).text($("input", $("ol li")[$("span span", $("ol li")[question])[0].dataset.answer]).val());
            $("html, body").animate({
                scrollTop: $($("ol li")[question]).offset().top - parseInt($("body")[0].style.paddingTop.replace("px", "")) + $($("ol li")[question]).height()
            });

            $("input, textarea", $("ol li")[question]).focus();
            $("#progress span").css("width", (question / ($("ol li").length - 1) * 100) + "%");
        }

        if(question == $("ol li").length - 1){
            $("input[type=submit]").removeAttr("disabled");
        }
    });

    $("ol li").click(function(){
        var _this = this,
            diff = 0;

        $("ol li").each(function(i){
            if(_this == this){
                diff = i;
                return false;
            }
        });

        if(diff < question){
            for(var i = diff; i < question + 1; i++){
                $("#move i:first-child").click();
            }
        }else if(diff > question){
            for(var i = diff; i > question - 1; i--){
                $("#move i:last-child").click();
            }
        }
    })

    $("input").keyup(function(e){
        if(e.keyCode == 9 || e.keyCode == 13){
            $("#move i:last-child").click();
        }
    });

    $(window).scroll(function(){
        $("ol li.active").removeClass("active");

        $("ol li").each(function(){
            if(
                $("body")[0].clientHeight / 2 - $(this).outerHeight() + this.style.paddingTop <= $(this).offset().top - $(window).scrollTop()
            ){
                $(this).addClass("active");
                return false;
            }
        });
    });
});
