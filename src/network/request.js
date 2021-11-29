import axios from "axios";

// promise 方式
export function request(config) {
  //  1 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

//  2 axios 的拦截器
//  2.1 请求拦截的作用
//  2.1.1 比如 config 中的一些信息不符合服务器的要求
//  2.2.2 比如每次发送网络请求时，都希望在界面中显示一个请求的图标（在请求时显示图标，在成功时图标消失）
//  2.2.3 某些网络请求（比如登录需要（token），必须携带一些特殊信息，如果没登录，则会跳转到登录页面，之后再进行网络请求
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 拦截之后必须要将请求内容 return 回去，不然请求会失败
    return config;
  }, err => {
    // console.log(err);
  })

//  2.2 响应拦截,记住：拦截成功之后还需要将数据返回回去
  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data
  }, err => {
    // console.log(err)
  })

//  发送真正的网络请求
//  instance() 返回的就是一个 promise
  return instance(config)
}


