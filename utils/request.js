import { Base64 } from 'js-base64'
import config from './config'

class MyService{
  request(param){
    return new Promise((resolve, reject)=>{
      wx.request({
        url: config.baseUrl + param.url,
        method: param.method || 'get',
        data: param.data || null,
        header: {
          Authorization: this._encode()
        },
        success: (res)=>{
          let code = res.statusCode.toString()
          if (code.startsWith('2')){
            resolve(res)
          }else {
            reject(res.msg||res.data)
          }
        },
        fail: (err)=>{
          that.showToast('请求失败！')
        }
      })
    })
  }
  showToast(errMsg){
    wx.showToast({
      title: errMsg,
      icon:'none',
      duration:600
    }) 
  }
  _encode(){
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    return 'Basic ' + base64
  }
}

export default MyService
