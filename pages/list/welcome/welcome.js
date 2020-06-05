Page({
  data: {
    time: 3,
  },
  onReady() {
    wx.getStorage({
      key: 'isFirst',
      success: function(res) {
      },
      fail:function(){
        wx.setStorage({
          key: 'isFirst',
          data: 0
        })
      }
    })
    var app=getApp()
    app.data.reportId=wx.getStorageSync('report').length-1
    var isFirst=wx.getStorageSync('isFirst')
    if (isFirst == 1) {
      //5s后跳转
      this.data.Time = setInterval(() => {
        this.setData({
          time: --this.data.time
        })
        if (this.data.time <= 0) {
          clearInterval(this.data.Time)
          wx.switchTab({
            url: '../../home/home',
          })
        }
      }, 1000)
    } else {
      //5s后跳转
      
        var arr = []
        wx.setStorageSync('report', arr)
        wx.setStorageSync('startDate', '')
        wx.setStorageSync('getUpTime', arr)
        wx.setStorageSync('sleepTime', arr)
        wx.setStorageSync('dayScore', arr)
        wx.setStorageSync('nightScore', arr)
        wx.setStorageSync('reports', arr)
        var ad = ["本周睡眠情况很好，请继续保持良好的睡眠习惯，每天活力满满哦~", "本周睡眠情况还行，还有上升空间。如果白天精力不够可以在休息时间进行20分钟的小憩来补充精力；睡前1小时洗个热水澡更有助睡眠哦~", "本周睡眠情况一般，你需要注意你的睡眠了 。好的睡眠可以让你心情舒畅，白天精力满满。你可以尝试睡前泡个热水澡，进行适量的运动，保持睡眠环境的安静舒适，睡前不玩手机，尽量在固定的时间段睡觉。希望你有更好的睡眠。", "本周睡眠情况很差，身体健康告急！！！睡眠不好会导致心情焦躁抑郁，白天提不起精神，还会增加各种疾病的患病风险。小管家建议你：尽量选择固定的时间段睡觉；睡前不玩手机，泡个热水澡；保持睡眠环境安静舒适；进行适量运动；如果实在辗转难眠可以向专业医疗人士寻求帮助。不管下雨还是晴天都要好好睡觉，小管家先跟你说一声“晚安”~"]
        wx.setStorageSync('advice', ad)
      
     
      this.data.Time = setInterval(() => {
        this.setData({
          time: --this.data.time
        })
        if (this.data.time <= 0) {
          clearInterval(this.data.Time)
          this.goHome()
        }
      }, 1000)
    }
  },
  goHome() {
    clearInterval(this.data.Time)
    wx.navigateTo({
      url: '../guide/guide',
    })
  }
});