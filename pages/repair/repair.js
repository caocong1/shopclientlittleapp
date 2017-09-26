// pages/repair/repair.js
var s = require('../../shopclient.js');
var appgl = getApp().globalData;
Page({
  data: {
    title: "工程报修",
    titleicon: "fa-wrench",
    open: false,
    repairtype: ['','水电气', '场内设施', '网络', '其他'],
    index: 0,
    newrepairbtn:'block'
  },
  onReady() {
    appgl.open = this.data.open
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
  tap_end(e) {
    s.dragend(this)
  },
  newrepair(){
    this.setData({
      newrepairbtn: ''
    })
  },
  repairtypepicker(e) {
    this.setData({
      index: e.detail.value
    })
  },
})