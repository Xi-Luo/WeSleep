import * as echarts from '../../ec-canvas/echarts';

var imageUtil = require('../../utils/util.js');
var Chart = null;

Page({
  data: {
    startDate: '',
    endDate: '',
    showChart: true,
    wake: "00:00:00",
    asleep: "00:00:00",
    time: 0.00,
    level: '',
    dayScore: '',
    nightScore: '',
    timeScore: '',
    hairUrl: '',
    xList: [],
    chartValue: [],
    getId: '',
    judge: "",
    damage: "",
    advice: "",
    ec: {
      onInit: function(canvas, width, height) {
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

  input: function() {
    console.log("input")
  },
  transpond: function() {
    console.log("transpond")
  },

  onLoad: function(options) {

    var reports = wx.getStorageSync('report')
    var rId = options.index
    var temp = reports[rId].dayScore
    if (temp <= 1) {
      this.setData({
        dayScore: '充足'
      })
    } else if (temp <= 2) {
      this.setData({
        dayScore: '一般'
      })
    } else if (temp <= 3) {
      this.setData({
        dayScore: '不足'
      })
    }
    temp = reports[rId].nightScore
    if (temp <= 1) {
      this.setData({
        nightScore: '好'
      })
    } else if (temp <= 2) {
      this.setData({
        nightScore: '一般'
      })
    } else if (temp <= 3) {
      this.setData({
        nightScore: '差'
      })
    }
    temp = reports[rId].sleepDuration
    if (temp > 7) {
      this.setData({
        timeScore: '充足'
      })
    } else if (temp > 6) {
      this.setData({
        timeScore: '较充足'
      })
    } else if (temp > 5) {
      this.setData({
        timeScore: '不足'
      })
    } else {
      this.setData({
        timeScore: '十分不足'
      })
    }
    temp = wx.getStorageSync('advice')
    if (rId == 0) {
      this.setData({
        showChart: false
      })
    } else {
      var xl = [];
      var chartV = [];

      if (rId > 6) {
        var j = rId - 6;
        for (var i = 0; i < 7; i++) {
          if (i = 6) {
            xl[i] = '本周'
          } else {
            xl[i] = i+1
          }
          if (reports[j].level == 'D') {
            chartV[i] = 1
          }
          if (reports[j].level == 'C') {
            chartV[i] = 2
          }
          if (reports[j].level == 'B') {
            chartV[i] = 3
          }
          if (reports[j].level == 'A') {
            chartV[i] = 4
          }
          j++;
        }
      } else {

        for (var i = 0; i <= rId; i++) {
          if (i == rId) {
            xl[i] = '本周'
          } else {
            xl[i] = i + 1
          }
          if (reports[i].level == 'D') {
            chartV[i] = 1
          }
          if (reports[i].level == 'C') {
            chartV[i] = 2
          }
          if (reports[i].level == 'B') {
            chartV[i] = 3
          }
          if (reports[i].level == 'A') {
            chartV[i] = 4
          }
        }
      }
      this.setData({
        xLable: xl,
        chartValue: chartV
      })
    }

    console.log(xl, chartV)
    this.setData({
      startDate: imageUtil.formatDate(reports[rId].startDate),
      endDate: reports[rId].endDate,
      wake: reports[rId].averGetUp,
      asleep: reports[rId].averSleep,
      time: reports[rId].sleepDuration,
      level: reports[rId].level,
      hairUrl: '/images/malehair/malehair0' + wx.getStorageSync('hairId') + reports[rId].level + '.png',
      advice: temp[reports[rId].advice]
    })

    this.echartsComponnet = this.selectComponent('#mychart');
    //如果是第一次绘制
    if (!Chart) {
      this.init_echart(); //初始化图表
    } else {
      this.setOption(Chart); //更新数据
    }

  },


  imageLoad: function(e) {

  },

  init_echart: function() {
    this.echartsComponnet.init((canvas, width, height) => {
      //初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(Chart)
      //要返回chart实例，否则会影响事件处理等
      return Chart;
    });

  },
  setOption: function(Chart) {
    Chart.clear(); //清除
    Chart.setOption(this.getOption()); //获取新数据
  },
  //图表配置项
  getOption() {
    var self = this;
    var option = {
      title: { //标题
        text: '发量趋势',
        left: 'center'
      },
      renderAsImage: true, //支持渲染为图片模式
      color: ["#44B2FB"], //图例图标颜色
      grid: { //网格
        containLabel: true, //grid区域是否包含坐标轴的刻度标签
      },
      xAxis: { //横坐标
        type: 'category',
        // name: '日期', //横坐标名称
        nameTextStyle: { //在name值存在下，设置name的样式
          color: 'blue',
          fontStyle: 'normal'
        },
        nameLocation: 'end',
        splitLine: { //坐标轴在grid区域中的分隔线
          //show: true,
          /*lineStyle: {
            type: 'dashed'
          }*/

        },
        boundaryGap: false, //1.true 数据点在2个刻度直接
        data: this.data.xLable,
        axisLabel: {
          textStyle: {
            fontSize: 13,
            color: '#5D5D5D'
          }
        }
      },
      yAxis: { //纵坐标
        type: 'value',
        position: 'left',
        name: '发量 ', //纵坐标名称
        nameTextStyle: { //在name值存在下，设置name的样式
          //color: 'blue',
          fontStyle: 'normal'
        },
        // splitNumber: 4, //坐标轴的分割段数
        splitLine: { //坐标轴在 grid 区域中的分隔线。
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: { //坐标轴刻度标签
          formatter: function(value) {
            var xLable = [];
            if (value == 1) {
              xLable.push('D');
            }
            if (value == 2) {
              xLable.push('C')
            }
            if (value == 3) {
              xLable.push('B')
            }
            if (value == 4) {
              xLable.push('A')
            }

            return xLable
          },
          textStyle: {
            fontSize: 13,
            color: '#5D5D5D',
          }
        },
        min: 0,
        max: 4,
      },
      series: [{
        name: ' ',
        type: 'line',
        data: this.data.chartValue, //获取数据
        // data: ["50", "30", "40", "70", "90", "30", "20"],
        symbol: 'none',
        itemStyle: {
          normal: {
            lineStyle: {
              color: '#FF9900'
            }
          }
        }
      }],
    }
    return option;
  },

})