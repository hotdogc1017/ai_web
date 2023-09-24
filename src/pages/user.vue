<!--我的-->
<template>
  <div class="userHome">
    <!-- 内容部分 -->
    <div class="centainr">
      <div class="centainr_view">
        <div class="centainr_title">一级标题</div>
        <div class="centainr_dect">sjasndans,dnas,ndn</div>
      </div>
      <!--内容中心-->
      <div class="wrapper">
        <div class="wrapper_left">
          <div class="wrapper_meun">
            <div v-for="(item,index) in meunList" :key="index" :class="active == index ? 'wrapper_meun_active' : 'wrapper_meun_title'" @click="handletab(index)">{{ item }}</div>
          </div>
        </div>
        <div class="wrapper_right">
          <div v-if="active == 0" class="wrapper_view">
            <div class="wrapper_view_title">账户概览</div>
            <div class="wrapper_centent">
              <div class="wrapper_logo"> </div>
              <div class="wrapper_info">
                <div class="wrapper_info_text">欢迎您：微信用户xnnn2143</div>
                <el-button type="primary" size="mini" class="wrapper_info_btn">更换头像</el-button>
                <el-button type="primary" size="mini" class="wrapper_info_btn">注销登录</el-button>
              </div>
              <div class="wrapper_from">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="基本信息" name="first">
                    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="ruleForm">
                      <el-form-item label="ID" prop="ID">
                        <el-input v-model="editForm.ID" class="ruleForm_input"></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editForm.email" class="ruleForm_input">
                          <template slot="append">绑定</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="editForm.mobile" class="ruleForm_input"></el-input>
                      </el-form-item>
                      <el-form-item label="昵称" prop="name">
                        <el-input v-model="editForm.name" class="ruleForm_input"></el-input>
                      </el-form-item>
                    </el-form>
                    <div class="ruleForm_btn">
                      <el-button type="primary" size="mini" class="wrapper_info_btn">保存信息</el-button>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="账户安全" name="second">账户安全</el-tab-pane>
                  <el-tab-pane label="第三方绑定" name="third">第三方绑定</el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
          <div v-if="active == 1" class="wrapper_view">
            <div class="wrapper_view_title">我的套餐</div>
          </div>
          <div v-if="active == 2" class="wrapper_view">
            <div class="wrapper_view_title">购买套餐</div>
          </div>
          <div v-if="active == 3" class="wrapper_view">
            <div class="wrapper_view_title">邀请好友</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      queryParam: {
        pageNo: 1,
        pageSize: 10,
        name: null,
        createTime: [],
      },
      active: 0,
      meunList:['账户概览','我的套餐','购买套餐','邀请好友'],
      activeName: 'first',
      editForm:{
        ID: '123456',
        email: '',
        mobile: '',
        name: '',
      },
      rules:{
        ID: [{ required: true, message: '请输入ID', trigger: 'blur' },],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },],
        name: [{ required: true, message: '请输入昵称', trigger: 'blur' },],
      }
    }
  },
  mounted() {

  },
  methods: {
    handletab(index) {
      this.active = index
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>
<style scoped lang="less">
.userHome {
  padding: 24px;
  .centainr{
  //height: calc(100vh - 160px);
    background: linear-gradient(90deg, rgba(255, 244, 242, 1) 0%, rgba(252, 243, 255, 1) 100%);
    margin-top: 20px;
    border-radius: 10px;
    padding: 20px 30px;
  }
  .centainr_view{
    .centainr_title{
      font-size: 14px;
      color: #000;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .centainr_dect{
      font-size: 12px;
      color: #888888;
      letter-spacing: 4px;
      margin-top: 5px;
    }
  }
  .wrapper{
    display: flex;
    margin-top: 20px;
    background: rgba(255, 255, 255, 1);
    height: calc(100vh - 150px);
    border-radius: 5px;
    padding:10px 0;
    overflow: hidden;
    overflow-y: auto;
    .wrapper_left{
      width: 240px;
      height: calc(100vh - 150px);
      border-right: 1px solid #eeeeee;
      padding: 0 15px;
    }
    .wrapper_right{
      margin-left: 30px;
      padding: 15px 0;
      width: 100%;
    }
    .wrapper_view_title{
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      letter-spacing: 4px;
      margin-bottom: 20px;
      font-weight: bold;
    }
    .wrapper_meun{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .wrapper_meun_title{
        font-size: 13px;
        color: rgba(51, 51, 51, 1);
        letter-spacing: 4px;
        cursor: pointer;
        background: rgba(255, 255, 255, 1);
        width: 200px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .wrapper_meun_active{
        font-size: 13px;
        color: rgba(250, 100, 0, 1);
        letter-spacing: 4px;
        cursor: pointer;
        background: rgba(255, 236, 221, 1);
        width: 200px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
    .wrapper_centent{
      .wrapper_logo{
        width: 80px;
        height: 80px;
        background: #888888;
        border-radius: 5px;
        margin-bottom: 4px;
      }
      .wrapper_info_btn{
        background: rgba(255, 236, 221, 1);
        border: 1px solid rgba(255, 236, 221, 1);
        font-size: 12px;
        color: rgba(255, 113, 0, 1);
        letter-spacing: 2px;
      }
      .wrapper_info{
        display: flex;
        align-items: center;
        .wrapper_info_text{
          font-size: 13px;
          color: #000000;
          margin-right: 20px;
        }
      }
      .wrapper_from{
        margin-top: 15px;
        /deep/.el-tabs__item.is-active{
          color: rgba(255, 113, 0, 1);
        }
        /deep/.el-tabs__active-bar{
          background: rgba(255, 113, 0, 1);
        }
        /deep/.el-tabs__item:hover{
          color: rgba(255, 113, 0, 1);
        }
        /deep/.el-input-group__append, .el-input-group__prepend{
          background: rgba(255, 236, 221, 1);
          border: 1px solid rgba(255, 113, 0, 1);
          color: rgba(255, 113, 0, 1);
        }
        .ruleForm_input{
          width: 30%;
        }
        .ruleForm_btn{
          width: 40%;
          text-align: center;
        }
      }
    }
  }
}
</style>
