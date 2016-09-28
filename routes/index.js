var express = require('express');
var router = express.Router();
var User = require('../libs/user');
var Rank = require('../libs/rank');

/* GET home page. */
router.get('/', function(req, res, next) {
    //req.session.continue = req.originalUrl;
    //req.session.userInfo = {
    //  openid:'003'
    //};
    //var user = new User('003','dboy3','xxx');
    //user.save();
    ////user.savePoints('game1', 10);
    //var rankKey = 'xxx';
    ////Rank.setRank(rankKey, [{openid:'001',points:1}]);
    ////Rank.updateRank(rankKey, {openid:'002',points:5}, function(err, rank){
    ////    console.log(rank);
    ////    Rank.getRank(rankKey,function(err, rank){
    ////        console.log(rank);
    ////    });
    ////})
    //res.render('index', { title: 'Express' });
    res.redirect('/qa');
});

module.exports = router;
