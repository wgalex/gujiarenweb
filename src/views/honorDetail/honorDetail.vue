<template>
    <div>
        <!-- <mt-header title="名人堂">
            <router-link to="" slot="left">
                <mt-button icon="back" @click.native="$router.back(-1)"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header> -->
        <div class="container">
        <div class="mui-card">
        <!--页眉，放置标题-->
        <div class="mui-card-header" style="justify-content: center;">{{choooseOne.personName}}</div>
        <!--内容区-->
        <div class="mui-card-content">
          <img :src="choooseOne.headPath" alt="">
        </div>
        <!--页脚，放置补充信息或支持的操作-->
        <div class="mui-card-footer">事迹介绍:{{choooseOne.description}}</div>
        <!-- <input type="button" id="Copy" value="点击复制代码" /> -->
        <div v-if="choooseOne.photoPath">
             <div class="mui-card-content">
                <img :src="choooseOne.photoPath" alt="">
            </div>
        </div>
        <div >
             <div class="mui-card-content" v-if="choooseOne.filePath">
                <img src="../../assets/Snipaste_2019-11-11_16-23-05.png" alt="" @click="jumpVideo">
            </div>
            
        </div>
        </div>
            <!-- <div class="prism-player" id="player-con" style="margin-top:50px"></div> -->
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
        choooseOne:{},
    };
  },
  created(){
      let selectItem = this.$route.query.selectItem
      this.choooseOne = selectItem
  },
  mounted () {
    //   var player = new Aliplayer({
    //     "id": "player-con",
    //     "source": "//player.alicdn.com/video/aliyunmedia.mp4",
    //     "width": "100%",
    //     "height": "200px",
    //     "autoplay": true,
    //     "isLive": false,
    //     "rePlay": false,
    //     "playsinline": true,
    //     "preload": true,
    //     "controlBarVisibility": "hover",
    //     "useH5Prism": true
    //     }, function (player) {
    //         console.log("The player is created");
    //     }
    // );
    // 
        
        

  },
  methods: {
      jumpVideo(){
        //   debugger
        //   window.open(this.choooseOne.filePath)
        //   self.location.href=this.choooseOne.filePath
            // top.location.href = this.choooseOne.filePath
            // window.location.href = this.choooseOne.filePath
            
        // this.$createDialog({
        //     type: 'alert',
        //     title: '请复制链接地址,到浏览器打开',
        //     content:  '<div class="mui-card-content" style="word-break:break-all">'+ this.choooseOne.filePath +'</div>',
        //     icon: 'cubeic-alert'
        // }).show()
      },
  },
}
</script>
<style lang="stylus">
@import 'https://g.alicdn.com/de/prismplayer/2.7.2/skins/default/aliplayer-min.css'
    .container{
        padding 8px
    }
    .avatar{
        width 100%
        height 100px
        background url('gujia.jpg')
        background-size contain
    }
    .name{
        width 100%
        margin-top 10px
        text-align center
    }
    .introduce{
        margin-top 20px
    }
    textarea{
        font-size 14px
    }
</style>