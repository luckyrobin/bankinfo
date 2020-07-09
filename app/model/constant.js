'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = new mongoose.Schema(
    {
      operator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        background: true,
        required: true,
      },
      global: {
        type: String,
        default: 'only',
        required: true,
      },
      content: {
        type: String,
      },
    },
    { timestamps: { createdAt: 'create_time', updatedAt: 'update_time' } }
  );

  return mongoose.model('Constant', Schema);
};
