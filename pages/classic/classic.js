// pages/classic/classic.js
const {
	getLatest,
	getNext,
	getPrev
} = require('../../servers/api.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
		type: 'music', // movie, music, poem
		isMusic: true,
		isPlay: false,
		cur: {},
		index: 0,
		latest: 0,
		disablePrev: '',
		disableNext: '',
		curMiusc: '',
		backgroundAudioManager: null,
		curPlayIdx: 0
	},
	// 更新数据
	updateData (data) {
		let index = data.index > 9 ? data.index : '0' + data.index
		this.setData({
			cur: data,
			index
		}, function () {
			// if (this.data.index)
			let idx = parseInt(this.data.index)

			// 这里判断是否为 最后一期
			if (idx === 1) {
				this.setData({ disableNext: 'disable' })
			} else {
				this.setData({ disableNext: '' })
			}
			// 这里判断 是否为最新一期
			if (idx === this.data.latest) {
				this.setData({ disablePrev: 'disable' })
			} else {
				this.setData({ disablePrev: '' })
			}
			// 这里判断当前期刊为 音乐
			if (this.data.cur.type === 200) {
				// this.setBackgroundMusic()
				this.setData({ curMiusc: this.data.cur.url })
				var isPlay = this.data.backgroundAudioManager.paused

				if (isPlay === false && parseInt(this.data.index) === this.data.curPlayIdx) {
					this.setData({ isPlay: true})
				} else {
					this.setData({ isPlay: false})
				}
			}
		})
	},
	setBackgroundMusic () {
		
	},
	// 播放音乐
	handlePlayerClick () {
		var isPlay = this.data.backgroundAudioManager.paused

		let title = this.data.cur.title.split('《')[1].replace('》', '')
		let singer = this.data.cur.title.split('《')[0]
		// 设置背景音乐的🇭相关属性
		this.data.backgroundAudioManager.title = title
		this.data.backgroundAudioManager.epname = title
		this.data.backgroundAudioManager.singer = singer
		this.data.backgroundAudioManager.coverImgUrl = this.data.cur.image

		if (isPlay === true) {
			this.data.backgroundAudioManager.play()
		} else {
			// this.data.backgroundAudioManager.play()
			this.data.backgroundAudioManager.src = this.data.curMiusc
		}
		this.setData({ 
			isPlay: true,
			curPlayIdx: parseInt(this.data.index)
		 })
	},
	// 暂停音乐
	handlePauseClick () {
		this.data.backgroundAudioManager.pause()
		this.setData({ isPlay: false })
	},
	// 获取当前的下一期
	handleNextClick: function () {
		let idx = parseInt(this.data.index)
		if (idx === this.data.latest) return
		getNext(idx)
		.then(res => {
			if (res.statusCode === 200) {
				this.updateData(res.data)
			}
		}).catch(err => {
			console.log(err)
		})
	},
	// 获取当前的前一期
	handlePrevClick: function () {
		let idx = parseInt(this.data.index)
		if (idx === 1) return
		
		getPrev(parseInt(idx))
		.then(res => {
			if (res.statusCode === 200) {
				this.updateData(res.data)
			}
		}).catch(err => {
			console.log(err)
		})
	},
    /**
     * 生命周期函数--监听页面加载
     */
     onLoad: function (options) {
		 getLatest().then(res => {
			// console.log(res)
			if (res.statusCode === 200) {
				this.setData({
					latest: res.data.index,
					// disablePrev: 'disable'
				})
				this.updateData(res.data)
			}
		 }).catch(err => {
			console.log(err)
		 })
		 this.setData({
			 backgroundAudioManager: wx.getBackgroundAudioManager()
		 })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})