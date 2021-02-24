// 用户身份相关接口

import http from '../http/interface'
const Set = {
	
	crm_getHome: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopHome/GetShopHome', 
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// 热门推荐
	GetGoodsList:(data) => {
	    return http.request({
	        url: '/api/Shop/ShopGoods/GetGoodsList',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	// 获取详情
	GetGoodsInfo:(data) => {
	    return http.request({
	        url: '/api/Shop/ShopGoods/GetGoodsInfo',
	        method: 'GET', 
	        data,
			// handle:true
	    })
	},	
	
	// 获取分类列表
	GetClassList:(data) => {
	    return http.request({
	        url: '/api/Project/GetClass',
	        method: 'GET', 
	        data,
			// handle:true
	    })
	},	
	// 根据分类获取 商品
	GetGoodsByClassList:(data) => {
	    return http.request({
	        url: '/api/Project/GetGoodsByClassList',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	
	/*********************************地址管理*****************************/
	// 获取收货地址
	GetAddressList:(data) => {
	    return http.request({
	        url: '/api/Shop/UserAddress/GetList',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	// 删除地址
	addressDel:(data) => {
	    return http.request({
	        url: '/api/Shop/UserAddress/Deletes',
	        method: 'GET', 
	        data,
			// handle:true
	    })
	},	
	// 设置默认地址
	DefaultAddress:(data) => {
	    return http.request({
	        url: '/api/Shop/UserAddress/DefaultAddress',
	        method: 'GET', 
	        data,
			// handle:true
	    })
	},	
	// 新建地址
	addAddress: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/UserAddress/add',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},

	
	

	// 实名认证
	SubmitProve: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Consumer/Prove',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},

	// 问题反馈
	SubmitComment: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopFeedBack/Submit',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 余额明细
	AccountList: (data, ifLoad = false) => {
		return http.request({
			url: '/api/AccountDetail/GetList',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 关注列表
	GetAttentionList: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/GetAttentionList',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	
	// 提醒发货
	Prompt: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopOrder/Prompt',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	

	
	// 插卡内流信息
	GetEMS: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopOrder/GetEmsInfo',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// 获取文档
	getGuide: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Service/Guide', 
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	
	
		// ****************************银行卡******************
	// 获取银行卡列表
	
	GetBankList: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Bank/GetBankList',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 添加新卡
	BuilderBank: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Bank/BuilderBank',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	
	// 默认银行卡
	DefaultBank: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Bank/DefaultBank',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 解绑银行卡
	RelieveBank: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Bank/RelieveBank',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 申请提现
	SubmitCash: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Cash/SubmitCash',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	
	// ****************************购物车******************
	// 加入购物车
	cardAdd: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopCatr/Insert', 
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 获取购物车列表
	cardList: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopCatr/GetList', 
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 刪除購物車
	cardDelete: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopCatr/Deletes', 
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	GetCartCouponList:(data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopCoupon/GetCartCouponList', 
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// 领取优惠券
	ReceiveCoupon:(data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/CouponReceive/ReceiveCoupon', 
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// 加载购买商品的可用优惠券
	GetOrderCouponInfo:(data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopCoupon/GetOrderCouponInfo', 
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// ****************************订单******************
    // 提交订单
	CreateOrder: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopOrder/CreateOrder', 
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 删除订单
	
	CancelOrder: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopOrder/CancelOrder', 
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 计算邮费
	
	GetEmsPrice: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopOrder/GetEmsPrice', 
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	
	
	
	// ****************************退款******************
	// 获取退款列表
	// 最后一个子订单是否退邮费
	ifLastSubOrder:(data) => {
	    return http.request({
	        url: '/api/Shop/ShopRefundGoods/GetChildIsSucceed',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	// 发起退货申请
	
	ApplyRefund: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopRefundGoods/ApplyRefund',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	GetRefundOrderList: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopRefundGoods/GetRefundOrderList', 
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 获取退款详情
	GetRefundOrderInfo: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopRefundGoods/GetRefundInfo', 
			method: 'get',
			data,
			// handle:true
		}, ifLoad)
	},
	// 取消退款申请退货退款
	CancelRefundGoods: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopRefundGoods/CancelRefundGoods', 
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 取消退款申请
	CancelRefundMoney: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopRefundGoods/CancelRefundMoney', 
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// 删除退款申请
	DelectRefund: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopRefundGoods/delete', 
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// 物流确认
	RefundEms: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Refund/RefundEms', 
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 获取着陆页分类商品
	GetClassHotList: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Project/GetClassHotList', 
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	
	
	
	// 获取拍品信息
	GetAuctionProject:(data) => {
	    return http.request({
	        url: '/api/Project/Get',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	
	// 获取充值列表
	RechargeList: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Recharge/RechargeList',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 生成充值订单
	Recharge: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Recharge/Recharge',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 确认拍品
	verifyAuction: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Order/Verify',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 不要改拍品
	NoVerifyAuction: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Order/NoVerify',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 客户获取订单
	GetOrderList: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopOrder/GetOrderList',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 购买加价
	
	doAuction: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Auction/Auction',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 竞价记录
	
	GetAuctionList: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Auction/GetAuctionList',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 模拟下单
	mockPay: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Pay/getNotify', 
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// 获取卡包、优惠券列表
	GetReceiveCouponlist: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/CouponReceive/GetReceiveCouponlist', 
			method: 'post',
			data,
			// handle:true
		}, ifLoad)
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// 	=============商家部分\\\
	
	
	// 优店
	GetMerchantList:(data) => {
	    return http.request({
	        url: '/api/Shop/GetMerchantList',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	// 获取店铺详情 及商品
	GetBusinessProjectList:(data) => {
	    return http.request({
	        url: '/api/Shop/GetBusinessProjectList',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	
	// 关注店铺
	Attention: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/Attention',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 合家慈登陆账户
	GetHJCConsumer: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Recharge/GetHJCConsumer',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 合家慈积分转化
	HJCIntegralRecharge: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Recharge/HJCIntegralRecharge',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 确认拍品
	Receiving: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopOrder/Receiving',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	
	// 商家 发布拍品/重新发布
	shopSubmit:(data) => {
	    return http.request({
	        url: '/api/shop/Submit',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	
	// 商家获取商家订单
	GetBusinessList:(data) => {
	    return http.request({
	        url: '/api/Order/GetBusinessList',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},
	
	
	// 商家同意退款
	agreeRefund:(data) => {
	    return http.request({
	        url: '/api/Order/Refund',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},
	// 商家获取订单详情
	getOrderDetail:(data) => {
	    return http.request({
	        url: '/api/Shop/ShopOrder/GetOrderDetail',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	
	// 商家发货
	merchantDispatch:(data) => {
	    return http.request({
	        url: '/api/Order/Dispatch',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	
	// 商家成交纪录列表
	GetAccomplishList:(data) => {
	    return http.request({
	        url: '/api/Project/GetAccomplishList',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	// 我的拍品
	GetConsumerList:(data) => {
	    return http.request({
	        url: '/api/Project/GetConsumerList',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	// 商品管理
	GetMerchantProduct:(data) => {
	    return http.request({
	        url: '/api/Shop/GetList',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	// 商家获取拍品信息
	merchantProductInfo:(data) => {
	    return http.request({
	        url: '/api/Shop/Get',
	        method: 'GET', 
	        data,
			// handle:true
	    })
	},	
	
	// 商家下架商品
	SoldOut:(data) => {
	    return http.request({
	        url: '/api/Project/SoldOut',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	
	// 商家下架商品
	GetBusinessAddress:(data) => {
	    return http.request({
	        url: '/api/Address/GetBusiness',
	        method: 'GET', 
	        data,
			// handle:true
	    })
	},	
	
	// 商家营业执照
	BusinessProve:(data) => {
	    return http.request({
	        url: '/api/Shop/BusinessProve',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	
	
	// 商家限时购列表
	LimitActivityGoods:(data) => {
	    return http.request({
	        url: '/api/LimitActivityGoods/GetGoodsList',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},	
	
}
export default Set