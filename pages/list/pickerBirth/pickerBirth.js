Page({
  data: {
    birth: '',
    next: false
  },
  bindDateChange: function (e) {
    this.setData({
      birth: e.detail.value
    })
    console.log(this.data.birth)
    wx.setStorageSync('birth', this.data.birth)
  },
  nextStep: function() {
    wx.switchTab({
      url: '../pickGetupTime/pickGetupTime'
    })
  }
});