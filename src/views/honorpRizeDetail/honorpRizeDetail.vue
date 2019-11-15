<template>
    <div>
      <!-- <mt-header title="名人堂">
            <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header> -->
        <div >
         <cube-scroll-nav-bar :current="catorySelected" :labels="catoryListLabel" @change="changeHandler"  :txts='catoryListLabel' />
        </div>
        <div style="marging-top:20px" >
         <cube-scroll-nav-bar  :labels="catoryYears"  @change="changeYear" :txts='catoryYears' />
        </div>
      <div class="mui-content"> 
            <ul class="mui-table-view mui-grid-view mui-grid-9" >
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

export default {
  data () {
    return {
      // selected: '',
      catoryListLabel:[],
      catoryListChildrenList:[],
      catoryYears:[],
      selectedYear:'',
      catorySelected:'',

    };
  },
  created(){
    let catoryList = this.$route.query.catoryList
    for(var i in catoryList){
      this.catoryListLabel.push(catoryList[i].categoryName) 
    }
    this.catorySelected = this.$route.query.selectItem.categoryName
    selectYears(this.catorySelected).then(res => {
          this.catoryYears = res.data
    })
    // this.catorySelected = label
    let queryData = {}
    queryData.categoryName = this.catorySelected 
    queryCelebrityPerson(queryData).then(res => {
    this.catoryListChildrenList = res.data.itemList
    console.log(this.catoryListChildrenList);
  }) 
  },
  mounted () {
      
  },
  methods:{
    changeHandler(label) {
      this.catoryYears = []
      this.catoryListChildrenList = []
      this.catorySelected = label
      let queryData = {}
      selectYears(label).then(res => {
          this.catoryYears = res.data
    })
    let queryDatas = {}
         queryDatas.categoryName = label
        queryCelebrityPerson(queryDatas).then(res => {
        this.catoryListChildrenList = res.data.itemList
      })
      // this.catoryYears = ['1']
    //   if(this.selectedYear == ''){
    //       queryData.categoryName = label
    //       queryCelebrityPerson(queryData).then(res => {
    //       this.catoryListChildrenList = res.data.itemList
    //     })
    //      selectYears(this.selected).then(res => {
    //     for(var i in res.data){
    //       this.catoryYears.push(res.data[i].toString())
    //     }
    // })
    //   }else{
    //      queryData.categoryName = label
    //      queryData.years = this.selectedYear
    //       queryCelebrityPerson(queryData).then(res => {
    //       this.catoryListChildrenList = res.data.itemList
    //     })
    //     selectYears(this.selected).then(res => {
    //     for(var i in res.data){
    //       this.catoryYears.push(res.data[i].toString())
    //     }
    // })
    //   }
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
        this.selectedYear = label
        this.catoryListChildrenList = []
         let queryData = {}
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
    width 100%;
    height 180px
  }
  h5{
      color black
  }
</style>