/**
 * Created by dboy on 16/7/29.
 */
var OAuth = require('wechat-oauth');
var Config = require('../../config');

function getClient(session){
    var client = new OAuth(Config.wechat.appid, Config.wechat.secret,
        function(openid, callback){
            if(session.oauth && session.oauth.access_token)
                callback(null, session.oauth.access_token);
            else
                callback(new Error(''));
        },
        function(openid, token, callback){
            var oauth = session.oauth = {};
            oauth.access_token = token;
            oauth.openid = openid;
            callback(null);
        });
    return client;
}

module.exports = getClient;
