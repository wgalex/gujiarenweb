<template>
    <div>
      <mt-header title="内聘职位">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="online">
        <span>部门</span><span class="count">在招岗位数：1</span>
      </div>
      <router-link :to="{name:'personnelDetail'}">
        <div class="contents">
          <div class="zhiwei">招聘专员</div>
          <div style="padding-left:25px"><i>普华永通信息公司</i><i style="float:right">主管</i></div>
          <div style="padding-left:25px"><i>上海 | 本科 | 2年</i><i style="float:right">刷新时间：2019-10-22</i></div>
        </div>
      </router-link>
      <router-link :to="{name:'personnelDetail'}">
        <div class="contents">
          <div class="zhiwei">招聘专员</div>
          <div style="padding-left:25px"><i>普华永通信息公司</i><i style="float:right">主管</i></div>
          <div style="padding-left:25px"><i>上海 | 本科 | 2年</i><i style="float:right">刷新时间：2019-10-22</i></div>
        </div>
      </router-link>
    </div>
</template>
<script>
export default {
  data () {
    return {
      selected: '',
      // options: ['普华永通信息公司']
    }
    }
  }
</script>
<style lang="stylus">
  .contents{
    width 100%
    height 80px
    background-color #fff
    margin-top 10px
    padding 0 10px 0 10px
  }
  i{
    font-style normal
    font-size 12px
  }
  .zhiwei{
    font-size 14px
    margin-left 25px
  }
  .online{
    width 100%
    height 35px
    line-height 35px
    background-color #fff
    margin 0 auto
    margin-top 10px
    padding 0 10px
    font-size 14px
  }
  .count{
    float right
    font-size 12px
  }
</style>