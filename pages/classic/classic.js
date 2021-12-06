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
		disableNext: ''
    },
	updateData (data) {
		let index = data.index > 9 ? data.index : '0' + data.index
		this.setData({
			cur: data,
			index
		}, function () {
			// if (this.data.index)
			let idx = parseInt(this.data.index)
			if (idx === 1) {
				this.setData({ disableNext: 'disable' })
			} else {
				this.setData({ disableNext: '' })
			}
			
			if (idx === this.data.latest) {
				this.setData({ disablePrev: 'disable' })
			} else {
				this.setData({ disablePrev: '' })
			}
		})
	},
	handleNextClick: function () {
		let idx = parseInt(this.data.index)

		getNext(idx)
		.then(res => {
			if (res.statusCode === 200) {
			
				this.updateData(res.data)
			}
		}).catch(err => {
			console.log(err)
		})
		
		// console.log(data)
		// this.updateData(data)
	},
	handlePrevClick: function () {
		let idx = parseInt(this.data.index)
		// if (idx === 1) return
		
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
			
		// try {
		// 	const { data } = await getLatest()
		// 	this.updateData(data)
		// } catch (err) {
		// 	console.log(err)
		// }
		 
		// console.log(data)
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