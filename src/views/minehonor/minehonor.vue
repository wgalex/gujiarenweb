<template>
  <div style="height:100%">
    <div
      style="background-image: linear-gradient(#0e82fd, #3edbfa);height:28%"
    >
      <div>
        <mt-search v-model="value" style="padding-bottom: 2%;"></mt-search>
      </div>
      <div>
        <div>
          <div class="contentDiv">
            <img :src= loginimage />
          </div>
          <div style="width: 51px;margin: 0px auto;padding: 13px 0;color: #ccc;;">{{loginstus}}</div>
        </div>
      </div>
    <div>
        <cube-scroll-nav-bar
          :current="catoryYears[0]"
          :labels="catoryYears"
          @change="changeYear"
          :txts="catoryYears"
          style="height:36px"
        />
      </div>
    </div>
    <div class="side-container" style="width:30%;float:left;background-color: #f1f4f9;height:74%">
      <cube-scroll-nav-bar
          direction="vertical"
          :current="catoryListLabel[0]"
          :labels="catoryListLabel"
          @change="changeHandler"
          :txts="catoryListLabel"
        />
    </div>
    <div class="mui-content" style="height:560px;overflow:auto">
      <ul class="mui-table-view mui-grid-view mui-grid-8" style="min-height: 0px;">
        <li
          class="mui-table-view-cell mui-media mui-col-xs-12"
          v-for="item in catoryListChildrenList"
          :key="item.id"
          @click="jumpDetails(item)"
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
      value: "",
      textdata: textdata,
      catoryList: [],
      catorySelectf: "",
      detailFlag: false,
      detailItem: {},
      allhonerlist:[],
      loginstus:'未登录',
      loginimage:'src/assets/default_avtar.jpg'
    };
  },
  created() {
    let startcatoryYears = []
    let startcatoryListLabel = []
    this.allhonerlist = this.textdata.data.itemList
    for(var i in this.allhonerlist){
      startcatoryYears.push(this.allhonerlist[i].years)
      startcatoryListLabel.push(this.allhonerlist[i].categoryName)
      // debugger
    }
    this.middlecatoryYears =this.quchong(startcatoryYears)
    this.middlecatoryListLabel =this.quchong(startcatoryListLabel)
    for (var i in this.middlecatoryYears) {
          this.catoryYears.push(
            '<span style="display: inline-block;padding:0 10px;font-size: 12px;"><div>' +
              this.middlecatoryYears[i] +
              "年</div></span>"
          );
    }
    for (var i in this.middlecatoryListLabel) {
        this.catoryListLabel.push(
          '<span style="display: inline-block;padding: 10px 26px 10px 10px;position: relative;" >' +
            this.middlecatoryListLabel[i] +
            '<div class="bbb"></div></span>'
        );
      }
    this.changeYear(this.catoryYears[0])
     setTimeout(() => {
        // debugger
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        if (selectTop == null) {
        } else {
          selectTop.classList.remove("cube-scroll-nav-bar-item_active");
          selectTop.classList.add("hhh");
        }
      }, 4);
  },
  mounted() {},
  methods: {
      //数组去重
    quchong(array){ 
    //一个新的数组 
    var arrs = []; 
    //遍历当前数组 
    for(var i = 0; i < array.length; i++){ 
        //如果临时数组里没有当前数组的当前值，则把当前值push到新数组里面 
        if (arrs.indexOf(array[i]) == -1){ 
            arrs.push(array[i])
        }; 
    } 
    return arrs; 
},




    changeHandler(label) {
      setTimeout(() => {
        // debugger
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        if (selectTop == null) {
        } else {
          selectTop.classList.remove("cube-scroll-nav-bar-item_active");
          selectTop.classList.add("hhh");
        }
      }, 4);
      this.catoryListChildrenList = []
      let currentlabel = ''
      for(var i in this.middlecatoryListLabel){
        if(label.indexOf(this.middlecatoryListLabel[i]) != -1){
           currentlabel  = this.middlecatoryListLabel[i]
           break
        }
      }
      for(var i in this.allhonerlist){
        if(currentlabel == this.allhonerlist[i].categoryName){
          this.catoryListChildrenList.push(this.allhonerlist[i])
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
      this.catoryListChildrenList = []
      setTimeout(() => {
        // debugger
        let selectTop = document.querySelector(
          ".cube-scroll-nav-bar-item_active"
        );
        if (selectTop == null) {
        } else {
            selectTop.classList.remove("cube-scroll-nav-bar-item_active");
            selectTop.classList.add("ggg");
        }
      }, 3);
      let currentYears = ''
      for(var i in this.middlecatoryYears){
        if(label.indexOf(this.middlecatoryYears[i]) != -1){
           currentYears  = this.middlecatoryYears[i]
           break
        }
      }
      for(var i in this.allhonerlist){
        if(currentYears == this.allhonerlist[i].years){
          this.catoryListChildrenList.push(this.allhonerlist[i])
        }
      }
    },
    addline() {
      // debugger
      if (this.clicktwice) {
        this.mypagestyle = "-webkit-line-clamp:50";
        this.clicktwice = false;
      } else {
        this.mypagestyle = "-webkit-line-clamp:4";
        this.clicktwice = true;
      }
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


.mint-searchbar {
  background-color: rgba(0, 0, 0, 0);
  padding: 0px 12px 5px 20px;
}

.mint-searchbar-inner {
  position: relative;
  height: 35px;
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

.hhh {
  background-color: #fff;
  border-left: 2px solid skyblue;
  color: skyblue;
  .bbb {
    border-left: 8px solid skyblue;
  }
}

.bbb {
  position: absolute;
  top: 11px;
  right: 0px;
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
.ggg {
  color: skyblue;
  border-bottom: 2px solid skyblue;
  z-index: 2;
  background-color #fff
  border-radius: 17px;
}
</style>