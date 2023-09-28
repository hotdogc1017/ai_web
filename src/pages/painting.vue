<!--绘画-->
<script>
import vHead from "@/components/Header.vue";
import bus from "@/utils/bus";

export default {
  name: "painting",
  components: {vHead},
  data() {
    return {
      collapse: false,
      activeIndex: 0,
      active:0,
      tabs: ['文字描述', '快捷模板', '高级自定义'],
      textarea: '',
      editForm: {
        name: '',
        imageUrl: ''
      },
      imageUrl: ''
    }
  },
  created() {
    bus.$on('collapse', msg => {
      this.collapse = msg;
    });
  },
  methods:{
    handleSelect(data){
      this.activeIndex = data
    },
    handleBack(){
      this.$router.go(-1)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<template>
  <div class="paintingHome">
    <v-head></v-head>
    <div class="painting-centainr">
      <div class="wrapper_sidebar" :class="{'painting_sidebar': collapse}">
        <div class="sidebar_list">
          <div :class="activeIndex == index ? 'sidebar_meun_active' : 'sidebar_meun' " v-for="(item,index) in 18" :key="index" @click="handleSelect(index)">
            <img src="../assets/images/w.png" alt="" class="sidebar_img">
            <label class="sidebar_label">绘画{{index + 1}}</label>
          </div>
        </div>
      </div>
      <div class="wrapper_centent">
        <div class="chatWrapper_header">
          <img src="../assets/images/chat_arrow.png" alt="" class="chatImg" @click="handleBack()">
          <label class="chatTitle">智能做图</label>
        </div>
        <div class="painting_centent">
          <div class="painting_data">
            <div class="painting_data_left">
              <div class="left_title">只需要将服装穿到人台上，即可用符合品牌调性的各类型真人模特展示服装。</div>
              <div class="left_btn">
                <i class="el-icon-plus"></i>
                <label class="left_btn_text">新建任务</label>
              </div>
              <div class="left_list">
                <div class="list_meun" v-for="(item,index) in 20" :key="index">
                  <img src="../assets/images/Frame_1.png" alt="" class="list_meun_img">
                  <span class="list_meun_text">任务-1234 </span>
                </div>
              </div>
            </div>
            <div class="painting_data_right">
              <div class="upload">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                  <div class="upload_dy">
                    <img src="../assets/images/icon_upload.png" alt="" class="uoload_img">
                    <p class="upload_text">上传本地图片</p>
                    <p class="upload_dect">大小不超过10M,宽高比小于2，格式不支持gif格式</p>
                  </div>
                </el-upload>
              </div>
              <div class="upload_img">
                <img src="../assets/images/upload_bg.png" class="avatar">
              </div>
            </div>
          </div>
          <div class="painting_data">
            <div class="painting_data_leftup">
              <div class="painting_more">更多功能</div>
              <div class="painting_view">
                <img src="../assets/images/Group_01.png" alt="" class="group_img">
                <img src="../assets/images/Group_02.png" alt="" class="group_img">
                <img src="../assets/images/Group_03.png" alt="" class="group_img">
              </div>
            </div>
            <div class="painting_data_rightup">
              <div class="painting_data_header">
                <div class="rightup_tabs">
                  <div v-for="(item,index) in tabs" :key="index" :class="active == index ? 'rightup_tabs_active' : 'rightup_tabs_text'">{{item}}</div>
                </div>
                <div class="tabs_btn">提交</div>
              </div>
              <div class="painting_data_input">
                <textarea rows="10" cols="130" placeholder="请输入文字描述" v-model="textarea" class="rightup_input"></textarea>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.paintingHome{
  height: 100%;
  .painting_centent{
    height: calc(100vh - 150px);
    overflow: hidden;
    overflow-y: auto;
  }
  .painting_sidebar{
    animation: fadeOutLeft; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 0.8s;
    display: none;
  }
  .painting-centainr{
    display: flex;
    width: 100%;
    height: 100%;
  }
  .wrapper_sidebar{
    background: #FFFFFF;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
    width: 200px;
    .sidebar_list{
      height: calc(100vh - 100px);
      overflow: hidden;
      overflow-y: auto;
      margin-top: 10px;
    }
    .sidebar_meun{
      display: flex;
      align-items: center;
      height: 60px;
      padding: 0 20px;
    }
    .sidebar_meun_active{
      display: flex;
      align-items: center;
      height: 60px;
      padding: 0 20px;
      background: rgb(255, 247, 247);
      border-right: 3px solid #F04848;
    }
    .sidebar_img{
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
    .sidebar_label{
      margin-left: 10px;
      font-size: 13px;
      color: #333333;
    }
  }
  .wrapper_centent{
    width: 100%;
    .chatWrapper_header{
      display: flex;
      align-items: center;
      margin: 20px 24px;
      .chatImg{
        width: 30px;
        height: 30px;
      }
      .chatTitle{
        font-weight: bold;
        font-size: 14px;
        color:333333 ;
        margin-left: 10px;
      }
    }
    .painting_data{
      display: flex;
      position: relative;
      margin: 15px 24px;
      .painting_data_left{
        width: 40%;
        //height: 200px;
        background: #FFFFFF;
        box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
        border-radius: 10px;
        margin-right: 20px;
        .left_title{
          color: rgba(51, 51, 51, 0.6);
          //font-family: 阿里巴巴普惠体;
          font-size: 14px;
          font-weight: bold;
          letter-spacing: 2px;
          padding: 10px 30px;
        }
        .left_list{
          display: flex;
          align-items: center;
          //justify-content: center;
          flex-direction: column;
          margin-top: 15px;
          overflow: hidden;
          overflow-y: auto;
          height: 200px;
          .list_meun{
            background: rgb(255, 238, 238);
            border-radius: 8px;
            width: 90%;
            padding-top: 12px;
            padding-bottom: 12px;
            display: flex;
            align-items: center;
            padding-left: 15px;
            margin-bottom: 10px;
            .list_meun_img{
              width: 20px;
              height: 20px;
            }
            .list_meun_text{
              color: rgb(51, 51, 51);
              //font-family: 阿里巴巴普惠体;
              font-size: 14px;
              font-weight: 400;
              margin-left: 10px;
            }
          }
        }
        .left_btn{
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgb(240, 72, 72);
          border-radius: 8px;
          width: 90%;
          height: 40px;
          margin: auto;
          .el-icon-plus{
            color: #F04848;
            font-size: 20px;
          }
          .left_btn_text{
            font-size: 14px;
            color:#F04848;
            margin-left: 10px;
          }
        }
      }
      .painting_data_right{
        width: 60%;
        //height: 200px;
        background: #FFFFFF;
        box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        padding: 20px 0;
        .upload_dy{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .uoload_img{
            width: 40px;
          }
          .upload_text{
            color: rgb(237, 74, 74);
            //font-family: 阿里巴巴普惠体;
            font-size: 15px;
            font-weight: bold;
            margin-top: 8px;
          }
          .upload_dect{
            color: rgb(124, 124, 124);
            //font-family: 阿里巴巴普惠体;
            font-size: 13px;
            font-weight: 400;
            margin-top: 10px;
          }
        }
      }
      .painting_data_leftup{
        width: 40%;
        height: 260px;
        background: #FFFFFF;
        box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
        border-radius: 10px;
        margin-right: 20px;
        .painting_more{
          font-size: 13px;
          color: #333333;
          font-weight: bold;
          letter-spacing: 1px;
          padding: 20px 30px;
        }
        .painting_view{
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 10px 0;
          height: 150px;
        }
        .group_img{
          width: 90px;
          height: 92px;
        }
      }
      .painting_data_rightup{
        width: 60%;
        height: 260px;
        background: #FFFFFF;
        box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
        border-radius: 10px;
        .painting_data_input{
          padding: 10px 24px;
          margin-top: 5px;
          .rightup_input{
            //width: 100%;
            height: 120px;
            background: rgb(255, 247, 247);
            border: 1px solid rgba(240, 72, 72, 0.26);
            border-radius:8px;
            padding: 10px;
            order: none;
            outline: none;
            font-size: 13px;
            color: #333333;
            font-weight: 400;
            letter-spacing: 2px;
          }
        }
        .painting_data_header{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
        }
        .rightup_tabs{
          display: flex;
        }
        .rightup_tabs_text{
          width: 100px;
          height: 30px;
          color: #333333;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        .rightup_tabs_active{
          width: 100px;
          height: 30px;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 2px;
          background: linear-gradient(179.26deg, rgb(244, 124, 124) 22.803%,rgb(240, 72, 72) 96.018%),linear-gradient(151.34deg, rgb(116, 190, 254) 22.35%,rgb(13, 117, 254) 69.27%);
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        .tabs_btn{
          width: 80px;
          height: 30px;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 2px;
          background: linear-gradient(179.26deg, rgb(244, 124, 124) 22.803%,rgb(240, 72, 72) 96.018%),linear-gradient(151.34deg, rgb(116, 190, 254) 22.35%,rgb(13, 117, 254) 69.27%);
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .avatar-uploader /deep/.el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background: rgb(255, 238, 238);
    border: 1.5px solid rgb(239, 92, 92);
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .upload_img{
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 50px;
  }
  .avatar {
    width: 300px;
    height: 300px;
    display: block;
  }
}
</style>
