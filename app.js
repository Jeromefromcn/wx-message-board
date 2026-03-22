App({
  onLaunch() {
    wx.cloud.init({
      env: 'wx-cloud-base-7g786dzk93790b2b',
      traceUser: true,
    });
  },

  globalData: {},
});
