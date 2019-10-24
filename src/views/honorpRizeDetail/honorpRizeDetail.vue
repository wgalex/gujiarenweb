<template>
    <div>
      <mt-header title="名人堂">
            <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">玉华奖</mt-tab-item>
            <mt-tab-item id="2">双基奖</mt-tab-item>
            <mt-tab-item id="3">年度奖</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" is-active>
            <mt-tab-container-item id="1">
                <div class="container">
                  <div class="side">
                    <router-link to="/honorDetail">
                        <div class="boxLeft">
                            <img class="imgs" src="../../assets/timg.jpg" alt="">
                            <div class="prize">
                                <h5>奖项说明</h5>
                                <p>这是一个神奇的奖项哈哈，是对工作人员的表彰</p>
                            </div>
                        </div>
                    </router-link>
                    <div class="boxRight">
                      <img src="../../assets/timg.jpg" alt="">
                      <div class="prize">
                          <h5>奖项说明</h5>
                          <p>这是一个神奇的奖项哈哈，是对工作人员的表彰</p>
                      </div>
                    </div>
                  </div>
                  <div class="side">
                    <div class="boxLeft">
                      <img class="imgs" src="../../assets/timg.jpg" alt="">
                      <div class="prize">
                          <h5>奖项说明</h5>
                          <p>这是一个神奇的奖项哈哈，是对工作人员的表彰</p>
                      </div>
                    </div>
                    <div class="boxRight">
                      <img src="../../assets/timg.jpg" alt="">
                      <div class="prize">
                          <h5>奖项说明</h5>
                          <p>这是一个神奇的奖项哈哈，是对工作人员的表彰</p>
                      </div>
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

        <nav class="mui-bar mui-bar-tab">
          <router-link style="border: 1px solid #929292;border-right:0;border-top:0;" class="mui-tab-item" to="/honorIndex">
              <span class="mui-tab-label">首页</span>
          </router-link>
          <router-link style="border: 1px solid #929292;border-right:0;border-top:0;background-color:#f00;color:white" class="mui-tab-item" to="/honorPrize">
              <span class="mui-tab-label">股份荣誉</span>
          </router-link>
          <router-link style="border: 1px solid #929292;border-top:0" class="mui-tab-item" to="/">
              <span class="mui-tab-label">单位荣誉</span>
          </router-link>
        </nav>
        <!-- <router-link :to="{name:'honorPc'}">
          <cube-button>跳转PC页面</cube-button>
        </router-link> -->
    </div>
</template>
<script>
export default {
  data () {
    return {
      selected: '1'
    };
  },
  mounted () {
    
  },
  methods:{
  }
}
</script>
<style lang="stylus">
  .container{
    height 600px;
    padding 10px
  }
  .boxLeft{
    width 40%
    height 69px
    float left
  }
  .boxRight{
    width 40%
    height 69px
    float right
  }
  .prize{
    width 100%;
    height 60px;
    margin-top 10px
  }
  .side{
    width 100%;
    height 180px
  }
  h5{
      color black
  }
</style>