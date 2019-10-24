<template>
    <div>
        <div class="header"></div>
        <div style="text-align:center;margin-top:10px"><h3>这是标题</h3></div>
        <cube-textarea v-model="value"></cube-textarea>
        <div class="footer">视屏图片展示区域</div>
        <mt-tab-container v-model="selected" is-active>
            <mt-tab-container-item id="1">
                <div class="container">
                  <div class="side">
                    <div class="boxLeft">
                      <img class="imgs" src="../../assets/timg.jpg" alt="">
                      <div class="prizes">玉华奖</div>
                    </div>
                    <div class="boxRight">
                      <img src="../../assets/timg.jpg" alt="">
                      <div class="prizes">双基奖</div>
                    </div>
                  </div>
                  <div class="side">
                    <div class="boxLeft">
                      <img class="imgs" src="../../assets/timg.jpg" alt="">
                      <div class="prizes">年度奖</div>
                    </div>
                    <div class="boxRight">
                      <img src="../../assets/timg.jpg" alt="">
                      <div class="prizes">某某奖</div>
                    </div>
                  </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div>双基奖页面</div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div>年度奖页面</div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
export default {
  data () {
    return {
    };
  }
}
</script>
<style lang="stylus">
    .header{
        width 100%
        height 150px
        background url('./images/ceshi.jpg')
        background-repeat:no-repeat;
        background-size:100% 100%;
        -moz-background-size:100% 100%;
    }
    .footer{
        width 100%
        height 150px
        margin 5px
        border 1px solid #ccc
    }
</style>