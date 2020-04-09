import * as echarts from '../../ec-canvas/echarts';

var imageUtil = require('../../utils/util.js');
var Chart = null;
var backdata = [80, 91, 81, 83, 90, 95, 70];

//c测试数据
var sleepDate = '2019/09/01 23:49:10'
var wakeDate = '2019/09/02 06:30:10'
var currenTime = ''
var judgeTest = '你这周睡觉时间有点晚呐！'
var damageTest = '要记得，不规律睡眠会造成一个人： \n变胖、变丑、记忆力下降、容易忘事、容易生病，还可能会比别人更容易得癌症。\n'
var adviceTest = '\n睡前一杯牛奶有助于更快入睡 \n熬夜之后在中午午休30分钟能让下午更有精神呢!'
var greetingChoice = ['早上好', '晚上好', '晚安']
var myDate = new Date()
var myHour = myDate.getHours()




Page({
  data: {
    wake: "00:00:00",
    asleep: "00:00:00",
    time: 0.00,
    judge: "",
    damage: "",
    advice: "",



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
    //测试数据
    var wakeDateChuo = Date.parse(wakeDate) / 1000
    var sleepDateChuo = Date.parse(sleepDate) / 1000
    var waking = imageUtil.formatTimeTwo(wakeDateChuo, 'h:m:s')
    var sleeping = imageUtil.formatTimeTwo(sleepDateChuo, 'h:m:s')
    var timeAverage = wakeDateChuo - sleepDateChuo
    // var averageTime = timeAverage 
    var averageTime = (timeAverage / 3600).toFixed(2)
    //平均睡眠时间由毫秒变为小时

    this.setData({

      wake: waking,
      asleep: sleeping,
      time: averageTime,
      judge: judgeTest,
      damage: damageTest,
      advice: adviceTest,

    })


    this.echartsComponnet = this.selectComponent('#mychart');
    //如果是第一次绘制
    if (!Chart) {
      this.init_echart(); //初始化图表
    } else {
      this.setOption(Chart); //更新数据
    }


  },

  

  imageLoad: function (e) {
   
  },

  init_echart: function () {
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
  setOption: function (Chart) {
    Chart.clear(); //清除
    Chart.setOption(this.getOption()); //获取新数据
  },
  //图表配置项
  getOption() {
    var self = this;
    var option = {
      title: { //标题
        text: '一周发量',
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
        data: ['2222.2.55', '周一', '周二', '周三', '周四', '周五', '周六'],
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
        name: '发量 / %', //纵坐标名称
        nameTextStyle: { //在name值存在下，设置name的样式
          //color: 'blue',
          fontStyle: 'normal'
        },
        splitNumber: 10, //坐标轴的分割段数
        splitLine: { //坐标轴在 grid 区域中的分隔线。
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: { //坐标轴刻度标签
          formatter: function (value) {
            var xLable = [];
            xLable = value;

            return xLable
          },
          textStyle: {
            fontSize: 13,
            color: '#5D5D5D',
          }
        },
        min: 0,
        max: 100,
      },
      series: [{
        name: '事业',
        type: 'line',
        data: backdata, //获取数据
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