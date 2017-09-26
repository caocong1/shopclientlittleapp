// pages/vericancel/vericancel.js
var s = require('../../shopclient.js');
var appgl = getApp().globalData;
var scancode;
function vericancel(){
  wx.showToast({
    title: '核销成功',
    icon: 'success',
    duration: 2000
  })
}
Page({
  data: {
    title: "卡券核销",
    titleicon: "fa-thumbs-up",
    open: false,
    opencoupon:false,
    confirmbtname: '查询卡券',
    top:0,
    coupondisplay:'none',
    coupontitle:'',
    couponcontent:'',
    member: '',
    couponNo:'',
    toview:''
  },
  inputscancode(e) {
    scancode = e.detail.value
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
  scancode(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.scancode = res.result
        this.setData({
          scancode: this.scancode
        })
      }
    })
  },
  confirm(){
    if(this.opencoupon){
      wx.showLoading({
        title: '核销中',
        mark:true
      })
      vericancel()
      this.opencoupon = false
      this.setData({
        coupondisplay: 'none',
        confirmbtname: '查询卡券',
        scancode:'',
        top:0
      })
    }else{
      this.opencoupon = true
      this.setData({
        coupondisplay:'block',
        coupontitle: '抓钱机游戏券',
        couponcontent: '9.16当日消费满800元(会员满600元）或会员登录朝阳大悦城APP消减1000积分,参与"抓钱机”活动1次。',
        member: '王小明',
        couponNo: '88888888888888888',
        confirmbtname: '确定使用',
        toview: 'coupond'
      })
    }
  },
  closecoupond(){
    this.opencoupon = false
    this.setData({
      coupondisplay: 'none',
      confirmbtname: '查询卡券',
      scancode: '',
      top:0
    })
  }
})