const db = wx.cloud.database();

Page({
  data: {
    messages: [],
    loading: true,
  },

  onLoad() {
    this.fetchMessages();
  },

  onShow() {
    this.fetchMessages();
  },

  fetchMessages() {
    this.setData({ loading: true });
    wx.cloud.callFunction({
      name: 'getMessages',
      success: (res) => {
        this.setData({
          messages: res.result.data || [],
          loading: false,
        });
      },
      fail: (err) => {
        console.error('Failed to fetch messages:', err);
        this.setData({ loading: false });
        wx.showToast({ title: 'Failed to load messages', icon: 'none' });
      },
    });
  },

  goToPost() {
    wx.navigateTo({ url: '/pages/post/post' });
  },

  formatTime(timestamp) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  },
});
