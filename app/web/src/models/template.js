import { query, destroy, print } from '@/services/template';
import { convertResp2Blob } from '@/utils/utils';

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

    *fetchPrintTemplate({ payload }, { call }) {
      const response = yield call(print, payload);
      convertResp2Blob(response);
    },

  },
  reducers: {
    saveTemplate(state, action) {
      return { ...state, templateList: action.payload || [] };
    },
  },
};
export default templateModel;
