import config from '../../utils/config'
import MyService from '../../utils/request'
const ms = new MyService()

Page({
  data: {
    cart: [],
    total: 0
  },
  onShow(){
    ms.request({
      url: '/cart/list'
    }).then(res => {
      let cartList = res.data
      let sum = 0
      let single
      if(cartList.length != 0){
        cartList.forEach((item)=>{
          item.img = config.baseUrl + item.img
          single = item.CartList.status === 1 ? item.price*item.CartList.count : 0
          sum += single
          return sum
        })
      }
      this.setData({
        cart: cartList,
        total: sum
      })
    },errMsg => {
      ms.showToast(errMsg)
    })
  },
  goToPay(){
    let cart = this.data.cart
    let total = this.data.total
    let cartList = []
    cart.forEach((item)=>{
      if(item.CartList.status === 1){
        cartList.push(item)
      }
    })
    wx.navigateTo({
      url: `/pages/pay/pay?cart=${JSON.stringify(cartList)}&total=${total}`
    })
  },
  deleteGood(e){
    let id = e.currentTarget.dataset.id
    ms.request({
      url: `/cart/delete/${id}`
    }).then(() => {
      this.onShow()
    },errMsg => {
      ms.showToast(errMsg)
    })
  },
  checkboxChange(e){
    let id = e.currentTarget.dataset.id
    ms.request({
      url: `/cart/select/${id}`
    }).then(() => {
      this.onShow()
    },errMsg => {
      ms.showToast(errMsg)
    })
  },
  decrease(e){
    let id = e.currentTarget.dataset.id
    let count = e.currentTarget.dataset.count
    if(count>1){
      ms.request({
        url: `/cart/decrease/${id}`
      }).then(() => {
        this.onShow()
      },errMsg => {
        ms.showToast(errMsg)
      })
    }
  },
  increase(e){
    let id = e.currentTarget.dataset.id
    ms.request({
      url: `/cart/increase/${id}`
    }).then(() => {
      this.onShow()
    },errMsg => {
      ms.showToast(errMsg)
    })
  }
})