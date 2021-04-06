import {
  config
} from '../config.js'
const {
  appkey,
  api_base_url
} = config;
const tips = {
  1: '抱歉,出现了一个错误',
  1005: "appkey无效",
  3000: "期刊不存在"
}
export class HTTP {
  request({url, data = {}, method = "GET"}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = "GET") {
    wx.request({
      url: api_base_url + url,
      data,
      method,
      header: {
        'content-type': 'application/json',
        appkey
      },
      success: (res) => {
        const code = res.statusCode + "";
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          this._show_error(res.data.error_code);
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1);
      },
      complete: (res) => {},
    })
  }

  _show_error(error_code = 1) {
    const tip = tips[error_code];
    wx.showToast({
      title: tip || tips[1],
      icon: "none",
      duration: 2000
    })
  }
}