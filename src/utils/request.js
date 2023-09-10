import axios from 'axios';
import { MessageBox, Message } from 'element-ui'
import router from '../router'
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: 'http://39.106.69.95:8099',
    // timeout: 12000
});

service.interceptors.request.use(config => {
    	var token = sessionStorage.getItem("token")
    	if(token){
            config.headers['Content-Type'] = config.contentType || 'application/json;charset=UTF-8'
    		config.headers.Authtoken = token
    	}else{
    		router.replace('/login')
    	}

        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
			const that = this
            if(response.data.code === 203){
                if(sessionStorage.getItem("isLogin")==='1'){
                    Message.error('登录过期，请重新登录');
                    sessionStorage.setItem("isLogin",'0')
                }
            	return router.replace('/login')
            }else{
            	return response.data;
            }
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
