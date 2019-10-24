<template>
  <div style="background-color:#fff">
    <cube-form
      :model="model"
      :schema="schema"
      :immediate-validate="false"
      @validate="validateHandler"
      :options="options"
    ></cube-form>
    <div style="height:30px;line-height:30px;color:#666;padding-right:15px;background-color: #fff">
      <span
        style="float:left ;font-size: 16px;background-color: #fff;vertical-align: baseline;height:30px;font-family: 'Helvetica Neue',Helvetica,sans-serif;font-weight: 400;padding-right:14px;padding-left:4px"
      >被投诉人姓名</span>
      <cube-input v-model="editname" placeholder="选填" @focus="getUserId"></cube-input>
    </div>
    <div style="height:30px;line-height:30px ;padding-top: 9px;
    background-color: #fff;;padding-right:15px">
      <span
        style="float:left;font-size: 16px;color:#666;background-color:#fff;vertical-align: baseline;height:30px;font-family: 'Helvetica Neue',Helvetica,sans-serif;padding-right:14px;font-weight: 400;padding-left:4px"
      >被投诉人部门</span>
      <cube-input  v-model="editdepart" placeholder="选填" @focus="getDepartment"></cube-input>
    </div>
    <cube-textarea
      v-model="remark"
      :placeholder="placeholder"
      :maxlength="2000"
      style="height:150px;margin-top:20px"
    ></cube-textarea>
    
    <cube-upload v-model="files" :action="action" @file-success="test" :max="4"
>      <div style="margin-top:5px">
          <p>             
              上传附件、文档、视频、照片等
          </p>
      </div>
      <div class="clear-fix">
        <cube-upload-btn :multiple="false">
          <div>
            <span style="display:block;width:100px;height:100px;background-color:#fff;text-align:center;line-height:100px;border:1px solid #ccc">
              <i>＋</i>
            </span>
          </div>
        </cube-upload-btn>
      </div>
      <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
    </cube-upload>
    <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item" href="#tabbar" style="border-right: 1px solid #929292">
        <span class="mui-tab-label" @click="realNameSubmint">实名提交</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-chat">
        <span class="mui-tab-label" @click="anonymouSubmit">匿名提交</span>
      </a>
    </nav>
    <!-- <button id='confirmBtn' type="button" class="mui-btn mui-btn-blue mui-btn-outlined">确认消息框</button> -->
     <!-- <button style="background-color:#ccc;margin-left:5px;margin-top:5px" @click="getUserId">调取通讯录测试按钮</button> -->
     <!-- <button style="background-color:#ccc;margin-left:5px;margin-top:5px" @click="share">分享</button> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";
import { submitEdit } from "./editsever";
import { setDDConfig } from "@/api/dd";
// import compress from '../../../node_modules/'
// import compress from '../../../node_modules/compress/index'
export default {
  computed: {
    ...mapState({
      userId: state => state.userId,
      complaintName: state => state.name,
      // agentid: state => state.agentid,
      // corpId: state => state.corpId
    }),
    
    
 
    // ...mapState({
    //   userName: state => state.userName
    // })
  },
   props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        checkboxValue: false,
        checkboxGroupValue: [],
        edittitle: "",
        editname: "",
        editdepart: "",
        radioValue: "",
        rateValue: 0,
        selectValue: 2018,
        switchValue: true,
        textareaValue: "",
        uploadValue: [],
        complaintName: "",
        corpId:"",
        appId:""



      },
      schema: {
        groups: [
          {
            fields: [
              {
                type: "input",
                modelKey: "edittitle",
                label: "投诉主题",
                props: {
                  placeholder: "必填"
                },
                rules: {
                  required: true,
                  notWhitespace: true
                },
                // validating when blur
                trigger: "blur"
              },
              
            ]
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: "standard" // classic fresh
      },

      action: {
        target: "/kukacms/visitor/picUpload.htm?type=8",
        fileName: "files"
      },
      files: [],
      edittitle: "",
      editname: "",
      remark: "",
      type: "",
      editdepart: "",
      placeholder: "请您如实详细的填写投诉内容（时间、地点、人物、事情经过等）",
      // rules: {
      //             required: true,
      //             notWhitespace: true
      //           },
      maxlength: 500,
      filePath: "",
      resultValid: ""
    };
  },
  created(){
   
    setDDConfig().then(res=>{
      console.log(res);
      this.corpId = res.corpId,
      this.appId = res.agentid
      console.log(this.corpId)
    console.log(this.appId)
    
    })
    
  },
  methods: {
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      // console.log(  result.valid)
      this.resultValid = result.valid;
    },
    realNameSubmint() {
      this.$createDialog({
        type: "confirm",
        icon: "cubeic-alert",
        content: "是否提交实名投诉？",
        onConfirm: () => {
          if (!this.resultValid) {
            this.$createDialog({
              type: "alert",
              icon: "cubeic-alert",
              showClose: true,
              title: "必填项不能为空",
              onClose: () => {
                this.$createToast({
                  type: "warn",
                  time: 1000,
                  txt: "点击关闭按钮"
                }).show();
              }
            }).show();
            return;
          }
          if (this.remark == "") {
            this.$createToast({
              type: "warn",
              time: 1000,
              txt: "投诉内容不能为空"
            }).show();
            return;
          }
          this.type = 1;

          let creatTime = moment().format();
          const realSubmit = {};
          (realSubmit.title = this.model.edittitle),
            (realSubmit.name = this.editname),
            (realSubmit.depart = this.editdepart),
            (realSubmit.remark = this.remark),
            (realSubmit.filePath = this.filePath),
            (realSubmit.userId = this.userId),
            (realSubmit.complaintName = this.complaintName),
            (realSubmit.type = this.type),
            (realSubmit.creatTime = creatTime),
            submitEdit(realSubmit).then(res => {
              // console.log(res);
              this.model.edittitle = "";
              this.editname = "";
              this.editdepart = "";
              this.remark = "";
              this.filePath = "";
              this.files = [];
            });

          this.$createToast({
            type: "warn",
            time: 3000,
            txt: "成功提交"
          }).show();
          // this.$router.push('/')
        },
        onCancel: () => {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: "取消提交"
          }).show();
        }
      }).show();
    },
    anonymouSubmit() {
      // console.log(this.model.title);

      this.$createDialog({
        type: "confirm",
        icon: "cubeic-alert",
        content: "是否提交匿名投诉？",
        onConfirm: () => {
          if (!this.resultValid) {
            this.$createDialog({
              type: "alert",
              icon: "cubeic-alert",
              showClose: true,
              title: "必填项不能为空",
              onClose: () => {
                this.$createToast({
                  type: "warn",
                  time: 1000,
                  txt: "点击关闭按钮"
                }).show();
              }
            }).show();
            return;
          }
          if (this.remark == "") {
            this.$createToast({
              type: "warn",
              time: 1000,
              txt: "投诉内容不能为空"
            }).show();
            return;
          }
          this.type = 2;
          // this.type = 1;
          
          
          let creatTime = moment().format();
          const annoySubmit = {};
          (annoySubmit.title = this.model.edittitle),
            (annoySubmit.name = this.editname),
            (annoySubmit.depart = this.editdepart),
            (annoySubmit.remark = this.remark),
            (annoySubmit.filePath = this.filePath),
            (annoySubmit.userId = this.userId),
            (annoySubmit.type = this.type),
            (annoySubmit.creatTime = creatTime),
            submitEdit(annoySubmit).then(res => {
              // console.log(res);
              this.model.edittitle = "";
              this.editname = "";
              this.editdepart = "";
              this.remark = "";
              this.filePath = "";
              this.files = [];
            });
          this.$createToast({
            type: "warn",
            time: 3000,
            txt: "成功提交"
          }).show();
          //  this.$router.push('/')
        },
        onCancel: () => {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: "取消提交"
          }).show();
        }
      }).show();
    },
    test(res) {
      // console.log(res.response.data[1])
      // console.log(res.response.data[1]);
      this.filePath = res.response.data[1];
    },
    // share () {
    //   let that = this
    //   let myurl = window.location.href
    //   dd.ready(() => {
    //     dd.biz.util.share({
    //         type: 0,//分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
    //         url: myurl,
    //         title: that.title,
    //         content: that.content,
    //         image: that.image,
    //         onSuccess : function() {
    //             //onSuccess将在调起分享组件成功之后回调
    //             /**/
    //         },
    //         onFail : function(err) {}
    //     })
    //   })
    // },
  //获取投诉人信息
    getUserId(){
      let that = this
      let myurl = window.location.href
      dd.ready(() => {
        dd.biz.contact.complexPicker({
          title:"测试标题",            //标题
          corpId:that.corpId,    //企业的corpId
          multiple:true,            //是否多选
          limitTips:"超出了",          //超过限定人数返回提示
          maxUsers:1000,            //最大可选人数
          pickedUsers:[],            //已选用户
          pickedDepartments:[],          //已选部门
          disabledUsers:[],            //不可选用户
          disabledDepartments:[],        //不可选部门
          requiredUsers:[],            //必选用户（不可取消选中状态）
          requiredDepartments:[],        //必选部门（不可取消选中状态）
          appId:that.appId,              //微应用的Id
          permissionType:"GLOBAL",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly:false,        //返回人，或者返回人和部门
          startWithDepartmentId:0 ,   //仅支持0和-1
          onSuccess: function(result) {
              that.editname = result.users[0].name
              that.editdepart = result.departments[0].name

              // {
              //     selectedCount:1,                              //选择人数
              //     that.users=[{"name":"","avatar":"","emplId":""}];//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
              //     that.departments=[{'id':"","name":"","number":''}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
              // }
             
          },
          onFail : function(err) {
            console.log(err)
          }
        })
      })
    
    },

    //获取用户部门
    getDepartment(){
      let that = this
      let myurl = window.location.href
      dd.ready(() => {
        dd.biz.contact.departmentsPicker({
          title:"测试标题",            //标题
          corpId:that.corpId,    //企业的corpId
          multiple:true,            //是否多选
          limitTips:"超出了",          //超过限定人数返回提示
          maxDepartments:100,            //最大可选人数
          pickedDepartments:[],          //已选部门
          disabledDepartments:[],        //不可选部门
          requiredDepartments:[],        //必选部门（不可取消选中状态）
          appId:that.appId,              //微应用的Id
          permissionType:"GLOBAL",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          onSuccess: function(result) {
            // console.log(result);
            
              that.editdepart = result.departments[0].name

              // {
              //     selectedCount:1,                              //选择人数
              //     that.users=[{"name":"","avatar":"","emplId":""}];//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
              //     that.departments=[{'id':"","name":"","number":''}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
              // }
             
          },
          onFail : function(err) {
            console.log(err)
          }
        })
      })
    }
  }
};
</script>
<style lang="stylus" scoped>
.mui-tab-item{
  background-color: #ccc
  color: inherit
}
.clear-fix{
  width:300px
  height: 100px
}
.cube-input-field{
  height:200px
}

.cube-upload
  .cube-upload-file, .cube-upload-btn
    margin: 0
    height: 100px
  .cube-upload-file
    margin-top: 10px
    width 100px
    height 100px
    float left
    + .cube-upload-btn
      margin-top: -200px
      opacity: 0
  .cube-upload-file-def
    width: 100%
    height: 100%
    .cubeic-wrong
      display: none
  .cube-upload-btn
    display: flex
    align-items: center
    justify-content: center
    > div
      text-align: left
      margin-right 190px
    i
      display: inline-flex
      align-items: center
      justify-content: center
      width: 50px
      height: 50px
      margin-bottom: 20px
      font-size: 32px
      line-height: 1
      font-style: normal
      color: #fff
      background-color: #333
      border-radius: 50%

      
      
      

</style>