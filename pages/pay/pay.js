import config from '../../utils/config'
import MyService from '../../utils/request'
const ms = new MyService()

Page({
  data: {
    user: {},
    order: {},
    cart: [],
    infoChange: false
  },
  onLoad(options){
    let cart = JSON.parse(options.cart)
    let total = parseInt(options.total)
    let goodsObj = {}
    let goodsArr = []
    cart.forEach((item)=>{
      item.img = config.baseUrl + item.img
      goodsObj = { id: item.id, count: item.CartList.count }
      goodsArr.push(goodsObj)
    })
    this.setData({
      cart: cart
    })
    ms.request({
      url: '/order/create',
      method: 'post',
      data: {
        goodsArr,
        total
      },
    }).then(res=>{
      this.setData({
        user: res.data.customer,
        order: res.data.order
      })
    },errMsg=>{
      ms.showToast(errMsg)
    })
  },
  getChangeUser(e){
    this.setData({
      user: e.detail
    })
  },
  changeInfo(){
    this.setData({
      infoChange: true
    })
  },
  goToPay(){
    ms.request({
      url: `/order/pay/${this.data.order.id}`
    }).then(res=>{
      if(res.data.error_code === 0){
        wx.showModal({
          content: '支付成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '/pages/home/home'
              })
            }
          }
        })
      }
    },errMsg=>{
      ms.showToast(errMsg)
    })
  },
  cancelOrder(){
    ms.request({
      url: `/order/cancel/${this.data.order.id}`
    }).then(res=>{
      if(res.data.error_code === 0){
        wx.showModal({
          content: '取消成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '/pages/home/home'
              })
            }
          }
        })
      }
    },errMsg=>{
      ms.showToast(errMsg)
    })
  }
})