const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const result = await db
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();
    return { success: true, data: result.data };
  } catch (err) {
    console.error('getMessages error:', err);
    return { success: false, error: err.message };
  }
};
