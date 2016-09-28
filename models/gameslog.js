/**
 * Created by dboy on 16/9/23.
 */
var mongoose = require('mongoose');

var schema = {
    gameid: {type:Number, index: true},
    username: String,
    phone: String,
    create_at: Date
};

var GamesLogSchema = new mongoose.Schema(schema);
GamesLogSchema.index({'gameid':1, 'username':1, 'phone':1});

module.exports = mongoose.model('gameslog', GamesLogSchema);