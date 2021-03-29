import {
  config
} from '../config.js'
const tips = {
  1: '抱歉,出现了一个错误',
  1005: "appkey无效",
  3000: "期刊不存在"
}
export class HTTP {
  constructor() {}
  request(params) {
    const {
      url,
      method = "GET",
      data,
      appkey = "binLUFWBvCr1v8EK",
      success
    } = params;
    wx.request({
      url: config.api_base_url + url,
      data,
      method,
      header: {
        'content-type': 'application/json',
        appkey
      },
      success: (res) => {
        let code = res.statusCode + "";
        if (code.startsWith('2')) {
          success && success(res.data)
        } else {
          this._show_error(res.data.error_code);
        }
      },
      fail: (err) => {
        this._show_error(1);
      },
      complete: (res) => {},
    })
  }

  _show_error(error_code = 1) {
    wx.showToast({
      title: tips[error_code],
      icon: "none",
      duration: 2000
    })
  }
}