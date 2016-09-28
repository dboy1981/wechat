/**
 * Created by dboy on 16/8/1.
 */
var express = require('express');
var User = require('../../libs/user');
var Rank = require('../../libs/rank');
var async = require('async');
var router = express.Router();

module.exports = router;

router.get('/', function(req, res){
    var key = req.query.key;
    if(!key)
        return res.apiError('parameters error', {});

    var ranks = [];
    Rank.getRank(key, function(err, ret){
        async.each(ret, function(item, done){
            User.getUser(item.openid, function(err, userinfo){
                if(err) return done(err);
                ranks.push({name:userinfo.name, avatar:userinfo.avatar, points:item.points});
                done();
            });
        }, function(err){
            if(err)
                return res.apiError('getRank error', err);
            res.apiResponse(ranks);
        });
    });
});