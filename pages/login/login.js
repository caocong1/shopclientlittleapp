// pages/login/login.js
var qcloud = require('../../vendor/wafer2-client-sdk/index');
// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};
var storecode,username,password;
Page({
  data: {
  },
  inputstorecode: function (e) {
    console.log(e)
    storecode = e.detail.value
  },
  inputusername:function(e){
    username = e.detail.value
  },
  inputpassword: function (e) {
    password = e.detail.value
  },
  login() {
    showBusy('正在登录');
    // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
    qcloud.request({
      url: 'https://6lffoaqz.qcloud.la/weapp/loginuser',
      success: function (response) {
        var data = response.data.data[0];
        // console.log(storecode);
        console.log(storecode);
        if(data.storecode==storecode){
          showSuccess('登录成功')
          
        }else{
          showModel('登录失败','店铺号不匹配')
        }
      },
      fail: function (err) {
        console.log(err);
      }
    });

    wx.redirectTo({
      url: '../home/home'
    })
  }
})