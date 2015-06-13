$('#checkUpdate').click(function () {
    var versionNow = $('#versionNum').text();
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: serverUrl+"/android/update",
        success: function(msg) {
            console.log(msg);
            if (versionNow==msg.version) {
                $("#afui").popup("目前版本为最新");
            }else{
                $("#afui").popup({
                    title: "检测到新版本，立即更新？",
                    message: "",
                    cancelText: "取消",
                    cancelCallback: function () {
                        
                    },
                    doneText: "确定",
                    doneCallback: function () {
                        window.open("http://www.horacework.com", "_system");
                    },
                    cancelOnly: false
                });
            }
        },
        error:function(msg){
            $("#afui").popup("获取版本失败");
        }
    });
});