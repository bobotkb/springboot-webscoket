var socket;
if(typeof(WebSocket) == "undefined") {
    console.log("您的浏览器不支持WebSocket");
}else{
    console.log("您的浏览器支持WebSocket");

    //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
    socket = new WebSocket("ws://localhost:8080/websocket");
    //打开事件
    socket.onopen = function() {
        console.log("Socket 已打开");
    };
    //获得消息事件
    socket.onmessage = function(msg) {
        console.log(msg.data);
        playSound();
        //发现消息进入    调后台获取
        //getCallingList();
    };
    //关闭事件
    socket.onclose = function() {
        console.log("Socket已关闭");
    };
    //发生了错误事件
    socket.onerror = function() {
        alert("Socket发生了错误");
    }

    //关闭连接
    function closeWebSocket() {
        closeSound();
        socket.close();
    }

    //发送消息
    function send() {
        var message = document.getElementById('text').value;
        socket.send(message);
    }

    //播放提示声音方法
    function playSound() {
        var borswer = window.navigator.userAgent.toLowerCase();
        if ( !!window.ActiveXObject || "ActiveXObject" in window ) {
            //IE内核浏览器
            var OSPlayer = new ActiveXObject("WMPLayer.OCX");
            // OSPlayer.url = "http://www.xmf119.cn/static/admin/sounds/notify.wav";
            // OSPlayer.url = "audio/notify.wav";
            OSPlayer.url = "audio/test.mp3";
            OSPlayer.controls.play();
        } else {
            //非IE内核浏览器
            var strAudio = "<audio id='audioPlay' src='audio/test.mp3'<!--src='audio/notify.wav'--> <!--src='http://www.xmf119.cn/static/admin/sounds/notify.wav'--> hidden='true'>";
            if ( $( "body" ).find( "audio" ).length <= 0 )
                $( "body" ).append( strAudio );
            var audio = document.getElementById( "audioPlay" );

            //浏览器支持 audion
            audio.play();
        }
    }

    //暂停提示声音
    function closeSound() {
        var audio = document.getElementById( "audioPlay" );
        audio.pause();// 这个就是暂停
    }
}