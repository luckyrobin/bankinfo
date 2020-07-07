import { message } from 'antd';
import { queryCurrent, query as queryUsers, updateUser } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *fetchUpdateMine({ payload }, { call, put }) {
      const response = yield call(updateUser, payload);
      if (response && Reflect.has(response, '_id')) {
        message.success('修改成功');
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
      }
    },

    *fetchUpdateUser({ payload }, { call, put }) {
      const response = yield call(updateUser, payload);
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
