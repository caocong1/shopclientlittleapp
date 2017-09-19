// pages/repair/repair.js
var s = require('../../shopclient.js');
var appgl = getApp().globalData;
Page({
  data: {
    title: "工程报修",
    open: false
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
  }
})