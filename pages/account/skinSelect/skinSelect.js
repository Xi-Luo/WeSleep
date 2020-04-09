// pages/skinSelect/skinSelect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skinItems: [
      { name: "默认", value: "/../images/skin/default.png",checked: true},
      { name: '1', value: 1 },
      { name: '1', value: 2 },
      { name: '1', value: 3 },
      { name: '1', value: 4 },
      { name: '1', value: 5 }
    ]
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var skinItems = this.data.skinItems;
    for (var i = 0, len = skinItems.length; i < len; ++i) {
      skinItems[i].checked = skinItems[i].value == e.detail.value;
    }

    this.setData({
      skinItems: skinItems
    });

    wx.showToast({
      title: '更改成功',
      icon: 'success',
      duration: 3000
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})