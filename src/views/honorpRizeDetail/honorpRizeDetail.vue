<template>
  <div style="height:100%">
    <div style="background-image: linear-gradient(#0e82fd, #3edbfa);height:20%">
      <div style="height:68%" >
        <mt-search v-model="value1" @input="seachvalue"></mt-search>
      </div>
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
    <div></div>
    <div class="side-container" style="width:18%;background-color: #f1f4f9;height: 77%;">
      <cube-scroll-nav-bar
        direction="vertical"
        :labels="catoryYears"
        :txts="catoryYears"
        @change="changeYear"
      ></cube-scroll-nav-bar>
    </div>
    <div class="mui-content" style="overflow:auto; height:77%">
      <ul class="mui-table-view mui-grid-view mui-grid-8" style="min-height: 0px;">
        <li
          class="mui-table-view-cell mui-media mui-col-xs-12"
          v-for="item in catoryListChildrenList"
          :key="item.id"
          @click="detailitem(item)"
        >
          <a href="#">
            <div class="mui-card-content">
              <span
                style="float:left;width:60px;height:60px;border-radius: 12px;"
                :style="{ 'background-image': 'url(' + item.headPath + ')','background-repeat':'no-repeat','background-size':'cover' }"
              ></span>
              <div style="float:left;margin-left: 5%;">
                <span class="mui-media-body">{{item.tittle}}</span>
                <span class="mui-media-body">{{item.personName}}</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
      <div v-if="detailFlag">
      <div class="container">
        <div >
          <div class="mui-card-content" style="width: 100%;height: 170px;margin-bottom: 20px;">
            <img src="../../assets/791b064ac218957889f351aae9229ce9.jpg" style="width:100%;height:100%;border-radius: 18px;
    padding: 6px;" alt />
          </div>
          <div style="text-align: center;">
            <div style="font-size:24px">{{detailItem.tittle}}</div>
            <div style="text-align: right;">--{{detailItem.personName}}</div>
          </div>
          <!--内容区-->
          <div>
            <span class="contentBody" @click="addline" :style="mypagestyle">
              <p>事迹介绍:</p>
              <div>{{detailItem.description}}</div>
              
            </span>
          </div>
          <!-- <input type="button" id="Copy" value="点击复制代码" /> -->
          <div >
            <div class="mui-card-content">
              <img src="../../assets/3C2D0751-5758-4091-8E2D-7EB6F3F47408.png"  alt />
            </div>
          </div>
          <div class="mui-card-content" v-if="detailItem.filePath" >
            <iframe
              height="15%"
              width="100%"
              :src="detailItem.filePath"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <!-- <div class="prism-player" id="player-con" style="margin-top:50px"></div> -->
      </div>
        <i class="cubeic-back rrr" @click="backtest"></i>
    </div>
    </div>
  </div>
</template>

<script>
import { queryCelebrityPerson, selectYears } from "./detailApi.js";
import textdata from "./testData";
export default {
  data() {
    return {
      // selected: '',
      catoryListLabel: [],
      middlecatoryListLabel: [],
      catoryListChildrenList: [],
      catoryYears: [],
      middlecatoryYears: [],
      selectedYear: "",
      catorySelected: "",
      value1: "",
      textdata: textdata,
      catoryList: [],
      catorySelectf: "",
      detailFlag:false,
      detailItem: {},
      backcatoryListChildrenList:[],
      mypagestyle:""
    };
  },
  created() {
    this.catoryList = this.$route.query.catoryList;
    for (var i in this.catoryList) {
      this.catoryListLabel.push(
        '<span style="display: inline-block;padding: 5px;margin: 0 15px;">' +
          this.catoryList[i].categoryName +
          "</span>"
      );
    }
    this.catorySelectf = this.$route.query.selectItem.categoryName;
    let charesoule = this.chaxun3(this.catoryListLabel, this.catorySelectf);
    for (let i in charesoule) {
      this.catorySelected = charesoule[i];
    }
    this.changeHandler(this.catorySelected)
    // selectYears(this.catorySelectf).then(res => {
    //   this.middlecatoryYears = res.data;
    //   if (res.data == "") {
    //     return;
    //   }
    //   for (var i in res.data) {
    //     this.catoryYears.push(
    //       '<span style="display: inline-block;padding: 10px 26px 10px 10px;position: relative;" >' +
    //         res.data[i] +
    //         '<div class="bbb"></div></span>'
    //     );
    //   }
    // });
    let queryData = {};
    queryData.categoryName = this.catorySelectf;
    queryCelebrityPerson(queryData).then(res => {
      this.middlecatoryListLabel = res.data.itemList;
      this.catoryListChildrenList = res.data.itemList;
      // console.log(this.catoryListChildrenList);
    });
  },
  mounted() {},
  methods: {
    seachvalue(){
      // debugger
      for(let j in this.catoryListLabel){
        if (this.catoryListLabel[j].indexOf(this.value1) != -1) {
          this.catorySelected = this.catoryListLabel[j]
          break
        }
      }
    },
    changeHandler(label) {
      // debugger
      this.detailFlag = false
      setTimeout(() => {
        // debugger
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        selectTop.classList.remove("cube-scroll-nav-bar-item_active");
        selectTop.classList.add("ddd");
      }, 5);
      this.catoryYears = [];
      this.catoryListChildrenList = [];
      // this.catorySelected = label;
      let queryData = {};
      let curretLabel = this.chaxun(this.catoryList, label);
      let current = "";
      for (let i in curretLabel) {
        current = curretLabel[0].categoryName;
        this.catorySelectf = current;
      }
      selectYears(current).then(res => {
        this.middlecatoryYears = [];
        this.middlecatoryYears = res.data;
        // this.catoryYears = res.data;
        if (res.data == "") {
          return;
        }
        for (var i in res.data) {
          this.catoryYears.push(
            '<span style="display: inline-block;padding: 10px 26px 10px 10px;position: relative;">' +
              res.data[i] +
              '<div class="fff"></div></span>'
          );
        }
      });
      let queryDatas = {};
      queryDatas.categoryName = current;
      queryCelebrityPerson(queryDatas).then(res => {
        this.catoryListChildrenList = res.data.itemList;
      });
    },
    // jumpDetails(item) {
    //   this.$router.push({
    //     name: "honorDetail",
    //     query: {
    //       // catoryList: this.catoryList,
    //       selectItem: item,
    //       catoryListChildrenList: this.catoryListChildrenList
    //     }
    //   });
    // },
    changeYear(label) {
      this.detailFlag = false
      setTimeout(() => {
        // debugger
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        selectTop.classList.remove("cube-scroll-nav-bar-item_active");
        // let oldSelect = document.querySelector(".zzz");
        // oldSelect.classList.remove("zzz");
        selectTop.classList.add("mags");
      }, 5);
      this.selectedYear = label;
      this.catoryListChildrenList = [];
      let queryData = {};
      queryData.categoryName = this.catorySelectf;
      let currentYear = this.chaxun2(this.middlecatoryYears, label);
      for (let i in currentYear) {
        queryData.years = currentYear[i];
      }
      queryCelebrityPerson(queryData).then(res => {
        this.catoryListChildrenList = res.data.itemList;
      });
    },
    //筛选奖项
    chaxun(dataList, label) {
      let arr2 = [];
      var cha = label; //获取想要查询的值
      var zhi = ""; //接收每个循环中的arr[i]的值
      for (var i = 0; i < dataList.length; i++) {
        zhi = dataList[i].categoryName;
        if (cha.indexOf(zhi) != -1) {
          //因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
          arr2.push(dataList[i]); //将值放入第二个数组
          // this.depatmentList.push(dataList[i])
        }
      }
      // debugger
      return arr2;
      // alert(arr2);//弹出匹配的值
      // arr2 = [];//清空数组，否则第二次查询时会因为有是全局变量，而导致先前查询的值会和这次一起弹出
    },
    chaxun2(dataList, label) {
      let arr2 = [];
      var cha = label; //获取想要查询的值
      var zhi = ""; //接收每个循环中的arr[i]的值
      for (var i = 0; i < dataList.length; i++) {
        zhi = dataList[i];
        if (cha.indexOf(zhi) != -1) {
          //因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
          arr2.push(dataList[i]); //将值放入第二个数组
          // this.depatmentList.push(dataList[i])
        }
      }
      // debugger
      return arr2;
      // alert(arr2);//弹出匹配的值
      // arr2 = [];//清空数组，否则第二次查询时会因为有是全局变量，而导致先前查询的值会和这次一起弹出
    },
    chaxun3(dataList, label) {
      let arr2 = [];
      var cha = label; //获取想要查询的值
      var zhi = ""; //接收每个循环中的arr[i]的值
      for (var i = 0; i < dataList.length; i++) {
        zhi = dataList[i];
        if (zhi.indexOf(cha) != -1) {
          //因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
          arr2.push(dataList[i]); //将值放入第二个数组
          // this.depatmentList.push(dataList[i])
        }
      }
      // debugger
      return arr2;
      // alert(arr2);//弹出匹配的值
      // arr2 = [];//清空数组，否则第二次查询时会因为有是全局变量，而导致先前查询的值会和这次一起弹出
    },
    detailitem(item) {
      this.detailFlag = true
      this.backcatoryListChildrenList = []
      this.backcatoryListChildrenList = this.catoryListChildrenList
      this.catoryListChildrenList = [];
      this.detailItem = item;
      // debugger;
    },
    addline() {
      // debugger
      if(this.clicktwice){
        this.mypagestyle = "-webkit-line-clamp:50";
        this.clicktwice = false
      }else{
        this.mypagestyle = "-webkit-line-clamp:4";
        this.clicktwice = true
      }
    },
    backtest(){
      this.detailFlag = false
      this.detailItem = {}
      this.catoryListChildrenList = this.backcatoryListChildrenList  
    }
  }
};
</script>
<style lang="stylus">
.container {
  height: 600px;
  padding: 10px;
}
.side-container {
  height: 354px;
  font-size: 12px;
}
.mint-search {
  height: 70%;
  padding-top: 6%;
}

.mint-searchbar {
  background-color: rgba(0, 0, 0, 0);
  padding: 0px 12px 5px 20px;
}

.mint-searchbar-inner {
  position: relative;
  height: 40px;
  border-radius: 20px;

  .mintui-search {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 20px;
  }

  input[type=search] {
    border-radius: 24px;
    background-color: #fff;
  }
}
.mint-searchbar-cancel{
  color #ccc
}
.cube-scroll-nav-bar {
  background-color: rgba(0, 0, 0, 0) !important;
}

.cube-scroll-nav-bar-item_active {
  background-color: #fff;
  color: blue !important;
}

.mui-content {
  background-color: #fff;
}

.mui-content>.mui-table-view:first-child {
  margin-top: 0px;
}

.mui-grid-view.mui-grid-8 {
  background-color: #fff;
}

.mui-table-view.mui-grid-view .mui-table-view-cell {
  border-bottom: 1px solid #ededed;
  padding-bottom: 5px;
}

.mui-table-view.mui-grid-view {
  padding: 0;
}

.cube-scroll-nav-bar-item {
  padding: 0px !important;
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  font-size: 13px;
  text-align: left;
}

.ddd {
  border-radius: 12px;
  background-color: #fff;
  color: skyblue;
}

.mags {
  background-color: #fff !important;
  border-left: 2px solid skyblue;
  color: skyblue;
  .fff {
    border-left: 8px solid skyblue;
  }
}

.fff {
  position: absolute;
  top: 30%;
  right: -10%;
  width: 0px;
  height: 0px;
  border-top: 8px solid rgba(0, 0, 0, 0);
  border-right: 8px solid rgba(0, 0, 0, 0);
  border-bottom: 8px solid rgba(0, 0, 0, 0);
  border-left: 8px solid rgb(241, 244, 249);
}
.contentBody{
        overflow: hidden;  
        text-overflow: ellipsis;  
        display: -webkit-box;  
        -webkit-line-clamp: 4;  
        -webkit-box-orient: vertical;
        font-size: 12px;  
  }
  .rrr{
    width: 50px;
    height: 50px;
    position: fixed;
    top: 50%;
    right: 73%;
    text-align: center;
    line-height: 50px;
    opacity: 0.4;
    font-size: 58px;
    color: #ccc;
  }
</style>