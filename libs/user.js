/**
 * Created by dboy on 16/7/30.
 */
var Redis = require('ioredis');
var Config = require('../config');
var _ = require('underscore');
var async = require('async');

var redis = redis || new Redis(Config.redisConfig({ keyPrefix: 'users:'}));
module.exports = User;

function User(openid, name, avatar){
    if(_.isObject(openid)){
        this.name = openid.name || '';
        this.avatar = openid.avatar || '';
        this.openid = openid.openid || '';
        this.points = openid.points || {};
    }else{
        this.name = name || '';
        this.avatar = avatar || '';
        this.openid = openid || '';
    }
}

User.getUser = function(openid, callback){
    redis.get(openid, function(err, result){
        if(err) return callback(err);
        callback(null, JSON.parse(result));
    })
};

User.getUserFromWechat = function(userinfo, callback){
    User.getUser(userinfo.openid, function(err, ret){
        if(err || !ret){
            return callback(null, new User(userinfo.openid, userinfo.nickname, userinfo.headimgurl));
        }
        return callback(null, new User(ret));
    })
};

User.getList = function(callback){
    var list = [];
    redis.keys('users*', function(err, result){
       if(err)
        return callback(err);
       else{
           async.eachSeries(result, function(item, done){
               redis.get(item.replace('users:',''), function(err, user){
                   var ju = JSON.parse(user);
                   //if(ju.truename)
                    list.push(ju);
                   done();
               })
           },function(err){
               return callback(err, list);
           });

       }

    });
};

User.prototype = {
    save: function(){
        var json = {};
        var self = this;
        _.keys(this).forEach(function(val){
            json[val] = self[val];
        });
        redis.set(this.openid, JSON.stringify(json));
    },

    savePoints: function(key, points){
        this.points = this.points || {};
        this.points[key] = points;
        this.save();
    },

    savePhone: function(phone,truename,address,totaltime){
        this.phone = phone;
        this.truename=truename;
        this.address= address;
        this.totaltime = totaltime;
        this.save();
    }
}