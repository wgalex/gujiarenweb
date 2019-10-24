<template>
    <div>
        <mt-header title="申请记录">
            <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">已查阅</mt-tab-item>
            <mt-tab-item id="3">感兴趣</mt-tab-item>
            <mt-tab-item id="4">邀面试</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" is-active>
            <mt-tab-container-item id="1">
                <!-- <div class="arive">
                    <i class="cubeic-navigation" style="color:skyblue;font-size:14px">已到达</i> <span>今天11:53</span><i class="cubeic-arrow" style="float:right"></i>
                </div> -->
                <div class="content">
                    <div class="contentInfo"><span class="commissioner">招聘专员</span></div>
                    <div class="contentInfo"><span>上海牛岛信息技术有限公司</span><span class="right">主管</span></div>
                    <div class="contentInfo"><span class="company">江干区火车东站顾家家居/本科/3年</span></div>
                    <el-steps :active="active" finish-status="success">
                        <el-step title="投递成功"></el-step>
                        <el-step title="初审"></el-step>
                        <el-step title="应聘"></el-step>
                    </el-steps>
                    <button @click="next">下一步</button>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
export default {
  data () {
    return {
        topNev:'1',
        selected:'1',
        active: 0
    };
  },
  methods:{
       next() {
        if (this.active++ > 2) this.active = 0;
      }
  }
}
</script>
<style lang="stylus">
    .right{
        float right
        font-size 12px
    }
    .commissioner{
        font-size 14px
        font-weight 700
    }
    .content{
        margin-top 10px
        padding 10px
        height 160px
        background-color #fff
    }
    .contentInfo{
        margin-top 6px
    }
    .company{
        font-size 12px
    }
</style>