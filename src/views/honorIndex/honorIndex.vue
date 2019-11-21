<template>
    <div style="height:100%;width:100%">
        <!-- <mt-header title="名人堂">
            <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header> -->
        <!-- 内容部分 -->
        <!-- <mt-tab-container v-model="selected" style="display:flex;height:100%;width:100%"> -->
          <div style="height: 0;overflow: hidden;margin: 0;padding-bottom: 100%;">
        <!--页眉，放置标题-->
        
         <img src="../../assets/封面图.jpg" style=" display: block;position: absolute;width: 100%;top: 0;bottom: 0; height: 100%;" />
        <!--页脚，放置补充信息或支持的操作-->
        <!-- <div class="mui-card-footer">页脚</div> -->
      </div>
        <!-- </mt-tab-container> -->

        <!-- <nav class="mui-bar mui-bar-tab">
          <router-link style="border: 1px solid #929292;border-right:0;border-top:0;background-color:#f00;color:white;" class="mui-tab-item mui-active" :to="{name:'honorIndex'}">
              <span class="mui-tab-label">首页</span>
          </router-link>
          <router-link style="border: 1px solid #929292;border-right:0;border-top:0" class="mui-tab-item" :to="{name:'honorPrize'}">
              <span class="mui-tab-label">股份荣誉</span>
          </router-link>
          <router-link style="border: 1px solid #929292;border-top:0" class="mui-tab-item" :to="{name:'departmentPrizeDetail'}">
              <span class="mui-tab-label">单位荣誉</span>
          </router-link>
        </nav> -->
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
  .imgbox{
    background:url('../../assets/791b064ac218957889f351aae9229ce9.jpg');
    background-size: cover;
    min-height: 269px;
    background-position: 50% 0px;
    background-repeat: no-repeat no-repeat;

    
}
</style>