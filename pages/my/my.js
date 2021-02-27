import config from '../../utils/config'
import MyService from '../../utils/request'
const ms = new MyService()

Page({
  data: {
    user: {},
    order: [],
    myInfo: false,//我的信息
    myOrder: false,//我的订单
    infoChange: false//修改弹层
  },
  onLoad(){
    ms.request({
      url: '/user/info'
    }).then(res => {
      this.setData({
        user: res.data
      })
    })
  },
  getChangeUser(e){
    this.setData({
      user: e.detail
    })
  },
  getMaskStatus(e){
    this.setData({
      infoChange: e.detail
    })
  },
  showMyInfo(){
    this.setData({
      myInfo: !this.data.myInfo
    })
  },
  showMyOrder(){
    ms.request({
      url: '/order/list'
    }).then(res => {
      this._changeOrderClass(res.data)
    })
  },
  changeMyInfo(){
    this.setData({
      infoChange: true
    })
  },
  goToPay(e){
    let id = e.currentTarget.dataset.id
    ms.request({
      url: `/order/pay/${id}`
    }).then(res => {
      if(res.data.error_code === 0){
        wx.showModal({
          content: '支付成功',
          showCancel: false
        })
        this.showMyOrder()
      }
    })
  },
  _changeOrderClass(orderList){
    orderList.forEach((item) => {
      item.Products.forEach((i)=>{
        i.img = config.baseUrl + i.img
      })
      if(item.status === 1){
        item.statusInfo = '未支付',
        item.statusClass = 'button-no'
      }else if(item.status === 2){
        item.statusInfo = '已支付',
        item.statusClass = 'button-success'
      }else if(item.status === 3){
        item.statusInfo = '已完成',
        item.statusClass = 'button-finish'
      }
    })
    this.setData({
      order: orderList,
      myOrder: true
    })
  }
})