<template>
  <div class="typePage">
    <div class="typePage_header">
      <label class="chatTitle">{{ title }}</label>
    </div>
    <div class="typeCentent">
      <el-row :gutter="20" class="datalist">
        <el-col :span="6" v-for="(item,index) in cardList" :key="index" class="datameun"   >
          <div @click="toChat(item)">
            <div class="datameun_header" >
              <div class="datameun_header_title" >{{item.name}}</div>
              <img :src='item.icon' alt="" class="datameun_header_img">
            </div>
            <div class="datameun_dect">{{item.introduce}}</div>
            <div class="datameun_footer">
              <div class="datameun_footer_view">
                <img src="../../assets/images/edit.png" alt="" class="datameun_img">
                <label class="datameun_footer_label">{{ item.usedNum }}</label>
              </div>
              <div class="datameun_footer_view">
                <img src="../../assets/images/zan.png" alt="" class="datameun_img1">
                <label class="datameun_footer_label">{{ item.likeNum }}</label>
              </div>
            </div>
          </div>

        </el-col>
      </el-row>
      <!--<div class="datalist">-->
      <!--  <div class="datameun" v-for="(item,index) in cardList" :key="index">-->
      <!--    <div class="datameun_header">-->
      <!--      <div class="datameun_header_title">{{item.name}}</div>-->
      <!--      <img :src='item.icon' alt="" class="datameun_header_img">-->
      <!--    </div>-->
      <!--    <div class="datameun_dect">{{item.introduce}}</div>-->
      <!--    <div class="datameun_footer">-->
      <!--      <div class="datameun_footer_view">-->
      <!--        <img src="../../assets/images/edit.png" alt="" class="datameun_img">-->
      <!--        <label class="datameun_footer_label">{{ item.usedNum }}</label>-->
      <!--      </div>-->
      <!--      <div class="datameun_footer_view">-->
      <!--        <img src="../../assets/images/zan.png" alt="" class="datameun_img1">-->
      <!--        <label class="datameun_footer_label">{{ item.likeNum }}</label>-->
      <!--      </div>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</div>-->
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
  margin: 20px 24px;

  .chatImg {
    width: 30px;
    height: 30px;
  }

  .chatTitle {
    font-weight: bold;
    font-size: 14px;
    color: #333333;
    letter-spacing: 2px;
  }
}
.typeCentent{
  margin: 20px 24px;
}


.el-col {
  border-radius: 4px;
  margin-bottom: 10px;
}

.el-col:hover{

  border: 1px solid rgb(244, 124, 124);
}
.bg-purple {
  background: #d3dce6;

}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.datalist{
  //display: flex;
  //flex-wrap: wrap;
  .datameun{
    width: 300px;
    height: 190px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 3px 9px 0px rgba(55, 21, 21, 0.08);
    border-radius:8px;
    padding:0 20px;
    margin-bottom: 12px;
    margin-right: 15px;
    box-sizing: border-box;
    .datameun_header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 45px;
      border-bottom: 1px solid #eeeeee;
      .datameun_header_title{
        font-size: 15px;
        color: #333333;
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
      color: rgb(51, 51, 51);
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
          color: rgba(51, 51, 51, 0.6);
          letter-spacing: 1px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
