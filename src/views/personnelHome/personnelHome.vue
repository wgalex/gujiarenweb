<template>
    <div>
        <mt-header title="首页">
            <router-link to="/" slot="left">
            <!-- <mt-button icon="back"></mt-button> -->
            </router-link>
        </mt-header>
        <div class="bannerImg"><img src="../../assets/timg.jpg" alt=""></div>
        <nav class="mui-bar mui-bar-tab">
        <router-link style="border-right: 1px solid #929292" class="mui-tab-item" :to="{name:'personnelTop'}">
            <span class="mui-tab-label">内部应聘</span>
        </router-link>
        <router-link class="mui-tab-item" to="/personnelApply">
            <span class="mui-tab-label">内部竞聘</span>
        </router-link>
        </nav>
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
    .bannerImg{
        width 100%
        height 200px
        margin-top 10px
    }
    .mui-bar-tab .mui-tab-item {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
        background-color: #ccc;
        color: #333;
        }
</style>