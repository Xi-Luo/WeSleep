var imageUtil = require('../../utils/util.js');

//c测试数据
var greetingChoice = ['早上好', '晚上好', '晚安']
var myDate = new Date()
var myHour = myDate.getHours()

var startDot = {
  X: 0,
  Y: 0
}

var touchDot = {
  X: 0,
  Y: 0
}
var time = 0//触屏时间
var number//定时器ID

Page({
  data: {

    imageUrl: "../img/homeImage.png",
    viewHeigh: "",
    viewWidth: "",
    greetingView: false,
    greeting: "",
    hour: myHour,
    showMorning: false,
    showEvening: false,
    score: 0,

    getUp: '',
    sleep: '',
    sleepLevel: '',
    dayLevel: '',
    todayDate: '',




    ec: {
      onInit: function (canvas, width, height) {
        cahrt = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        return chart;
      },
      lazyLoad: true //延迟加载
    },

  },

  input: function () {
    console.log("input")
  },

  transpond: function () {
    console.log("transpond")
  },

  onLoad: function (options) {
     var arr = []
     wx.setStorageSync('sleepLevel', arr)
    // var nowTime = new Date()
    // var timeStamp = Date.parse(nowTime)
    // console.log(nowTime)
    // var arr = [111,111,111]
    // var d = new Date()
    // arr[3]= d
    // console.log(d)
    // wx.setStorageSync('getUpRecord', arr)
    // var k = wx.getStorageSync('arr')
    // console.log(k[3])
    // console.log(wx.getStorageSync('arr'))
    
    // console.log('kk',nowTime)
    // var date = nowTime.getMonth()
    // var time = nowTime.getHours()
    // console.log('llllllll',date)
    this.setData({
      greeting: greetingChoice[0],
    })
  },

  //首页气泡问候
  onChangeShowState: function () {
    var that = this;
    that.setData({
      greetingView: (!that.data.greetingView),
    })
  },

  imageLoad: function (e) {
    var viewSize = imageUtil.getViewWHInfo(e);
    this.setData({
      viewHeigh: viewSize.height,
      viewWidth: viewSize.width
    })
  },

  submitMorning: function () {

    var now = new Date()
    var arr = wx.getStorageSync('getUpRecord')
    arr[arr.length] = now
    console.log(arr)
    wx.setStorageSync('getUpRecord', arr)
    // wx.setStorageSync(key, data)
    // if(wx.getStorageSync('reports') =='') {//新用户第一次使用打卡
    //   wx.setStorageSync('newGetUp', now)
    // }

    this.setData({
      showMorning: true
    })
  },

  submitEvening: function () {
    var now = new Date()
    var arr = wx.getStorageSync('sleepRecord')
    arr[arr.length] = now
    console.log(arr)
    wx.setStorageSync('sleepRecord', arr)

    
    if (wx.getStorageSync('reports') == '') {//新用户第一次使用打卡
      wx.setStorageSync('newSleep', now)
    }
    
    
    this.setData({
      showEvening: true
    })
  },

  sleepWell: function () {
    var arr = wx.getStorageSync('sleepLevel')
    arr[arr.length] = 3
    wx.setStorageSync('sleepLevel', arr)


    var that = this;
    var s = that.data.score + 4;
    this.setData({
      showMorning: false,
      score: s,
    })
    console.log("score:" + that.data.score);

  },

  sleepSoso: function () {
    var arr = wx.getStorageSync('sleepLevel')
    arr[arr.length] = 1.5
    wx.setStorageSync('sleepLevel', arr)



    var that = this;
    var s = that.data.score + 2;
    this.setData({
      showMorning: false,
      score: s,
    })
    console.log("score:" + that.data.score);
  },

  sleepBad: function () {
    var arr = wx.getStorageSync('sleepLevel')
    arr[arr.length] = 0
    wx.setStorageSync('sleepLevel', arr)


    var that = this;
    var s = that.data.score + 0;
    this.setData({
      showMorning: false,
      score: s,
    })
    console.log("score:" + that.data.score)
  },

  dayWell: function () {
    var arr = wx.getStorageSync('dayLevel')
    arr[arr.length]=3
    wx.setStorageSync('dayLevel', arr)



    var that = this;
    var s = that.data.score + 4;
    this.setData({
      showEvening: false,
      score: s,
    })
    console.log("score:" + that.data.score);

  },

  daySoso: function () {
    var arr = wx.getStorageSync('dayLevel')
    arr[arr.length] = 1.5
    wx.setStorageSync('dayLevel', arr)


    var that = this;
    var s = that.data.score + 2;
    this.setData({
      showEvening: false,
      score: s,
    })
    console.log("score:" + that.data.score);

  },

  dayBad: function () {
    var arr = wx.getStorageSync('dayLevel')
    arr[arr.length] = 0
    wx.setStorageSync('dayLevel', arr)


    var that = this;
    var s = that.data.score + 0;
    this.setData({
      showEvening: false,
      score: s,
    })
    console.log("score:" + that.data.score)
  },

  //手指触摸动作开始，记录起点x坐标
  touchStart: function (e) {

    startX: e.touches[0].pageX;
    startY: e.touches[0].pageY;
    number = setInterval(function () { time++; }, 100);

  },

  //滑动事件处理
  touchMove: function (e) {
    touchDot.X = e.touches[0].pageX;
    touchDot.Y = e.touches[0].pageY;

    console.log("到啦!");
    console.log(startDot.X);
    console.log(touchDot.X);
    console.log(startDot.Y);
    console.log(touchDot.Y);
    console.log(time);


    if ((touchDot.X - startDot.X) > 100 && (touchDot.Y - startDot.Y) > 100 && time < 5 && time > 0.01) {//左滑
      console.log("已滑动");
      wx.switchTab({
        url: '../report/report',
      });
      clearInterval(number);
    }

  },

  //结束触屏重置计时
  touchEnd: function (e) {
    clearInterval(number);
    time = 0;
  },

})