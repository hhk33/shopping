import { reqGoodsInfo, reqUpdateShopCar } from "@/api"
import { getUUID } from '@/utils/uuid_token'

const state = {
    goodInfo: {},
    uuid_token: getUUID()
};
const mutations = {
    GETGOODSINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
const actions = {
    async getGoodsInfo({ commit }, id) {
        let res = await reqGoodsInfo(id);
        if (res.code == 200)
            commit("GETGOODSINFO", res.data);
    },
    async updateShopCar({ commit }, { skuId, skuNum }) {
        let res = await reqUpdateShopCar(skuId, skuNum);
        if (res.code == 200) {
            return "ok"
        }
        else {
            return Promise.reject(new Error("faile"))
        }
    }
};
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || {};
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}