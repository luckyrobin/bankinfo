import { message } from 'antd';
import { query, update } from '@/services/constant';

const constantModel = {
  namespace: 'constant',
  state: {
    constantList: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'saveConstant',
        payload: response,
      });
    },

    *fetchUpdateConstant({ payload }, { call, put }) {
      yield call(update, payload);
      message.success('保存成功');
      yield put({
        type: 'fetch',
      })
    },
  },
  reducers: {
    saveConstant(state, action) {
      return { ...state, constantList: action.payload || [] };
    },
  },
};
export default constantModel;
