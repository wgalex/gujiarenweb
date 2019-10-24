<template>
    <div class="container">
        <mt-header title="我的简历">
            <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="personMessage">
            <div class="personMessageInfo"><i class="cubeic-smile" style="color:red"></i><span class="message">基本信息</span><span class="write">填写并验证邮箱</span><i style="float:right" class="cubeic-arrow"></i></div>
            <div>
                <div style="float:left;margin-top:10px"><img style="width:60px;height:60px" src="../../assets/default_avtar.jpg" alt=""></div>
                <div class="messageDetail">
                    <div class="boxInfo"><span style="font-weight:700;font-size:15px">张三丰</span> <span> |男|100岁</span></div>
                    <div class="boxInfo" style="font-weight:700;font-size:14px">大专</div>
                    <div class="boxInfo"><span>计算机</span><span style="margin-left:10px">毕业时间：2012-1014</span></div>
                </div>
            </div>
        </div>
        <div class="personMessage">
            <div class="personMessageInfo"><i class="cubeic-credit-card" style="color:red"></i><span class="message">顾家工作经历</span><i style="float:right" class="cubeic-arrow"></i></div>
            <div>
                <div class="classification"><span class="workTitle">岗 位</span> &nbsp<span class="workContent">人力资源信息系统专员</span></div>
                <div class="classification"><span class="workTitle">时间</span> <span class="workContent">2013.9-2014.9</span></div>
                <div class="classification"><span class="workTitle">单位</span> <span class="workContent">IT</span></div>
            </div>
        </div>
        <div class="personMessage">
            <div class="personMessageInfo"><i class="cubeic-credit-card" style="color:red"></i><span class="message">社会工作履历</span><i style="float:right" class="cubeic-arrow"></i></div>
            <div>
                <div class="classification"><span class="workContent">2016/07 - 至今</span></div>
                <div class="classification"><span class="workTitle">单位</span> <span class="workContent">IT</span></div>
                <div class="classification"><span class="workTitle">部门</span> <span class="workContent">开发部</span></div>
                <div class="classification"><span class="workTitle">岗位</span> <span class="workContent">java开发</span></div>
            </div>
        </div>
        <!-- <div class="personMessage">
            <div class="personMessageInfo"><i class="cubeic-credit-card" style="color:red"></i><span class="message">项目经验</span><i style="float:right" class="cubeic-arrow"></i></div>
            <div>
                <div class="classification"><span class="workContent">2016/07 - 至今</span></div>
                <div class="classification"><span class="workContent">顾家家居股份有限公司</span></div>
                <div class="classification"><span class="workContent">人力资源信息系统专员</span></div>
            </div>
        </div> -->
        <!-- <div class="personMessage">
            <div class="personMessageInfo"><i class="cubeic-credit-card" style="color:red"></i><span class="message">教育经历</span><i style="float:right" class="cubeic-arrow"></i></div>
            <div>
                <div class="classification"><span class="workContent">2016/07 - 2019-07</span></div>
                <div class="classification"><span class="workContent">北京大学</span></div>
                <div class="classification"><span class="workContent">人力资源信息系统专员</span></div>
            </div>
        </div> -->

        <div class="rightNow">
            <cube-button @click="showAlert" :primary="true">立即申请</cube-button>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    };
  },
  methods:{
    showAlert() {
      this.$createDialog({
        type: 'alert',
        content: '申请成功',
        icon: 'cubeic-alert'
      }).show()
    }
  }
}
</script>
<style lang="stylus">
    .container{
        background-color #eee
    }
    .personMessage{
        margin-top 10px
        width 100%
        padding 10px
        height 150px
        background-color #fff
    }
    .personMessageInfo{
        border-bottom 1px solid #ccc
    }
    .message{
        margin-left 5px
        font-size 14px
        font-weight 700
    }
    .write{
        margin-left 5px
        color #f00
        font-size 12px
    }
    .messageDetail{
        float left
        margin-left 6px
    }
    .boxInfo{
        margin-top 6px
        font-size 12px
    }
    .workTitle{
        font-size 14px
    }
    .workContent{
        font-size 14px
        font-weight 700
    }
    .classification{
        margin-top 6px
    }
    .rightNow{
        margin-top 20px
    }
</style>