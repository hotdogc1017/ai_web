import request from '@/utils/request';

//登录
export const loginAPI = query => {
	return request({
		url: '/api/login',
		method: 'post',
		data: query
	});
};
// 注册
export const registerAPI = query => {
	return request({
		url: '/api/register',
		method: 'post',
		data: query
	});
};
// 获取验证码
export const EmailCodeAPI = query => {
	return request({
		url: '/api/getEmailCode',
		method: 'get',
		contentType:'application/x-www-form-urlencoded',
		params: query
	});
};

// 修改登录密码
export const editPwdAPI = query => {
	return request({
		url: '/changePassword',
		method: 'post',
		data: query
	});
};
// 获取用户信息
export const userInfoAPI = query => {
	return request({
		url: '/api/userInfo',
		method: 'get',
		params: query
	});
};

//获取对话列表
export  const getChatListAPI= query => {
	return request({
		url: '/getChatList',
		method: 'get',
		params: query
	});
}

//创建新会话
export  const  createChatAPI = query =>{
	return request({
		url: '/createChat',
		method: 'post',
		data: query
	});
}

//删除会话
export  const  deleteChatAPI = query =>{
	return request({
		url: '/deleteChat',
		method: 'get',
		params: query
	});
}
