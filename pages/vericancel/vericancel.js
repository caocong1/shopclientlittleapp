// pages/vericancel/vericancel.js
var s = require('../../shopclient.js');
var appgl = getApp().globalData;
var scancode='';
var animered = wx.createAnimation({
  duration: 500,
  timingFunction: "ease",
  transformOrigin: "center"
})
var animegreen = wx.createAnimation({
  duration: 500,
  timingFunction: "ease",
  transformOrigin: "center"
})
function searchcoupon(page){
  wx.request({
    url: 'https://sorawatcher.com/wx/noah/tenant/search.do',
    method: 'POST',
    data: {
      couponNo: scancode,
      vtype: 1
    },
    success: (r) => {
      console.log(r)
      if(r.data.flag){
        var coupon = r.data.value
        page.opencoupon = true
        page.setData({
          scancode: scancode,
          coupondisplay: '',
          coupontitle: coupon.title,
          couponcontent: coupon.content,
          member: coupon.member,
          couponNo: coupon.couponNo,
          confirmbtname: '确定使用',
          scanbtndisplay: 'none',
          inputdisplay: 'none',
          confirmbtndisplay: '',
          inputvalue: ''
        })
        scancode = ''
        closeinput(page)
        scancode = coupon.couponNo
      } else {
        wx.showLoading({
          title: r.data.value,
          // mask: true
        })
      }
    },
    fail(err) {
      console.log(err)
    }
  })
}
function vericancel(){
  var storecode = wx.getStorageSync("storecode")
  var username = wx.getStorageSync("username")
  console.log(scancode, storecode, username)
  wx.request({
    url: 'https://sorawatcher.com/wx/noah/tenant/search.do',
    method: 'POST',
    data:{
      couponNo:scancode,
      vtype:2,
      storecode:storecode,
      username:username
      },
    success(r){
      console.log(r)
      if(r.data.flag){
        wx.showLoading({
          title: '核销成功',
          // mask : true
        })
      }else{
        wx.showLoading({
          title: '核销失败',
          // mask: true
        })
      }
      scancode = ''
    },
    fail(err){
      console.log(err)
    }
  })
}
function closeinput(page){
  // scancode = e.detail.value
  if (scancode === '') {
    var b = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      transformOrigin: "center"
    })
    animered.opacity('0').step()
    animegreen.opacity('0').step()
    b.left('275rpx').width('200rpx').step()
    page.setData({
      animered: animered.export(),
      animegreen: animegreen.export()
    })
    setTimeout(function () {
      page.setData({
        anime: b.export()
      })
    }, 500)
  }
}
function closecoupon(page) {
  page.opencoupon = false
  scancode = ''
  page.setData({
    coupondisplay: 'none',
    scanbtndisplay: '',
    inputdisplay: '',
    confirmbtndisplay: 'none',
    confirmbtname: '查询卡券',
    scancode: '',
    top: 0
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
    confirmbtndisplay: 'none',
    disred:true,
    disgreen:true,
    inputvalue:''
  },
  inputfocus(e){
    var that = this
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      transformOrigin: "center"
    })
    var animered = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      transformOrigin: "center"
    })
    var animegreen = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      transformOrigin: "center"
    })
    animation.left('175rpx').width('400rpx').step()
    animered.opacity('1').step()
    animegreen.opacity('1').step()
    this.setData({
      anime: animation.export()
    })
    setTimeout(function(){
      that.setData({
        animered: animered.export(),
        animegreen: animegreen.export()
      })
    },500)
  },
  inputblur(e){
    scancode = e.detail.value
    closeinput(this)
  },
  inputscancode(e) {
    scancode = e.detail.value
    if(scancode === ''){
      this.setData({
        confirmbtndisplay: 'none'
      })
    }
  },
  inputcode(e){
    console.log(e)
    this.setData({
      disred: (e.detail.value === '') ? true : false
    })
    this.setData({
      disgreen: (e.detail.value.length === 11) ? false : true
    })
    if (e.detail.value.length === 11){
      scancode=e.detail.value
    }
  },
  onReady() {
    appgl.open = this.data.open
  },
  tap_ch() {
    s.toggle(this)
  },
  tap_start(e) {
    wx.hideLoading()
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
      onlyFromCamera:true,
      success: (res) => {
        console.log(res)
        scancode = res.result
        searchcoupon(this)
      },
      fail: (err)=> {
        console.log('err:',err)
      }
    })
  },
  confirm(){
    if(this.opencoupon){
      wx.showLoading({
        title: '核销中',
        // mask:true
      })
      vericancel()
      closecoupon(this)
    }else{

    }
  },
  closecoupon(){
    closecoupon(this)
  },
  redbtn(){
    this.setData({
      inputvalue:''
    })
  },
  greenbtn(){
    searchcoupon(this)
  }
})