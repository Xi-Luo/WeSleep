const app = getApp()
Page({
  data: {
    tablets: ["无", "不超过1周1次", "1周1~2次", "1周3次以上"],
    tabletIndex: '',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      tabletIndex: wx.getStorageSync('tablet')
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  bindTabletChange: function (e) {
    console.log('picker tablet 发生选择改变，携带值为', e.detail.value);
    wx.setStorageSync('tablet', e.detail.value)
    this.setData({
      tabletIndex: wx.getStorageSync('tablet')
    })
    console.log('tablet', this.data.tabletIndex)
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})