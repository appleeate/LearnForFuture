import {
  HTTP
} from "../utils/http.js";
import { LikeModel } from "./like.js";
export class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: "classic/latest",
      success: res => {
        sCallback(res);
        this._setLatestIndex(res.index)
        const key = this._getKey(res.index);
        wx.setStorageSync(key, res)
      }
    })
  }
  getClassic(index, nextOrPrevious, sCallback) {
    // 缓存中寻找 or API 写入到缓存中
    // key 确定key
    const key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    const classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res);
        }
      })
    } else {
      sCallback(classic);
    }
  }

  isFirst(index) {
    return index == 1
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return latestIndex == index
  }

  _setLatestIndex(index) {
    wx.setStorageSync("latest", index)
  }
  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }
  _getKey(index) {
    return 'classic' + index;
  }

}