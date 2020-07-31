'use strict';

// https://stackoverflow.com/questions/42912755/how-to-create-a-db-for-mongodb-container-on-start-up
// eslint-disable-next-line no-undef
db.users.insertOne({
  name: '一号位',
  phone: '13607134431',
  password: '111',
  auth: 'admin',
});
