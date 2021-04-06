import {
  HTTP
} from '../utils/http-p.js'
export class KeywordModel extends HTTP {
  key = 'q';
  maxLength = 10;
  getHistory() {
    return wx.getStorageSync(this.key) || []
  }

  getHot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }

  addToHistory(keyWord) {
    const words = this.getHistory();
    const has = words.includes(keyWord);
    if (!has) {
      const length = words.length;
      if (length >= this.length) {
        words.pop();
      }
      words.unshift(keyWord)
      wx.setStorageSync(this.key, words)
    }
  }
}