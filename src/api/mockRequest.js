import axios from 'axios'
// axios二次封装
const MockRequests = axios.create({
    baseURL: "/mock",
    timeout: 5000
});

//请求拦截器
MockRequests.interceptors.request.use((config) => {
    return config;
})
//响应拦截器
MockRequests.interceptors.response.use((res) => {
    return res.data;
}, (error) => {
    return Promise.reject(new Error('fail'));
})

export default MockRequests