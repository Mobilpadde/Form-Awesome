$(document).ready(function(){
    var i = 0;
    $("#create li").click(function(){
        var li = $("<li>").insertBefore($("#create").parent()),
            span = $("<span>").appendTo(li);

        $("<input type='text' value='Title of field' name='" + this.dataset.create + "-" + i + "'>").appendTo(span);
        switch(this.dataset.create){
            case "text":
                $(li).addClass("text");
                $("<input type='text' disabled value='This field is for user input only'>").appendTo(li);
                break;
            case "bigtext":
                $(li).addClass("bigtext");
                $("<textarea disabled name=''>").text("This field is for user input only").appendTo(li);
                break;
            case "choice":
                $(li).addClass("choice");
                $("<input type='range' min='2' max='25' value='2' name='numChoice-" + i +"'>").appendTo(li);
                $("<label>Single choice? <input type='checkbox' name='singleChoice-" + i +"'>").appendTo(li);
                $("<input type='text' value='Answer 1'>").appendTo(li);
                $("<input type='text' value='Answer 2'>").appendTo(li);
                break;
            case "scale":
                $(li).addClass("scale");
                $("<input type='range' min='2' max='16' value='2' name='numScale-" + i +"'>").appendTo(li);
                $("<label>Zero-based? <input type='checkbox' checked name='zeroScale-" + i +"'>").appendTo(li);
                var scale = $("<div class='scale'>").appendTo(li);
                $("<input type='radio' disabled data-points='0'>").appendTo(scale);
                $("<input type='radio' disabled data-points='1'>").appendTo(scale);
                break;
            case "rating":
                $(li).addClass("rating stars");
                $("<input type='range' min='2' max='10' value='2' name='numRating-" + i +"'>").appendTo(li);
                var select = $("<select name='classRating-" + i +"'>").appendTo(li);
                $("<option value='stars'>Stars</option>").appendTo(select);
                $("<option value='tup'>Thumbs up</option>").appendTo(select);
                $("<option value='battery'>Battery</option>").appendTo(select);
                $("<option value='smiley'>Smiley</option>").appendTo(select);
                var scale = $("<div class='scale'>").appendTo(li);
                $("<input type='radio' disabled data-points='1'>").appendTo(scale);
                $("<input type='radio' disabled data-points='2'>").appendTo(scale);
                break;
        }
        $("<input class='remove' type='button' value='Remove'>").appendTo(li);
        i++;
    });

    $(document).on("click", "ol li .remove", function(){
        $($(this).parent()).remove();
    });

    $(document).on("change", ".choice input[type='range']", function(){
        var remove = $(".remove", $(this).parent()).remove();
        if(this.value < $("input[type='text']", $(this).parent()).length){
            for(var i = $("input[type='text']", $(this).parent()).length - 1; i >= this.value; i--){
                $($("input[type='text']", $(this).parent())[i + 1]).remove();
            }
        }else{
            for(var i = $("input[type='text']", $(this).parent()).length; i <= this.value; i++){
                $("<input type='text' value='Answer " + i + "'>").appendTo($(this).parent());
            }
        }
        $(remove).appendTo($(this).parent());
    });

    $(document).on("change", ".scale input[type='range'], .rating input[type='range']", function(){
        var remove = $(".remove", $(this).parent()).remove(),
            len = $("input[type='radio']", $(this).parent()).length;
        if(this.value < len){
            for(var j = len - 1; j >= this.value; j--){
                $($("input[type='radio']", $(this).parent())[j]).remove();
            }
        }else{
            for(var j = len + ($(this).parent().hasClass("rating") ? 1 : 0); j <= this.value; j++){
                $("<input type='radio' disabled data-points='" + j + "'>").appendTo($(".scale", $(this).parent()));
            }
        }
        $("input[type='radio']:checked").removeAttr("checked");
        $("input[type='radio']:last-child").attr("checked", "checked");
        $(remove).appendTo($(this).parent());
    });

    $(document).on("click", ".scale input[type='checkbox']", function(){
        if($(this).is(":checked")) $("<input type='radio' disabled data-points='0'>").prependTo($(".scale", $(this).parent().parent()));
        else $("input[data-points='0']", $(this).parent().parent()).remove();
    });

    $(document).on("change", ".rating select", function(){
        $(this).parent().removeClass().addClass("rating " + $(this).val());
    });
});
