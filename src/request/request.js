import axios from "axios";
import { Message } from "element-ui";
import qs from "qs";
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间
});
// request拦截器

service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    //增加开发环境与生产环境的区分，在请求头中添加唯一id值，中文注释
    config.headers["X-Request-ID"] = Math.random().toString(36).substr(2, 9);
    config.headers["X-Environment"] = process.env.NODE_ENV;
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);
// response拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: "error",
        duration: 5 * 1000,
      });
      // 50008:非法的token; 50012:其他客户端登录了; 50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload()// 为了重新实例化vue-router对象 避免bug
        //   })
        // })
      }
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
export default service;
