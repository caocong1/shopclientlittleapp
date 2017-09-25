// pages/vericancel/vericancel.js
var s = require('../../shopclient.js');
var appgl = getApp().globalData;
var scancode;
Page({
  data: {
    title: "卡券核销",
    open: false
  },
  inputscancode: function (e) {
    console.log(e)
    scancode = e.detail.value
  },
  onReady: function () {
    appgl.open = this.data.open
  },
  tap_ch: function () {
    s.toggle(this)
  },
  tap_start: function (e) {
    s.dragstart(e)
  },
  tap_drag: function (e) {
    s.drag(e)
  },
  tap_end: function (e) {
    s.dragend(this)
  },
  scancode: function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.setData({
          scancode:res.result
        })
      }
    })
  }

})