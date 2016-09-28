/**
 * Created by dboy on 16/7/29.
 */
var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function(req, res){
    if(!req.query.code){
        res.status(500).send('parameters error.');
        return;
    }
    var client = require('./client')(req.session);
    client.getAccessToken(req.query.code, function (err, result) {
        if(err)
            return next(err);
        //var accessToken = result.data.access_token;
        var openid = result.data.openid;
        //console.log(openid);
        client.getUser(openid, function (err, result) {
            if(err){
                return next(err);
            }
            //console.log(result);
            req.session.userInfo = result;
            if(req.session.continue)
                res.redirect(req.session.continue);
            else
                res.redirect('/');
        });

    });
});