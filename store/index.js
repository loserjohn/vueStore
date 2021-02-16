import Vue from 'vue'
import Vuex from 'vuex'
import SET from '@/SET.js'
import http from '@/utils/http/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
		userInfo:{}, //用户微信获得基本信息
		accountInfo:{}, //账户基本信息
		merchantInfo:{}, //店铺基本信息
		levelAccount:{},  //渠道个人信息
		config:{},
		currentChannel:0,   //1聚友之家  2粉丝空间 3vip空间
		cards:{} , //购物车
		currentOrder:[]   ,//创建订单
		currentCoupon:{} ,  //存放当前的优惠券
		currentPro:{},
		ifx:false ,   //是否是苹果x
		currentRoleCode:''  //聚友空间当前的账户身份的 code
	},
    mutations: {
        login(state, userName) {
			console.log('login_STORE')
            state.hasLogin = true;
        },
        logout(state) {
            state.hasLogin = false;
			state.accountInfo = {};//账户基本信息
			state.merchantInfo = {}; //店铺基本信息
			state.levelAccount = {}  //渠道个人信息
			uni.removeStorageSync(SET.tokenName)
			// this.tui.toast("你点击了确定按钮")
			uni.removeStorageSync(SET.opIdName);
			uni.removeStorageSync(SET.wxInfoName);

			
        },
		setRoleCode(state,info){
			// console.log('储存信息1')
			state.currentRoleCode = info
		},
		setUserInfo(state,info){
			// console.log('储存信息1')
			state.userInfo = {...info}
		},
		setAccountInfo(state,info){
			// console.log('储存信息2',info)
			state.accountInfo = {...info}
		},
		setConfig(state,info){
			// console.log('储存信息2')
			state.config = {...info}
		},
		setMerchantInfo(state,info){
			// console.log('储存信息2')
			state.merchantInfo = {...info}
		},
		setCurrentChannel(state,info){
			state.currentChannel = info
		},
		setLevelAccountInfo(state,info){
			state.levelAccount = info
		},
		addCard(state,item){
			
			state.cards =  Object.assign(state.cards,item)
			// console.log(state.cards)
		},
		creatOrder(state,items){
			state.currentOrder = [...items]
			// debugger
		},
		creatCoupon(state,items){
			state.currentCoupon = {...items}
			// debugger
		},
		completeOrder(state){
			state.currentOrder = new Array()
		},
		currenPro(state,items){
			state.currentPro = {...items}
		},
		setPhoneX(state,info){
			state.ifx = true
		}
    },
	
	getters:{
		cardsProduct({ state,commit }){
			// console.log(state.cards)
			// let arr = Object.values(state.cards)  不能用额
			// let arr = Object.keys(state.cards) 
			// let res = []
			// arr.forEach(item=>{
			// 	res.push(state.cards[item])
			// })
			// console.log(res)
			// return res
			return state.cards
		}
	},
	actions:{
		async refreshUser({ state,commit }, payload){
			let  that  = this
			let ress =  await http.getConsumer();
			
			
			if(ress.result===1){
				commit('login')
				commit('setAccountInfo',ress.data)
			}else{
				commit('logout')
			}
		}
	}
})

export default store
