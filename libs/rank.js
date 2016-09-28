/**
 * Created by dboy on 16/7/30.
 */
var Redis = require('ioredis');
var Config = require('../config');
var _ = require('underscore');

var redis = redis || new Redis(Config.redisConfig({ keyPrefix: 'rank:'}));

exports.getRank = function(key, callback){
    redis.get(key, function(err, ret){
        if(err) callback(null,[]);
        var rank = JSON.parse(ret);
        callback(null, _.sortBy(rank, function(item){return -item.points;}));
    })
};

exports.setRank = function(key, rank){
    if(!_.every(rank, function(item){ return item.points;}))    //必须包含points属性
        return;
    redis.set(key, JSON.stringify(rank));
};

exports.updateRank = function(key, rankItem, callback){
    var self = this;
    this.getRank(key, function(err, rank){
        if(err) return callback(err);
        var exists = false;
        var needSave = false;
        for(var i in rank){
            if(rank[i].openid == rankItem.openid){
                exists = true;
                if(rank[i].points < rankItem.points){
                    rank[i].points = rankItem.points;
                    needSave = true;
                }
                break;
            }
        }
        if(!exists){
            rank.push(rankItem);
            rank = _.sortBy(rank, function(item){return item.points});
            rank = rank.length > 10 ? _.rest(rank, rank.length - 10) : rank;
            needSave = true;
        }
        if(needSave)
            self.setRank(key, rank);
        if(callback)
            callback(null, rank);
    })
};