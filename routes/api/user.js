/**
 * Created by dboy on 16/8/1.
 */
var express = require('express');
var User = require('../../libs/user');
var Rank = require('../../libs/rank');
var GamesLogModel = require('../../models/gameslog');
var router = express.Router();

module.exports = router;

var phoneReg = /^1[3|4|5|8][0-9]\d{8}$/;

router.get('/setpoints', function(req, res){
    if(!req.user)
        return res.apiNotAllowed({});

    var points = req.query.points;
    var key = req.query.key;
    if(!points || points < 0 || !key)
        return res.apiError('parameters error', {});

    var user = req.user;
    if(!user.points || !user.points[key] || parseInt(user.points[key]) < points){
        user.savePoints(key, points);
        Rank.updateRank(key, {openid:user.openid, points:points});
    }

    res.apiResponse({points:points});
});

router.get('/setphone', function(req, res){
    if(!req.user)
        return res.apiNotAllowed({});

    var phone = req.query.phone;
    var name = req.query.name;
    var address = req.query.address;
    var tt = req.query.tt;
    // if(!phone || phone.length < 11 || !name || !address)
    //     return res.apiError('parameters error', {});

    if(!phone || !phoneReg.test(phone) || !name)
         return res.apiError('parameters error', {});

    req.user.savePhone(phone, name, address || '', tt || '');
    res.apiResponse({});
});

router.get('/join', function(req, res){
    var phone = req.query.phone;
    var name = req.query.name;
    var gameid = req.query.gameid;

    //if(!phone || !phoneReg.test(phone) || !name || !gameid)
    if(!phone || phone.length < 11 || !name || !gameid)
        return res.apiError('parameters error', {});

    // GamesLogModel.findOne({gameid:gameid,phone:phone,username:name}, function(err, result){
    //     if(!result){
    //         var log = new GamesLogModel({
    //             gameid: gameid,
    //             username: name,
    //             phone: phone,
    //             create_at: new Date()
    //         });
    //         log.save();
    //     }
    //     res.apiResponse({});
    // })

    var log = new GamesLogModel({
        gameid: gameid,
        username: name,
        phone: phone,
        create_at: new Date()
    });
    log.save();
    res.apiResponse({});
});