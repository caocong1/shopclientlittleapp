// pages/notice/notice.js
var s = require('../../shopclient.js');
const itemData = [
  {
    "id": 1,
    "noticetitle": "9月11日全体店长会",
    "noticecontent": "9月11日在B1会议室召开全体店长会，请按时参加，不能参加的提前向楼层经理请假。",
    "noticetime": "2017-9-1 11:12:13",
    "sendusr": "dongli",
    "attachment": "attachment/doc1.docx,attachment/table1.xlsx",
    "endtime": "",
    "lv": "1",
    "isread": false
  },
  {
    "id": 2,
    "noticetitle": "店长交替请更新信息",
    "noticecontent": "从你公司得知有人员变动，请及时更新店长信息",
    "noticetime": "2017-9-1 09:08:07",
    "sendusr": "dongli",
    "attachment": "",
    "endtime": "",
    "lv": "1",
    "isread": false
  },
  {
    "id": 3,
    "noticetitle": "天气红色暴雨预警",
    "noticecontent": "请做好防水准备",
    "noticetime": "2017/9/2 09:08:07",
    "sendusr": "dongli",
    "attachment": "attachment/table2.xlsx,attachment/doc2.docx",
    "endtime": "",
    "lv": "2",
    "isread": true
  },
  {
    "id": 4,
    "noticetitle": "开饭了",
    "noticecontent": "今天去哪里吃呢",
    "noticetime": "2017/9/2 09:08:07",
    "sendusr": "dongli",
    "attachment": "",
    "endtime": "",
    "lv": "3",
    "isread": true
  }
]
// import itemData from './mock.js'
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