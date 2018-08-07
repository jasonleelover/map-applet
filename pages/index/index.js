//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    longitude: "",
    latitude: "",
    markers: [],
    includePoints: [],
    controls: [],
    circles: [],
    polyline: [],
    map_height: 0,
    map_scale: 16
  },
 
  onLoad: function () {
    var _this = this;
    _this.mapCtx = wx.createMapContext('myMap');
    _this.getSystemInfo();
    _this.getLocation();
    
  },
  /**
   * 设置地图高度，地图控件，放大级别
   */
  getSystemInfo: function () {
    var _this = this;
    try {
      let res = wx.getSystemInfoSync();
      let map_scale = 15; //默认ios 级别14
      if ("ios" == res.platform) {
        _this.borderRadius = "15";
      } else if ("devtools" == res.platform) {
        map_scale = 16; //16
      } else { //android
        map_scale = 16; //15
      }
      _this.map_scale = map_scale;
      _this.controls = [{
        id: 2,
        iconPath: '../../img/ref_location.png',
        position: {
          left: res.windowWidth - 50,
          top: res.windowHeight - 105,
          width: 40,
          height: 40
        },
        clickable: true
      },
      {
        id: 3,
        iconPath: '../../img/amap_start.png',
        position: {
          left: res.windowWidth / 2 - 16,
          top: res.windowHeight / 2 - 66,
          width: 32,
          height: 44,
        },
        clickable: true
      }
      ]
      //地图下方要放置按钮，所以留100rpx
      _this.setData({
        map_height: res.windowHeight - res.windowWidth / 750 * 100 + 'px',
        map_scale: map_scale,
        controls: _this.controls
      })
    } catch (e) {
      console.log(e.message);
    }

  },
  getLocation: function () {
    var _this = this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，
      success: function (res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
  },
  goLeft: function(e){
    console.log(e);
  },
  goRight: function(e){
    console.log(e);
  },
})
