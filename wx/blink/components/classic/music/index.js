// components/music/index.js
import {
  classicBeh
} from "../classic-beh.js";

const mMgr = wx.getBackgroundAudioManager();
Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  lifetimes: {
    detached: function (event) {
      // wx:if hidden
      // mMgr.stop()
    },
    attached() {
      this._recoverStatus();
      this._monitorSwitch();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.title = this.properties.title;
        mMgr.src = this.properties.src;
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause();
      }
    },
    _recoverStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return;
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch() {
      const fn = () => this._recoverStatus();
      mMgr.onPlay(fn);
      mMgr.onPause(fn);
      mMgr.onStop(fn);
      mMgr.onEnded(fn)
    }
  }
})