<template>
  <div>
    <div style="background-image: linear-gradient(#e66465, #9198e5);">
      <div>
        <mt-search v-model="value"></mt-search>
      </div>
      <div style=""></div>
      <div>
        <cube-scroll-nav-bar
          :current="catorySelected"
          :labels="catoryListLabel"
          @change="changeHandler"
          :txts="catoryListLabel"
          style="background-color: rgba(0,0,0,0);"
        />
      </div>
    </div>

    <!-- <div class="side-container" style="width:25%;float:left" >
         <cube-scroll-nav-bar  direction="vertical" :labels="catoryYears"  @change="changeYear" :txts='catoryYears' class="zzz" />
    </div>-->
    <div class="side-container" style="width:15%;float:left;background-color: #ccc">
      <cube-scroll-nav-bar
        direction="vertical"
        :labels="catoryYears"
        :txts="catoryYears"
        @change="changeYear"
      >
        <!-- <i slot-scope="props">{{props.txt}}</i> -->
      </cube-scroll-nav-bar>
    </div>
    <div class="mui-content" style="height:560px;overflow:auto">
      <ul class="mui-table-view mui-grid-view mui-grid-9" style="min-height: 0px;">
        <li
          class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6"
          v-for="item in catoryListChildrenList"
          :key="item.id"
        >
          <a href="#" @click="jumpDetails(item)">
            <div class="mui-card-content">
              <img :src="item.headPath" alt />
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
import { queryCelebrityPerson, selectYears } from "./detailApi.js";

export default {
  data() {
    return {
      // selected: '',
      catoryListLabel: [],
      catoryListChildrenList: [],
      catoryYears: [],
      selectedYear: "",
      catorySelected: "",
      value:""
    };
  },
  created() {
    let catoryList = this.$route.query.catoryList;
    for (var i in catoryList) {
      this.catoryListLabel.push('<span>'+catoryList[i].categoryName+'</span>');
      // console.log(this.catoryListLabel);
      
      // this.catoryListLabel.push();

    }
    this.catorySelected = this.$route.query.selectItem.categoryName;
    selectYears(this.catorySelected).then(res => {
      // this.catoryYears = res.data;
      // debugger
      for(var i in res.data){
        this.catoryYears.push('<span style="padding: 12px 17px;margin: -20px -15px" class="pop" >'+ res.data[i]+'</span>' )
      }
    });
    let queryData = {};
    queryData.categoryName = this.catorySelected;
    queryCelebrityPerson(queryData).then(res => {
      this.catoryListChildrenList = res.data.itemList;
      console.log(this.catoryListChildrenList);
    });
  },
  mounted() {},
  methods: {
    changeHandler(label) {
      this.catoryYears = [];
      this.catoryListChildrenList = [];
      this.catorySelected = label;
      let queryData = {};
      selectYears(label).then(res => {
        this.catoryYears = res.data;
      });
      let queryDatas = {};
      queryDatas.categoryName = label;
      queryCelebrityPerson(queryDatas).then(res => {
        this.catoryListChildrenList = res.data.itemList;
      });
    },
    jumpDetails(item) {
      this.$router.push({
        name: "honorDetail",
        query: {
          // catoryList: this.catoryList,
          selectItem: item,
          catoryListChildrenList: this.catoryListChildrenList
        }
      });
    },
    changeYear(label) {
      this.selectedYear = label;
      this.catoryListChildrenList = [];
      let queryData = {};
      queryData.categoryName = this.catorySelected;
      queryData.years = label;
      queryCelebrityPerson(queryData).then(res => {
        this.catoryListChildrenList = res.data.itemList;
      });
    },
    ree(){
      console.log(123);
      
    }
  }
};
</script>
<style lang="stylus">
.container {
  height: 600px;
  padding: 10px;
}

.boxLeft {
  width: 40%;
  height: 69px;
  float: left;
}

.boxRight {
  width: 40%;
  height: 69px;
  float: right;
}

.prize {
  width: 100%;
  height: 60px;
  margin-top: 10px;
}

.side {
  width: 100%;
  height: 180px;
}

h5 {
  color: black;
  background-color: #fff;
    padding: 12px 17px;
    border-left: 3px solid blue;
}

.side-container {
  height: 500px;
  font-size: 12px;
}

.mint-search {
  height: 1%;
}

.mint-searchbar {
  background-color: rgba(0,0,0,0);
  padding: 26px 12px 5px 20px;
}

.mint-searchbar-inner {
  height: 42px;
  border-radius: 20px;

  .mintui-search {
    font-size: 28px;
  }

  input[type=search] {
    border-radius: 24px;
    background-color: #fff;
    
    
  }
}
.cube-scroll-nav-bar{
  background-color: rgba(0,0,0,0)!important;
}
.cube-scroll-nav-bar-item_active{
  background-color: #fff;
  color :blue!important
}
</style>