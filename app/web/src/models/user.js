import { message } from 'antd';
import { queryCurrent, query as queryUsers, updateUser, createUser, deleteUser } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    memberList: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'saveMembers',
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

    *fetchCreate({ payload }, { call, put }) {
      yield call(createUser, payload);
      yield put({
        type: 'fetch',
      })
    },

    *fetchUpdate({ payload }, { call, put }) {
      yield call(updateUser, payload);
      yield put({
        type: 'fetch',
      })
    },

    *fetchDelete({ payload }, { call, put }) {
      yield call(deleteUser, payload);
      yield put({
        type: 'fetch',
      })
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    saveMembers(state, action) {
      return { ...state, memberList: action.payload || [] };
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
