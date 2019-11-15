<template>
    <div>
      <!-- <mt-header title="名人堂">
            <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header> -->
        <div style="height:5%">
         <cube-scroll-nav-bar  :current="catoryListLabel[0]" :labels="catoryListLabel" @change="changeHandler"  :txts='catoryListLabel' />
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
        <nav class="mui-bar mui-bar-tab">
          <router-link style="border: 1px solid #929292;border-right:0;border-top:0" class="mui-tab-item" :to="{name:'honorIndex'}">
              <span class="mui-tab-label">首页</span>
          </router-link>
          <router-link style="border: 1px solid #929292;border-right:0;border-top:0" class="mui-tab-item" :to="{name:'honorPrize'}">
              <span class="mui-tab-label">股份荣誉</span>
          </router-link>
          <router-link style="border: 1px solid #929292;border-top:0;;background-color:#f00;color:white;" class="mui-tab-item mui-active" :to="{name:'departmentPrizeDetail'}">
              <span class="mui-tab-label">单位荣誉</span>
          </router-link>
        </nav>
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
    };
  },
  created(){
    let queryData = {}
    queryData.orginCategoryCode = 79400
    queryCategory(queryData).then(res => {
      this.labels = this.chaxun(res.data)
   })
  //   let catoryList = this.$route.query.catoryList
  //   for(var i in catoryList){
  //     this.catoryListLabel.push(catoryList[i].categoryName) 
  //   }
  //   this.catorySelected = this.$route.query.selectItem.categoryName
  //   selectYears(this.catorySelected).then(res => {
  //         this.catoryYears = res.data
  //   })
  //   // this.catorySelected = label
  //   let queryData = {}
  //   queryData.categoryName = this.catorySelected 
  //   queryCelebrityPerson(queryData).then(res => {
  //   this.catoryListChildrenList = res.data.itemList
  //   console.log(this.catoryListChildrenList);
  // }) 
  },
  mounted () {
      
  },
  methods:{
//     categoryCode: "1573537702749"
// categoryName: "双金奖"
// createtime: 1573537703000
// departmentId: "0100"
// departmentName: "事业部"
// headPath: "http://172.16.28.132:9000/category_pic/20191112/3e496ae3bf4f4198b8a5d52a43eb5f28.jpeg"
// id: 108
// orginCategoryCode: "79400"
// orginCategoryName: "单位"
// updatetime: 1573537703000
    //筛选奖项
     chaxun(dataList) { 
       let  arr2 = []
        var cha = '部';//获取想要查询的值
        var zhi = "";//接收每个循环中的arr[i]的值
        for (var i = 0; i < dataList.length; i++) {
            zhi = dataList[i].departmentName;
            if (zhi.indexOf(cha) != -1) {//因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
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
      })
    },
      jumpDetails(item){
        this.$router.push({
        name: 'honorDetail',
        query: {
          // catoryList: this.catoryList,
          selectItem:item
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
    }
  },
  
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
</style>