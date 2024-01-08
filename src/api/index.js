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

//修改会话名称
export  const  editChatNameAPI = query =>{
	return request({
		url: '/updateChatRoomName',
		method: 'get',
		params: query
	});
}
//提出问题
export  const  askQuestionAPI = query =>{
	return request({
		url: '/ask',
		method: 'post',
		data: query
	});
}

export  const  ask2QuestionAPI = query =>{
	return request({
		url: '/ask2',
		method: 'post',
		data: query
	});
}

//根据聊天室id查看聊天记录
export  const  getChatRecordAPI = query =>{
	return request({
		url: '/getChatRecordList',
		method: 'get',
		params: query
	});
}


export  const  getChatRecord2API = query =>{
	return request({
		url: '/getChatRecordList2',
		method: 'get',
		params: query
	});
}
//查询模块列表
export  const  getModuleListAPI = query =>{
	return request({
		url: '/getWebModule',
		method: 'get',
		params: query
	});
}

//查询首页热门推荐
export  const  getHotRecommendAPI = query =>{
	return request({
		url: '/getWebModuleConfigByRecommend',
		method: 'get',
		params: query
	});
}
//根据模块id查询模块配置
export  const  getModuleConfigAPI = query =>{
	return request({
		url: '/getWebModuleConfig',
		method: 'get',
		params: query
	});
}

//创建任务
export  const  createTaskAPI = query =>{
	return request({
		url: '/createTask',
		method: 'get',
		params: query
	});
}

//查询任务列表
export  const  getTaskListAPI = query =>{
	return request({
		url: '/getTaskList',
		method: 'get',
		params: query
	});
}

//删除任务
export  const  deleteTaskAPI = query =>{
	return request({
		url: '/deleteTask',
		method: 'get',
		params: query
	});
}

//绘画
export  const  drawAPI = query =>{
	return request({
		url: '/draw',
		method: 'post',
		data: query
	});
}


//根据配置id查询配置详情
export  const  getModuleConfigDetailAPI = query =>{
	return request({
		url: '/getWebModuleConfigById',
		method: 'get',
		params: query
	});
}

//修改用户信息
export  const  updateUserInfoAPI = query =>{
	return request({
		url: '/api/updateUserInfo',
		method: 'post',
		data: query
	});
}

//注销
export  const  logoutAPI = query =>{
	return request({
		url: '/api/signOut',
		method: 'get',
		params: query
	});
}
