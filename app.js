//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');
App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl);
  },
  globalData: {
    userInfo: null,
    open: false,
    startmarkX: 0,
    startmarkY: 0,
    endmarkY: 0,
    mark: 0,
    newmark: 0,
    b:false,
    useravater:''
  },
})