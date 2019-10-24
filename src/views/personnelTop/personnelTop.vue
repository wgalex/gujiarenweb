<template>
    <div>
        <mt-header title="发现">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
        <div class="swipe">
            <mt-swipe :auto="4000">
                <mt-swipe-item><img src="/src/assets/timg.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item style="background-color:skyblue">2</mt-swipe-item>
                <mt-swipe-item style="background-color:#ccc">3</mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="menuOptions">
            <span><i class="cubeic-credit-card"></i>我的简历</span>
            <router-link to="/personnelApply"><span class="mls"><i class="cubeic-message"></i>申请记录</span></router-link>
            <span class="mls"><i class="cubeic-alert"></i>规则</span>
        </div>
        <div class="search">
            <div class="fl"><input type="text"></div><div class="fr"><i class="cubeic-search"></i></div>
        </div>
        <div class="footer">
            <router-link to="/personnelIndex">
                <div class="aprtment">
                    <span>部门1</span><span class="postCount">岗位数：1</span>
                </div>
            </router-link>
        </div>
        <div class="footer">
            <router-link to="/personnelIndex">
                <div class="aprtment">
                    <span>部门1</span><span class="postCount">岗位数：1</span>
                </div>
            </router-link>
        </div>
        <div class="footer">
            <router-link to="/personnelIndex">
                <div class="aprtment">
                    <span>部门1</span><span class="postCount">岗位数：1</span>
                </div>
            </router-link>
        </div>
        <div>

        </div>
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
    img{
        
    }
    .swipe{
        height 150px
    }
    .menuOptions{
        height 60px
        line-height 60px
        padding-left 10px
        text-align left
        font-size 16px
        background-color #fff
    }
    .search{
        margin-top 10px
        height 30px
        line-height 30px
        padding 0 20px
    }
    .fl{
        float left
        height 30px
        width 80%
    }
    .fr{
        float right
        width 20%
        height 30px
        border 1px solid #ccc
        border-radius 5px
        text-align center
    }
    .footer{
        margin-top 10px
        padding 0 10px
        background-color #fff
    }
    .aprtment{
        width 100%
        height 40px
        line-height 40px
        padding-left 10px
        margin-top 10px
        font-size 14px
        color black
    }
    .mls{
        margin-left  10px
    }
    .postCount{
        float right
    }
</style>