import { query as queryUsers, queryCurrent,login } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    token:""
  },
  effects: {
    *userLogin({payload,success},{call}){

       const response = yield call(login,{payload})
      //  yield put({
      //     type:"saveToken",
      //     payload:response.token
      //  });
       success(response)
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
      const {token} = response
      yield put({
        type: 'saveCurrentUser',
        payload: token,
      });
    },
  },
  reducers: {
    saveToken(state,action){
      return { ...state, token: action.payload ||"" };
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
