const defaultInputs = {
	// 普通文本类型
	text: {
		type: 'text',
		label: '普通文本',
		required: true,
		id: 'username',
		ifArrow: false,
		classfy: 'phone',
		errMsg: '输入错误示例',
		icon: 'icon-fenlei',
		iconColor: '#333',
		rule: '',
		placeholder: ''
	},
	// 用户手机号码
	phone: {
		type: 'phone',
		label: '手机号码',
		required: true,
		id: 'userphone',
		ifArrow: false,
		classfy: 'phone',
		errMsg: '无效的手机号',
		icon: 'icon-phone_icon',
		
		iconColor: '#333',
		rule: /^[1][0-9]{10}$/,
		placeholder: ''
	},
	// 用户密码类型
	password: {
		type: 'password',
		label: '密码',
		required: true,
		id: 'userpass',
		ifArrow: true,
		errMsg: '密码为6位数以上',
		icon: 'icon-mima',
		iconColor: '#333',
		rule: /^(\w){6,20}$/,
		placeholder: '',
		defaulPass: true
	},
	// 用户验证码；类型
	verify: {
		type: 'verify',
		label: '验证码',
		required: true,
		id: 'userverify',
		relevantId: 'userPassword',
		ifArrow: true,
		errMsg: '验证码错误',
		icon: 'icon-yanzhengma',
		iconColor: '#333',
		rule: '',
		placeholder: '',
		defaulPass: true,
		arg: { 

		}
	},
	// 用户密码类型
	repass: {
		type: 'repass', 
		label: '确认密码',
		required: true,
		id: 'repassword',
		ifArrow: true,
		errMsg: '错误的密码格式,两次密码不一致',
		icon: 'icon-quanxianyuechi-xianxing',
		iconColor: '#333',
		rule: '',
		placeholder: '',
		defaulPass: true
	},
	// 银行卡
	bankCard: {
		type: 'bankCard', 
		label: '银行卡卡号',
		required: true,
		id: 'bankCard',
		ifArrow: true,
		errMsg: '错误的银行卡号',
		icon: 'icon-qiabao',
		iconColor: '#333',
		rule: /^([1-9]{1})(\d{15}|\d{18})$/,
		placeholder: '',
		defaulPass: true
	},
	// 邮箱类型
	eMail: {
		type: 'eMail', 
		label: '电子邮箱',
		required: true,
		id: 'eMail',
		ifArrow: true,
		errMsg: '错误的邮箱号码',
		icon: 'icon-xiaoxi',
		iconColor: '#333',
		rule: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/,
		placeholder: '',
		defaulPass: true
	},
	// 身份证
	idCard: {
		type: 'idCard', 
		label: '身份证',
		required: true,
		id: 'idCard',
		ifArrow: true,
		errMsg: '错误的身份证号码',
		icon: 'icon-qiapian',
		iconColor: '#333',
		rule: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
		placeholder: '',
		defaulPass: true
	}


}
export default defaultInputs
