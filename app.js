App({
  onLaunch() {
    wx.cloud.init({
      env: 'YOUR_ENV_ID_HERE',
      traceUser: true,
    });
  },

  globalData: {},
});
