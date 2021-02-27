import WxValidate from "../../utils/WxValidate";
import MyService from '../../utils/request'
const ms = new MyService()

Component({
  properties: {
    user: Object
  },
  data: {
    infoChange: true
  },
  attached() {
    this._initValidate()
  },
  methods: {
    closeMask(){//关闭弹层
      this.setData({
        infoChange: false
      })
      this.triggerEvent('closeMask', false)
    },
    formSubmit(e) {
      let userInfo = e.detail.value
      if (!this.WxValidate.checkForm(userInfo)) {
        const error = this.WxValidate.errorList[0]
        this._showModal(error)
        return false
      }
      ms.request({
        url: '/user/update',
        method: 'post',
        data: {
          userInfo
        }
      }).then(res => {
        if(res.data.error_code === 0){
          this.triggerEvent('changeUser', userInfo)
          this._showModal({
            msg: '提交成功'
          })
          this.setData({
            infoChange: false,
            user: userInfo
          })
        }
      })
    },
    _initValidate() {
      const rules = {
        name:{
          required: true,
          minlength: 2
        },
        tel:{
          required: true,
          tel: true
        },
        address:{
          required: true
        }
      }
      const messages = {
        name:{
          required: '请填写收货人姓名',
          minlength: '请填写正确的名称'
        },
        tel:{
          required: '请填写手机号',
          tel: '请填写正确的手机号'
        },
        address:{
          required: '请填写地址'
        }
      }
      this.WxValidate = new WxValidate(rules, messages)
    },
    _showModal(error) {
      wx.showModal({
        content: error.msg,
        showCancel: false
      })
    }
  }
})