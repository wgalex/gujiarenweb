<template>
    <div>
      <mt-header title="名人堂">
            <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="container">
          <div class="side">
            <router-link to="/honorpRizeDetail">
              <div class="boxLeft">
                <img class="imgs" src="../../assets/timg.jpg" alt="">
                <div class="prizes">玉华奖</div>
              </div>
            </router-link>
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

        <nav class="mui-bar mui-bar-tab">
          <router-link style="border: 1px solid #929292;border-right:0;border-top:0;" class="mui-tab-item" :to="{name:'honorIndex'}">
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
import { getMessage } from './api.js'
export default {
  data () {
    return {
      
    };
  },
  mounted () {
    this.getData()
  },
  methods:{
    headInfo() {
      this.$createDialog({
        type: 'alert',
        confirmBtn: {
          text: '确定',
          active: true
        }
      }, (createElement) => {
        return [
          createElement('div', {
            'class': {
              'my-title': true
            },
            slot: 'title'
          }, [
            createElement('div', {
              'class': {
                'my-title-img': true
              }
            }),
            createElement('p', '图片区域')
          ]),
          createElement('h4', {
            'class': {
              'my-content': true
            },
            slot: 'content'
          }, '标题区域'),
          createElement('textarea', {
            'class': {
              'my-content': true,
            },
            slot: 'content'
          }, '正文区域')
        ]
      }).show()
    },
    getData(){
      alert('111')
      getMessage().then(res => {
        console.log(res);
        
      })
    }
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
  .prizes{
    width 100%;
    height 60px;
    line-height 60px;
    text-align center;
    background-color #ccc;
    color white;
    margin-top 10px
  }
  .side{
    width 100%;
    height 180px
  }
</style>