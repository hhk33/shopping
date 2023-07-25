import { reqCartList, reqDeleteCartById, reqChangeChecked } from '@/api'

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
}
const actions = {
    async getCartList({ commit }) {
        let res = await reqCartList();
        if (res.code == 200)
            commit('GETCARTLIST', res.data);
    },

    async deleteCartById({ commit }, skuId) {
        let res = await reqDeleteCartById(skuId);
        if (res.code == 200)
            return 'ok'
        else
            return Promise.reject(new Error('faile'));
    },

    async changeChecked({ commit }, { skuId, isChecked }) {
        let res = await reqChangeChecked(skuId, isChecked)
        if (res.code == 200)
            return 'ok'
        else
            return Promise.reject(new Error('faile'));
    },

    deleteAllChecked({ dispatch, getters }) {
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(element => {
            if (element.isChecked == 1) {
                let res = dispatch('deleteCartById', element.skuId)
                promiseAll.push(res)
            }
        });
        return Promise.all(promiseAll)
    },

    updateAllChecked({ dispatch, getters }, checked) {
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(element => {
            if (element.isChecked != checked) {
                let res = dispatch('changeChecked', { skuId: element.skuId, isChecked:checked })
                promiseAll.push(res)
            }
        });
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}