<template>
  <div style="height:100%;width:100%;background-color: #f2f2f2;padding-bottom: 20%;">
    <div  >
     <img :src="bannerUrl" style="height:200px" />
    </div>
    <div class="container">
      <div class="mui-content" style="">
        <ul
          class="mui-table-view mui-grid-view mui-grid-9" style="padding-bottom: 70px;margin-top: 8px;">
           <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6" style="text-align: center;" v-for="item in departlist" :key="item.id" @click='jumpDetail(item)'>
            <img :src="item.headPath" alt="">
          </li>
           <!-- <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6" style="text-align: center;">
            <img :src="loginimage2" alt="">
          </li>
           <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6" style="text-align: center;">
            <img :src="loginimage3" alt="">
          </li> -->
          <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6" style="text-align: center;">
            <img :src="loginimage4" alt="" @click='jumpDetails'>
          </li> 
          <!-- <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6" style="text-align: center;">
            <div class="mui-card-content" style="width: 120px;background-color: #fff;height: 150px;line-height: 88px;display: inline-block;box-shadow: 3px 3px 4px #888888;">
              <span class="iconfont icon-jiangbei1" style="font-size: 44px;color: #c00105;"></span>
              <div style="height: 50px;line-height: 20px;color: #c00105;font-size: 20px;">玉华奖</div>
            </div>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6" style="text-align: center;">
            <div class="mui-card-content" style="width: 120px;background-color: #fff;height: 150px;line-height: 88px;display: inline-block;box-shadow: 3px 3px 4px #888888;">
              <span class="iconfont icon-shuye" style="font-size: 44px;color: #c00105;"></span>
              <div style="height: 50px;line-height: 20px;color: #c00105;font-size: 20px;">玉华奖</div>
            </div>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6" style="text-align: center;">
            <div class="mui-card-content" style="width: 120px;background-color: #fff;height: 150px;line-height: 88px;display: inline-block;box-shadow: 3px 3px 4px #888888;">
              <span class="iconfont icon-chahua" style="font-size: 44px;color: #c00105;"></span>
              <div style="height: 50px;line-height: 20px;color: #c00105;font-size: 20px;">玉华奖</div>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getIndexComppic } from "./indexserver.js";
import { queryCategory } from "./api.js";
export default {
  name: "page-tab-container",
  data() {
    return {
      selected: "1",
      active: "tab-container1",
      id: 1,
      bannerUrl: "",
      loginimage:require("../../assets/84161AC2B3346B02E1EB9716039098D7.png"),
      loginimage1:require("../../assets/玉华将.png"),
      loginimage2:require("../../assets/双即将.png"),
      loginimage3:require("../../assets/年度将.png"),
      loginimage4:require("../../assets/部门奖.png"),

      iconlist:['icon-huabanchuangyi','icon-iconfontxiaoshoufuwujiang','icon-icon16','icon-mianhua','icon-jiangbei','icon-jiangbei1',
      'icon-jiangbei2','icon-jiang','icon-huojiangdengji','icon-chahua','icon-lianhua','icon-hua',
      'icon-hua1','icon-yanhua','icon-shuye','icon-huayecai','icon-huaban','icon-jiangbei3',
      ],
      departlist:[]
    };
  },
  created() {
    getIndexComppic(this.id).then(res => {
      // debugger
      this.bannerUrl = res.data.url
    })
    let querydata = {};
      querydata.orginCategoryCode = '43090'
      let j =1
      queryCategory(querydata).then(res => {
        // debugger
        let departlist = res.data
        this.departlist = departlist
        console.log(departlist);
    });
  },
  methods: {
    jumpDetail(item){
      this.$router.push({
        name: 'honorpRizeDetail',
        query: {
          catoryList: this.departlist,
          selectItem:item
        }
      })
      this.$store.state.selectedTab = "单位荣誉"
    },
    jumpDetails(){
      // debugger
      this.$router.push({
        name: 'departmentPrizeDetail',
      })
    },
  }
};
</script>
<style lang="stylus">
.topLeft {
  width: 50%;
  height: 40px;
  line-height: 40px;
  border: 2px solid lightblue;
  float: left;
  text-align: center;
}

.topRight {
  width: 50%;
  height: 40px;
  line-height: 40px;
  border: 2px solid lightblue;
  border-left: 0;
  float: left;
  text-align: center;
}

.anyPrize {
  width: 100%;
  height: 60px;
  line-height: 60px;
  float: left;
  border: 1px solid lightgreen;
  text-align: center;
  margin-top: 5px;
}

.containerBox {
  margin-top: 20px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  background-color: #ccc;
}

.imgbox {
  background: url('../../assets/微信图片_201911211726494.jpg');
  background-size: cover;
  min-height: 269px;
  background-position: 50% 0px;
  background-repeat: no-repeat no-repeat;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border-right:0
  border-bottom:0
}
.mui-table-view.mui-grid-view .mui-table-view-cell {
  border-bottom:0
}
</style>