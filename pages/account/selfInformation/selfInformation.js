Page({
  data: {
    sex: ["男", "女"],
    sexIndex: '',
    sexChosen: '',
    majors:["理工类","文史类","管理类","艺术类"],
    majorIndex: '',
    majorChosen: '',
    tablets: ["无","不超过1周1次", "1周1~2次","1周3次以上"],
    tabletIndex: '',
  },
  onLoad: function (options) {
    this.setData({
      sexChosen: wx.getStorageSync('gender'),
      majorChosen: wx.getStorageSync('major'),
      tabletIndex: wx.getStorageSync('tablet')
    })
  },

  bindSexChange: function (e) {
    console.log('picker sex 发生选择改变，携带值为', e.detail.value);
    wx.setStorageSync('gender', this.data.sex[e.detail.value])
    this.setData({
      sexIndex: e.detail.value,
      sexChosen: wx.getStorageSync('gender')
    })
    console.log('gender',this.data.sexChosen)
  },
  bindMajorChange: function (e) {
    console.log('picker major 发生选择改变，携带值为', e.detail.value);
    wx.setStorageSync('major', this.data.majors[e.detail.value])
    this.setData({
      majorIndex: e.detail.value,
      majorChosen: wx.getStorageSync('major')
    })
    console.log('major', this.data.majorChosen)
  },
  bindTabletChange: function(e) {
    console.log('picker tablet 发生选择改变，携带值为', e.detail.value);
    wx.setStorageSync('tablet', e.detail.value)
    this.setData({
      tabletIndex: wx.getStorageSync('tablet')
    })
    console.log('tablet', this.data.tabletIndex)
  }
})