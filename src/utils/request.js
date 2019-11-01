import axios from "axios";
import QS from "qs";

// 创建axios实例
const service = axios.create({
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://www.ugali.cn/rechargeapi/"
      : "",
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 5000,
  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: "127.0.0.1",
    port: 9000,
    auth: {
      username: "mikeymike",
      password: "rapunz3l"
    }
  }
});

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 请求失败
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    // 回调失败
    if (err && err.response) {
      switch (err.response.status) {
        case 401:
          Toast.failed("未授权，请重新登录(401)");
          break;
        case 403:
          Toast.failed("拒绝访问(403)");
          break;
        case 404:
          Toast.failed("请求出错(404)");
          break;
        case 500:
          Toast.failed("服务器错误(500)");
          break;
        default:
          Toast.failed("请求出错(连接出错)");
      }
    }
    return Promise.reject(err);
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
