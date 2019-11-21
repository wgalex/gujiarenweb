<template>
    <div>
        <div>
          <mt-search v-model="value" ></mt-search>
        </div>
        <div style="height:5%">
         <cube-scroll-nav-bar  :current="currentCatoryListLabel" :labels="catoryListLabel" @change="changeHandler"  :txts='catoryListLabel' class="zzz"/>
        </div>
        <div  >
         <cube-scroll-nav-bar  :current="catoryYears[0]" :labels="catoryYears"  @change="changeYear" :txts='catoryYears' />
        </div>
        <div class="side-container" style="width:25%;float:left">
          <cube-scroll-nav-bar
            direction="vertical"
            :current="labels[0]"
            :labels="labels"
            :txts="labels"
            @change="changeHandlert">
            <i slot-scope="props">{{props.txt}}</i>
          </cube-scroll-nav-bar>
        </div>
      <div class="mui-content" style="height:560px;overflow:auto "> 
            <ul class="mui-table-view mui-grid-view mui-grid-9" style="min-height: 0px;">
                 <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6" style="float:left" v-for="item in catoryListChildrenList"  :key="item.id">
                    <a href="#" @click="jumpDetails(item)">  
                         <div class="mui-card-content">
                           <img :src="item.headPath" alt="">
                         </div>
                         <div class="mui-media-body">{{item.personName}}</div>
                         <div class="mui-media-body">{{item.description}}</div>
                    </a>
                 </li>  
            </ul>
        </div>  
    </div>
</template>

<script>
import { queryCelebrityPerson,selectYears } from './detailApi.js'
import { queryCategory } from './api.js'

// import textdata from './data'
// import persondata from './persondata'

export default {
  data () {
    return {
      // selected: '',
      catoryListLabel:[],
      catoryListChildrenList:[],
      catoryYears:[],
      selectedYear:'',
      catorySelected:'',
      current:'',
      labels:[],
      txts:[],
      depatmentList: [],
      selectedDepartment:"",
      seachValue:'',
      currentCatoryListLabel:"",
      clearables: {
        visible: true,
        blurHidden: true
      },
      value:"",
    };
  },
  created(){
    let queryData = {}
    queryData.orginCategoryCode = 79400
    queryCategory(queryData).then(res => {
      this.labels = this.chaxun(res.data)
   })
  },
  mounted () {
  },
  methods:{
    //筛选奖项
     chaxun(dataList) { 
       let  arr2 = []
        var cha = '部';//获取想要查询的值
        var cha1 = '中心'
        var cha2 = '组'
        var zhi = "";//接收每个循环中的arr[i]的值
        for (var i = 0; i < dataList.length; i++) {
            zhi = dataList[i].departmentName;
            if (zhi.indexOf(cha) != -1 || zhi.indexOf(cha1) != -1 || zhi.indexOf(cha2) != -1) {//因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
                arr2.push(dataList[i].departmentName);//将值放入第二个数组
                this.depatmentList.push(dataList[i])
            }
        }
        // debugger
        return arr2
        // alert(arr2);//弹出匹配的值
        // arr2 = [];//清空数组，否则第二次查询时会因为有是全局变量，而导致先前查询的值会和这次一起弹出
    },
    chaxunjiang(dataList) { 
       let  arr2 = []
        var cha = '奖';//获取想要查询的值
        var zhi = "";//接收每个循环中的arr[i]的值
        for (var i = 0; i < dataList.length; i++) {
            zhi = dataList[i].categoryName;
            if (zhi.indexOf(cha) != -1) {//因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
                arr2.push(dataList[i].categoryName);//将值放入第二个数组
                // this.depatmentList.push(dataList[i])
            }
        }
        // debugger
        return arr2
        // alert(arr2);//弹出匹配的值
        // arr2 = [];//清空数组，否则第二次查询时会因为有是全局变量，而导致先前查询的值会和这次一起弹出
    },
    changeHandler(label) {
      this.catorySelected = label
      selectYears(label).then(res => {
          this.catoryYears = res.data
    })
    },
    //纵向部门选择
    changeHandlert(label){
      this.selectedDepartment = label
        let queryData = {}
        queryData.departmentName = label
        queryCategory(queryData).then(res => {
          // this.labels = this.chaxun(res.data)
          this.catoryListLabel  = this.chaxunjiang(res.data)
          this.currentCatoryListLabel = this.catoryListLabel[0]
      })
    },
      jumpDetails(item){
        this.$router.push({
        name: 'honorDetail',
        query: {
          // catoryList: this.catoryList,
          selectItem:item,
          catoryListChildrenList:this.catoryListChildrenList
        }
      })
    },
      changeYear(label){
         let queryData = {}
         queryData.departmentName = this.selectedDepartment
         queryData.categoryName = this.catorySelected
         queryData.years = label 
        queryCelebrityPerson(queryData).then(res => {
        this.catoryListChildrenList = res.data.itemList
      })
    },
        searchList(keyWord, list) {
        var len = list.length;
        var arr = [];
                for(var i=0;i<len;i++){
                    //如果字符串中不包含目标字符会返回-1
                    if(list[i].indexOf(keyWord)>=0){
                        arr.push(list[i]);
                    }
                }
                return arr;
          },
    test(e){
      let searchList= this.searchList(e,this.catoryListLabel);
      if(searchList != ''){
        this.currentCatoryListLabel = searchList[0]
        searchList = []
      }
    },
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
  .prize{
    width 100%;
    height 60px;
    margin-top 10px
  }
  .side{
    width 100%;departmentPrize
    height 180px
  }
  h5{
      color black
  }
  .side-container{
     height: 500px
     margin-top: 20px
     font-size: 12px;
  }
 .cube-scroll-nav-bar-items {
    font-size: 12px !important;
}
.mint-search{
  height:1%
}
.mint-searchbar {
    background-color: yellow;
    padding: 26px 12px 5px 20px;
}
.mint-searchbar-inner{
  height: 42px;
  border-radius: 20px;
  .mintui-search{
    font-size: 28px;
    
  }
  input[type=search] {
      border-radius: 24px;
      background-color: #fff;
    }
}
.zzz{
  background-color: #ff0 !important;
    height: 38px;
    line-height: 0px;
}
</style>