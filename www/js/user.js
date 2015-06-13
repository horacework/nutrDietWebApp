var tokenID = null;
function loginPopup(){
    if (tokenID == null) {
        $("#userLogin").show();
    } else{
        $("#userShow").show();
    };
}
$("#loginBtn").click(function () {
    loginBtnFun();
});
$("#signupBtn").click(function () {
    signupBtnFun();
});
$("#loginToSignup").click(function () {
    $("#userLogin").hide();
    $("#userSignup").show();
})
$("#signupToLogin").click(function () {
    $("#userSignup").hide();
    $("#userLogin").show();
})
function loginBtnFun() {
    if (tokenID == null) {
        var data = {
            username : $('#loginUserName').val(),
            password : $('#loginPassWord').val()
        };
        $.ajax({
            type: "POST",
            dataType: "json",
            data: data,
            url:serverUrl+"/login",
            success:function(user){
                if (user != undefined) {
                    $('#userLogin').hide();
                    $('#userShow').append('欢迎你，'+user.name);
                    $('#userShow').show();
                    tokenID = user.tokenID;
                } else{
                    $("#afui").popup({message:'用户名或密码错误！'});
                };
                
            },
            error:function(msg){
                $("#afui").popup({message:'网络原因登录失败！'});
            }
        })
    } else{
        $("#userShow").show();
    };
}
function signupBtnFun() {
    if (tokenID == null) {
        var data = {
            username : $('#signupUserName').val(),
            password1 : $('#signupPassWord1').val(),
            password2 : $('#signupPassWord2').val()
        };
        $.ajax({
            type: "POST",
            dataType: "json",
            data: data,
            url:serverUrl+"/signup",
            success:function(user){
                if (user != undefined) {
                    $('#userSignup').hide();
                    $('#userShow').append('欢迎你，'+user.name);
                    $('#userShow').show();
                    tokenID = user.tokenID;
                } else{
                    $("#afui").popup({message:'用户名或密码错误！'});
                };
                
            },
            error:function(msg){
                $("#afui").popup({message:'网络原因登录失败！'});
            }
        })
    } else{
        $("#userShow").show();
    };
}