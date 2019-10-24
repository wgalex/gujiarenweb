<template>
  <div class="indexxmain">
    <div class="whitebox"></div>
    <div class="zhitongNews">
      <div class="mui-card">
        <div
        class="mui-card-header " style="width:100% ;">
        <img :src="url" alt="" style="width:100%;height:200px">
        </div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p style="color: #333;">{{this.remark}}</p>
          </div>
        </div>
      </div>
    </div>
    <nav class="mui-bar mui-bar-tab">
      <router-link style="border-right: 1px solid #929292" class="mui-tab-item" :to="{name:'complaintsNotice'}">
        <span class="mui-tab-label">投诉渠道</span>
      </router-link>
      <router-link class="mui-tab-item" to="/complaintCase">
        <span class="mui-tab-label">稽查案例</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
import { getBanner } from "./api";
export default {
  data() {
    return {
      remark: "",
      //  datalist:[],
      url: ""
    };
  },
  created() {
    this.getBannerList();
  },
  methods: {
    //获取banner
    getBannerList() {
      getBanner().then(res => {
        this.remark = res.data.remark;
        // console.log(res);
        this.url = res.data.url
      });
    }
  }
};
</script>
<style lang="stylus" >

.indexxmain {
  height: 100%;

  .whitebox {
    height: 20%;
    background-color: #eee;
  }

  .zhitongNews {
    height: 80%;
  }
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