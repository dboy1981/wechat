/**
 * Created by dboy on 16/7/29.
 */
module.exports = {
  wechat:{
      appid: 'wxdd45eb0e09d7b20e',
      secret: '57b1ed94031e764c2b7df95c7e14d64b',
      //appid:'wxc88e4d9c8f7f05cc',
      //secret:'ef820470545fefbfac4c069a8583f300',
      redirectUrl:'http://games.ehome100.com/oauth/confirm',
      state: '',
      scope:'snsapi_login'
  },
    redisConfig: function(options){
        var config = {
            port: 6379,          // Redis port
            host: '127.0.0.1',   // Redis host
            family: 4,           // 4 (IPv4) or 6 (IPv6)
            db: 0
        }
        for(var i in options){
            config[i] = options[i];
        }
        return config;
    }
};