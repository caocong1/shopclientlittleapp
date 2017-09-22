// pages/notice/notice.js
var s = require('../../shopclient.js');
import itemData from './mock.js'
var appgl = getApp().globalData;
Page({
  data: {
    title:"通知公告",
    titleicon:"fa-envelope-open",
    itemData
  },
  onReady: function () {
    appgl.open = this.data.open
  },
  tap_ch: function(){
    s.toggle(this);
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