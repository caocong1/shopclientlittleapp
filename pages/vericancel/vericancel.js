// pages/vericancel/vericancel.js
var s = require('../../shopclient.js');
var appgl = getApp().globalData;
var scancode;

Page({
  data: {
    title: "卡券核销",
    titleicon: "fa-thumbs-up",
    open: false,
    opencoupon:false,
    confirmbtname: '查询卡券',
    coupondisplay:'none'
  },
  inputscancode(e) {
    scancode = e.detail.value
  },
  onReady() {
    appgl.open = this.data.open
    const animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      // transformOrigin:'100% 0'
    })
    this.animation=animation
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
        this.setData({
          scancode:res.result
        })
      }
    })
  },
  confirm(){
    if(this.opencoupon){
      this.opencoupon=false
      this.setData({
        coupondisplay: 'none',
        confirmbtname:'查询卡券'
      })
      // this.animation.scaleY(0).step()
      // this.setData({
      //   anicoupon: this.animation.export()
      // })
    }else{
      this.opencoupon = true
      this.animation.opacity(0).step()
      this.setData({
        coupondisplay:'block',
        anicoupon: this.animation.export(),
        confirmbtname: '确定使用'
      })
      // this.animation.height('100%').step()
      // this.setData({
      //   anicoupon: this.animation.export()
      // })
    }
  }
})