'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = new mongoose.Schema(
    {
      customer_name: {
        type: String,
        required: true,
      },
      customer_sex: {
        type: String,
        required: true,
        enum: [ 'male', 'female' ], // male: 男  female: 女
      },
      customer_id: {
        type: String,
        unique: true,
        background: true,
        required: true,
      },
      customer_married: {
        type: String,
        required: true,
        enum: [ '1', '2', '3' ], // 1: 未婚  2: 已婚  3: 离婚
      },
      customer_register_address: {
        type: String,
      },
      customer_work_unit: {
        type: String,
      },
      customer_jobs: {
        type: String,
      },
      customer_salary: {
        type: Number,
      },
      customer_loans: {
        type: Number,
      },
      customer_house_place: {
        type: String,
      },
      customer_house_area: {
        type: Number,
      },
      customer_house_area_share: {
        type: Number,
      },
      customer_phone: {
        type: String,
        required: true,
      },
      customer_work_phone: {
        type: String,
      },
      customer_work_place: {
        type: String,
      },
      customer_home_place: {
        type: String,
      },
      customer_spouse_name: {
        type: String,
      },
      customer_spouse_sex: {
        type: String,
      },
      customer_spouse_id: {
        type: String,
      },
      customer_spouse_register_address: {
        type: String,
      },
      customer_spouse_work_unit: {
        type: String,
      },
      customer_spouse_jobs: {
        type: String,
      },
      customer_spouse_salary: {
        type: Number,
      },
      guarantor_name: {
        type: String,
      },
      guarantor_sex: {
        type: String,
      },
      guarantor_id: {
        type: String,
      },
      guarantor_married: {
        type: String,
      },
      guarantor_register_address: {
        type: String,
      },
      guarantor_work_unit: {
        type: String,
      },
      guarantor_jobs: {
        type: String,
      },
      guarantor_salary: {
        type: Number,
      },
      guarantor_spouse_name: {
        type: String,
      },
      guarantor_spouse_sex: {
        type: String,
      },
      guarantor_spouse_id: {
        type: String,
      },
      guarantor_spouse_register_address: {
        type: String,
      },
      guarantor_spouse_work_unit: {
        type: String,
      },
      guarantor_spouse_jobs: {
        type: String,
      },
      guarantor_spouse_salary: {
        type: Number,
      },
      customer_house_1: {
        type: String,
      },
      customer_house_2: {
        type: String,
      },
      customer_house_3: {
        type: String,
      },
      customer_house_4: {
        type: String,
      },
      customer_house_other: {
        type: String,
      },
      // loans
      customer_loans_all: {
        type: Number,
      },
      customer_loans_unit: {
        type: Number,
      },
      customer_loans_mortgage: {
        type: String,
      },
      customer_loans_limit: {
        type: String,
      },
      customer_loans_method: {
        type: String,
      },
      loans_lrp: {
        type: Number,
      },
      loans_interest_rate: {
        type: Number,
      },
      loans_interest_extrarate: {
        type: Number,
      },
      loans_equality_rate: {
        type: Number,
      },
      loans_equality_sum: {
        type: Number,
      },
      // company
      company_name: {
        type: String,
      },
      company_code: {
        type: String,
      },
      company_area: {
        type: String,
      },
      creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        background: true,
        required: true,
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

  Schema.pre('find', function(next) {
    this.populate({ path: 'operator', select: '_id name' });
    next();
  });

  return mongoose.model('Customer', Schema);
};
