Page({

  data: {
    choseSex: "",
    choseA: false,
    choseB: false,
    
  },

  onLoad: function (options) {
    this.setData({
      choseA: false,
      choseB: false,
      choseC: false,
    })
  },

  choseA: function (e) {
    choseSex: "男";
    choseA: true;
    wx.setStorageSync('gender', '男')
    console.log(wx.getStorageSync('gender'))
    wx.navigateTo({
      url: '../tablet/tablet',
    })
  },

  choseB: function (e) {
    choseSex: "女";
    choseB: true;
    wx.setStorageSync('gender', '女')
    console.log(wx.getStorageSync('gender'))
    wx.navigateTo({
      url: '../tablet/tablet',
    })
  },

  


});