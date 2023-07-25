import requests from "./request";
import mockRequest from "./mockRequest"

// 获取三级菜单数据
export const reqCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

//home Banner Floor
export const reqGetBannerList = () => {
    return mockRequest({
        url: '/banner',
        method: 'get'
    })
}

export const reqGetFloorList = () => {
    return mockRequest({
        url: '/floor',
        method: 'get'
    })
}

//获取search页搜索商品结果
export const reqGetSearchInfo = (params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
}

//获得详情页商品信息
export const reqGoodsInfo = (id) => {
    return requests({
        url: `/item/${id}`,
        method: 'get'
    })
}

export const reqUpdateShopCar = (skuId, skuNum) => {
    return requests({
        url: `cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}

export const reqCartList = () => {
    return requests({
        url: '/cart/cartList',
        method: 'get'
    })
}

export const reqDeleteCartById = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}

export const reqChangeChecked = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

export const reqCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
}

export const reqUserRegister = (data) => {
    return requests({
        url: `/user/passport/register`,
        data,
        method: 'post'
    })
}

export const reqUserLogin = (data) => {
    return requests({
        url: `/user/passport/login`,
        data,
        method: 'post'
    })
}

export const reqUserInfo = () => {
    return requests({
        url: `/user/passport/auth/getUserInfo`,
        method: 'get'
    })
}

export const reqLogout = () => {
    return requests({
        url: `/user/passport/logout`,
        method: 'get'
    })
}

export const reqUserAddressList = () => {
    return requests({
        url: `/user/userAddress/auth/findUserAddressList`,
        method: 'get'
    })
}

export const reqTrade = () => {
    return requests({
        url: `/order/auth/trade`,
        method: 'get'
    })
}

export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method: 'post'
    })
}

export const reqCreateNative = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
}

export const reqMyOrderList = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })
}