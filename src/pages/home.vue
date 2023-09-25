<script>
export default {
  name: "home"
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
    width: 100%;
    height: calc(80vh - 200px);
    background: rgb(255, 247, 247);
    padding: 24px;
    .img03{
      width:70px;
    }
  }
}
</style>