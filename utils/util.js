module.exports = {
  getViewWHInfo: getViewWHInfo,
  formatTime: formatTime,  // 日期转时间戳
  formatTimeTwo: formatTimeTwo, // 时间戳转日期
  averageTime: averageTime,
  totoalTime: totoalTime,
  formatDate:formatDate
}

function getViewWHInfo(e) {
  var viewSize = {};
  var originalWidth = e.detail.width; //图片原始宽

  var originalHeight = e.detail.height; //图片原始高
  wx.getSystemInfo({
    success: function (res) {
      //读取系统宽度和高度
      var viewWidth = res.windowWidth;
      var viewHeight = res.windowHeight;
      console.log(originalWidth + " " + originalHeight);
      console.log("宽：" + viewWidth + "高" + viewHeight);
      viewSize.width = viewWidth;
      viewSize.height = viewHeight;
    }
  });
  return viewSize;
}

function formatDate(d){
  var date = new Date(d)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('.') 
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

function averageTime(arr){
  var hour=0;
  var minu=0;
  for(var i =0;i<arr.length;i++){
    var temp = new Date(arr[i])
    hour=hour+temp.getHours();
    console.log(temp.getHours(),temp.getMinutes())
    minu=minu+temp.getMinutes();
  }
  var avertotal = (hour * 60 + minu) % (24 * 60)/arr.length;
  var averh= parseInt(avertotal/60)
  var averm = parseInt(avertotal-averh*60)
  if(averm<10){
    var str = averh + ':0' + averm
  } else { var str = averh + ':' + averm}
  
  return str
}

function totoalTime(sleep,getup){
  var s = new Date('2020/2/1 '+sleep+':00')
  var g = new Date('2020/2/1 '+getup+':00')
  var t = (g-s)/(1000*60*60)
  console.log(s,g,t)
  if(t<0) {t=t+24}
  var time = parseFloat(t.toFixed(2))
  return time
}