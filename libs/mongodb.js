var mongoose = require('mongoose');

// Connection ready state
//
// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting

var db = mongoose.connection;
var dbURI = 'mongodb://127.0.0.1:27017/gamesehome';

if(db.readyState == 0){

    mongoose.connect(dbURI);
    // CONNECTION EVENTS
    // When successfully connected
    db.on('connected', function () {
        console.log('Mongoose default connection open to ' + dbURI);
    });

    // If the connection throws an error
    db.on('error',function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    db.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function() {
        db.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}

exports.mongoose = mongoose;