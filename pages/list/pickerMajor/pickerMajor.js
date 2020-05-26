Page({
  data: {
    choseMajor: "文科",
    choseA: false,
    choseB: false,
    choseC: false,
  },
  onLoad: function(options) {
    this.setData({
      choseA: false,
      choseB: false,
      choseC: false,
    })
  },
  choseA: function(e) {
    choseMajor: "文科";
    choseA: true;
    wx.setStorageSync('major', '文科')
    wx.navigateTo({
      url: '../pickerSex/pickerSex',
    })
  },
  choseB: function(e) {
    choseMajor: "理工科";
    choseB: true;
    wx.setStorageSync('major', '理工科')
    wx.navigateTo({
      url: '../pickerSex/pickerSex',
    })
  },
  choseC: function(e) {
    choseMajor: "医学专业";
    choseC: true;
    wx.setStorageSync('major', '医学专业')
    wx.navigateTo({
      url: '../pickerSex/pickerSex',
    })
  },
});