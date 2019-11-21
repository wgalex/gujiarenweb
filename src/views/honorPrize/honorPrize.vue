<template>
    <div>
      <!-- <mt-header title="名人堂">
            <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header> -->
        <div class="container">
          <div class="mui-content"> 
            <ul class="mui-table-view mui-grid-view mui-grid-9" >
                 <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6" style="float:left" v-for="item in catoryList"  :key="item.id">
                    <a href="#" @click="jumpDetail(item)">  
                         <div class="mui-card-content">
                           <img :src="item.headPath" alt="">
                         </div>
                         <div class="mui-media-body">{{item.categoryName}}</div>
                    </a>
                 </li>  
            </ul>
        </div>
          <!-- <div class="side">
            <div class="boxLeft">
              <img class="imgs" src="../../assets/timg.jpg" alt="">
              <div class="prizes">年度奖</div>
            </div>
            <div class="boxRight">
              <img src="../../assets/timg.jpg" alt="">
              <div class="prizes">某某奖</div>
            </div>
          </div> -->
        </div>

        <!-- <nav class="mui-bar mui-bar-tab">
          <router-link style="border: 1px solid #929292;border-right:0;border-top:0;" class="mui-tab-item" :to="{name:'honorIndex'}">
              <span class="mui-tab-label">首页</span>
          </router-link>
          <router-link style="border: 1px solid #929292;border-right:0;border-top:0;background-color:#f00;color:white" class="mui-tab-item mui-active" :to="{name:'honorPrize'}">
              <span class="mui-tab-label">股份荣誉</span>
          </router-link>
          <router-link style="border: 1px solid #929292;border-top:0" class="mui-tab-item" :to="{name:'departmentPrizeDetail'}">
              <span class="mui-tab-label">单位荣誉</span>
          </router-link>
        </nav> -->
        <!-- <router-link :to="{name:'honorPc'}">
          <cube-button>跳转PC页面</cube-button>
        </router-link> -->
    </div>
</template>
<script>
import { queryCategory } from './api.js'
export default {
  data () {
    return {
      catoryList:[],
    };
  },
  mounted () {
    this.getData()
  },
  methods:{
    getData(){
      let querydata = {}
      querydata.departmentId = '01'
      queryCategory(querydata).then(res => {
        console.log(this.chaxun(res.data));
        this.catoryList = this.chaxun(res.data)
      })
    },
    //筛选奖项
     chaxun(dataList) { 
       let  arr2 = []
        var cha = '奖';//获取想要查询的值
        var zhi = "";//接收每个循环中的arr[i]的值
        for (var i = 0; i < dataList.length; i++) {
            zhi = dataList[i].categoryName;
            if (zhi.indexOf(cha) != -1) {//因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
                arr2.push(dataList[i]);//将值放入第二个数组
            }
        }
        // debugger
        return arr2
        // alert(arr2);//弹出匹配的值
        // arr2 = [];//清空数组，否则第二次查询时会因为有是全局变量，而导致先前查询的值会和这次一起弹出
    },
    jumpDetail(item){
      // debugger
      this.$router.push({
        name: 'honorpRizeDetail',
        query: {
          catoryList: this.catoryList,
          selectItem:item
        }
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