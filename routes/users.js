var express = require('express');
var router = express.Router();
var User = require('../libs/user');
var GamesLogModel = require('../models/gameslog');
var moment = require('moment');
moment.locale('zh-cn');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.getList(function(err, users){
      if(err)
          res.jsonp(err);
      else{
          var sucUsers = [];
          users.forEach(function(user){
              if(user.phone)
                  sucUsers.push(user);
          });
          res.render('sites/users', { title: 'Express',total:users.length,suctotal:sucUsers.length,users:sucUsers });
      }
  })
});

router.get('/gameslog/:gameid', function(req, res){
    var gameid = req.params.gameid || 1;
    var pagesize = 50;
    var pageindex = req.query.page || 1;
    //GamesLogModel.find({gameid:gameid}).sort({create_at:-1}).skip(pagesize * (pageindex-1)).limit(pagesize);
    GamesLogModel.count({gameid:gameid}, function(err, count){
        if(err)
            res.jsonp(err);
        else{
            var totalPage = (count % pagesize == 0) ? count / pagesize : parseInt(count / pagesize) + 1;
            GamesLogModel.find({gameid:gameid}, null, {sort:{create_at:-1},skip:pagesize*(pageindex - 1),limit:pagesize}, function(err, results){
                if(err)
                    res.jsonp(err);
                else{
                    res.render('sites/users', { title: 'gameslog',total:count,users:results, moment:moment, pageindex:pageindex, totalpages:totalPage});
                }
            });
        }
    });

});

module.exports = router;
