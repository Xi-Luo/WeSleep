//app.js
App({
  data:{
    reportId:-1,
    morningTips:["祝您有愉快的一天","早睡早起身体好","适量运动可以让你精力充沛，睡得香又甜","长时间工作也不要忘记看看远方，放松眼睛和心灵哦","有健康的生活习惯，才有更乌黑浓密的秀发","记得今晚也要早睡打卡哦","要记得吃早餐哦","早餐可以吃牛奶鸡蛋等高蛋白物质增加营养哦","起床第一句，给你打个气","今天也要元气满满"],
    nightTips:["劳动了一天，祝您睡得香又甜","让我们一起放下手机，进入甜蜜的梦乡吧","明天听见闹钟要马上起来哦","今天就快过去了，明天又是崭新的一天","睡前洗个热水澡可以睡得更香哦","睡觉的时候保持环境避光安静很重要哦","睡觉前减少手机电脑的使用可以更快进入睡眠哦","睡眠好，心情好","尽量保持固定时间睡眠更有助健康哦","祝您好梦"]
  },
  onLaunch: function () {
    
    // 展示本地存储能力
    // var re = wx.getStorageSync('report')
    // this.setData({
    //   reportId: re.length - 1
    // })

    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})