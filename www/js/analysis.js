var foodNum = 0;
$("#postAnalysis").click(function(){
    var postData = {};
    for (var i = 0; i <= foodNum; i++) {
        postData[i] = {};
        postData[i].id = $("#analysisInput .input-group[data-num='"+i+"'] #food").val();
        postData[i].weight = $("#analysisInput .input-group[data-num='"+i+"'] #foodWeight").val();
    };
    console.log(postData);
    $.ajax({
        type: "GET",
        dataType:"jsonp",
        data:postData,
        url:serverUrl+"/foodconsum",
        success:function(msg){
            console.log(msg);
            var w = disposalData(msg);
             $("#afui").popup({
                title: "分析结果",
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
function disposalData(msg){
    var retData = "";
    retData += "营养结构：<br>" 
    if (msg.result.judge.Fe=="over") {
        retData += "铁元素：过多"
    }else if(msg.result.judge.Fe=="lack"){
        retData += "铁元素：过少"
    };
    retData += "("+parseInt(msg.result.diff.Fe)+"mg)<br>"; 
    if (msg.result.judge.Se=="over") {
        retData += "硒元素：过多"
    }else if(msg.result.judge.Se=="lack"){
        retData += "硒元素：过少"
    };
    retData += "("+Math.round(msg.result.diff.Se)+"μg)<br>"; 
    if (msg.result.judge.Zn=="over") {
        retData += "锌元素：过多"
    }else if(msg.result.judge.Zn=="lack"){
        retData += "锌元素：过少"
    };
    retData += "("+Math.round(msg.result.diff.Zn)+"mg)<br>"; 
    if (msg.result.judge.fat=="over") {
        retData += "脂肪：过多"
    }else if(msg.result.judge.fat=="lack"){
        retData += "脂肪：过少"
    };
    retData += "("+Math.round(msg.result.diff.fat)+"g)<br>"; 
    if (msg.result.judge.protein=="over") {
        retData += "蛋白：过多"
    }else if(msg.result.judge.protein=="lack"){
        retData += "蛋白：过少"
    };
    retData += "("+Math.round(msg.result.diff.protein)+"kcal)<br>"; 
    if (msg.result.judge.vitaminB1=="over") {
        retData += "脂肪：过多"
    }else if(msg.result.judge.vitaminB1=="lack"){
        retData += "脂肪：过少"
    };
    retData += "("+Math.round(msg.result.diff.vitaminB1)+"mg)<br>"; 
    if (msg.result.judge.vitaminB2=="over") {
        retData += "脂肪：过多"
    }else if(msg.result.judge.vitaminB2=="lack"){
        retData += "脂肪：过少"
    };
    retData += "("+Math.round(msg.result.diff.vitaminB2)+"mg)<br>"; 
    if (msg.result.judge.vitaminC=="over") {
        retData += "脂肪：过多"
    }else if(msg.result.judge.vitaminC=="lack"){
        retData += "脂肪：过少"
    };
    retData += "("+Math.round(msg.result.diff.vitaminC)+"mg)<br>"; 
    if (msg.result.judge.vitaminE=="over") {
        retData += "脂肪：过多"
    }else if(msg.result.judge.vitaminE=="lack"){
        retData += "脂肪：过少"
    };
    retData += "("+Math.round(msg.result.diff.vitaminE)+"mg)<br>"; 

    retData += "饮食建议：<br><br>" ;
    retData += "适量多吃："+msg.advice.moreEat+"<br><br>" ;
    retData += "尽量少吃吃："+msg.advice.lessEat+"<br>" ;

    return retData
}
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
        type: "POST",
        dataType:"jsonp",
        url:serverUrl+"/getfoodlist?category="+cateID,
        success:function(msg){
            //console.log(msg);
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
function perDayStandard(){
    $("#afui").popup("能量：2300 kcal <br>蛋白：70g <br>脂肪：60g <br>锌：11.5mg <br>铁：20mg<br>硒：50μg <br>维生素C：100mg<br>维生素B1：1.3mg<br>维生素B2：1.2mg<br>维生素E：14mg");
}
function analysisPopup() {
    $("#afui").popup({
        title: "Login",
        message: "能量：2300 kcal <br>蛋白：70g <br>脂肪：60g <br>锌：11.5mg <br>铁：20mg<br>硒：50μg <br>维生素C：100mg<br>维生素B1：1.3mg<br>维生素B2：1.2mg<br>维生素E：14mg",
        cancelText: "Cancel",
        cancelCallback: function () {},
        doneText: "Login",
        doneCallback: function () {
            alert("Logging in")
        },
        cancelOnly: false
    });
}