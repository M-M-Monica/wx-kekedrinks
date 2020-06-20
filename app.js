import Token from './utils/token'

App({
  onLaunch: ()=>{
    Token.verify()
  }
})