'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        unique: true,
        background: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      auth: {
        type: String,
        enum: [ 'admin', 'user' ], // 权限 admin: 管理员 user: 普通用户
        default: 'user',
        required: true,
      },
    },
    { timestamps: { createdAt: 'create_time', updatedAt: 'update_time' } }
  );

  return mongoose.model('User', Schema);
};
