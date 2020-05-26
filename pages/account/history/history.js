Page({
  /**
   * 页面的初始数据
   */
  data: {
    reports:[],
    noRe:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      reports:wx.getStorageSync('report')
    })
    if(this.data.reports.length==0){
      this.setData({noRe:true})
    }
  },
  clickItem:function(e){
    wx.navigateTo({
      url: '../../historyReport/historyReport?index='+e.currentTarget.dataset.index,
    })
  },
})