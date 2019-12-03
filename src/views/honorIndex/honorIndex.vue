<template>
  <div style="height:100%;width:100%;background-color: #f2f2f2">
    <div >
     <img :src="loginimage" />
    </div>
    <div class="container">
      <div class="mui-content" style="">
        <ul
          class="mui-table-view mui-grid-view mui-grid-9" style="padding-bottom: 70px;">
          <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6" style="text-align: center;">
            <div class="mui-card-content" style="width: 120px;background-color: #fff;height: 145px;padding-top: 45px;display: inline-block;box-shadow: 3px 3px 4px #888888;" @click="jumpDetails">
              <span class="iconfont icon-jiangbei1" style="font-size: 44px;color: #c00105;"></span>
              <div style="height: 50px;padding-top: 17px;color: #c00105;font-size: 18px;">部门奖</div>
            </div>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6" style="text-align: center;" v-for="item in departlist" :key="item.id">
            <div class="mui-card-content" style="width: 120px;background-color: #fff;height: 145px;padding-top: 45px;display: inline-block;box-shadow: 3px 3px 4px #888888;" @click="jumpDetail(item)">
              <span :class="item.departicon" style="font-size: 44px;color: #c00105;"></span>
              <div style="height: 50px;padding-top: 17px;color: #c00105;font-size: 18px;">{{item.categoryName}}</div>
            </div>
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
      iconlist:['icon-huabanchuangyi','icon-iconfontxiaoshoufuwujiang','icon-icon16','icon-mianhua','icon-jiangbei','icon-jiangbei1',
      'icon-jiangbei2','icon-jiang','icon-huojiangdengji','icon-chahua','icon-lianhua','icon-hua',
      'icon-hua1','icon-yanhua','icon-shuye','icon-huayecai','icon-huaban','icon-jiangbei3',
      ],
      departlist:[]
    };
  },
  created() {
    let querydata = {};
      querydata.orginCategoryCode = '43090'
      let j =1
      queryCategory(querydata).then(res => {
        let departlist = res.data
        for(let i in departlist){
          if(j>=20){
            j = 1 
            departlist[i].departicon = "iconfont "+ this.iconlist[j] +""
          }else{
            j++
            departlist[i].departicon = "iconfont "+ this.iconlist[j] +""
          }
        }
        this.departlist = departlist
        console.log(departlist);
        
    });
  },
  methods: {
    jumpDetail(item){
      // debugger
      this.$router.push({
        name: 'honorpRizeDetail',
        query: {
          catoryList: this.departlist,
          selectItem:item
        }
      })
      this.$store.state.selectedTab = "我的荣誉"
    },
    jumpDetails(){
      // debugger
      this.$router.push({
        name: 'honorpRizeDetail',
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
</style>