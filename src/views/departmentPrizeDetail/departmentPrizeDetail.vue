<template>
  <div style="height: 100%;">
    <div style="background-image: linear-gradient(#c00105, #fff)">
      <div >
        <mt-search placeholder="搜索" cancel-text="确认" v-model="seachvalue"  @blur.native.capture="search"  style="padding-top:10px"></mt-search>
      </div>
      <div>
        <cube-scroll-nav-bar
          :current="catoryYears[0]"
          :labels="catoryYears"
          @change="changeYear"
          :txts="catoryYears"
          style="background-color: rgba(0,0,0,0);height:26px;margin-top:0"
        />
      </div>
    </div>
    <div style="position: relative;height:45px">
      <cube-scroll-nav-bar
        :current="catoryListLabel[0]"
        :labels="catoryListLabel"
        @change="changeHandler"
        :txts="catoryListLabel"
        style="background-color:#fff!important"
      />
      <i class="cubeic-back bacf" @click="backtest" v-if="detailFlag"></i>
    </div>
    <!-- <div> -->
          <div class="side-container" style="width:18%;float:left;background-color: #f1f4f9;height: 70%;" v-show="hidesideFlag">
          <cube-scroll-nav-bar
            direction="vertical"
            :current="labelts[0]"
            :labels="labelts"
            :txts="labelts"
            @change="changeHandlert"
          ></cube-scroll-nav-bar>
        </div>
      
      
      <div class="mui-content" style="overflow:auto;height:63%">
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
                  style="float:left;width:125px;height:90px;border-radius: 12px;"
                  :style="{ 'background-image': 'url(' + item.headPath + ')','background-repeat':'no-repeat','background-size':'cover' }"
                ></span>
                 <div
                style="float:left;margin-left: 5%;width:50%;height:80px;display: flex"
              >
              <div style="align-self: center;">
                <div
                  style="white-space: pre-line;word-break: break-all;word-wrap: break-word;text-align: left;"
                >{{item.tittle}}</div>
                <div
                  style="white-space: pre-line;word-break: break-all;word-wrap: break-word;text-align: center;"
                >{{item.personName}}</div>
              </div>
              </div>
              </div>
            </a>
          </li>
        </ul>
        <div v-if="detailFlag">
          <div class="container" >
          <div  ref="news" >
              <div style="overflow: hidden">
                  <!-- <section v-html="this.detailItem.mobilecontent" ></section> -->
                  <section v-html="this.detailItem.mobilecontent.replace(/\r?\n/g, '')" style="background-color: #fff9e6;font-family: Optima-Regular, PingFangTC-light;line-height: 1.6;box-sizing: border-box;text-align: justify;"></section>
              </div>
          </div>
           <div class="mui-card-content" v-if="detailItem.filePath">
              <iframe
                height="15%"
                width="100%"
                :src="detailItem.filePath"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
            <!-- <div>
              <div class="mui-card-content" style="width: 100%;height: 100px;margin-bottom: 20px;background-image: linear-gradient(to bottom right , #c00105, #fff)">
                <img
                  :src="detailItem.headPath"
                  style="width: 100px;height: 100%;border-radius: 18px;padding: 6px;margin: 0 auto;"
                  alt
                />
              </div>
              <div style="text-align: center;">
                <div style="font-size:24px;position: relative;">
                  {{detailItem.tittle}}
                  <i class="cubeic-back bacf" @click="backtest"></i>
                </div>
                <div style="text-align: right;">--{{detailItem.personName}}</div>
              </div>
              内容区
              <div>
                <span class="contentBody" @click="addline" :style="mypagestyle">
                  <p>人物简介:</p>
                  <div>{{detailItem.description}}</div>
                </span>
              </div>
              <div style="font-size: 14px;color: #c00105;" @click="pushReald">
                点击详情
            </div>
              <input type="button" id="Copy" value="点击复制代码" />
              <div>
                <div class="mui-card-content" v-if="detailItem.photoPath" style="width: 80%;height: 80%;margin: 0 auto;">
                  <img :src="detailItem.photoPath" alt style="display: block;width: 100%;margin-top: 20px;height: 100%;" />
                </div>
              </div>
              <div class="mui-card-content" v-if="detailItem.filePath" style="margin-top: 20px;">
                <iframe
                  height="15%"
                  width="100%"
                  :src="detailItem.filePath"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </div> -->
            <!-- <div class="prism-player" id="player-con" style="margin-top:50px"></div> -->
          </div>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { queryCelebrityPerson, selectYears } from "./detailApi.js";
import { queryCategory } from "./api.js";

// import textdata from './data'
// import persondata from './persondata'

export default {
  data() {
    return {
      // selected: '',
      catoryListLabel: [],
      catoryListChildrenList: [],
      catoryYears: [],
      middlecatoryYears: [],
      selectedYear: "",
      catorySelected: "",
      current: "",
      labelts: [],
      txts: [],
      depatmentList: [],
      selectedDepartment: "",
      seachvalue: "",
      currentCatoryListLabel: "",
      clearables: {
        visible: true,
        blurHidden: true
      },
      value2: "",
      middlecatoryListLabel: [],
      middlelabels: [],
      detailItem: {},
      playPath: "",
      mypagestyle: "",
      detailFlag: false,
      clicktwice: false,
      backcatoryListChildrenList: [],
      // secondSelectItem:{},
      firstSelectItem:{},
      firstdepart:"",
      seconddepart:'',
      hidesideFlag:true
    };
  },
  mounted() {
    
    if(this.$route.query.seachvalue != '' && this.$route.query.seachvalue != undefined ){
        let queryData = {}
        queryData.personName =  this.$route.query.seachvalue
        queryCelebrityPerson(queryData).then(res => {
        if(res.data.itemList != undefined){
            this.catoryListChildrenList = res.data.itemList;
          }else{
            this.$createDialog({
                type: "alert",
                title: "提示",
                content: "暂无此人",
                icon: "cubeic-alert"
              }).show();
          }
      });
      return
    }
    // this.firstSelectItem = this.$route.query.firstSelectItem;
    let queryData = {};
    queryData.orginCategoryCode = 79400;
    let that = this
    queryCategory(queryData).then(res => {
      this.middlelabels = this.chaxun(res.data);
      for (var i in this.middlelabels) {
        this.labelts.push(
          '<span style="font-size: 12px;display: inline-block;padding: 5px 10px 2px 2px;position: relative;text-align: left;line-height: 15px;width: 100%;" >' +
            this.middlelabels[i] +
            '<div class="bbb"></div></span>'
        );
        // for(let j in this.labelts){
        //     if(this.labelts[j].indexOf(this.firstSelectItem.departmentName) != -1){
        //       this.firstdepart = this.labelts[j]
        //       break
        //     }
        // }
      }
    });
  },
  methods: {
    //筛选奖项
    chaxun(dataList) {
      let arr2 = [];
      var cha = "部"; //获取想要查询的值
      var cha1 = "中心";
      var cha2 = "组";
      var zhi = ""; //接收每个循环中的arr[i]的值
      for (var i = 0; i < dataList.length; i++) {
        zhi = dataList[i].departmentName;
        if (
          zhi.indexOf(cha) != -1 ||
          zhi.indexOf(cha1) != -1 ||
          zhi.indexOf(cha2) != -1
        ) {
          //因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
          arr2.push(dataList[i].departmentName); //将值放入第二个数组
          this.depatmentList.push(dataList[i]);
        }
      }
      return arr2;
    },
    chaxunjiang(dataList) {
      let arr2 = [];
      // var cha = "奖"; //获取想要查询的值
      var zhi = ""; //接收每个循环中的arr[i]的值
      for (var i = 0; i < dataList.length; i++) {
        zhi = dataList[i].categoryName;
        // if (zhi.indexOf(cha) != -1) {
          //因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
          arr2.push(dataList[i].categoryName); //将值放入第二个数组
          // this.depatmentList.push(dataList[i])
        // }
      }
      //
      return arr2;
      // alert(arr2);//弹出匹配的值
      // arr2 = [];//清空数组，否则第二次查询时会因为有是全局变量，而导致先前查询的值会和这次一起弹出
    },
    changeHandler(label) {
      this.detailFlag = false;
      this.hidesideFlag = true
      setTimeout(() => {
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        if (selectTop == null) {
        } else {
          for (let j in that.middlecatoryListLabel) {
            if (selectTop.innerText.indexOf(that.middlecatoryListLabel[j]) != -1) {
                selectTop.classList.remove("cube-scroll-nav-bar-item_active");
            selectTop.classList.add("ccc");
              break;
            }
          }
        }
      }, 3);
      let catoryListLabel = this.chaxun2(this.middlecatoryListLabel, label);
      this.catorySelected = catoryListLabel;
      let that = this
      selectYears(catoryListLabel).then(res => {
        that.catoryYears = [];
        that.middlecatoryYears = res.data;
        // that.catoryYears = res.data;
        for (var i in that.middlecatoryYears) {
          that.catoryYears.push(
            '<span style="display: inline-block;padding:0 10px;font-size: 12px;"><div>' +
              that.middlecatoryYears[i] +
              "年</div></span>"
          );
        }
      });
    },
    //纵向部门选择
    changeHandlert(label) {
      this.detailFlag = false;
      setTimeout(() => {
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        if (selectTop == null) {
        } else {
          let that = this;
          for (let j in that.middlelabels) {
            if (selectTop.innerText.indexOf(that.middlelabels[j]) != -1) {
              selectTop.classList.remove("cube-scroll-nav-bar-item_active");
              selectTop.classList.add("zzz");
              break;
            }
          }
        }
      }, 4);
      let currentDepartment = this.chaxun2(this.middlelabels, label);
      this.selectedDepartment = currentDepartment[0];
      let queryData = {};
      let that = this
      queryData.departmentName = that.selectedDepartment;
      queryCategory(queryData).then(res => {
        that.catoryListLabel = [];
        that.middlecatoryListLabel = that.chaxunjiang(res.data);
        for (let i in that.middlecatoryListLabel) {
          that.catoryListLabel.push(
            '<span style="display: inline-block;padding: 5px;font-size: 12px;margin:0 10px">' +
              that.middlecatoryListLabel[i] +
              "</span>"
          );
        }
        that.currentCatoryListLabel = that.catoryListLabel[0];
      });
    },
    changeYear(label) {
      this.hidesideFlag = true
      this.detailFlag = false;
      setTimeout(() => {
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        if (selectTop == null) {
        } else {
          let that = this;
          for (let j in that.middlecatoryYears) {
            if (selectTop.innerText.indexOf(that.middlecatoryYears[j]) != -1) {
              selectTop.classList.remove("cube-scroll-nav-bar-item_active");
              selectTop.classList.add("ddd");
              break;
            }
          }
        }
      }, 5);
      let catoryYears = this.chaxun2(this.middlecatoryYears, label);
      let queryData = {};
      queryData.departmentName = this.selectedDepartment;
      queryData.categoryName = this.catorySelected[0];
      queryData.years = catoryYears[0];
      let that = this
      queryCelebrityPerson(queryData).then(res => {
        that.catoryListChildrenList = res.data.itemList;
      });
    },
    searchList(keyWord, list) {
      var len = list.length;
      var arr = [];
      for (var i = 0; i < len; i++) {
        //如果字符串中不包含目标字符会返回-1
        if (list[i].indexOf(keyWord) >= 0) {
          arr.push(list[i]);
        }
      }
      return arr;
    },
    test(e) {
      let searchList = this.searchList(e, this.catoryListLabel);
      if (searchList != "") {
        this.currentCatoryListLabel = searchList[0];
        searchList = [];
      }
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
      //
      return arr2;
      // alert(arr2);//弹出匹配的值
      // arr2 = [];//清空数组，否则第二次查询时会因为有是全局变量，而导致先前查询的值会和这次一起弹出
    },
    detailitem(item) {
      this.detailFlag = true;
      this.backcatoryListChildrenList = [];
      this.backcatoryListChildrenList = this.catoryListChildrenList;
      this.catoryListChildrenList = [];
      this.detailItem = item;
      this.hidesideFlag = false
      // ;
    },
    addline() {
      // 
      if (this.clicktwice) {
        this.mypagestyle = "-webkit-line-clamp:50";
        this.clicktwice = false;
      } else {
        this.mypagestyle = "-webkit-line-clamp:6";
        this.clicktwice = true;
      }
    },
    backtest() {
      this.detailFlag = false;
      this.hidesideFlag = true
      this.detailItem = {};
      this.catoryListChildrenList = this.backcatoryListChildrenList;
    },
    search(){
      if(this.seachvalue == ''){
        return
      }
      let queryData = {}
        queryData.personName =  this.seachvalue
        queryCelebrityPerson(queryData).then(res => {
          if(res.data.itemList != undefined){
            this.catoryListChildrenList = res.data.itemList;
          }else{
            this.$createDialog({
                type: "alert",
                title: "提示",
                content: "暂无此人",
                icon: "cubeic-alert"
              }).show();
          }
        })
    },
    pushReald(){
      this.$router.push({
        name: "honorRealDetail",
        query: {
          realDetail: this.detailItem,
          tiaozhuan:'departmentPrizeDetail'
        }
      });
    }
  }
};
</script>
<style lang="stylus">
.container {
}

.side-container {
  height: 354px;
  font-size: 12px;
}

.mint-search {
  height: 60px;
  padding-top: 4% !important;
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
  padding-bottom: 5px;
}

.mui-table-view.mui-grid-view {
  padding: 0;
}

.cube-scroll-nav-bar-item {
  padding: 0px !important;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  font-size: 13px;
  text-align: left;
}



.ddd {
  border-radius: 14px;
  background-color: #fff;
  color: #c00105;
}

.ccc {
  color: #c00105;
  border-bottom: 2px solid #c00105;
  z-index: 2;
}

.eee {
}

.zzz {
  background-color: #fff;
  border-left: 3px solid #c00105;
  color: #c00105;

  .bbb {
    border-left: 8px solid #c00105;
  }
}

.bbb {
  position: absolute;
  top: 29%;
  right: -14%;
  width: 0px;
  height: 0px;
  border-top: 8px solid rgba(0, 0, 0, 0);
  border-right: 8px solid rgba(0, 0, 0, 0);
  border-bottom: 8px solid rgba(0, 0, 0, 0);
  border-left: 8px solid rgb(241, 244, 249);
}

.contentBody {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-size: 12px;
}

.bacf {
  z-index:899
  width: 50px;
  height: 50px;
  position: absolute;
  top: 55%;
  left: 0;
  text-align: center;
  line-height: 50px;
  opacity: 0.4;
  font-size: 21px;
  color: #c00105;
}
</style>