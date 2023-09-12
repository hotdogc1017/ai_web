<template>
  <div class="home">
    <Header></Header>
    <!-- 内容部分 -->
    <div class="centainr">
      <div class="centainr_view">
        <div class="centainr_title">一级标题</div>
        <div class="centainr_dect">sjasndans,dnas,ndn</div>
      </div>
      <!--tab展示-->
      <tabs-pupup></tabs-pupup>
      <!--内容中心-->
      <div class="tabMeun">
        <div class="tabMeun_view">
          <img src="../assets/images/icon01.png" alt="" class="tabMeun_img">
          <label class="tabMeun_label">小红书运营</label>
        </div>
        <div class="tabMeun_view1" @click="handleChat(1)">
          <img src="../assets/images/icon02.png" alt="" class="tabMeun_img">
          <label class="tabMeun_label testColor2">AI对话</label>
        </div>
        <div class="tabMeun_view1" @click="handleChat(2)">
          <img src="../assets/images/icon03.png" alt="" class="tabMeun_img">
          <label class="tabMeun_label testColor3">AI绘画</label>
        </div>
        <div class="tabMeun_view1">
          <img src="../assets/images/icon04.png" alt="" class="tabMeun_img">
          <label class="tabMeun_label testColor4">文案写作</label>
        </div>
        <div class="tabMeun_view1">
          <img src="../assets/images/icon05.png" alt="" class="tabMeun_img">
          <label class="tabMeun_label testColor5">职场办公</label>
        </div>
        <div class="tabMeun_view1">
          <img src="../assets/images/icon06.png" alt="" class="tabMeun_img">
          <label class="tabMeun_label testColor6">公文写作</label>
        </div>
      </div>
      <div class="centainr_view">
        <div class="centainr_title">一级标题</div>
        <div class="centainr_dect">sjasndans,dnas,ndn</div>
      </div>
      <div class="list">
        <div class="list_bg">
          <div class="list_header">
            <img src="../assets/images/icon07.png" alt="" class="list_bg_img">
            <label class="list_bg_label">用户名称</label>
          </div>
          <div class="list_dect">测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫</div>
        </div>
        <div class="list_bg1">
          <div class="list_header">
            <img src="../assets/images/icon07.png" alt="" class="list_bg_img">
            <label class="list_bg_label">用户名称</label>
          </div>
          <div class="list_dect">测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫</div>
        </div>
        <div class="list_bg2">
          <div class="list_header">
            <img src="../assets/images/icon07.png" alt="" class="list_bg_img">
            <label class="list_bg_label">用户名称</label>
          </div>
          <div class="list_dect">测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫</div>
        </div>
        <div class="list_bg3">
          <div class="list_header">
            <img src="../assets/images/icon07.png" alt="" class="list_bg_img">
            <label class="list_bg_label">用户名称</label>
          </div>
          <div class="list_dect">测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫测试时内容公共南宫</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import TabsPupup from '@/components/tabs.vue'  //tab展示
export default {
  components: {
    Header,TabsPupup
  },
  name: 'home',
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
    },
    handleChat(data){
      if(data == 1){
        this.$router.push('/chatIndex')
      }else if(data == 2){
        this.$router.push('/paintIndex')
      }

    },
  }
}
</script>
<style scoped lang="less">
.home {
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
  .tabMeun{
    margin-top: 25px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    .tabMeun_view{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 90px;
      background: #FA696D;
      box-shadow: 0px 12px 16px 0px rgba(250, 103, 107, 0.55);
      border-radius: 10px;
      margin-right: 20px;
      cursor: pointer;
    }
    .tabMeun_view1{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 90px;
      background: #FFFFFF;
      box-shadow: 0px 8px 14px 0px rgba(181, 115, 82, 0.18);
      border-radius: 10px;
      margin-right: 20px;
      cursor: pointer;
    }
    .tabMeun_img{
      width: 40px;
      height: 40px;
    }
    .tabMeun_label{
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 2px;
      margin-left: 10px;
      font-weight: bold;
    }
    .testColor2{
      color: #F16C9C;
    }
    .testColor3{
      color: #8290F3;
    }
    .testColor4{
      color: #DB70E8;
    }
    .testColor5{
      color: #EC8E12;
    }
    .testColor6{
      color: #10BC4F;
    }
  }
  .list{
    margin-top: 25px;
    display: flex;
    align-items: center;
    .list_bg{
      width: 400px;
      height: 150px;
      background: linear-gradient(135.00deg, rgb(247, 120, 168) -33.224%,rgb(228, 135, 189) 12.41%,rgb(222, 149, 204) 41.726%,rgb(255, 118, 203) 66.776%);
      border-radius: 12px;
      margin-right: 30px;
      padding: 15px 10px;
    }
    .list_bg1{
      width: 240px;
      height: 150px;
      background: linear-gradient(135.00deg, rgb(90, 166, 153) -5.593%,rgb(120, 179, 139) 40.04%,rgb(123, 181, 141) 69.356%,rgb(166, 204, 128) 94.407%);
      border-radius:12px;
      margin-right: 30px;
      padding: 15px 10px;
    }
    .list_bg2{
      width: 240px;
      height: 150px;
      background: linear-gradient(135.00deg, rgb(238, 171, 145) -5.593%,rgb(233, 133, 136) 40.04%,rgb(230, 121, 144) 69.356%,rgb(234, 100, 156) 94.407%);
      border-radius: 12px;
      margin-right: 30px;
      padding: 15px 10px;
    }
    .list_bg3{
      width: 240px;
      height: 150px;
      background: linear-gradient(135.00deg, rgb(246, 195, 148) -5.593%,rgb(240, 160, 149) 40.04%,rgb(244, 133, 127) 69.356%,rgb(247, 127, 128) 94.407%);
      border-radius: 12px;
      margin-right: 30px;
      padding: 15px 10px;
    }
    .list_header{
      display: flex;
      align-items: center;
      .list_bg_img{
        width: 35px;
        height: 35px;
      }
      .list_bg_label{
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 2px;
        margin-left: 10px;
        font-weight: bold;
      }
    }
    .list_dect{
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 2px;
      margin-top: 15px;
      letter-spacing: 3px;
    }
  }
}
</style>
