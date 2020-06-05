var imageUtil = require('../../utils/util.js');

//c测试数据

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
var app = getApp();

Page({
  data: {
    showTips:false,
    tips:'',
    hairUrl:'',
    eyeUrl:'',
    clothUrl:'',
    glassUrl:'',
    mouthUrl:'',
    showMorning: false,
    showEvening: false,
    showNew: false,

    showGuideOne:true,//是否显示第一个使用引导的标志
    showGuideTwo: false,//是否显示第二个使用引导的标志
    showGuideThree: false,//是否显示第三个使用引导的标志

    imageUrl: "../img/homeImage.png",
    viewHeigh: "",
    viewWidth: "",

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

  //隐藏引导页
  hideOne: function () {
    this.setData({
      showGuideOne: false,
      showGuideTwo: true,
      showGuideThree: false,
    })
  },
  hideTwo: function () {
    this.setData({
      showGuideOne: false,
      showGuideTwo: false,
      showGuideThree: true,
    })
  },
  hideThree: function () {
    this.setData({
      showGuideOne: false,
      showGuideTwo: false,
      showGuideThree: false,
    })
  },

  input: function () {
    console.log("input")
  },

  transpond: function () {
    console.log("transpond")
  },

  onLoad: function (options) {
    //生命周期函数中判断是否第一次使用小程序，以此决定显示使用引导
    var isFir = wx.getStorageSync('isFirst');
    if(isFir==0){
      this.setData({
        showGuideOne: true,
        showGuideTwo: false,
        showGuideThree: false,
      })
    }else{
      this.setData({
        showGuideOne: false,
        showGuideTwo: false,
        showGuideThree: false,
      })
    }


    wx.setStorageSync('isFirst', 1)
    var now = new Date()
    var startDate = wx.getStorageSync('startDate')
    if(startDate!=''){
      var d = (now-startDate)/(1000*60*60*24)
      if(d>=7){this.newReport()}
      else{
        if(startDate.getDay()==0&&now.getDay!=startDate.getDay()){this.newReport()}
        if(d<7&&(imageUtil.formatDate(now)!=imageUtil.formatDate(startDate))&&(now.getDay()<=startDate.getDay())&&(now.getDay()!=0))
        {this.newReport()}
      }
    }

    this.setData({
      eyeUrl:wx.getStorageSync('eyeUrl'),
      mouthUrl:wx.getStorageSync('mouthUrl'),
      clothUrl:wx.getStorageSync('clothUrl'),
      hairUrl: '/images/malehair/malehair0' + wx.getStorageSync('hairId') + wx.getStorageSync('hairLevel') + '.png',
      glassUrl:wx.getStorageSync('glassUrl')
    })

  },
  
  newReport:function(){
    var arr
    var report ={
      sleepTime:[],
      getUpTime:[],

      averGetUp:'',
      averSleep:'',
      nightScore:'',
      dayScore:'',
      startDate:'',
      endDate:'',
      sleepDuration:'',
      level:'',

      advice:-1
    }
    report.getUpTime = wx.getStorageSync('getUpTime')
    report.sleepTime=wx.getStorageSync('sleepTime')
    report.averGetUp=imageUtil.averageTime(report.getUpTime)
    report.averSleep=imageUtil.averageTime(report.sleepTime)

    report.startDate = imageUtil.formatDate(wx.getStorageSync('startDate'));
    var s = new Date(report.sleepTime[report.sleepTime.length-1])
    var g = new Date(report.getUpTime[report.getUpTime.length-1])
    if(s-g>0){report.endDate=imageUtil.formatDate(s);}
    else {report.endDate=imageUtil.formatDate(g);}
    report.sleepDuration = imageUtil.totoalTime(report.averSleep, report.averGetUp)
    var temp = wx.getStorageSync('nightScore')
    var sum =0
    for(var i=0;i<temp.length;i++){sum = temp[i]+sum;}
    sum=sum/temp.length;
    report.nightScore=sum;
    sum =0;temp=wx.getStorageSync('dayScore')
    for (var i = 0; i < temp.length; i++) { sum = temp[i] + sum; }
    sum = sum / temp.length;
    report.dayScore = sum;
    var totoalScore = wx.getStorageSync('tablet')+report.nightScore*2+report.dayScore
    if(report.sleepDuration<5) {totoalScore=totoalScore+3}
    else if(report.sleepDuration<6){totoalScore=totoalScore+2}
    else if(report.sleepDuration<7){totoalScore=totoalScore+1}
    if(totoalScore>=12) {report.level='D';wx.setStorageSync('hairLevel', 'D');report.advice=3}
    else if (totoalScore >= 8) { report.level = 'C'; wx.setStorageSync('hairLevel', 'C'); report.advice = 2}
    else if (totoalScore >= 4) { report.level = 'B'; wx.setStorageSync('hairLevel', 'B'); report.advice = 1}
    else { report.level = 'A'; wx.setStorageSync('hairLevel', 'A'); report.advice = 0}
    var re = wx.getStorageSync('report')
    var app = getApp()
    app.data.reportId = re.length
    
    getApp().data.reportId = re.length
    re[re.length]=report
    
    
    wx.setStorageSync('report', re)
    
    var b = []
    wx.setStorageSync('startDate', '')
    wx.setStorageSync('dayScore', b)
    wx.setStorageSync('nightScore', b)
    wx.setStorageSync('sleepTime', b)
    wx.setStorageSync('getUpTime', b)
    this.setData({showNew:true})
  },


  gotoReport:function(){
    this.setData({
      showNew:false
    })
    wx.switchTab({
      url: '../report/report',
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
    var arr = wx.getStorageSync('getUpTime')
    var sD = wx.getStorageSync('startDate')
    if(sD==''){wx.setStorageSync('startDate', now)}
    arr[arr.length] = imageUtil.formatTime(now) 
    wx.setStorageSync('getUpTime', arr)
    var app = getApp()
    var i = Math.floor(Math.random() * 10)
    var content = app.data.morningTips[i]
    this.setData({
      tips:"早上好，"+content,
      showMorning: true,
      showTips:true
    })
  },

  submitEvening: function () {
    var now = new Date()
    var arr = wx.getStorageSync('sleepTime')
    var sD = wx.getStorageSync('startDate')
    if (sD == ''){ wx.setStorageSync('startDate', now) }
    arr[arr.length] = imageUtil.formatTime(now)
    wx.setStorageSync('sleepTime', arr)
    var app = getApp()
    var i = Math.floor(Math.random()*10)
    var content = app.data.nightTips[i]
    this.setData({
      tips: "晚安，" + content,
      showTips:true,
      showEvening: true
    })
  },

  sleepWell: function () {
    var arr = wx.getStorageSync('nightScore')
    arr[arr.length] = 0
    wx.setStorageSync('nightScore', arr)
    this.setData({
      showMorning:false
    })

  },

  sleepSoso: function () {
    var arr = wx.getStorageSync('nightScore')
    arr[arr.length] = 1.5
    wx.setStorageSync('nightScore', arr)

    this.setData({
      showMorning: false,
    })
  },

  sleepBad: function () {
    var arr = wx.getStorageSync('nightScore')
    arr[arr.length] = 3
    wx.setStorageSync('nightScore', arr)

    this.setData({
      showMorning: false,
    })
  },

  dayWell: function () {
    var arr = wx.getStorageSync('dayScore')
    arr[arr.length]=0
    wx.setStorageSync('dayScore', arr)

    this.setData({
      showEvening: false,
    })

  },

  daySoso: function () {
    var arr = wx.getStorageSync('dayScore')
    arr[arr.length] = 1.5
    wx.setStorageSync('dayScore', arr)

    this.setData({
      showEvening: false,
    })

  },

  dayBad: function () {
    var arr = wx.getStorageSync('dayScore')
    arr[arr.length] = 3
    wx.setStorageSync('dayScore', arr)

    this.setData({
      showEvening: false,
    })
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