<template>
  <div class="news">
    <i class="cubeic-back bacf" @click="tiaozhuan"></i>
      <div class="news-box" ref="news" >
          <div class="news-info" v-if="this.realDetail" ref="section" >
              <section v-html="this.realDetail.replace(/\r?\n/g, '')" ></section>
          </div>
      </div>
  </div>
</template>
<script>
// import{getCaseinfo} from './caseService'
import { queryCelebrityPerson, selectYears } from "./detailApi.js";
export default {
  data () {
    return {
        // content:''
        realDetail:'',
        tiaozhuanye:'',
        questData:{}
    };
  },
  created(){
    this.getUrlArgStr()
      let queryData = {};
      // debugger
      queryData.personCode = this.questData.personCode,
      // this.tiaozhuanye = this.$route.query.tiaozhuan
      queryData.categoryName = this.questData.categoryName
      queryCelebrityPerson(queryData).then(res => {
        this.realDetail = res.data.itemList[0].mobilecontent
      })
  },
  methods:{
    getUrlArgStr() {          
      var url = decodeURI(location.href); 
      var params = url.split("?")[1].split("&")
      this.questData = {}
      params.map(v => this.questData[v.split("=")[0]] = v.split("=")[1])
    },
    tiaozhuan(){
      this.$router.push({
        name: 'honorpRizeDetail',
      });
    }
  }
}
</script>
<style lang="stylus" scoped>
.news {
    padding-top 20px
    position fixed
    width 100%
    max-width: 400px;
    top 0
    bottom 0
    z-index 10
    background #fff
    .news-box {
      height 92vh
      width 100%
      overflow hidden
      overflow-y auto
      box-sizing border-box
      padding 5px 8px
    }
    .write-box {
      height 8vh
      width 100%
      border-top 1px solid #E6E6E6
    }
  }
  .bacf {
  z-index :899
  width: 50px;
  height: 50px;
  position: fixed;
  top: 2%;
  left: 0;
  text-align: center;
  line-height: 50px;
  opacity: 0.4;
  font-size: 21px;
  color: #c00105;
}
</style>