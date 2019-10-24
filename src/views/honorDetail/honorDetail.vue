<template>
    <div>
        <mt-header title="名人堂">
            <router-link to="" slot="left">
                <mt-button icon="back" @click.native="$router.back(-1)"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="container">
            <div class="avatar"></div>
            <div class="name">邓超</div>
            <div class="introduce">
                <textarea>事迹介绍：啊啊啊啊啊啊啊啊啊啊啊</textarea>
            </div>
            <div class="prism-player" id="player-con" style="margin-top:50px"></div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    };
  },
  mounted () {
      var player = new Aliplayer({
        "id": "player-con",
        "source": "//player.alicdn.com/video/aliyunmedia.mp4",
        "width": "100%",
        "height": "200px",
        "autoplay": true,
        "isLive": false,
        "rePlay": false,
        "playsinline": true,
        "preload": true,
        "controlBarVisibility": "hover",
        "useH5Prism": true
        }, function (player) {
            console.log("The player is created");
        }
    );
  }
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