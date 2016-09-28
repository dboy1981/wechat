$(function () {
    //城市循环
    /*var cityHtml = '';
     for (var i in districtJson[1]) {
     cityHtml += '<li value="' + districtJson[1][i] + '">';
     cityHtml += districtJson[1][i];
     cityHtml += '<ul>';
     for (var j in districtJson[i]) {
     cityHtml += '<li value="' + districtJson[i][j] + '">' + districtJson[i][j] + '</li>';
     }
     cityHtml += '</ul>';
     cityHtml += '</li>';
     }
     $('#demo_treelist').html(cityHtml);*/

    // 城市选择
    var v1 = 0;
    var v2 = 0;
    if ($('#demo_treelist').length > 0) {
        $('#demo_treelist').mobiscroll().treelist({
            theme: "android-holo-light",
            mode: "scroller",
            display: "modal",
            lang: "zh",
            defaultValue: [0, 0],
            labels: [' ', ' '],
            inputClass: "treeListClass",
            onSelect: function (text, obj) {
                var value1 = obj._wheelArray[0];
                var value2 = obj._wheelArray[1];
                //var value3 = obj._wheelArray[2];
                //console.log(value1);
                var subCityObj = $("#demo_treelist>li").eq(value1).children("ul").children("li").eq(value2);
                v1 = $.trim($("#demo_treelist>li").eq(value1).attr("value"));
                v2 = $.trim(subCityObj.attr("value"));
                var city = $.trim(subCityObj.attr('data-areapy'));
                var selectAreaflag = $.trim(subCityObj.attr('data-areaPy'));
                var value = v1 + ' ' + v2;
                $('#demo_treelist_dummy').val(value).data({'flag': v1, 'city': v2, 'areaflag':selectAreaflag});
                $('#demo_treelist').attr({'data-areaflag':city,'data-province':v1,'data-city':v2});
            },
            onMarkupReady: function (a) {
                a.find(".dwc").css("width", "50%");
                a.find(".dw").css({"width": "100%", "bottom": "0", "top": "auto !important", "position": "fixed"});
                a.find(".dwl ").css("display", "none");
                a.find(".dwwl").css("padding", "0");
                a.find(".mbsc-android-holo .dwwol").css({
                    "left": "0",
                    "right": "0",
                    "border-top": "0.01rem solid #ddd",
                    "border-bottom": "0.01rem solid #ddd"
                });
                a.find(".dwbc").css({"background":"#fff"});
                a.find(".dwb0.dwb-e.dwb").css({"color":"#0065ff"});
                a.find(".mbsc-android-holo-light .dwb").css({"color":"#0065ff"});
                a.find(".mbsc-android-holo .dwbw .dwb").css({"border":"none"});
                a.find(".dwbw.dwb-s").css({
                    "position": "absolute",
                    "top": "-0.37rem",
                    "right": "0",
                    "text-align": "center",
                    "text-indent": "1.08rem"
                });
                a.find(".dwbw.dwb-c").css({
                    "position": "absolute",
                    "top": "-0.37rem",
                    "left": "0",
                    "text-align": "left",
                    "text-indent": "0.14rem"
                });
                a.find(".mbsc-android-holo .dwb").css({
                    "height":"0.37rem",
                    "line-height":"0.37rem",
                    "font-size":"0.14rem",
                    "background":"#ebebeb",
                    "border-bottom":"0.01rem solid #e0e0e1"
                });
            }
        });
    }
    $('#demo_treelist_dummy').attr("placeholder", "您的城市");
    $('.city_down').click(function(){
        $('#demo_treelist').trigger('click');
    })

    //定位城市
    try{
        var province=remote_ip_info.province;
        var city=remote_ip_info.city;
        var value_city = province + '  ' + city + '市';
        $('#demo_treelist_dummy').val(value_city).data({'flag': province, 'city': city + '市'});
    }catch(e){
        $('#demo_treelist_dummy').val('上海  区域').data({'flag': '上海', 'city': '上海市'});
    }


    //dom报名人数
    //$.ajax({
    //    url: 'http://xzx.jia.com/api/get_apply_number.php',
    //    type: 'get',
    //    dataType: 'jsonp',
    //    jsonp: 'callback',
    //    success: function (data) {
    //        $('.pop-numpop em').text(data.today);
    //    }
    //});


    //户型 + -
    $("#ma").click(function () {
        var pm = parseInt($("#pm").val());
        if (pm < 500) {
            pm++;
            $("#pm").val(pm);
            fenpei(pm);
        }
    });
    $("#ms").click(function () {
        var pm = parseInt($("#pm").val());
        if (pm > 0) {
            pm--;
            $("#pm").val(pm);
            fenpei(pm);
        }
    });
    /*
     "ps室 pt厅 pc厨 pw卫 py阳台*/
    $("#pm").change(function () {
        var pm = parseInt($("#pm").val());
        if (0 < pm < 500) {
            fenpei(pm);
        }
    });

    $(".add").click(function () {
        var i = parseInt($(this).prev().prev().val());
        if (i < 500) {
            i++;
            $(this).prev().prev().val(i);
        }
    });
    $(".minus").click(function () {
        var i = parseInt($(this).prev().prev().prev().val());
        if (i > 0) {
            i--;
            $(this).prev().prev().prev().val(i);
        }
    });


    // 关闭
    $(".popmask,.close2").click(function () {
        $(".zxbj-pop1,.zxbj-pop2,.popmask").hide();
    });
    $(".close1").click(function () {
        $(".zxbj-pop1").hide();
        commonPop($(".zxbj-pop2"));
    });
    $("#assign_re").click(function () {
        $(".zxbj-pop2").hide();
        commonPop($(".zxbj-pop1"));
    });

    //显示报名层
    $("#sub_js_del").click(function () {
        var city = $("#demo_treelist_dummy").val(),
            area = $("input[name='total_area2']").val(),//面积
            shi = $("input[name='shi1']").val(),
            ting = $("input[name='ting1']").val(),
            chu = $("input[name='chu1']").val(),
            wei = $("input[name='wei1']").val(),
            yangtai = $("input[name='yangtai1']").val();
        if (city == '') {
            showMaskEditCom({
                text: "请选择您的城市"
            });
        }
        else if (!isPositiveNum(area)) {
            showMaskEditCom({
                text: "请输入正确的面积"
            })
        } else if (!isPositiveNum(shi)) {
            showMaskEditCom({
                text: "请输入正确的卧室数量"
            })
        }/* else if (!isPositiveNum(ting)) {
            showMaskEditCom({
                text: "请输入正确的客厅数量"
            })
        } else if (!isPositiveNum(chu)) {
            showMaskEditCom({
                text: "请输入正确的厨房数量"
            })
        } else if (!isPositiveNum(wei)) {
            showMaskEditCom({
                text: "请输入正确的卫生间数量"
            })
        } else if (!isPositiveNum(yangtai)) {
            showMaskEditCom({
                text: "请输入正确的阳台数量"
            })
        }*/ else {
            commonPop($(".zxbj-pop1"));
        }

    })

});

function isPositiveNum(s) {//是否为正整数
    var re = /^[0-9]*[1-9][0-9]*$/;
    return re.test(s);
}

//居中
function commonPop($obj) {
    $(".popmask").show().height($("body").height());
    $obj.show().css("top", ($(window).height() - $obj.height()) / 2 + $(window).scrollTop());
}

/*
 建筑面积*0.8=实际总面积
 60平米以下：1室1厅（厨房卫生间阳台固定4平米。卧室/厅=1/1）
 61-90：2室1厅（厨房卫生间阳台固定6平米。卧室1/卧室2/厅=3/2/3）
 91-110：3室1厅（厨房卫生间阳台固定8平米。卧室1/卧室2/卧室3/厅=3/2/2/3）
 111-130：3室2厅（厨房卫生间阳台固定8平米。卧室1/卧室2/卧室3/厅1/厅2=3/2/2/3/2）
 131-150：3室2厅2卫（厨房阳台固定面积8平米，卫生间6平米。卧室1/卧室2/卧室3/厅1/厅2=3/2/2/3/2）
 151-180：4室2厅1厨2卫1阳（厨房10平米，卫生间6平米，阳台8平米。卧室1/卧室2/卧室3/卧室4/厅1/厅2=3/2/2/2/3/2）  
 */
function fenpei(area) {
    if (area <= 60) {
        $("input[name='shi']").val(1);
        $("input[name='ting']").val(1);
        $("input[name='chu']").val(1);
        $("input[name='wei']").val(1);
        $("input[name='yangtai']").val(1);
        $(".ps").val(1);
        $(".pt").val(1);
        $(".pc").val(1);
        $(".pw").val(1);
        $(".py").val(1);
    } else if (area > 60 && area <= 90) {
        $("input[name='shi']").val(2);
        $("input[name='ting']").val(1);
        $("input[name='chu']").val(1);
        $("input[name='wei']").val(1);
        $("input[name='yangtai']").val(1);
        $(".ps").val(2);
        $(".pt").val(1);
        $(".pc").val(1);
        $(".pw").val(1);
        $(".py").val(1);
    } else if (area > 90 && area <= 110) {
        $("input[name='shi']").val(3);
        $("input[name='ting']").val(1);
        $("input[name='chu']").val(1);
        $("input[name='wei']").val(1);
        $("input[name='yangtai']").val(1);
        $("input[name='shi_area']").val(1);
        $("input[name='ting_area']").val(1);
        $("input[name='chu_area']").val(1);
        $("input[name='wei_area']").val(1);
        $("input[name='yangtai_area']").val(1);
        $(".ps").val(3);
        $(".pt").val(1);
        $(".pc").val(1);
        $(".pw").val(1);
        $(".py").val(1);
    } else if (area > 110 && area <= 130) {
        $("input[name='shi']").val(3);
        $("input[name='ting']").val(2);
        $("input[name='chu']").val(1);
        $("input[name='wei']").val(1);
        $("input[name='yangtai']").val(1);
        $("input[name='shi_area']").val(1);
        $("input[name='ting_area']").val(1);
        $("input[name='chu_area']").val(1);
        $("input[name='wei_area']").val(1);
        $("input[name='yangtai_area']").val(1);
        $(".ps").val(3);
        $(".pt").val(2);
        $(".pc").val(1);
        $(".pw").val(1);
        $(".py").val(1);
    } else if (area > 130 && area <= 150) {
        $("input[name='shi']").val(3);
        $("input[name='ting']").val(2);
        $("input[name='chu']").val(1);
        $("input[name='wei']").val(2);
        $("input[name='yangtai']").val(1);
        $("input[name='shi_area']").val(1);
        $("input[name='ting_area']").val(1);
        $("input[name='chu_area']").val(1);
        $("input[name='wei_area']").val(1);
        $("input[name='yangtai_area']").val(1);
        $(".ps").val(3);
        $(".pt").val(2);
        $(".pc").val(1);
        $(".pw").val(2);
        $(".py").val(1);
    } else if (area > 150 && area <= 180) {
        $("input[name='shi']").val(4);
        $("input[name='ting']").val(2);
        $("input[name='chu']").val(1);
        $("input[name='wei']").val(2);
        $("input[name='yangtai']").val(1);
        $("input[name='shi_area']").val(1);
        $("input[name='ting_area']").val(1);
        $("input[name='chu_area']").val(1);
        $("input[name='wei_area']").val(1);
        $("input[name='yangtai_area']").val(1);
        $(".ps").val(4);
        $(".pt").val(2);
        $(".pc").val(1);
        $(".pw").val(2);
        $(".py").val(1);
    } else if (area > 180) {
        $("input[name='shi']").val(4);
        $("input[name='ting']").val(2);
        $("input[name='chu']").val(1);
        $("input[name='wei']").val(2);
        $("input[name='yangtai']").val(1);
        $("input[name='shi_area']").val(1);
        $("input[name='ting_area']").val(1);
        $("input[name='chu_area']").val(1);
        $("input[name='wei_area']").val(1);
        $("input[name='yangtai_area']").val(1);
        $(".ps").val(4);
        $(".pt").val(2);
        $(".pc").val(1);
        $(".pw").val(2);
        $(".py").val(1);
    }
}