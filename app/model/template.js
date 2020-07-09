'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = new mongoose.Schema(
    {
      name: {
        type: String,
      },
      url: {
        type: String,
      },
      operator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        background: true,
        required: true,
      },
    },
    { timestamps: { createdAt: 'create_time', updatedAt: 'update_time' } }
  );

  return mongoose.model('Template', Schema);
};
