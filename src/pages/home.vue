<script>
import bus from "@/utils/bus";
import {getHotRecommendAPI, getModuleListAPI} from "@/api";

export default {
  name: "home",
  data() {
    return {
      query: {
        search: '',
      },
      hishtoryIndex: '-1',
      hishtoryList: ['人工智能', '什么是AI', '春节', '国庆节', '九一八事变', '无人驾驶', '区块链'],
      cardList: [],
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      //查询首页推荐
      getHotRecommendAPI().then(res => {
        if (res.code == 200) {
          this.cardList = res.data;
        }
      });
    },
    // 关键词搜索
    handleHishtory(index, item) {
      this.hishtoryIndex = index;
      this.query.search = item;
    },
    hanleInput(event){
      if (event.target.value == '') {
        this.hishtoryIndex = '-1';
      }
    }
  }
}

</script>

<template>
  <div class="Home">
    <div class="search">
      <i class="el-icon-search"></i>
      <input type="text" placeholder="请输入关键词进行搜索" class="search_input" v-model="query.search" @input="hanleInput"/>
    </div>
    <div class="hishtory">
      <div :class="hishtoryIndex == index ? 'hishtory_active' : 'hishtory_text'" v-for="(item,index) in hishtoryList" :key="index" v-if="index < 7" @click="handleHishtory(index,item)">{{ item }}</div>
    </div>
    <div class="home_centent">
      <el-row :gutter="10">
        <el-col :xs="4" :sm="6" :md="4" :lg="4" :xl="4" v-for="(item,index) in cardList" :key="index" >
          <div class="datameun" >
            <div class="datameun_view">
              <img :src='item.icon' alt="" class="datameun_header_img">
            </div>
            <div class="datameun_header_title">{{ item.name }}</div>
            <div class="datameun_dect">{{ item.introduce }}</div>
            <div class="datameun_footer">
              <div class="datameun_footer_view">
                <img src="../assets/images/zan.png" alt="" class="datameun_img1">
                <label class="datameun_footer_label">{{ item.likeNum }}</label>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="less">
.Home {
  padding: 24px;

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background: #000000;
    border-radius: 168px;
    width: 50%;
    height: 40px;
    margin: auto;

    .el-icon-search {
      color: rgba(255, 255, 255, 0.6);
      font-size: 18px;
      margin: 0 10px;
    }

    .search_input {
      border: none;
      outline: none;
      height: 40px;
      width: 100%;
      background: none;
      font-size: 13px;
      color: #FFFFFF;
      letter-spacing: 1px;
    }
  }

  .hishtory {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 50%;
    margin: 10px auto 20px auto;

    .hishtory_text {
      width: 100px;
      height: 30px;
      margin-bottom: 10px;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
      border-radius: 100px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 12px;
      color: rgba(255, 255, 255, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 2px;
      margin-right: 10px;
    }

    .hishtory_active {
      width: 100px;
      height: 30px;
      margin-bottom: 10px;
      background: rgba(228, 98, 98, 0.2);
      box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
      border-radius: 100px;
      border: 1px solid #E46262;
      font-size: 12px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 2px;
      margin-right: 10px;
    }
  }

  .home_centent {
    height: calc(100vh - 220px);
    overflow: hidden;
    overflow-y: auto;
    .datameun {
      //width: 220px;
      height: 280px;
      background: rgba(255,255,255,0.1);
      box-shadow: 0px 3px 9px 0px rgba(55, 21, 21, 0.08);
      border-radius: 8px;
      padding: 0 16px;
      margin-bottom: 12px;
      box-sizing: border-box;
      .datameun_view{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
      }
      .datameun_header_title {
        font-size: 15px;
        font-family: Bold;
        color: #FFFFFF;
        font-weight: bold;
        letter-spacing: 1px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .datameun_header_img {
        width: 76px;
        height: 76px;
        border-radius: 8px;
        margin-top: 15px;
      }

      .datameun_dect {
        font-family: Thin;
        font-size: 13px;
        color: #FFFFFF;
        line-height: 22px;
        letter-spacing: 2px;
        text-align: left;
        margin: 15px 0;
        min-height: 80px;
        display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示
        -webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式
        -webkit-line-clamp: 4; // 显示两行
        overflow: hidden;
      }

      .datameun_footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .datameun_footer_view {
          display: flex;
          align-items: center;
          .datameun_img {
            width: 15px;
          }

          .datameun_img1 {
            width: 15px;
          }
          .datameun_footer_label {
            font-size: 13px;
            color: #FFFFFF;
            letter-spacing: 1px;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
