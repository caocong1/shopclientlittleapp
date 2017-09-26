// pages/login/login.js
// const qcloud = require('../../vendor/wafer-client-sdk/index');
const appgl = getApp().globalData;
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
var storecode='',username='',password='';
function login() {
  showBusy('正在登录');
  if (storecode == '' | username == '' | password == '') {
    showModel('输入错误', '请填完整店铺号or用户名or密码')
  } else {
    wx.request({
      url: 'https://sorawatcher.com/wx/noah/main/login.do',
      data: {
        storecode: storecode,
        username: username,
        password: password
      },
      method:'POST',
      success(res){
        console.log(res)
        wx.setStorageSync('loginstatus', res.data)
        if(res.data){
          wx.setStorageSync('storecode', storecode)
          wx.setStorageSync('username', username)
          wx.redirectTo({
            url: '../home/home'
          })
        }else{
          showModel('登录失败', '输入错误')
        }
      },
      fail(err){
        console.log(err)
      }
    })
    // qcloud.request({
    //   login: true,
    //   data: {
    //     storecode: storecode,
    //     username: username,
    //     password: password
    //   },
    //   url: 'https://sorawatcher.com/user',
    //   success: function (res) {
    //     var userInfo = res.data.data.userInfo
    //     if (!wx.getStorageSync('openId')) {
    //       wx.setStorageSync('avatarUrl', userInfo.avatarUrl)
    //       wx.setStorageSync('openId', userInfo.openId)
    //     }
    //     if (userInfo.loginstatus === 1) {
    //       showSuccess('登录成功')
    //       wx.setStorageSync('loginstatus', 1)
    //       wx.setStorageSync('storecode', storecode)
    //       wx.setStorageSync('byname', userInfo.byname)
    //       wx.redirectTo({
    //         url: '../home/home'
    //       })
    //     } else if (userInfo.loginstatus === 2) {
    //       showModel('登录失败', '该店铺无此用户')
    //     } else {
    //       showModel('登录失败', '输入错误')
    //     }
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }
    // });
  }
}
Page({
  data: {
    usernamefocus:false,
    passwordfocus:false,
  },
  inputstorecode(e) {
    storecode = e.detail.value
  },
  storecodeconfirm(e){
    storecode = e.detail.value
    this.setData({
      usernamefocus:true
    })
  },
  inputusername(e){
    username = e.detail.value
  },
  usernameconfirm(e){
    username = e.detail.value
    this.setData({
      passwordfocus: true
    })
  },
  inputpassword(e) {
    password = e.detail.value
  },
  passwordconfirm(e){
    password = e.detail.value
    login()
  },
  login() {login()},
  onLoad() {
    wx.hideLoading()
    if (wx.getStorageSync('loginstatus')) {
      wx.redirectTo({
        url: '../home/home'
      })
      wx.showLoading({
        title: '自动登录中...',
        mask:true
      })
      // setTimeout(function(){
      //   wx.redirectTo({
      //     url: '../home/home'
      //   })
      // },1500)
    }
  }
})