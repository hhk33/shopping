import { reqCategoryList, reqGetBannerList,reqGetFloorList } from "@/api";

const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
const actions = {
    async categoryList(context) {
        let res = await reqCategoryList();
        if (res.code == 200)
            context.commit("CATEGORYLIST", res.data);
    },
    async getBannerList(context) {
        let res = await reqGetBannerList();
        if (res.code == 200)
            context.commit("GETBANNERLIST", res.data);
    },
    async getFloorList(context) {
        let res = await reqGetFloorList();
        if (res.code == 200)
            context.commit("GETFLOORLIST", res.data);
    }
};
const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}