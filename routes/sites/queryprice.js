/**
 * Created by dboy on 16/9/23.
 * 城市（固定上海）+A面积（默认90）+B室（B默认2）+C厅（C默认1）+D厨（D默认1）+E卫（E默认1），ABCDE这几个空可以加减

 装修预算算法是：

 装修总价=A*77%*688+A*77%*718+（B-2）*3000+（C-1）*3000+（D-1）*10000+（E-1）*10000

 半包总价=A*77%*688

 主材总价=A*77%*718+（B-2）*3000+（C-1）*3000+（D-1）*10000+（E-1）*10000
 */
var express = require('express');
var _ = require('lodash');
var router = express.Router();

router.get('/', function(req, res){
    res.render('sites/queryprice/index');
});

router.get('/2', function(req, res){
    res.render('sites/queryprice/index2');
});

router.get('/result', function(req, res) {
    //console.log(req.user);
    var a = req.query.a || 90;
    var b = req.query.b || 2;
    var c = req.query.c || 1;
    var d = req.query.d || 1;
    var e = req.query.e || 1;

    var area = parseFloat(a);
    var room = parseFloat(b);
    var hall = parseFloat(c);
    var kitchen = parseFloat(d);
    var bathroom = parseFloat(e);

    //if(room < 2) room = 2;

    var total = area * 0.77 * 688
        + area * 0.77 * 718
        + (room - 2) * 3000
        + (hall - 1) * 3000
        + (kitchen - 1) * 10000
        + (bathroom - 1) * 10000;

    var half = area * 0.77 * 688;

    var material = area * 0.77 * 718
        + (room - 2) * 3000
        + (hall - 1) * 3000
        + (kitchen - 1) * 10000
        + (bathroom - 1) * 10000;

    res.render('sites/queryprice/result', { area: a, room:b, hall:c, kitchen:d, bathroom:e, total: _.round(total, 2) , half: _.round(half, 2), material: _.round(material, 2)});
});

module.exports = router;