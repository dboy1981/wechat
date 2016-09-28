/**
 * Created by dboy on 16/8/1.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //console.log(req.user);
    res.render('sites/qa', { title: 'Express',user:req.user });
});

module.exports = router;