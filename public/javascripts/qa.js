/**
 * Created by dboy on 16/8/1.
 */
var rndQ = _.shuffle(questions);
var config = _.rest(rndQ, rndQ.length - 10);
var key = 'game1';
var current = 0;
var canAnswer = false;
var baseUrl = '';
var totalScore = 0;
var cd = 30;
var cdSeed = null;
var total = config.length;
var totalTime = 0;

$(function(){
    pageHeight = $(window).height();$(".page1,.page2,.page3,.page4").css({"height":pageHeight });

    window.shareData = {
        "timeLineLink": "http://games.ehome100.com/qa",
        "sendFriendLink": "http://games.ehome100.com/qa",
        "weiboLink": "http://games.ehome100.com/qa",
        "tTitle": "奥运大玩家 答题赢豪礼",
        "tContent": "",
        "fTitle": "奥运大玩家 答题赢豪礼",
        "fContent": "",
        "wContent": ""
    };

    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url": "img/logo_white.png",
                "img_width": "401",
                "img_height": "275",
                "link": window.shareData.sendFriendLink,
                "desc": window.shareData.fContent,
                "title": window.shareData.fTitle
            }, function (res) {
                _report('send_msg', res.err_msg);
            })
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": "img/logo_white.png",
                "img_width": "401",
                "img_height": "275",
                "link": window.shareData.timeLineLink,
                "desc": window.shareData.tContent,
                "title": window.shareData.tTitle
            }, function (res) {
                _report('timeline', res.err_msg);
            });
        });

    }, false);

});


function start(){
    $('#welcome').css('display','none');
    $('#awards').css('display','none');
    $('#gamestart').css('display','');
    $('[data-qtotal]').html(total);
    showQuestion(current);
    startCD();
}

function startCD(){
    var callback = function(){
        cd--;
        totalTime++;
        if(cd < 0){
            displayWrong();
            gameover(false);
            return;
        }
        $('[data-cd]').html(cd);
    }
    if(cdSeed !== null) return;
    cdSeed = setInterval(callback, 1000);
}

function showQuestion(num){
    cd = 30;
    if(num >= config.length)
        return;
    current = num;
    $('[data-qno]').html(current+1);
    var qa_container = $('[data-qacontainer]');
    qa_container.html('');

    var q = config[num];
    var title = $('<h1>' + q.title + '</h1>');
    var ul= $('<ul class="dtist"></ul>');
    for(var i in q.answers){
        ul.append('<li data-qli onclick="answer(\'' + q.answers[i] + '\')">' + q.answers[i] + '</li>');
    }

    qa_container.append(title);
    qa_container.append(ul);
    canAnswer = true;
}

function answer(a){
    if(!canAnswer) return;
    canAnswer = false;
    var q = config[current];
    if(a == q.correct){
        ++current;
        totalScore+= q.score;
        displayRight(a);
        setTimeout(function(){
            if(current >= config.length)
                return gameover(true)
            showQuestion(current);
        },1000);

    }else{
        displayWrong(q.correct, a);
        setTimeout(function(){
            gameover(false);
        },1000);
    }
}

function displayRight(answer){
    $('[data-qli]').each(function(){
        var item = $(this);
        if(item.html() == answer){
            item.addClass('right');
            item.append('<span class="right"></span>');
        }
    });
}
function displayWrong(right,wrong){
    $('[data-qli]').each(function(){
        var item = $(this);
        if(item.html() == right){
            item.addClass('right');
            item.append('<span class="right"></span>');
        }

        if(item.html() == wrong){
            item.addClass('wrong');
            item.append('<span class="wrong"></span>');
        }
    });
}

function gameover(iswin){
    clearInterval(cdSeed);
    cdSeed = null;
    $('#gamestart').css('display','none');
    $('#gameover').css('display','');
    $('[data-totaltime]').html(totalTime);
    $('[data-score]').html(totalScore);
    $('[data-totalq]').html(current);
    iswin ? $('#success').css('display','') : $('#fail').css('display','');
    if(!iswin)
        $('#tjbtn').css('display','none');
    setPoints(totalScore);
    window.shareData.tContent = window.shareData.fContent = window.shareData.wContent = '我在奥运大玩家挑战中坚持了' + totalTime + ' 秒， 答对 ' + current + ' 题，得到 ' + totalScore + ' 分';
}

function setPoints(points){
    var url = baseUrl + "/api/user/setpoints?callback=setPointsCB&key=" + key + "&points=" + points;
    $.getScript(url, function(){});
}

function setPhone(){
    var phone = $('#phone').val();
    if(!phone || phone.length < 11)
    {
        $('#phoneerr').html('手机号填写错误.')
        return;
    }
    var name = $('#name').val();
    if(!name || name.length < 2)
    {
        $('#phoneerr').html('您的姓名填写错误.')
        return;
    }
    var address = $('#address').val();
    if(!address || address.length < 2)
    {
        $('#phoneerr').html('收货地址填写错误.')
        return;
    }
    var url = baseUrl + "/api/user/setphone?tt=" + totalTime + "&callback=setPhoneCB&key=" + key + "&phone=" + phone + "&address=" + encodeURIComponent(address) + "&name=" + encodeURIComponent(name);
    $.getScript(url, function(){});
    //$('#phonebox').css('display','none');
    $('#phoneform').html('<p>恭喜您，抽奖资料已经提交成功！</p>');
}

function setPhoneCB(data){}

function setPointsCB(data){}

function getRank(){
    var url = baseUrl + "/api/getrank?callback=getrankCB&key=" + key;
    $.getScript(url, function(){});
}

function getrankCB(data){
    var container = $('[data-rankcontainer]');
    container.html('');
    var ul= $('<ul class="list-group"></ul>');
    for(var i in data){
        ul.append('<li class="list-group-item">' + data[i].name + ' ' + data[i].points + '</li>');
    }
    container.append(ul);
}

function showShare(){
    $('.shareImgs').css('display','block');
    $('.maskBlacl').css('display','block');
    $('.maskBlacl').unbind();
    $('.maskBlacl').bind('click', function(){
        $('.shareImgs').css('display','none');
        $('.maskBlacl').css('display','none');
    })
}

function awards(){
    $('#welcome').css('display','none');
    $('#awards').css('display','');
}

function showPhone(){
    $('#phonebox').css('display','');
}

function hiddePhone(){
    $('#phonebox').css('display','none');
}