/**
 * Created by dboy on 16/9/23.
 */
function join(){
    var phone = $('#mobile').val();
    //if(!phone || !/^1[3|4|5|8][0-9]\d{8}$/.test(phone))
    if(!phone || phone.length < 11)
    {
        $('#phoneerr').html('手机号填写错误.')
        return;
    }
    var name = $('#user').val();
    if(!name)
    {
        $('#phoneerr').html('您的姓名填写错误.')
        return;
    }

    var url = "http://games.ehome100.com/api/user/join?callback=joinCB&gameid=1&phone=" + phone + "&name=" + encodeURIComponent(name);
    $.getScript(url, function(){});
}

function joinCB(){
    calPrice();
}

function calPrice(){
    var a = $('#pm').val();
    var b = $('#shi').val();
    var c = $('#ting').val();
    var d = $('#chu').val();
    var e = $('#wei').val();

    var url = "http://games.ehome100.com/qp/result?a=" + a + '&b=' + b + '&c=' + c + '&d=' + d + '&e=' + e;
    window.location.href = url;
}