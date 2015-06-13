var page = 1;
$('#category').change(function () {
    page = 1;
    $('#foodlist').empty();
    getFoodList(page);
})
$('#element').change(function () {
    page = 1;
    $('#foodlist').empty();
    getFoodList(page);
})
$('#rank').change(function () {
    page = 1;
    $('#foodlist').empty();
    getFoodList(page);
})
function getMoreFoodList(){
    page = page + 1 ;
    getFoodList(page);
};
function getFoodList(page) {
    var categoryID = $('#category').val();
    var elementID = $('#element').val();
    var rank = $('#rank').val();
    $.ajax({
        type: "GET",
        async:false,
        dataType: "jsonp",
        
        url: "http://192.168.199.246:3000/getfood?category="+categoryID+"&&element="+elementID+"&&rank="+rank+"&&page="+page,
        //demo: localhost:3000/getfood?category=2&&element=Fe&&rank=down&&page=1
        //http://localhost:3000/getfood?category=2&&element=Fe&&rank=down&&page=1
        
        success: function(msg){
            
            var index = 0;
            if (msg[0]==null) {
                $("#afui").popup("没有数据啦！");
            }else{
                while(msg[index]!=null){
                    var element = msg[index];
                    var detail1 = "热量："+element.heat+"&nbsp;&nbsp;&nbsp;&nbsp;脂肪："+element.fat+"&nbsp;&nbsp;&nbsp;&nbsp;蛋白质："+element.protein;
                    var detail2 = "维他命B1："+element.vitaminB1+"&nbsp;&nbsp;&nbsp;&nbsp;维他命B2："+element.vitaminB2;
                    var detail3 = "维他命C："+element.vitaminC+"&nbsp;&nbsp;&nbsp;&nbsp;维他命E："+element.vitaminE;
                    var detail4 = "铁："+element.Fe+"&nbsp;&nbsp;&nbsp;&nbsp;锌："+element.Zn+"&nbsp;&nbsp;&nbsp;&nbsp;硒："+element.Se;
                    var detail5 = "&nbsp;&nbsp;&nbsp;&nbsp;（单位：g/500g食材）";
                    $('#foodlist').append($("<div class='card'><h1 class='info'>"+element.name+"</h1><p>"+detail1+"</p><p>"+detail2+"</p><p>"+detail3+"</p><p>"+detail4+"</p><p>"+detail5+"</p></div>"));
                    index++;
                };
                page = page + 1;
            }
            
        },
        error:function(msg){
            $("#afui").popup("获取失败");
        }
   })
}