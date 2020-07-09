import { query, destroy } from '@/services/template';

const templateModel = {
  namespace: 'template',
  state: {
    templateList: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'saveTemplate',
        payload: response,
      });
    },

    *fetchDestroyTemplate({ payload }, { call, put }) {
      yield call(destroy, payload);
      yield put({
        type: 'fetch',
      })
    },

  },
  reducers: {
    saveTemplate(state, action) {
      return { ...state, templateList: action.payload || [] };
    },
  },
};
export default templateModel;
