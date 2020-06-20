import config from '../../utils/config'
import MyService from '../../utils/request'
const ms = new MyService()

Page({
  data: {
    food: [],
    ball: false,
    ball_x: 0,
    ball_y: 0
  },
  onLoad(){
    ms.request({
      url: '/product/list/drinks/1'
    }).then(res => {
      let food = res.data.rows
      food.forEach((item)=>{
        item.img = config.baseUrl + item.img
      })
      this.setData({
        food: food
      })
    },errMsg => {
      ms.showToast(errMsg)
    })
  },
  getFoodList(e){
    let category = e.target.id
    ms.request({
      url: `/product/list/${category}/1`
    }).then(res => {
      let food = res.data.rows
      food.forEach((item)=>{
        item.img = config.baseUrl + item.img
      })
      this.setData({
        food: food
      })
    },errMsg => {
      ms.showToast(errMsg)
    })
  },
  addToCart(e){
    let id = e.currentTarget.dataset.id
    let x = parseInt(e.detail.x)
    let y = parseInt(e.detail.y)
    this.setData({
      ball: true,
      ball_x: x+'px',
      ball_y: y-40+'px'
    })
    ms.request({
      url: `/cart/add/${id}`
    }).then((res) => {
      ms.showToast(res.data.msg)
      this.setData({
        ball: false
      })
    },errMsg => {
      ms.showToast(errMsg)
    })
  }
})