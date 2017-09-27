// pages/home/home.js
const s = require('../../shopclient.js');
const appgl = getApp().globalData;
Page({
  data: {
    title: "首页",
    titleicon: "fa-home",
    open: false
  },
  onLoad(){
    wx.hideLoading()
    if (!wx.getStorageSync('loginstatus')) {
      wx.redirectTo({
        url: '../login/login'
      })
      wx.showLoading({
        title: '返回登录界面',
        mask: true
      })
    }
  },
  onReady(){
    appgl.open=this.data.open;
    this.setData({
      storecode: wx.getStorageSync('storecode'),
      byname: wx.getStorageSync('byname')
    })
  },
  tap_ch() {
    s.toggle(this)
  },
  tap_start(e) {
    s.dragstart(e)
  },
  tap_drag(e) {
    s.drag(e)
  },
  tap_end() {
    s.dragend(this)
  },
  loginout(){
    wx.clearStorage()
  }
})