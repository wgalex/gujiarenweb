<template>
    <div style="height:100%;width:100%">
        <!-- 内容部分 -->
        <!-- <mt-tab-container v-model="selected" style="display:flex;height:100%;width:100%"> -->
          <div style="height: 0;overflow: hidden;margin: 0;padding-bottom: 100%;">
        <!--页眉，放置标题-->
        
         <img :src="bannerUrl" style=" display: block;position: absolute;width: 100%;top: 0;bottom: 0; height: 93%;" />
        <!--页脚，放置补充信息或支持的操作-->
        <!-- <div class="mui-card-footer">页脚</div> -->
      </div>
  </div>
</template>
<script>
import { getIndexComppic } from "./indexserver.js";
export default {
  name: 'page-tab-container',
  data () {
    return {
      selected:'1',
      active: 'tab-container1',
      id:1,
      bannerUrl:''
    };
  },
  created() {
    getIndexComppic(this.id).then(res => {
        this.bannerUrl = res.data.url;
    });
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
    background:url('../../assets/微信图片_201911211726494.jpg');
    background-size: cover;
    min-height: 269px;
    background-position: 50% 0px;
    background-repeat: no-repeat no-repeat;

    
}
</style>