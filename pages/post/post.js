Page({
  data: {
    content: '',
    submitting: false,
    nickName: '',
    avatarUrl: '',
  },

  onLoad() {
    this.loadUserProfile();
  },

  loadUserProfile() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({ nickName: userInfo.nickName, avatarUrl: userInfo.avatarUrl });
    }
  },

  onContentInput(e) {
    this.setData({ content: e.detail.value });
  },

  onNickNameInput(e) {
    this.setData({ nickName: e.detail.value });
  },

  submit() {
    const { content, nickName, avatarUrl, submitting } = this.data;
    if (submitting) return;
    if (!content.trim()) {
      wx.showToast({ title: 'Please enter a message', icon: 'none' });
      return;
    }
    if (!nickName.trim()) {
      wx.showToast({ title: 'Please enter your name', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });
    wx.cloud.callFunction({
      name: 'addMessage',
      data: { content: content.trim(), nickName: nickName.trim(), avatarUrl },
      success: () => {
        wx.setStorageSync('userInfo', { nickName: nickName.trim(), avatarUrl });
        wx.showToast({ title: 'Message posted!', icon: 'success' });
        setTimeout(() => wx.navigateBack(), 1500);
      },
      fail: (err) => {
        console.error('Failed to post message:', err);
        wx.showToast({ title: 'Failed to post', icon: 'none' });
        this.setData({ submitting: false });
      },
    });
  },
});
