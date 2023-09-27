<script>
import bus from "@/utils/bus";
import {getHotRecommendAPI, getModuleListAPI} from "@/api";

export default {
  name: "home",
  data() {
    return {
    cardList: [],
    };
  },

  created() {

    //查询首页推荐
    getHotRecommendAPI().then(res => {
      if (res.code == 200) {
        this.cardList = res.data;
      }
    });
  },
  mounted() {},
  methods: {

  }
}

</script>

<template>
<div class="Home">
  <div class="home_header">
    <img src="../assets/images/home_ai.png" alt="" class="img01">
    <img src="../assets/images/home_title.png" alt="" class="img02">
  </div>
  <div class="search">
    <input type="text" placeholder="请输入关键词进行搜索" class="search_input"/>
    <img src="../assets/images/home_search.png" alt="" class="search_img">
  </div>
  <div class="hishtory">
    <div class="hishtory_list">搜索历史1</div>
  </div>
  <div class="home_centent">
    <img src="../assets/images/home_text.png" alt="" class="img03">
    <div class="datalist">
      <div class="datameun" v-for="(item,index) in cardList" :key="index">
        <div class="datameun_header">
          <div class="datameun_header_title">{{item.name}}</div>
          <img :src='item.icon' alt="" class="datameun_header_img">
        </div>
        <div class="datameun_dect">{{item.introduce}}</div>
        <div class="datameun_footer">
          <div class="datameun_footer_view">
            <img src="../assets/images/edit.png" alt="" class="datameun_img">
            <label class="datameun_footer_label">{{ item.usedNum }}</label>
          </div>
          <div class="datameun_footer_view">
            <img src="../assets/images/zan.png" alt="" class="datameun_img1">
            <label class="datameun_footer_label">{{ item.likeNum }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="less">
.Home{
  padding: 24px;
  .home_header{
    display: flex;
    align-items: center;
    justify-content: center;
    .img01{
      width: 75px;
      margin-right: 10px;
    }
    .img02{
      width:450px;
    }
  }
  .search{
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background: rgba(255, 199, 199, 0.14);
    border: 1px solid rgb(241, 85, 85);
    border-radius: 168px;
    width: 100%;
    height: 40px;
    margin-top: 30px;
    .search_input{
      border: none;
      outline: none;
      height: 40px;
      width: 100%;
      background: none;
      margin-left: 24px;
      font-size: 13px;
      color: #333333;
      letter-spacing: 1px;
    }
    .search_img{
      width: 40px;
      margin-right: 10px;
    }
  }
  .hishtory{
    margin: 10px 0 20px 0;
    .hishtory_list{
      width: 100px;
      height: 30px;
      margin-bottom: 10px;
      background: rgb(255, 238, 238);
      box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
      border-radius:100px;
      font-size: 12px;
      color: #F47C7C;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 2px;
    }
  }
  .home_centent{
    height: calc(80vh - 200px);
    background: rgb(255, 247, 247);
    padding: 24px;
    overflow: hidden;
    overflow-y: auto;
    .img03{
      width:70px;
    }
    .datalist{
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      .datameun{
        width: calc(100vh - 100px);
        max-width: 300px;
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
  }
}
</style>
