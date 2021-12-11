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
		curPlayIdx: 0,
		likeData: {},
		musicImgClass: 'music-img-wrapper'
	},
	// 更新数据
	updateData (data) {
		let index = data.index > 9 ? data.index : '0' + data.index
		this.setData({
			cur: data,
			index,
			likeData: {
				type: data.type,
				like_status: data.like_status === 1 ? true : false,
				fav_nums: data.fav_nums,
				id: data.id
			}
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
					this.setData({ 
						isPlay: true,
						musicImgClass: 'music-img-wrapper animation play'
					})
				} else {
					this.setData({ 
						isPlay: false,
						musicImgClass: 'music-img-wrapper'
					})
				}
			}
		})
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

		var isCur = this.data.curPlayIdx === parseInt(this.data.index)
		if (isPlay === true && isCur) {
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
	listenPlayer() {
		let _this = this
		this.data.backgroundAudioManager.onPlay(function () {
			// console.log('play')
			var clsname = 'music-img-wrapper'
			
			if (_this.data.curPlayIdx === parseInt(_this.data.index)) {
				clsname = _this.data.musicImgClass.indexOf('pause') === -1
								? 'music-img-wrapper animation' : 'music-img-wrapper animation play'
			}
			_this.setData({ 
				isPlay: true,
				musicImgClass: clsname
			})
		})
		this.data.backgroundAudioManager.onPause(function () {
			if (_this.data.curPlayIdx === parseInt(_this.data.index)) {
				console.log('pause----')
				
				// var clsname = _this.data.curPlayIdx === parseInt(_this.data.index) ?
				// 				'music-img-wrapper animation pause' : 'music-img-wrapper'
				var clsname = 'music-img-wrapper'
				if (_this.data.curPlayIdx === parseInt(_this.data.index)) {
					clsname = 'music-img-wrapper animation pause'
				}
				
				_this.setData({ 
					musicImgClass: clsname
				})
			}
			_this.setData({
				isPlay: false
			})
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
			} else {
				// console.log(res)
				wx.showToast({
				  title: res.data.msg,
				  icon: 'none',
				  duration: 2000
				})
			}
		 }).catch(err => {
			console.log(err)
		 })
		 this.setData({
			 backgroundAudioManager: wx.getBackgroundAudioManager()
		 }, function () {
			 this.listenPlayer()
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