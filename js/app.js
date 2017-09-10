/**
 * Created by wolf on 2017/9/10.
 */

$(function(){
    $(window).on('load', function(){
        var dataImg = {
            "data" : [
                {
                    "src" : "1.jpg"
                },
                {
                    "src" : "2.jpg"
                },
                {
                    "src" : "3.jpg"
                },
                {
                    "src" : "5.jpg"
                },
                {
                    "src" : "6.jpg"
                },
                {
                    "src" : "8.jpg"
                }

            ]
        };

        imgLocation();
        $(window).scroll(function(){
            if(scrollside()){
                $.each(dataImg.data, function(index, value){
                    var imgBox = $('<div>').addClass('img-box').appendTo($('#container'));

                    var content = $('<div>').addClass('content').appendTo(imgBox);

                    $('<img>').attr('src', './img/'+ value.src).appendTo(content);

                    imgLocation();
                });
            }
        });
    });

});

// 判断加载图片时机
function scrollside(){
    var box = $('.img-box');

    // 获取最后一个图片容器一半距离屏幕顶部距离
    var lastBoxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);

    // 获取当前容器的高度
    var docHeight = $(document).height();

    // 获取垂直滚动的距离  即当前滚动的地方的窗口顶端到整个页面顶端的距离
    var scrollHeight = $(window).scrollTop()

    return (lastBoxHeight < scrollHeight + docHeight) ? true : false;
}

// 计算图片摆放位置
function imgLocation(){
    var box = $('.img-box');

    // 每个盒子宽度
    var boxWidth = box.eq(0).width();

    // 每排显示盒子个数
    var num = Math.floor($(window).width() / boxWidth);
    // 存放每排盒子的高度
    var boxArr = [];
    box.each(function(index, value){
        var boxHeight = $(value).height();

        // 如果是第一排
        if(index < num){
            boxArr[index] = boxHeight;
        }
        // 第二排
        else {
            // 获取数组中的最小高度
            var minBoxHeight = Math.min.apply(null, boxArr);
            // 获取最小高度位置：类似于 indexOf
            var minBoxIndex = $.inArray(minBoxHeight, boxArr);

            $(value).css({
                "position" : "absolute",
                "top"      : minBoxHeight + 'px',
                "left"     : box.eq(minBoxIndex).position().left + 'px'
            })

            // 记录第一排高度
            boxArr[minBoxIndex] += box.eq(index).height();
        }
    });

}











