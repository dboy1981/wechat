/**
 * Created by dboy on 16/7/29.
 */
var Config = require('../config');
var User = require('../libs/user');

var oauth = function(req, res, next){
    var session = req.session;
    session.continue = req.originalUrl;
    var client = require('./oauth/client')(session);
    res.redirect(client.getAuthorizeURL(Config.wechat.redirectUrl, Config.wechat.state, Config.wechat.scope));
};

exports.requireUser = function(req, res, next) {
    if (!req.user) {
        if(!req.session.userInfo)
            oauth(req, res, next);
        else
            User.getUserFromWechat(req.session.userInfo, function(err, user){
                req.user = user;
                next();
            });
    } else {
        next();
    }
};

exports.apiRequireUser = function(req, res, next) {
    if (!req.user) {
        if(!req.session.userInfo)
            next();
        else
            User.getUserFromWechat(req.session.userInfo, function(err, user){
                req.user = user;
                next();
            });
    } else {
        next();
    }
};


exports.initAPI = function (req, res, next) {

    res.apiResponse = function (data) {
        if (req.query.callback) {
            res.jsonp(data);
        } else {
            res.json(data);
        }
    };

    res.apiError = function (key, err, msg, code) {
        //msg = msg || 'Error';
        key = key || 'unknown error';
        //msg += ' (' + key + ')';
        //if (keystone.get('logger')) {
        //    console.log(msg + (err ? ':' : ''));
        //    if (err) {
        //        console.log(err);
        //    }
        //}
        res.status(code || 500);
        res.apiResponse({ error: key || 'error', detail: err });
    };

    res.apiNotFound = function (err, msg) {
        res.apiError('data not found', err, msg || 'not found', 404);
    };

    res.apiNotAllowed = function (err, msg) {
        res.apiError('access not allowed', err, msg || 'not allowed', 403);
    };

    next();
};