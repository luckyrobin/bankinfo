import { query, update, create, destroy } from '@/services/customer';

const customerModel = {
  namespace: 'customer',
  state: {
    customerList: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'saveCustomers',
        payload: response,
      });
    },

    *fetchCreateCustomer({ payload }, { call, put }) {
      yield call(create, payload);
      yield put({
        type: 'fetch',
      })
    },

    *fetchUpdateCustomer({ payload }, { call, put }) {
      yield call(update, payload);
      yield put({
        type: 'fetch',
      })
    },

    *fetchDestroyCustomer({ payload }, { call, put }) {
      yield call(destroy, payload);
      yield put({
        type: 'fetch',
      })
    },
  },
  reducers: {
    saveCustomers(state, action) {
      return { ...state, customerList: action.payload || [] };
    },
  },
};
export default customerModel;
