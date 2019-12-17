<template>
  <div style="height:100%">
    <div style="background-image: linear-gradient(#c00105, #fff);">
      <mt-search
        placeholder="搜索"
        cancel-text="确认"
        v-model="seachvalue"
        @blur.native.capture="search"
      ></mt-search>
      <div>
        <cube-scroll-nav-bar
          :current="catorySelected"
          :labels="catoryListLabel"
          @change="changeHandler"
          :txts="catoryListLabel"
          style="background-color: rgba(0,0,0,0);margin-top:0;margin-bottom:0"
        />
      </div>
      <div style="position: relative;">
        <cube-scroll-nav-bar
          :current="catoryChildrenListLabel[0]"
          :labels="catoryChildrenListLabel"
          @change="ChildrenchangeHandler"
          :txts="catoryChildrenListLabel"
          style="background-color:#fff!important;height:24px;"
        />
        <i class="cubeic-back bacf" @click="backtest" v-if="detailFlag"></i>
      </div>
    </div>
    <div></div>
    <div
      class="side-container"
      style="width:18%;background-color: #f1f4f9;height: 77%;float:left;"
      v-show="hidesideflag"
    >
      <cube-scroll-nav-bar
        direction="vertical"
        :current="catoryYears[0]"
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
            <div class="mui-card-content" style="padding-bottom:8%">
              <span
                style="float:left;width:125px;height:90px;border-radius: 12px;"
                :style="{ 'background-image': 'url(' + item.headPath + ')','background-repeat':'no-repeat','background-size':'cover' }"
              ></span>
              <div style="float:left;margin-left: 5%;width:50%;height:80px;display: flex">
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
        <div class="container">
          <div ref="news">
            <div style="overflow: hidden">
              <section
                v-html="this.detailItem.mobilecontent.replace(/\r?\n/g, '')"
                style="background-color: #fff9e6;font-family: Optima-Regular, PingFangTC-light;line-height: 1.6;box-sizing: border-box;text-align: justify;"
              ></section>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryCelebrityPerson, selectYears } from "./detailApi.js";
import { queryCategory } from "./api.js";
import textdata from "./testData";
export default {
  data() {
    return {
      catoryListLabel: [],
      middlecatoryListLabel: [],
      catoryListChildrenList: [],
      catoryYears: [],
      middlecatoryYears: [],
      selectedYear: "",
      catorySelected: "",
      seachvalue: "",
      textdata: textdata,
      catoryList: [],
      catorySelectf: "",
      detailFlag: false,
      detailItem: {},
      backcatoryListChildrenList: [],
      mypagestyle: "",
      catoryChildrenListLabel: [],
      middlecatoryChildrenListLabel: [],
      startcatoryChildrenListLabel: [],
      queryyearcode: "",
      currentChilden: "",
      currentYear: "",
      currentChildrenListLabel: "",
      currentChildrenListcode: "",
      queryhoner: "",
      hidesideflag: true,
      baseLabel: "",
      stamppp: [],
      capmmd: ""
    };
  },
  created() {
    if (this.$route.query.catoryList != undefined) {
      // this.catoryList = this.$route.query.catoryList;
      let querydata = {};
      querydata.orginCategoryCode = "43090";
      queryCategory(querydata).then(res => {
        this.catoryList = res.data;
        for (var i in this.catoryList) {
          this.startcatoryChildrenListLabel.push(
            this.catoryList[i].categoryName
          );
          this.catoryListLabel.push(
            '<span style="display: inline-block;padding:1px 5px;margin: 0 8px;font-size: 13px;font-weight: 700;">' +
              this.catoryList[i].categoryName +
              "</span>"
          );
        }
        this.queryhoner = this.$route.query.selectItem.categoryName;
        this.queryhonercode = this.$route.query.selectItem.categoryCode;

        this.catorySelected = this.$route.query.selectItem.categoryName;
        for (let m in this.catoryListLabel) {
          if (this.catoryListLabel[m].indexOf(this.catorySelected) != -1) {
            this.catorySelected = this.catoryListLabel[m];
            // this.changeHandler(this.catorySelected);
            break;
          }
        }
      });
    } else {
      let querydata = {};
      querydata.orginCategoryCode = "43090";
      let that = this;
      queryCategory(querydata).then(res => {
        that.catoryList = res.data;
        for (var i in that.catoryList) {
          that.startcatoryChildrenListLabel.push(
            that.catoryList[i].categoryName
          );
          that.catoryListLabel.push(
            '<span style="display: inline-block;padding:1px 5px;margin: 0 8px;font-size: 13px;font-weight: 700;">' +
              that.catoryList[i].categoryName +
              "</span>"
          );
        }
        that.catorySelected = that.catoryList[0].categoryName;
        for (let m in that.catoryListLabel) {
          if (that.catoryListLabel[m].indexOf(that.catorySelected) != -1) {
            that.catorySelected = that.catoryListLabel[m];
            // that.changeHandler(that.catorySelected);
            break;
          }
        }
      });
    }
  },
  mounted() {},
  methods: {
    // seachvalue() {
    //   for (let j in this.catoryListLabel) {
    //     if (this.catoryListLabel[j].indexOf(this.value1) != -1) {
    //       this.catorySelected = this.catoryListLabel[j];
    //       break;
    //     }
    //   }
    // },
    changeHandler(label) {
      // debugger
      this.detailFlag = false;
      this.hidesideflag = true;
      this.catoryYears = [];
      this.catoryListChildrenList = [];
      this.catoryChildrenListLabel = [];
      this.middlecatoryChildrenListLabel = [];
      this.middlecatoryYears = [];
      this.middlecatoryChildrenListLabel = [];
      this.stamppp = [];
      this.capmmd = "";
      this.baseLabel = "";
      setTimeout(() => {
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        if (selectTop == null) {
        } else {
          selectTop.classList.remove("cube-scroll-nav-bar-item_active");
          selectTop.classList.add("ddd");
        }
      }, 7);
      for (let i in this.startcatoryChildrenListLabel) {
        if (label.indexOf(this.startcatoryChildrenListLabel[i]) != -1) {
          this.currentChildrenListLabel = this.startcatoryChildrenListLabel[i];
          break;
        }
      }
      for (let j in this.catoryList) {
        if (this.catoryList[j].categoryName == this.currentChildrenListLabel) {
          this.currentChildrenListcode = this.catoryList[j].categoryCode;
          break;
        }
      }
      let queryData = {};
      queryData.orginCategoryCode = this.currentChildrenListcode;
      queryCategory(queryData).then(res => {
        for (var k in res.data) {
          this.middlecatoryChildrenListLabel.push(res.data[k].categoryName);
          this.catoryChildrenListLabel.push(
            '<span style="display: inline-block;padding: 5px;font-size: 12px;margin:0 10px">' +
              res.data[k].categoryName +
              "</span>"
          );
        }
      });
    },
    ChildrenchangeHandler(label) {
      // debugger
      if (label == "") {
        return;
      }
      this.hidesideflag = true;
      this.detailFlag = false;
      setTimeout(() => {
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        if (selectTop == null) {
        } else {
          selectTop.classList.remove("cube-scroll-nav-bar-item_active");
          selectTop.classList.add("jjj");
        }
      }, 6);
      this.middlecatoryYears = [];
      this.catoryYears = [];
      this.catoryListChildrenList = [];
      this.middlecatoryListChildrenList = [];
      this.currentChilden = "";
      this.baseLabel = this.middlecatoryChildrenListLabel[0];
      //命名不规范导致的bug,强行解决
      for (let q in this.middlecatoryChildrenListLabel) {
        if (
          this.middlecatoryChildrenListLabel[q].length < this.baseLabel.length
        ) {
          this.baseLabel = this.middlecatoryChildrenListLabel[q];
        }
      }
      this.stamppp = label.split(this.baseLabel);
      for (let i in this.middlecatoryChildrenListLabel) {
        if (this.stamppp.length == 1) {
          if (label.indexOf(this.middlecatoryChildrenListLabel[i]) != -1) {
            this.currentChilden = this.middlecatoryChildrenListLabel[i];
            break;
          }
          continue;
        }
        this.capmmd = this.middlecatoryChildrenListLabel[i].split(
          this.baseLabel
        )[1];
        if (this.capmmd == "") {
          continue;
        }
        if (this.stamppp[1].indexOf(this.capmmd) != -1) {
          this.currentChilden = this.middlecatoryChildrenListLabel[i];
          break;
        }
      }
      this.stamppp = [];
      this.capmmd = "";
      if (this.currentChilden == "") {
        this.currentChilden = this.baseLabel;
        this.baseLabel = "";
      }
      //命名不规范导致的bug,强行解决 结束
      let queryData = {};
      queryData.categoryName = this.currentChilden;
      let middlescatoryYears = [];
      queryCelebrityPerson(queryData).then(res => {
        for (let k in res.data.itemList) {
          middlescatoryYears.push(res.data.itemList[k].years);
        }
        if (middlescatoryYears.length != 0) {
          for (let m = 0; m < middlescatoryYears.length; m++) {
            if (this.middlecatoryYears.indexOf(middlescatoryYears[m]) === -1) {
              this.middlecatoryYears.push(middlescatoryYears[m]);
            }
          }
        }

        for (let j in this.middlecatoryYears) {
          this.catoryYears.push(
            '<span style="display: inline-block;padding: 10px 26px 10px 10px;position: relative;">' +
              this.middlecatoryYears[j] +
              '<div class="fff"></div></span>'
          );
        }
        this.middlecatoryListChildrenList = [];
        this.middlecatoryListChildrenList = res.data.itemList;
      });
    },
    changeYear(label) {
      this.detailFlag = false;
      setTimeout(() => {
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        if (selectTop == null) {
        } else {
          selectTop.classList.remove("cube-scroll-nav-bar-item_active");
          selectTop.classList.add("mags");
        }
      }, 5);
      // this.selectedYear = label;
      this.catoryListChildrenList = [];
      this.currentYear = "";
      for (let j in this.middlecatoryYears) {
        if (label.indexOf(this.middlecatoryYears[j]) != -1) {
          this.currentYear = this.middlecatoryYears[j];
          break;
        }
      }
      for (let k in this.middlecatoryListChildrenList) {
        if (this.middlecatoryListChildrenList[k].years == this.currentYear) {
          this.catoryListChildrenList.push(
            this.middlecatoryListChildrenList[k]
          );
        }
      }
    },
    // //筛选奖项
    // chaxun(dataList, label) {
    //   let arr2 = [];
    //   var cha = label; //获取想要查询的值
    //   var zhi = ""; //接收每个循环中的arr[i]的值
    //   for (var i = 0; i < dataList.length; i++) {
    //     zhi = dataList[i].categoryName;
    //     if (cha.indexOf(zhi) != -1) {
    //       //因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
    //       arr2.push(dataList[i]); //将值放入第二个数组
    //       // this.depatmentList.push(dataList[i])
    //     }
    //   }
    //   return arr2;
    //   // alert(arr2);//弹出匹配的值
    //   // arr2 = [];//清空数组，否则第二次查询时会因为有是全局变量，而导致先前查询的值会和这次一起弹出
    // },
    // chaxun2(dataList, label) {
    //   let arr2 = [];
    //   var cha = label; //获取想要查询的值
    //   var zhi = ""; //接收每个循环中的arr[i]的值
    //   for (var i = 0; i < dataList.length; i++) {
    //     zhi = dataList[i];
    //     if (cha.indexOf(zhi) != -1) {
    //       //因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
    //       arr2.push(dataList[i]); //将值放入第二个数组
    //       // this.depatmentList.push(dataList[i])
    //     }
    //   }
    //   return arr2;
    //   // alert(arr2);//弹出匹配的值
    //   // arr2 = [];//清空数组，否则第二次查询时会因为有是全局变量，而导致先前查询的值会和这次一起弹出
    // },
    // chaxun3(dataList, label) {
    //   let arr2 = [];
    //   var cha = label; //获取想要查询的值
    //   var zhi = ""; //接收每个循环中的arr[i]的值
    //   for (var i = 0; i < dataList.length; i++) {
    //     zhi = dataList[i];
    //     if (zhi.indexOf(cha) != -1) {
    //       //因为indexof找不到的时候是一律为-1，所以直接判断是否为-1，不是就弹出这个值
    //       arr2.push(dataList[i]); //将值放入第二个数组
    //       // this.depatmentList.push(dataList[i])
    //     }
    //   }
    //   return arr2;
    //   // alert(arr2);//弹出匹配的值
    //   // arr2 = [];//清空数组，否则第二次查询时会因为有是全局变量，而导致先前查询的值会和这次一起弹出
    // },
    detailitem(item) {
      this.detailFlag = true;
      this.backcatoryListChildrenList = [];
      this.backcatoryListChildrenList = this.catoryListChildrenList;
      this.catoryListChildrenList = [];
      this.detailItem = item;
      this.hidesideflag = false;
    },
    addline() {
      if (this.clicktwice) {
        this.mypagestyle = "-webkit-line-clamp:50";
        this.clicktwice = false;
      } else {
        this.mypagestyle = "-webkit-line-clamp:6";
        this.clicktwice = true;
      }
    },
    backtest() {
      this.hidesideflag = true;
      this.detailFlag = false;
      this.detailItem = {};
      this.catoryListChildrenList = this.backcatoryListChildrenList;
    },
    search() {
      if (this.seachvalue == "") {
        return;
      }
      this.$router.push({
        name: "departmentPrizeDetail",
        query: {
          seachvalue: this.seachvalue
        }
      });
    },
    pushReald() {
      this.$router.push({
        name: "honorRealDetail",
        query: {
          realDetail: this.detailItem,
          tiaozhuan: "honorpRizeDetail"
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
  height: 70%;
  padding-top: 4%;
}

.mint-searchbar {
  background-color: rgba(0, 0, 0, 0);
  padding: 0px 40px 5px 40px;
}

.mint-searchbar-inner {
  position: relative;
  height: 26px;
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
    height: 26px;
    font-size: 12px;
  }
}

.mint-searchbar-cancel {
  color: #ccc;
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
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  font-size: 13px;
  text-align: left;
}

.ddd {
  border-radius: 12px;
  background-color: #fff;
  color: #c00105;
}

.mags {
  background-color: #fff !important;
  border-left: 2px solid #c00105;
  color: #c00105;

  .fff {
    border-left: 8px solid #c00105;
  }
}

.jjj {
  color: #c00105;
  border-bottom: 2px solid #c00105;
  z-index: 2;
}

.fff {
  position: absolute;
  top: 30%;
  right: -5%;
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

.ted {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -13px;
  left: 0;
  text-align: center;
  line-height: 50px;
  opacity: 0.4;
  font-size: 21px;
  color: #c00105;
}

.bacf {
  z-index: 899;
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