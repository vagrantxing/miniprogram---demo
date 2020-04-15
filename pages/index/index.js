var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tody : "1996/05/08" ,
    address : "" ,
    inputCity: "" ,
    weatherInfo : {}
  },

  //获取当前时间
  getNowTime(){
    this.setData({
      today:util.formatTime(new Date()).split(" ")[0] 
    })
  },
  // 获取当前城市
  getNowCity(){
    let that = this ;
    wx.getLocation({
      type:"wgs84",
      success: function(res) {
        wx.request({
          url: 'http://api.map.baidu.com/geocoder/v2/?ak=ASAT5N3tnHIa4APW0SNPeXN5&location='+res.latitude+','+res.longitude+'&output=json&pois=0',
          success(res) {
            // 根据城市名称获取天气信息
            var cityName = res.data.result.addressComponent.city;
            that.getCityWeather(cityName);
          }
        })
      },
    })
  },

  /**
   * 根据城市名称获取天气信息
   */
  getCityWeather(cityName){
    var that = this ;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city='+cityName,
      success(res){
        if (res.data.status == 1002) {//无此城市
          // 显示错误信息
          wx.showModal({
            title: '提示',
            content: '输入的城市名称有误，请重新输入',
            showCancel: false ,
            success:function(res){
              that.setData({
                inputCity : ""
              })
            }
          })
        }else{  //成功返回1000
          that.setData({
            inputCity: "" ,
            weatherInfo: res.data.data   //天气信息
          })
        }  
      }
    })
  },

  /**
   * 查询其他城市天气信息
   */
  inputIing(e) {
    this.setData({
      inputCity: e.detail.value
    })
  },
  searchOther(){
    this.getCityWeather(this.data.inputCity);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前时间
    this.getNowTime();
    this.getNowCity();
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