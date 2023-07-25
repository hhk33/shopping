import { reqCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token';

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEARUSERINFO(state) {
        state.token = "";
        state.userInfo = {};
        removeToken();
    }
}
const actions = {
    async getCode({ commit }, phone) {
        let res = await reqCode(phone);
        if (res.code == 200) {
            commit('GETCODE', res.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    async userRegister({ commit }, user) {
        let res = await reqUserRegister(user);
        // console.log(res)
        if (res.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    async userLogin({ commit }, data) {
        let res = await reqUserLogin(data);
        // console.log(res);
        if (res.code == 200) {
            commit("USERLOGIN", res.data.token);
            setToken(res.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    async userInfo({ commit }) {
        let res = await reqUserInfo();
        // console.log(res);
        if (res.code == 200) {
            commit("USERINFO", res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    async userLogout({ commit }) {
        let res = await reqLogout();
        if (res.code == 200) {
            commit("CLEARUSERINFO")
            return 'ok';
        } else {
            return Promise.reject(new Error(res.message));
        }
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}