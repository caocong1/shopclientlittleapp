// pages/notice/notice.js
var s = require('../../shopclient.js');
var appgl = getApp().globalData;
Page({
  data: {
    title:"通知公告",
    titleicon:"fa-envelope-open",
    item: {
      isread: false,
      noticetitle: "9月11日全体店长会",
      noticecontent: "9月11日在B1会议室召开全体...",
      noticetime: "2017-9-10 12:24:33",
      hasattr: true
    }
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