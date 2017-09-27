// pages/vericancel/vericancel.js
var s = require('../../shopclient.js');
var appgl = getApp().globalData;
var scancode='';
// function scancoupon(scancode,page){
//   page.opencoupon = true
//   page.setData({
//     scancode: page.scancode,
//     coupondisplay: 'block',
//     coupontitle: '抓钱机游戏券',
//     couponcontent: '9.16当日消费满800元(会员满600元）或会员登录朝阳大悦城APP消减1000积分,参与"抓钱机”活动1次。',
//     member: '王小明',
//     couponNo: '88888888888888888',
//     confirmbtname: '确定使用',
//     toview: 'coupond'
//   })
// }
function vericancel(){
  var storecode = wx.getStorageSync("storecode")
  var username = wx.getStorageSync("username")
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
        wx.showToast({
          title: '核销成功',
          icon: 'success',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: '核销失败',
          duration: 2000
        })
      }
      scancode = ''
    },
    fail(err){
      console.log(err)
    }
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
    confirmbtndisplay: 'none'
  },
  inputfocus(e){
    this.setData({
      confirmbtndisplay: 'block' 
    })
  },
  inputscancode(e) {
    scancode = e.detail.value
    if(scancode === ''){
      this.setData({
        confirmbtndisplay: 'none'
      })
    }
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
      onlyFromCamera:true,
      success: (res) => {
        console.log(res)
        wx.request({
          url: 'https://sorawatcher.com/wx/noah/tenant/search.do',
          method:'POST',
          data:{
            couponNo:res.result,
            vtype: 1
          },
          success:(r)=>{
            console.log(r)
            var coupon = r.data.value
            if (coupon!==null){
              this.opencoupon = true
              this.setData({
                scancode: res.result,
                coupondisplay: 'block',
                coupontitle: coupon.title,
                couponcontent: coupon.content,
                member: coupon.member,
                couponNo: res.result,
                confirmbtname: '确定使用',
                scanbtndisplay: 'none',
                inputdisplay: 'none',
                confirmbtndisplay: 'block'
              })
            }else{
              wx.showToast({
                title: '卡券错误',
                duration: 1000
              })
            }
          },
          fail(err){
            console.log(err)
          }
        })
        scancode = res.result

      },
      fail: (err)=> {
        console.log('err:',err)
        // wx.showToast({
        //   title: '扫描错误',
        //   duration: 1000
        // })
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
        scanbtndisplay: 'block',
        inputdisplay: 'block',
        confirmbtndisplay: 'none',
        confirmbtname: '查询卡券',
        scancode:'',
        top:0
      })
    }else{

    }
  },
  closecoupond(){
    this.opencoupon = false
    scancode = ''
    this.setData({
      coupondisplay: 'none',
      scanbtndisplay: 'block',
      inputdisplay: 'block',
      confirmbtndisplay: 'none',
      confirmbtname: '查询卡券',
      scancode: '',
      top:0
    })
  }
})