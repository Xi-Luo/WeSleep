const app = getApp()

Page({
  data: {
    hairchose: 0,
    eyechose: 0,
    clothchose: 0,
    mouthchose: 0,
    TabCur: 0,
    wardrobe: [{
      name: '头发',
      type: 'malehair',
      num: 4,
      imgShow: true,
      offset: 1,
      double: true,
      badge: false
    }, {
      name: '眼睛',
      type: 'eye',
      num: 12,
      imgShow: true,
      offset: 1,
      double: true,
      badge: false
    }, {
      name: '眼镜',
      type: 'glass',
      num: 8,
      imgShow: true,
      offset: 1,
      double: true,
      badge: false
    }, {
      name: '衣服',
      type: 'cloth',
      num: 15,
      imgShow: true,
      offset: 1,
      double: true,
      badge: false
    }, {
      name: '嘴巴',
      type: 'mouth',
      num: 16,
      imgShow: true,
      offset: 1,
      double: true,
      badge: false
    }],
    list: ['malehair', 'eye', 'glass', 'cloth', 'mouth']
  },
  //事件处理函数1
  bingImgChange(e) {
    let type = e.currentTarget.dataset.type;
    let cur = e.currentTarget.dataset.cur;
    this.resetData(type, cur);
    let url = '/images/' + type + '/' + type + '0' + cur + 'A.png';
    if (type == "malehair") {
      wx.setStorageSync('hairId', cur);
      wx.setStorageSync('hairLevel', 'A'); this.setData({ hairchose: 1 });
    };
    if (type == "cloth") {
      wx.setStorageSync('clothUrl', url); this.setData({ clothchose: 1 });
    }
    if (type == "eye") {
      wx.setStorageSync('eyeUrl', url); this.setData({ eyechose: 1 });
    }
    if (type == "glass") {
      wx.setStorageSync('glassUrl', url);
    }
    if (type == "mouth") {
      wx.setStorageSync('mouthUrl', url); this.setData({ mouthchose: 1 });
    }
  },
  resetData(type, cur) {

    let flag = false;
    let fs = false;
    let badge = 0;
    let arr = this.data.list;
    let idx = 0;
    arr.forEach(key => {
      if (key == type) {
        let offset = this.data.wardrobe[idx].offset;
        let double = this.data.wardrobe[idx].double;
      
        if ((offset == cur) && !double) {
          flag = true;
          fs = true;
        }
        if (!flag) {
          badge = true;
        }
        let changeOffset = "wardrobe[" + idx + "].offset";
        let changeImgShow = "wardrobe[" + idx + "].imgShow";
        let changeDouble = "wardrobe[" + idx + "].double";
        let changeBadge = "wardrobe[" + idx + "].badge";
        this.setData({
          [changeOffset]: cur,
          [changeImgShow]: flag,
          [changeDouble]: fs,
          [changeBadge]: badge
        })
      }
      idx++;
    });
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  finishBtn() {
    wx.switchTab({
      url: '../home/home',
    })
  }
})
