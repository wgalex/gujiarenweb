<template>
  <div id="app">
    <div class="container" style="height:100%;width:100%;padding: 0px;">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
    <template>
      <div
        style="position: fixed;right: 0px;bottom: 1px;width: 100%;background-color: #fff;height: 10%;z-index:99"
      >
        <cube-tab-bar
          v-model="selectedLabelDefault"
          :data="tabs"
          @click="clickHandler"
          @change="changeHandler"
        ></cube-tab-bar>
      </div>
    </template>
  </div>
</template>
  </div>
</template>
<script>
var overscroll = function(el) {
  el.addEventListener("touchstart", function() {
    var top = el.scrollTop,
      totalScroll = el.scrollHeight,
      currentScroll = top + el.offsetHeight;
    if (top === 0) {
      el.scrollTop = 1;
    } else if (currentScroll === totalScroll) {
      el.scrollTop = top - 1;
    }
  });

  el.addEventListener("touchmove", function(evt) {
    if (el.offsetHeight < el.scrollHeight) evt._isScroller = true;
  });
};

overscroll(document.querySelector(".scroll"));
document.body.addEventListener("touchmove", function(evt) {
  if (!evt._isScroller) {
    evt.preventDefault();
  }
});
</script>
<script>
import MTab from "@/components/m-tab";
import { setDDConfig } from "@/api/dd";
import { mapMutations } from "vuex";
import fetch from "@/api/fetch";
import { Tabbar, TabItem } from "mint-ui";
export default {
  name: "app",
  data() {
    return {
      selectedLabelDefault: "Vip",
      tabs: [
        {
          label: "首页",
          icon: "fengmian"
        },
        {
          label: "股份荣誉",
          icon: "gufen"
        },
        {
          label: "部门荣誉",
          icon: "bumen"
        },
        {
          label: "我的荣誉",
          icon: "wode"
        }
      ]
    };
  },
  created() {
    // 获取用户 id
    // setDDConfig().then(res => {
    //   var that = this;
    //   let data = res;
    //   var is_mobi =
    //     navigator.userAgent
    //       .toLowerCase()
    //       .match(
    //         /(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i
    //       ) != null;
    //   if (!is_mobi) {
    //     // PC
    //     console.log("pc");
    //     DingTalkPC.ready(() => {
    //       DingTalkPC.runtime.permission.requestAuthCode({
    //         corpId: data.corpId, //企业ID
    //         onSuccess: function(result) {
    //           let url =
    //             "/kukacms/visitor/getDingUserInfo.htm?accessToken=" +
    //             data.token +
    //             "&code=" +
    //             result.code;
    //           fetch({
    //             url: url,
    //             method: "get"
    //           }).then(res => {
    //             // console.log(res);
    //             that.save_userId(res.data.userId);
    //             that.save_userName(res.data.name);
    //             thst.save_corpId(res.data.corpId);
    //             thst.save_agentid (res.data.agentid)
    //           });
    //         },
    //         onFail: function(err) {
    //           window.location.reload();
    //         }
    //       });
    //     });
    //   } else {
    //     // 移动
    //     console.log("mobile");
    //     dd.ready(() => {
    //       dd.ui.webViewBounce.disable();
    //       dd.runtime.permission.requestAuthCode({
    //         corpId: data.corpId,
    //         onSuccess: function(result) {
    //           let url =
    //             "/kukacms/visitor/getDingUserInfo.htm?accessToken=" +
    //             data.token +
    //             "&code=" +
    //             result.code;
    //           fetch({
    //             url: url,
    //             method: "get"
    //           }).then(res => {
    //             // console.log(res);
    //             that.save_userId(res.data.userId);
    //             that.save_userName(res.data.name);
    //           });
    //         },
    //         onFail: function(err) {
    //           window.location.reload();
    //         }
    //       });
    //     });
    //   }
    // });
  },
  methods: {
    clickHandler(label) {
      // debugger
      // if you clicked home tab, then print 'Home'
      console.log(label);
    },
    changeHandler(label) {
      switch (label) {
        case "首页":
          //  表达式的值和 值1匹配上了，需要执行的代码;
          this.$router.push({
            name: "honorIndex"
          });
          break;
        case "股份荣誉":
          this.$router.push({
            name: "honorPrize"
          });
          //  表达式的值和 值2匹配上了，需要执行的代码;
          break;
        case "部门荣誉":
          this.$router.push({
            name: "departmentPrizeDetail"
          });
          //  表达式的值和 值3匹配上了，需要执行的代码;
          break;
        case "我的荣誉":
          //  表达式的值和 值3匹配上了，需要执行的代码;
          this.$router.push({
            name: "minehonor"
          });
          break;
        default:
          //  如果表达式的值和以上的case后面的值都没有匹配上，那么就执行这里的代码。
          break;
      }
      // if you clicked different tab, this methods can be emitted
    }
  },

  components: {
    MTab,
    Tabbar,
    TabItem
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  /* max-width: 400px; */
  margin: 0 auto;
  box-sizing: border-box;
  /* overflow: hidden; */
}
.container {
  /* margin-top: 40px; */
  width: 100%;
  height: 100%;

  /* overflow: hidden; */
}
* {
  -webkit-overflow-scrolling: touch;
}
.mint-header {
  background-color: #eee;
  color: #333;
}
.fengmian {
  display: inline-block;
  height: 30px;
  width: 35px;
  /* background-color: cyan; */
  background: url("./assets/首页.png") no-repeat;
  background-size: 100% 100%;
}
.gufen {
  display: inline-block;
  height: 30px;
  width: 35px;
  /* background-color: cyan; */
  background: url("./assets/股份荣誉.png") no-repeat;
  background-size: 100% 100%;
}
.bumen {
  display: inline-block;
  height: 30px;
  width: 35px;
  /* background-color: cyan; */
  background: url("./assets/部门荣誉.png") no-repeat;
  background-size: 100% 100%;
}
.wode {
  display: inline-block;
  height: 30px;
  width: 35px;
  /* background-color: cyan; */
  background: url("./assets/我的荣誉.png") no-repeat;
  background-size: 100% 100%;
}
.cube-tab_active {
  color: cyan !important;
}
/* C:\Users\kuka\Desktop\gujiarenweb\src\assets\首页.png */
</style>
