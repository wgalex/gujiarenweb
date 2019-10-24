<template>
    <div class="container">
        <mt-header title="招聘专员">
            <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="top">
            <div class="header">
                <h4>招聘专员</h4>
                <span><i class="cubeic-person">招聘20人</i><i class="cubeic-edit">学历</i><i class="cubeic-time">3-5年</i></span><br>
                <span>工作地点：江干区火车东站顾家家居</span>
            </div>
            <div class="description">
                <h5>职位描述</h5>
                <span>1、根据公司要求组织招聘计划,有效完成工作计划</span><br>
                <span>2、根据公司要求组织招聘计划，有效完成工作计划</span><br>
                <span>3、根据公司要求组织招聘计划，有上进心，爱学习</span><br>
                <span>4、根据公司要求组织招聘计划，有上进心，爱学习</span><br>
            </div>
            <div class="qualifications">
                <h5>任职资格</h5>
                <span>1、根据公司要求组织招聘计划</span><br>
                <span>2、根据公司要求组织招聘计划</span><br>
                <span>3、根据公司要求组织招聘计划</span><br>
                <span>4、根据公司要求组织招聘计划</span><br>
                <div class="button"><cube-button @click="showPrompt" :outline="true" inline>咨询</cube-button><cube-button @click="sure" style="margin-left:20px;width:70%" :primary="true" inline>立即申请</cube-button></div>
                <!-- <cube-button @click="showPrompt">Dialog - prompt</cube-button> -->
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
    };
  },
  methods:{
     showPrompt() {
      this.$createDialog({
        type: 'textarea',
        // icon: 'cubeic-alert',
        title: '匿名咨询',
        content: '我是内容',
        confirmBtn: {
          text: '提交',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '提交成功'
          }).show()
        },
        onCancel: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '已取消'
          }).show()
        }
      }).show()
    },
     sure() {
       var that = this
      Toast({
          message: '操作成功',
          iconClass: 'icon icon-success',
          duration: 3000
      });
      setTimeout(function(){
        that.$router.push({ path:'personnelCreate' })
      }, 3000);
    },
  }
}
</script>
<style lang="stylus">
    .container{
        background-color #fff
    }
    .top{
        padding 10px
    }
    span{
        font-size 12px
    }
    i{
        font-style normal
    }
    .is{
        display inline-block
        width 60px
        height 20px
        line-height 20px
        text-align center
        background-color #ccc
    }
    .description{
        margin-top 10px
    }
    .qualifications{
        margin-top 10px
    }
    .button{
        margin-top 20px
    }
    .cubeic-edit{
      margin-left 6px
    }
    .cubeic-time{
      margin-left 6px
    }
</style>