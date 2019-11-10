<template>
    <div>
      <mt-header title="名人堂">
            <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
      <cube-scroll-nav @change="changeHandler">
          <cube-scroll-nav-panel
            v-for="item in catoryList"
            :key="item.id"
            :label="item.categoryName">
            <ul>
              <!-- <li v-for="food in item.foods">
                <div>
                  <img :src="food.icon">
                  <p>{{food.name}}</p>
                </div>
              </li> -->
            </ul>
          </cube-scroll-nav-panel>
      </cube-scroll-nav>  
    </div>
</template>

<script>
import { queryCelebrityPerson } from './detailApi.js'

export default {
  data () {
    return {
      selected: '',
      catoryList:[],
    };
  },
  created(){
    // debugger
    console.log(this.$route.query);
    this.catoryList = this.$route.query.catoryList
    this.selected = this.$route.query.selectItem.id
  },
  mounted () {
    
  },
  methods:{
    changeHandler(label) {
      console.log('changed to:', label)
    }
  }
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