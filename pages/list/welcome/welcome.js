Page({
  data: {
    time: 3,
  },
  onReady() {
    wx.setStorage({
      key: 'isFirst',
      data: '1'
    })
    wx.setStorage({
      key: 'basicInformation',
      data: [
        {
        birth: '1',
        major: '1',
        gender: '1',
        medicine: {
          birth: '1',
          major: '1',
        }
      },
      {
        birth: '1',
        major: '1',
        gender: '1',
        medicine: {
          birth: '1',
          major: '1',
        }
      }
      ]
    })
    var isFirst = wx.getStorageSync('isFirst')
    var wdata = wx.getStorageSync('basicInformation')
    console.log('kkkkkkkkk',wdata)
    if (isFirst == 1) {
      console.log(isFirst, 'iiiiiiiiiiiiiis')
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
    wx.reLaunch({
      url: '../pickerMajor/pickerMajor',
    })
  }

});