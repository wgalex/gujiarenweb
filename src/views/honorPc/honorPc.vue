<template>
    <div>
        <el-row class="tac">
          <el-col :span="6">
            <el-menu
              default-active="this.$route.path"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router>
              <el-submenu index="home">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>股份荣誉</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">单位荣誉</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  data () {
    return {
      navList:[
          {name:'/findProject',navItem:'发现项目'},
          {name:'/communityActivity',navItem:'社区动态'},
        ]
    };
  },
  methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>
<style lang="stylus">
</style>