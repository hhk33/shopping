import axios from 'axios'
import store from '@/store';
// axios二次封装
const requests = axios.create({
    baseURL: "api",
    timeout: 5000
});

//请求拦截器
requests.interceptors.request.use((config) => {
    //添加请求头（游客登陆，以uuid随机生成唯一id）
    if (store.state.accessToken)
        config.headers.accessToken = store.state.detail.accessToken;
    //获取token
    if (store.state.user.refreshToken)
        config.headers.refreshToken = store.state.user.refreshToken;
    return config;
})
//响应拦截器
requests.interceptors.response.use((res) => {
    return res.data;
}, (error) => {
    return Promise.reject(new Error('fail'));
})

export default requests