<template>
  <div class="header">
    <div class="home_header">
      <div class="home_header_left">
        <img src="../assets/images/home_user.png" alt="" class="user_logo">
        <div class="user_name">admin</div>
      </div>
      <div class="home_header_serch">
        <div class="search_view">
          <i class="el-icon-search"></i>
          <span class="search_text">输入关键搜索您的创意</span>
        </div>
        <div class="search_btn">搜索</div>
      </div>
      <div class="home_header_right">
        <div class="user_btn1">
          <img src="../assets/images/Weather.png" alt="" class="user_icon">
        </div>
        <div class="user_btn2">
          <img src="../assets/images/user.png" alt="" class="user_icon">
          <div class="user_btn_name">我的</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      queryParam: {
        pageNo: 1,
        pageSize: 10,
        name: null,
        createTime: [],
      },
    }
  },
  mounted() {

  }
}
</script>
<style scoped>
.header {
  .home_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .home_header_left {
    display: flex;
    align-items: center;

    .user_logo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #eee;
    }

    .user_name {
      font-size: 13px;
      color: #fff;
      margin-left: 10px;
      font-weight: bold;
      letter-spacing: 1px;
    }
  }

  .home_header_serch {
    width: 20%;
    height: 40px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-right: 10px;

    .search_view {
      .el-icon-search {
        color: #ffffff;
      }

      .search_text {
        fong-size: 12px;
        color: #ffffff;
        margin-left: 15px;
        letter-spacing: 5px;
      }
    }

    .search_btn {
      width: 65px;
      height: 30px;
      border-radius: 200px;
      background: #FF7100;
      font-size: 12px;
      color: #ffffff;
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .home_header_right {
    display: flex;
    align-items: center;

    .user_btn1 {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      width: 70px;
      height: 35px;
      border-radius: 5px;
      background: #F6F7F9;
      cursor: pointer;
    }

    .user_btn2 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 35px;
      border-radius: 5px;
      background: #FFECDD;
      cursor: pointer;
    }

    .user_icon {
      width: 22px;
      height: 22px;
    }

    .user_btn_name {
      font-size: 12px;
      color: #FF7100;
      letter-spacing: 5px;
      margin-left: 10px;
    }
  }
}
</style>
