import config from './config'

class Token {
  static verify() {
    let token = wx.getStorageSync('token');
    if (!token) {
      generateToken();
    }else {
      veirfyToken(token);
    } 
  }
}
function generateToken() {
  wx.login({
    success:(res)=>{
      if(res.code){
        wx.request({
          url: config.baseUrl + '/token',
          method: 'POST',
          data:{
            account: res.code,
            type: 100
          },
          success: (res)=>{
            const code = res.statusCode.toString()
            if(code.startsWith('2')){
              wx.setStorageSync('token', res.data)
            }
          }
        })
      }
    }
  })
}
function veirfyToken(token) {
  wx.request({
    url: config.baseUrl + '/verify',
    method: 'POST',
    data: {
      token: token
    },
    success: (res)=>{
      if(!res){
        generateToken()
      }
    }
  })
}

export default Token