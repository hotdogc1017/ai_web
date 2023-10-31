<template>
  <div class="typePage">
    <div class="typePage_header">
      <label class="chatTitle">{{ title }}</label>
    </div>
    <div class="typeCentent">
      <el-row :gutter="10">
        <el-col :xs="4" :sm="6" :md="4" :lg="4" :xl="4" v-for="(item,index) in cardList" :key="index"   >
          <div class="datameun"  @click="toChat(item)">
            <div class="datameun_header" >
              <div class="datameun_header_title" >{{item.name}}</div>
              <img :src='item.icon' alt="" class="datameun_header_img">
            </div>
            <div class="datameun_dect">{{item.introduce}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getModuleConfigAPI} from "@/api";

export default {
  name: "index",
  data() {
    return {
      cardList: [],
      title: '',
    };
  },
  created() {
  },
  //监听路由变化
  watch: {
    $route(to, from) {
      this.getModuleList();
      this.title = sessionStorage.getItem('menuTitle')
    },
  },
  mounted() {
    this.getModuleList();
  },
  methods:{
    toChat(item){
      this.$router.push({
        path: '/typeChatIndex',
        query: {
          id: item.id,
          moduleId:item.moduleId,
          icon:item.icon,
        }
      })

    },
    getModuleList(){
      const params = {
        moduleId: sessionStorage.getItem('activeId')
      }
      getModuleConfigAPI(params).then(res => {
        if (res.code == 200) {
          this.cardList = res.data;
          // this.data = res.data[0]
        }
      });
    }
  }
}
</script>
<style scoped lang="less">
.typePage_header {
  display: flex;
  align-items: center;
  margin:0 24px 20px 24px;
  .chatImg {
    width: 30px;
    height: 30px;
  }

  .chatTitle {
    font-weight: bold;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 2px;
  }
}
.typeCentent{
  margin: 20px;
  height: calc(100vh - 100px);
  overflow: hidden;
  overflow-y: auto;
}
.el-col {
  border-radius: 4px;
  margin-bottom: 10px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.datameun{
  //width: 300px;
  height: 240px;
  background: rgba(255,255,255,0.1);
  box-shadow: 0px 3px 9px 0px rgba(55, 21, 21, 0.08);
  border-radius:8px;
  padding:0 20px;
  box-sizing: border-box;
  .datameun_header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);;
    .datameun_header_title{
      font-size: 15px;
      color: #FFFFFF;
      font-weight: bold;
      letter-spacing: 1px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .datameun_header_img{
      width: 20px;
      margin-left: 10px;
    }
  }
  .datameun_dect{
    color: #FFFFFF;
    //font-family: 阿里巴巴普惠体;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 2px;
    text-align: left;
    margin: 15px 0;
    min-height: 80px;
  }
  .datameun_footer{
    display: flex;
    align-items: center;
    .datameun_footer_view{
      display: flex;
      align-items: center;
      margin-right: 20px;
      .datameun_img{
        width: 15px;
      }
      .datameun_img1{
        width: 18px;
        position: relative;
        top: -2px;
      }
      .datameun_footer_label{
        font-size: 13px;
        color: #FFFFFF;
        letter-spacing: 1px;
        margin-left: 10px;
      }
    }
  }
}
</style>
