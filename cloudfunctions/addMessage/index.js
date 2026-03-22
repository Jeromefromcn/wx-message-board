const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const { content, nickName, avatarUrl } = event;

  if (!content || !content.trim()) {
    return { success: false, error: 'Content is required' };
  }
  if (!nickName || !nickName.trim()) {
    return { success: false, error: 'Nickname is required' };
  }

  try {
    const result = await db.collection('messages').add({
      data: {
        openid: wxContext.OPENID,
        nickName: nickName.trim(),
        avatarUrl: avatarUrl || '',
        content: content.trim(),
        createdAt: db.serverDate(),
      },
    });
    return { success: true, id: result._id };
  } catch (err) {
    console.error('addMessage error:', err);
    return { success: false, error: err.message };
  }
};
