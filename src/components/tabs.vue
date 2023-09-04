<!--类型-->
<script>
export default {
  name: "meunList"
}
</script>

<template>
<div class="tabsHome">
  <div class="tabs">
    <div class="meun" v-for="(item,index) in 8" :key="index">
      <img src="../assets/images/icon.png" alt="" class="icon_img">
      <div class="meun_text">小红书</div>
    </div>
  </div>
</div>
</template>

<style scoped lang="less">
.tabsHome{
  .tabs{
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .meun{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 24px;
  }
  .icon_img{
    width: 80px;
    height: 80px;
  }
  .meun_text{
    font-size: 12px;
    color: #FF002F;
    background: rgba(255, 103, 83, 0.5);
    padding: 3px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    margin-top: 5px;
  }
}
</style>