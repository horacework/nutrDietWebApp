var foodNum = 0;
$("#postAnalysis").click(function(){
    var postData = {};
    for (var i = 0; i <= foodNum; i++) {
        postData[i] = {};
        postData[i].id = $("#analysisInput .input-group[data-num='"+i+"'] #food").val();
        postData[i].weight = $("#analysisInput .input-group[data-num='"+i+"'] #foodWeight").val();
    };
    $.ajax({
        type: "POST",
        dataType:"json",
        url:"http://192.168.199.246:3000/foodconsum",
        success:function(msg){
            var w = JSON.stringify(msg);
             $("#afui").popup({
                title: "Login",
                message: w,
                cancelText: "不保存",
                cancelCallback: function () {},
                doneText: "保存",
                doneCallback: function () {
                    $("#afui").popup('保存功能需要做完用户管理才有。');
                },
                cancelOnly: false
            });
        },
        error:function(msg){
            console.log(msg);
        }
    });
});
$('.cate').change(function () {
    var cateID = $(this).val();
    var locationDiv = $(this).parent().find('select#food');
    getFoodOption(cateID ,locationDiv);
});
function addFood( ) {
    foodNum += 1;
    if (foodNum>9) {
        $("#afui").popup("太多啦！");
    } else{
        $(".input-group[data-num='"+foodNum+"']").show();
    };
    // $('#analysisInput').append(
    //     $(
    //     " <div class='input-group' ><label for='cate'>分类</label><select id='cate' class='cate'><option value=''>请选择</option><option value='1'>谷类</option>option value='2'>薯类淀粉</option><option value='3'>干豆类</option><option value='4'>蔬菜类</option><option value='5'>菌藻类</option><option value='6'>水果类</option><option value='7'>坚果种子</option><option value='8'>畜肉类</option><option value='9'>禽肉类</option><option value='10'>乳类</option><option value='11'>蛋类</option><option value='12'>鱼虾蟹贝</option><option value='13'>婴幼儿食品</option></select><label for='food'>食物</label><select id='food' id='food'></select><label for='foodWeight'>重量</label><input id='foodWeight' type='number'></input><p style='float:right'>(单位为500g)</p></div><script>$('.cate').change(function () {var cateID = $(this).val();var locationDiv = $(this).parent().find('select#food');getFoodOption(cateID ,locationDiv);});</ script>"));
}
function getFoodOption(cateID,locationDiv){
    $.ajax({
        type: "GET",
        dataType:"json",
        url:"http://192.168.199.246:3000/getfoodlist?category="+cateID,
        success:function(msg){
            var foodCount = 0;
            var foodContent = "";
            while(true){
                if (msg[foodCount]==null) {
                    locationDiv.empty().append($(foodContent));
                    break;
                    //return foodContent;
                    
                } else{
                    var foodSelect = "<option value='"+msg[foodCount].id+"'>"+msg[foodCount].name+"</option>";
                    foodContent +=foodSelect;
                    foodCount++;
                };
            };  
        },
        error:function(msg){
            console.log(msg);
        }
    });
}
function analysisPopup() {
    $("#afui").popup({
        title: "Login",
        message: "Username: <input type='text' class='af-ui-forms'><br>Password: <input type='text' class='af-ui-forms' style='webkit-text-security:disc'>",
        cancelText: "Cancel",
        cancelCallback: function () {},
        doneText: "Login",
        doneCallback: function () {
            alert("Logging in")
        },
        cancelOnly: false
    });
}