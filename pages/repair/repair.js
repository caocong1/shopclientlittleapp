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
    repaircontent:'',
    newrepairbtn:'',
    addrepairdisplay:'none',
    imgurl:["","",""],
    imgdisplay:["none","none","none"]
  },
  onReady() {
    appgl.open = this.data.open
  },
  tap_ch() {
    s.toggle(this)
  },
  tap_start(e) {
    wx.hideToast()
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
      newrepairbtn: 'none',
      addrepairdisplay:''
    })
  },
  repairtypepicker(e) {
    this.setData({
      index: e.detail.value
    })
  },
  uploadimgbtn(){
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      success: (res)=> {
        var tempFilePaths = res.tempFilePaths
        for (var i = 0; i < 3;i++){
          (i < tempFilePaths.length) ? this.data.imgdisplay[i] = "" : this.data.imgdisplay[i] = "none"
        }
        this.data.imgurl = tempFilePaths
        this.setData({
          imgurl: tempFilePaths,
          imgdisplay: this.data.imgdisplay
        })
      },
      fail(err){
        console.log(err)
      }
    })
  },
  imgp(e){
    wx.previewImage({
      current: this.data.imgurl[e.target.dataset.img],
      urls: this.data.imgurl
    })
  },
  imgclose(e){
    this.data.imgurl[e.target.dataset.img]=""
    this.data.imgdisplay[e.target.dataset.img]="none"
    this.setData({
      imgdisplay: this.data.imgdisplay
    })
  },
  submitrepair(){
    this.setData({
      newrepairbtn: '',
      addrepairdisplay: 'none'
    })
    wx.showLoading({
      title: '提交中'
    })
  },
  resetrepair() {
    this.data.imgurl = ["", "", ""]
    this.data.imgdisplay = ["none", "none", "none"]
    this.setData({
      index:"",
      repaircontent:"",
      imgurl: this.data.imgurl,
      imgdisplay: this.data.imgdisplay
    })
  }
})