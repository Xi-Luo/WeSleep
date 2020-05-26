Page({
  data: {
    birth: '',
    next: false
  },
  bindDateChange: function (e) {
    this.setData({
      birth: e.detail.value
    })
    wx.setStorageSync('birth', this.data.birth)
  },
  nextStep: function() {
    wx.navigateTo({
      url: '../../hairInitiate/hairInitiate',
    })
  }
});