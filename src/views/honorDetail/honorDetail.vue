<template>
    <div style="background-image: linear-gradient(to bottom right , #c00105, #fff)">
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
        <div class="mui-card-content" style="width: 50%;margin-left: 25%;">
          <img :src="choooseOne.headPath" alt="">
        </div>
            <div>
                <span class="contentBody" @click="addline" :style='mypagestyle'>事迹介绍:{{choooseOne.description}}</span>
            </div>
        <!-- <input type="button" id="Copy" value="点击复制代码" /> -->
        <div v-if="choooseOne.photoPath">
             <div class="mui-card-content">
                <img :src="choooseOne.photoPath" alt="">
            </div>
        </div>
        <div class="mui-card-content">
            <iframe height=198 width=100% :src= choooseOne.filePath frameborder=0 allowfullscreen></iframe>
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
        playPath:'',
        // mypagestyle:{color: 'yellow',background:"blue"},
        mypagestyle:''
    };
  },
  created(){
      let selectItem = this.$route.query.selectItem
      this.choooseOne = selectItem
      this.playPath = this.choooseOne.filePath
  },
  mounted () {
  },
  methods: {
      addline(){
        //   mypagestyle = 
        this.mypagestyle = '-webkit-line-clamp:50'
      }
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
    .contentBody{
        overflow: hidden;  
        text-overflow: ellipsis;  
        display: -webkit-box;  
        -webkit-line-clamp: 12;  
        -webkit-box-orient: vertical;  
    }
</style>