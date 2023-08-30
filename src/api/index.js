import request from '@/utils/request';

//登录
export const loginAPI = query => {
	return request({
		url: '/login',
		method: 'post',
		data: query
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
		url: '/userInfo',
		method: 'get',
		params: query
	});
};
// 消费记录
export const findConsumptionBillListAPI = query => {
	return request({
		url: '/findIOrderList',
		method: 'post',
		data: query
	});
};

// 设备记录
export const findIDeviceListAPI = query => {
	return request({
		url: '/findIDeviceList',
		method: 'post',
		data: query
	});
}
//新增或修改设备
export const addIDevice = query => {
	return request({
		url: '/addIDevice',
		method: 'post',
		data: query
	});
}
//新增或修改设备
export const updateIDevice = query => {
	return request({
		url: '/updateIDevice',
		method: 'post',
		data: query
	});
}
// 删除设备
export const deleteIDevice = query => {
	return request({
		url: '/deleteIDevice',
		method: 'get',
		params: query
	});
};
// 学校列表
export const findISchoolListAPI = query => {
	return request({
		url: '/findISchoolList',
		method: 'post',
		data: query
	});

}
// 新增或修改学校
export const addOrUpdateISchoolAPI = query => {
	return request({
		url: '/addOrUpdateISchool',
		method: 'post',
		data: query
	});

}
// 新增或修改学校
export const updateSchoolStatusAPI = query => {
	return request({
		url: '/updateSchoolStatus',
		method: 'get',
		params: query
	});

}
//删除学校
export const deleteISchoolAPI = query => {
	return request({
		url: '/deleteISchool',
		method: 'get',
		params: query
	});

}
// 字典列表
export const findSystemDictonaryListAPI = query => {
	return request({
		url: '/findSystemDictonaryList',
		method: 'get',
		params: query
	});
}
// 新增收费类型
export const addOrUpdateSystemDictonaryAPI = query => {
	return request({
		url: '/addOrUpdateSystemDictonary',
		method: 'post',
		data: query
	});
}

//后台登录用户列表
export const findUserListAPI = query => {
	return request({
		url: '/findUserList',
		method: 'post',
		data: query
	});
}
//删除用户
export const deleteUserAPI = query => {
	return request({
		url: '/deleteUser',
		method: 'get',
		params: query
	});
}
//修改用户状态
export const updateUserStatusAPI = query => {
	return request({
		url: '/updateUserStatus',
		method: 'get',
		params: query
	});
}
export const addOrUpdateIMemberAPI = query => {
	return request({
		url: '/addOrUpdateIMember',
		method: 'post',
		data: query
	});
}
//新增或修改用户
export const addOrUpdateUserAPI = query => {
	return request({
		url: '/addOrUpdateUser',
		method: 'post',
		data: query
	});
}
//修改管理员密码
export const updateUserPwdAPI = query => {
	return request({
		url: '/updateUserPwd',
		method: 'post',
		data: query
	});
}
//查看所有启用状态的学校列表
export const getAllSchoolAPI = query => {
	return request({
		url: '/getAllSchool',
		method: 'get',
		params: query
	});
}
// 班级列表
export const findIClassListAPI = query => {
	return request({
		url: '/findIClassList',
		method: 'post',
		data: query
	});

}
// 班级列表
export const addOrUpdateIClassAPI = query => {
	return request({
		url: '/addOrUpdateIClass',
		method: 'post',
		data: query
	});

}
//修改用户状态
export const deleteIClassAPI = query => {
	return request({
		url: '/deleteIClass',
		method: 'get',
		params: query
	});
}
// 用户列表
export const findIMemberListAPI = query => {
	return request({
		url: '/findIMemberList',
		method: 'post',
		data: query
	});
}
//删除用户
export const deleteIMemberAPI = query => {
	return request({
		url: '/deleteIMember',
		method: 'get',
		params: query
	});
}
//拉白或取消拉白
export const operationWitheAPI = query => {
	return request({
		url: '/operationWithe',
		method: 'get',
		params: query
	});
}
//拉黑或取消拉黑
export const operationBlockAPI = query => {
	return request({
		url: '/operationBlock',
		method: 'get',
		params: query
	});
}
// 帮助中心列表
export const findIHelpListAPI = query => {
	return request({
		url: '/findIHelpList',
		method: 'post',
		data: query
	});
}
//删除帮助中心内容
export const deleteIHelpAPI = query => {
	return request({
		url: '/deleteIHelp',
		method: 'get',
		params: query
	});
}
// 新增或者修改帮助中心
export const addOrUpdateIHelp = query => {
	return request({
		url: '/addOrUpdateIHelp',
		method: 'post',
		data: query
	});
}
// 三类账列表
export const findIAccountList = query => {
	return request({
		url: '/findIAccountList',
		method: 'post',
		data: query
	});
}
// 获取验证码
export const getVerificationCode = query => {
	return request({
		url: '/getVerificationCode',
		method: 'get',
		params: query
	});
}
// 修改密码2
export const updatePasswordByPhone = query => {
	return request({
		url: '/updatePasswordByPhone',
		method: 'post',
		data: query
	});
}
// 退款列表
export const findIRefundList = query => {
	return request({
		url: '/findIRefundList',
		method: 'post',
		data: query
	});
}
// 三类账户交易记录
export const findITransactionList = query => {
	return request({
		url: '/findITransactionList',
		method: 'post',
		data: query
	});
}
// 补贴金列表
export const findISubsidyList = query => {
	return request({
		url: '/findISubsidyList',
		method: 'post',
		data: query
	});
}
// 获取验证码
export const deleteISubsidy = query => {
	return request({
		url: '/deleteISubsidy',
		method: 'get',
		params: query
	});
}
// 新增或修改补贴金
export const addOrUpdateISubsidy = query => {
	return request({
		url: '/addOrUpdateISubsidy',
		method: 'post',
		data: query
	});
}
// 退款
export const refund = query => {
	return request({
		url: '/deviceApi/refund',
		method: 'post',
		data: query
	});
}
// 退款
export const refundAPI = query => {
	return request({
		url: '/deviceApi/refund',
		method: 'post',
		data: query
	});
}
// 详情
export const findIOrderByIdAPI = query => {
	return request({
		url: '/findIOrderById',
		method: 'get',
		params: query
	});
}
// 欠费管理
export const findIMakeAdvancesListAPI = query => {
	return request({
		url: '/findIMakeAdvancesList',
		method: 'post',
		data: query
	});
}
// 设置欠费
export const addOrUpdateIMakeAdvancesConfAPI = query => {
	return request({
		url: '/addOrUpdateIMakeAdvancesConf',
		method: 'post',
		data: query
	});
}
// 消费统计
export const sumOrderAPI = query => {
	return request({
		url: '/sumOrder',
		method: 'post',
		data: query
	});
}
// 角色列表
export const RoleListAPI = query => {
	return request({
		url: '/findSystemRoleList',
		method: 'post',
		data: query
	});
}
// 获取菜单
export const getMenuTreeAPI = query => {
	return request({
		url: '/getMenuTree',
		method: 'get',
		params: query
	});
}
// 新增或者修改
export const addRoleAPI = query => {
	return request({
		url: '/addOrUpdateSystemRole',
		method: 'post',
		data: query
	});
}
//查询数据
export const getRoleByIdAPI = query => {
	return request({
		url: '/findSystemRoleById',
		method: 'get',
		params: query
	});
}
// 查菜单
export const getMenusByRoleIdAPI = query => {
	return request({
		url: '/getMenusByRoleId',
		method: 'get',
		params: query
	});
}
// 删除角色
export const deleteRoleIdAPI = query => {
	return request({
		url: '/deleteSystemRole',
		method: 'get',
		params: query
	});
}


// 文本列表
export const findITextList = query => {
    return request({
        url: '/findITextList',
        method: 'post',
        data: query
    });

}

// 新增或修改文本
export const addOrUpdateIText = query => {
    return request({
        url: '/addOrUpdateIText',
        method: 'post',
        data: query
    });

}

// 导出订单
export const exporOrder = query => {
    return request({
        url: '/exporOrder',
        method: 'post',
        data: query
    });

}

//删除文本
export const deleteIText = query => {
    return request({
        url: '/deleteIText',
        method: 'get',
        params: query
    });
}
// 导出统计
export const downOreerAPI = query => {
	return request({
		url: '/exporDayIOrderList',
		method: 'post',
		data: query
	});
}
// 三类户导出
export const exportIAccountAPI = query => {
	return request({
		url: '/exportIAccount',
		method: 'post',
		data: query
	});
}
// 三类户交易记录导出
export const exporTypeIOrderAPI = query => {
	return request({
		url: '/exporTypeIOrderList',
		method: 'post',
		data: query
	});
}

export const addOrUpdateAPI = query => {
	return request({
		url: '/addOrUpdateISchool',
		method: 'post',
		data: query
	});
}

//修改办卡状态
export const updateSchoolCardAPI = query => {
	return request({
		url: '/updateSchoolCard',
		method: 'get',
		params: query
	});
}

//导出人员
export const exporMemberAPI = query => {
	return request({
		url: '/exportIMember',
		method: 'post',
		data: query
	});
}
export const updateSchoolDesignatebankAPI = query => {
	return request({
		url: '/updateSchoolDesignatebank',
		method: 'get',
		params: query
	});
}
// 解约
export const unsubscribeMemberAPI = query => {
	return request({
		url: '/unsubscribeMember',
		method: 'get',
		params: query
	});
}
// 重置密码
export const resetPasswordAPI = query => {
	return request({
		url: '/resetPassword',
		method: 'post',
		data: query
	});
}
// 查看密码
export const getUserPasswordAPI = query => {
	return request({
		url: '/getUserPassword',
		method: 'get',
		params: query
	});
}
// 用户统计
export const getSumIMembersAPI = query => {
	return request({
		url: '/getSumIMembers',
		method: 'post',
		data: query
	});
}
// 获取学校下的班级
export const getAllClassAPI = query => {
	return request({
		url: '/classApi/getAllClass',
		method: 'get',
		params: query
	});
}
