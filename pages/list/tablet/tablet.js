Page({

  data: {
    choseMajor: "无",
    choseA: false,
    choseB: false,
    choseC: false,
    choseD: false,
  },

  onLoad: function(options) {
    this.setData({
      choseA: false,
      choseB: false,
      choseC: false,
      choseD: false,
    })
  },

  choseA: function(e) {
    choseMajor: "无";
    choseA: true;
    wx.setStorageSync('tablet', 0)
    wx.navigateTo({
      url: '../pickerBirth/pickerBirth',
    })
  },

  choseB: function(e) {
    choseMajor: "不超过一周1次";
    choseB: true;
    wx.setStorageSync('tablet', 1)
    wx.navigateTo({
      url: '../pickerBirth/pickerBirth',
    })
  },

  choseC: function(e) {
    choseMajor: "一周1~2次";
    choseC: true;
    wx.setStorageSync('tablet', 2)
    wx.navigateTo({
      url: '../pickerBirth/pickerBirth',
    })
  },
  choseD: function (e) {
    choseMajor: "1周3次以上";
    choseD: true;
    wx.setStorageSync('tablet', 3)
    wx.navigateTo({
      url: '../pickerBirth/pickerBirth',
    })
  },
  
});