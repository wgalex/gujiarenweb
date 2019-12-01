<template>
    <div style="height:100%">
      <div
    class="showdepart"
      style=""
    >
      <mt-search placeholder="搜索" cancel-text="确认" v-model="seachvalue" @blur.native.capture="search"></mt-search>
    </div>
        <div class="container">
          <div class="mui-content"> 
            <ul class="mui-table-view mui-grid-view mui-grid-9" style="background-color: #fff;padding-bottom: 20%;">
                 <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6" style="float:left" v-for="item in catoryList"  :key="item.id">
                    <a href="#" @click="jumpDetail(item)">  
                         <div class="mui-card-content" style="width: 150px;height: 150px;">
                           <img :src="item.headPath" alt="" style="width: 100%;height: 100%;">
                         </div>
                         <div class="mui-media-body" style="text-align: center">{{item.categoryName}}</div>
                    </a>
                 </li>  
            </ul>
        </div>
      </div>
    </div>
</template>
<script>
import { queryCategory } from './api.js'
export default {
  data () {
    return {
      catoryList:[],
      seachvalue:''
    };
  },
  mounted () {
    this.getData()
  },
  methods:{
    getData(){
      let querydata = {}
      querydata.orginCategoryCode = '43090'
      queryCategory(querydata).then(res => {
        this.catoryList = this.chaxun(res.data)
      })
    },
    //筛选奖项
     chaxun(dataList) { 
       let  arr2 = []
        // var cha = '奖';//获取想要查询的值
        var zhi = "";//接收每个循环中的arr[i]的值
        for (var i = 0; i < dataList.length; i++) {
            zhi = dataList[i].categoryName;
            // if (zhi.indexOf(cha) != -1) {//因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
                arr2.push(dataList[i]);//将值放入第二个数组
            // }
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
    },
    search(){
      debugger
      this.$router.push({
        name: "departmentPrizeDetail",
        query: {
          seachvalue: this.seachvalue
        }
      });
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
  .showdepart{
    width 100%;
    height:16%;
    background:url('../../assets/组17.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
}
.mint-search {
  height: 60px;
  padding-top: 6% !important;
}

.mint-searchbar {
  background-color: rgba(0, 0, 0, 0);
  padding: 0px 40px 5px 40px;
}

.mint-searchbar-inner {
  position: relative;
  height: 26px
  border-radius: 20px;

  .mintui-search {
   position: absolute;
    top: 4px;
    right: 8px;
    font-size: 14px;
  }

  input[type=search] {
    border-radius: 24px;
    background-color: #fff;
    height: 26px
    font-size: 12px;
  }
}
</style>