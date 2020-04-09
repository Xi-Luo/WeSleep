Page({
  data: {
    time: '',
    sleepTime: '',
    next: false
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
    console.log(this.data.time)
    wx.setStorageSync('getUpTime', this.data.time + ':00')
  },
  bindSleepTimeChange: function(e) {
    wx.setStorageSync('sleepTime', e.detail.value + ':00')
    this.setData({
      sleepTime: e.detail.value
    })

  },
  nextStep: function () {
    wx.switchTab({
      url: '../../home/home',
    })
  }
});