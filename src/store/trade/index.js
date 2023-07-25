import { reqUserAddressList, reqTrade } from '@/api'

const state = {
    userAddressList: [],
    trade:{}
}
const mutations = {
    FINDUSERADDRESSLIST(state, userAddressList) {
        state.userAddressList = userAddressList
    },
    FINDTRADE(state,trade){
        state.trade = trade
    },
}
const actions = {
    async findUserAddressList({ commit }) {
        let res = await reqUserAddressList()
        if (res.code == 200) {
            commit('FINDUSERADDRESSLIST', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async findTrade({ commit }) {
        let res = await reqTrade()
        if(res.code==200){
            commit('FINDTRADE',res.data)
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