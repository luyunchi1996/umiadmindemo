import { query as queryUsers, queryCurrent, login, authorityItem } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {
      name: 'Serati Ma',
    },
    menuItem: [],
    token: '',
  },
  effects: {
    *userLogin({ payload, success }, { call }) {
      const response = yield call(login, payload);
      //  yield put({
      //     type:"saveToken",
      //     payload:response.token
      //  });
      success(response);
    },
    *menuItem({ payload }, { call, put }) {
      const response = yield call(authorityItem, { payload });
      yield put({
        type: 'saveMenuItem',
        payload: response.list,
      });
    },
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      const { token } = response;
      yield put({
        type: 'saveCurrentUser',
        payload: token,
      });
    },
  },
  reducers: {
    saveMenuItem(state, action) {
      return { ...state, menuItem: action.payload || '' };
    },
    saveToken(state, action) {
      return { ...state, token: action.payload || '' };
    },

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
