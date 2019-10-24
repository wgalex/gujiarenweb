<template>
    <div>
        <mt-header title="名人堂">
            <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <!-- 内容部分 -->
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">代办</mt-tab-item>
            <mt-tab-item id="2">通知</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" is-active>
            <mt-tab-container-item id="1">
                <div class="containerBox">暂无代办事项</div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div>通知页面</div>
            </mt-tab-container-item>
        </mt-tab-container>

        <nav class="mui-bar mui-bar-tab">
          <router-link style="border: 1px solid #929292;border-right:0;border-top:0;background-color:#f00;color:white;" class="mui-tab-item" :to="{name:'personnelIndex'}">
              <span class="mui-tab-label">首页</span>
          </router-link>
          <router-link style="border: 1px solid #929292;border-right:0;border-top:0" class="mui-tab-item" to="/honorPrize">
              <span class="mui-tab-label">股份荣誉</span>
          </router-link>
          <router-link style="border: 1px solid #929292;border-top:0" class="mui-tab-item" to="/">
              <span class="mui-tab-label">单位荣誉</span>
          </router-link>
        </nav>

        
        
      <!-- <div class="page-tab-container">
        <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
          <mt-tab-container-item id="tab-container1">
            <mt-cell>111</mt-cell>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container2">
            <mt-cell></mt-cell>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container3">
            <mt-cell></mt-cell>
          </mt-tab-container-item>
        </mt-tab-container>
    </div>
    <div class="nav">
          <mt-button size="small" @click.native.prevent="active = 'tab-container1'">首页</mt-button>
          <mt-button size="small" @click.native.prevent="active = 'tab-container2'">股份荣誉</mt-button>
          <mt-button size="small" @click.native.prevent="active = 'tab-container3'">单位荣誉</mt-button>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'page-tab-container',
  data () {
    return {
      selected:'1',
      active: 'tab-container1'
    };
  },
  methods:{
    
  }
}
</script>
<style lang="stylus">
  .topLeft{
    width 50%
    height 40px
    line-height 40px
    border 2px solid lightblue
    float: left
    text-align center
  }
  .topRight{
    width 50%
    height 40px
    line-height 40px
    border 2px solid lightblue
    border-left 0
    float: left
    text-align center
  }
  .anyPrize{
    width 100%
    height 60px
    line-height 60px
    float: left
    border 1px solid lightgreen
    text-align center
    margin-top 5px
  }
  .containerBox{
    margin-top 20px
    height 200px
    line-height 200px
    text-align center
    background-color #ccc
  }
</style>