<template>
  <div style="height:100%">
    <div style="background-image: linear-gradient(#c00105, #fff);">
      <div>
        <mt-search
          placeholder="搜索"
          cancel-text="确认"
          v-model="seachvalue"
          @blur.native.capture="search"
          style="padding-bottom: 2%;"
        ></mt-search>
      </div>
      <!-- <div> -->
      <!-- <div> -->
      <div style="text-align: center">
        <div class="contentDiv">
          <img :src="loginimage" />
        </div>
        <span>{{loginstus}}</span>
      </div>
      <!-- </div> -->
      <!-- </div> -->
      <div style="position: relative;">
        <cube-scroll-nav-bar
          :current="catoryYears[0]"
          :labels="catoryYears"
          @change="changeYear"
          :txts="catoryYears"
          style="height:36px"
        />
        <i class="cubeic-back bacf" @click="backtest" v-if="detailFlag"></i>
      </div>
    </div>
    <div
      class="side-container"
      style="width:18%;float:left;background-color: #f1f4f9;height:74%"
      v-show="!detailFlag"
    >
      <cube-scroll-nav-bar
        direction="vertical"
        :current="cureet"
        :labels="catoryListLabel"
        @change="changeHandler"
        :txts="catoryListLabel"
      />
    </div>
    <div class="mui-content" style="height:64%;overflow:auto">
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
    <div style="position: fixed;top: 50%;left: 50%;color: #ccc;" v-show="noneFlag">暂无数据</div>
    
  </div>
</template>

<script>
import { mapState } from "vuex";
import { queryCelebrityPerson, selectYears } from "./detailApi.js";
import textdata from "./testData";
import * as dd from "dingtalk-jsapi";
import { setDDConfig } from "@/api/dd";
export default {
  // computed: {
  //   ...mapState({
  //     personCode: state => state.personCode,
  //     loginstus: state => state.name,
  //     loginimage: state => state.avatar,

  //     // agentid: state => state.agentid,
  //     // corpId: state => state.corpId
  //   }),
  // },
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
      value3: "",
      textdata: textdata,
      catoryList: [],
      catorySelectf: "",
      detailFlag: false,
      detailItem: {},
      allhonerlist: [],
      loginstus: "未登录",
      // loginimage: "@src/default_avtar.jpg",require('../assets/a1.png')
      loginimage: require("../../assets/default_avtar.jpg"),
      cureet: "",
      seachvalue: "",
      noneFlag: true,
      backcatoryListChildrenList: [],
      hidesideflag: false
    };
  },
  created() {
    if (localStorage.getItem("avatar") != null) {
      this.loginimage = localStorage.getItem("avatar");
    }
    if (localStorage.getItem("name") != null) {
      this.loginstus = localStorage.getItem("name");
    }
    if (localStorage.getItem("personCode") == null) {
      this.noneFlag = true;
      this.$createDialog({
        type: "alert",
        title: "提示",
        content: "未能获取到工号",
        icon: "cubeic-alert"
      }).show();
    } else {
    let that = this;
    let queryData = {};
    queryData.personCode = localStorage.getItem("personCode");
    // queryData.personName = "梦想";
    queryCelebrityPerson(queryData).then(res => {
      let startcatoryYears = [];
      let startcatoryListLabel = [];
      that.allhonerlist = res.data.itemList;
      if (that.allhonerlist.length == 0) {
        this.noneFlag = true;
      } else {
        this.noneFlag = false;
      }
      for (var i in that.allhonerlist) {
        startcatoryYears.push(that.allhonerlist[i].years);
        startcatoryListLabel.push(that.allhonerlist[i].categoryName);
        //
      }
      that.middlecatoryYears = that.quchong(startcatoryYears);
      that.middlecatoryListLabel = that.quchong(startcatoryListLabel);
      for (var i in that.middlecatoryYears) {
        that.catoryYears.push(
          '<span style="display: inline-block;padding:0 10px;font-size: 12px;"><div>' +
            that.middlecatoryYears[i] +
            "年</div></span>"
        );
      }
      for (var i in that.middlecatoryListLabel) {
        that.catoryListLabel.push(
          '<span style="font-size: 12px;display: inline-block;padding: 5px 2px 2px 5px;position: relative;text-align: left;width: 100%;" >' +
            that.middlecatoryListLabel[i] +
            "</span>"
        );
      }
      that.changeYear(that.catoryYears[0]);
      setTimeout(() => {
        //
        that.cureet = that.catoryListLabel[0];
      }, 5);
    });
    }
  },
  methods: {
    seachva() {
      // ;
      for (let j in this.catoryListLabel) {
        if (this.catoryListLabel[j].indexOf(this.value3) != -1) {
          this.cureet = this.catoryListLabel[j];
          break;
        }
      }
    },
    //数组去重
    quchong(array) {
      //一个新的数组
      var arrs = [];
      //遍历当前数组
      for (var i = 0; i < array.length; i++) {
        //如果临时数组里没有当前数组的当前值，则把当前值push到新数组里面
        if (arrs.indexOf(array[i]) == -1) {
          arrs.push(array[i]);
        }
      }
      return arrs;
    },

    changeHandler(label) {
      this.detailFlag = false;
      setTimeout(() => {
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        if (selectTop == null) {
        } else {
          for (let j in this.middlecatoryListLabel) {
            if (
              selectTop.innerText.indexOf(this.middlecatoryListLabel[j]) != -1
            ) {
              selectTop.classList.remove("cube-scroll-nav-bar-item_active");
              selectTop.classList.add("hes");
              break;
            }
          }
        }
      }, 4);
      this.catoryListChildrenList = [];
      let currentlabel = "";
      for (var i in this.middlecatoryListLabel) {
        if (label.indexOf(this.middlecatoryListLabel[i]) != -1) {
          currentlabel = this.middlecatoryListLabel[i];
          break;
        }
      }
      for (var i in this.allhonerlist) {
        if (currentlabel == this.allhonerlist[i].categoryName) {
          this.catoryListChildrenList.push(this.allhonerlist[i]);
        }
      }
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
      this.detailFlag = false;
      this.catoryListChildrenList = [];
      setTimeout(() => {
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        if (selectTop == null) {
        } else {
          for (let j in this.middlecatoryYears) {
            if (selectTop.innerText.indexOf(this.middlecatoryYears[j]) != -1) {
              selectTop.classList.remove("cube-scroll-nav-bar-item_active");
              selectTop.classList.add("ger");
              break;
            }
          }
        }
      }, 3);
      let currentYears = "";
      for (var i in this.middlecatoryYears) {
        if (label.indexOf(this.middlecatoryYears[i]) != -1) {
          currentYears = this.middlecatoryYears[i];
          break;
        }
      }
      for (var i in this.allhonerlist) {
        if (currentYears == this.allhonerlist[i].years) {
          this.catoryListChildrenList.push(this.allhonerlist[i]);
        }
      }
    },
    addline() {
      //
      if (this.clicktwice) {
        this.mypagestyle = "-webkit-line-clamp:50";
        this.clicktwice = false;
      } else {
        this.mypagestyle = "-webkit-line-clamp:4";
        this.clicktwice = true;
      }
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
    detailitem(item) {
      debugger
      this.detailFlag = true;
      this.backcatoryListChildrenList = [];
      this.backcatoryListChildrenList = this.catoryListChildrenList;
      this.catoryListChildrenList = [];
      this.detailItem = item;
      this.hidesideflag = false;
    },
    backtest() {
      this.hidesideflag = true;
      this.detailFlag = false;
      this.detailItem = {};
      this.catoryListChildrenList = this.backcatoryListChildrenList;
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
  padding-top: 6%;
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

.hes {
  background-color: #fff;
  border-left: 2px solid #c00105;
  color: #c00105;
  position: relative;

  .rrr {
    border-left: 8px solid #c00105;
  }
}

.rrr {
  position: absolute;
  top: 14%;
  right: -30%;
  width: 0px;
  height: 0px;
  border-top: 8px solid rgba(0, 0, 0, 0);
  border-right: 8px solid rgba(0, 0, 0, 0);
  border-bottom: 8px solid rgba(0, 0, 0, 0);
  border-left: 8px solid rgb(241, 244, 249);
}

.contentDiv {
  display: block;
  margin: 0 auto;
  width: 70px;
  height: 70px;
  -webkit-border-radius: 100px;
  border: 2px solid #fff;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}

.contentDiv img {
  width: 100%;
  min-height: 100%;
}

.ger {
  color: #c00105;
  border-bottom: 2px solid #c00105;
  z-index: 2;
  background-color: #fff;
  border-radius: 17px;
}
.bacf {
  z-index:899
  width: 50px;
  height: 50px;
  position: absolute;
  top: 65%;
  left: 0;
  text-align: center;
  line-height: 50px;
  opacity: 0.4;
  font-size: 21px;
  color: #c00105;
}
</style>