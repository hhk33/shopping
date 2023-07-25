import { reqGetSearchInfo } from "@/api"

const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    //获得搜索结果
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params);
        if (result.code == 200)
            commit("GETSEARCHLIST", result.data);
    }
};
const getters = {
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}