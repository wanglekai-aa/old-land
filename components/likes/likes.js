// components/likes.js
const {
	onLike,
	likeCancel,
	getFavor
} = require('../../servers/api.js')

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		innerText: {
			type: String,
			value: 'default value',
		},
		likeData: {
			type: Object,
			value: {}
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		type: 0,
		fav_nums: 0,
		like_status: false,
		art_id: 0
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handleLikeClick () {
			if (this.data.like_status) {
				// this.likeOrDislike(onLike, true)
				this.likeOrDislike(likeCancel, false)
			} else {
				// this.likeOrDislike(likeCancel, false)
				this.likeOrDislike(onLike, true)
			}
		},
		likeOrDislike (fn, val) {
			let { art_id, type } = this.data
			fn(art_id, type ).then(res=> {
					// console.log(res)
					if (res.data.error_code === 0) {
						this.setData({
							like_status: val
						})
						wx.showToast({
						  title: val ? '点赞成功' : '取消点赞',
						  icon: val ? 'success' : 'none',
						  duration: 2000
						})
						return true
					} else {
						wx.showToast({
						  title: res.data.msg,
						  icon: 'error',
						  duration: 2000
						})
						return false
					}
				}).then( flag => {
					
					if (flag) {
						return getFavor(type, art_id)
					}
					
				}).then(result => {
					console.log(result)
					if (result.statusCode === 200) {
						this.setData({
							fav_nums: result.data.fav_nums
						})
					}
					// } else {
					// 	wx.showToast({
					// 	  title: result.data.msg,
					// 	  icon: 'error',
					// 	  duration: 2000
					// 	})
					// }
				}).catch(err => {
					console.log(err)
				})
		}
	},
	observers: {
		likeData (data) {
			this.setData({
				type: data.type || 0,
				like_status: data.like_status || false,
				fav_nums: data.fav_nums || 0,
				art_id: data.id || 0
			})
		}
	}
})
