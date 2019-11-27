<template>
    <div>
        <div class="container">
          <div class="mui-content"> 
            <ul class="mui-table-view mui-grid-view mui-grid-9" >
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