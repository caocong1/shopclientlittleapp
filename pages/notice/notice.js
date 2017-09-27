// pages/notice/notice.js
var s = require('../../shopclient.js');
import itemData from './mock.js'
var appgl = getApp().globalData;
const animation = wx.createAnimation({
  duration: 10000,
  timingFunction: 'linear',
})
Page({
  data: {
    title:"通知公告",
    titleicon:"fa-envelope-open",
    itemData,
    refreshcontent:"往上拉刷新更多...",
    scrollin:"notice",
    loadingif:"none"
  },
  onReady() {
    appgl.open = this.data.open
  },
  tap_ch(){
    s.toggle(this);
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
  refresh(){

  },
  scrolltorefresh(e){
    console.log('height',e.detail.scrollHeight)
    console.log('top',e.detail.scrollTop)
    if (e.detail.scrollTop>115){
      this.setData({
        refreshcontent: "刷新中",
        loadingif:"",
      })
      setTimeout(()=> {
        this.setData({
          loadingif: "none",
          refreshcontent: "往上拉刷新更多...",
          scrollin: "notice" })
        wx.showToast({
          title: '加载完成',
          duration: 1000
        }) 
        }, 2000
      )
    }
  }
})