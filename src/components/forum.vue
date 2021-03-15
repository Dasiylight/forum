<template>

  <div id="forum">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"><el-button type="primary" icon="el-icon-edit" @click="publish">留言</el-button></el-col>
      <el-col :span="6"><el-button type="info" icon="el-icon-message" @click="showHistory">列表</el-button></el-col>
      <el-avatar v-if="myAvatar" :span="3"  :src="myAvatar"></el-avatar>
      <div style="margin: 0 5px;"></div>
      <el-col :span="6">欢迎您， {{this.$route.query.username}}</el-col>
      <el-col :span="6"><el-button type="alert"  @click="exit">退出</el-button></el-col>
    </el-row>

<!--    <h2>{{$router.query.username}}</h2>-->
    <div style="margin: 20px 0;"></div>
    <el-input
      type="textarea"
      autosize
      placeholder="请输入标题"
      v-model="newMessage.title"
      v-if="showPublish">
    </el-input>
    <div style="margin: 20px 0;"></div>

    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="newMessage.content"
      v-if="showPublish">
    </el-input>

    <div style="margin: 20px 0;"></div>
    <el-button type="success" icon="el-icon-check" v-if="showPublish" @click="submit">提交</el-button>

    <div style="margin: 20px 0;"></div>
    <p v-for="(thing,i) in page.pageData" v-if="showMessage">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span >{{thing.title}}</span>
          <el-avatar style="float: right " :span="6"  :src="thing.avatar"></el-avatar>
          <span style="float: right">By: {{thing.username}}</span>
        </div>
        <div  class="text item">
          <div>{{thing.content}}</div>
          <span style="padding-right: 3px ">{{thing.time}}</span>
        </div>
      </el-card>
    </p>

    <el-pagination
      id = "pagination"
      v-if="showPage"
      @prev-click="goPrevPage"
      @next-click="goNextPage"
      :current-page.sync="page.current"
      @current-change="goSetPage"
      :page-size="page.size" layout="total, prev, pager, next, jumper"
      :total="this.historyMessage.length">
    </el-pagination>

  </div>
</template>

<script>

  export default {
    name: 'forum',

    computed:{
      //返回总页数
      totalPages(){
        return Math.ceil(this.historyMessage.length / this.page.size) || 1 ;
        // console.log(this.historyMessage.length)
      },
    },

    data(){
      return{
        newMessage:{
          title:"",
          content:"",
          username:"",
          time:"",
        },

        historyMessage:[],
        // historyAvatar:[],
        showPublish:'',
        showMessage:'',
        showPage:'',
        user:{
          username:[],
          userAvatar:[],
        },
        myAvatar:'',
        defaultAvatar:require("../../img/img.jpg"),

        page:{
          current:1,
          // total:1,
          size:4, //每页10条数据
          pageData:[]  //每页的数据
        },

      }
    },
    methods:{
      publish(){
         this.showPublish = true;
         this.newMessage.username = this.$route.query.username;
         this.showMessage = '';
      },

      getTime(){
        let date = new Date();
        let year = date.getFullYear(); // 年
        let month = date.getMonth() + 1; // 月
        let day = date.getDate(); // 日
        let week = date.getDay(); // 星期
        let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
        let hour = date.getHours(); // 时
        hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
        let minute = date.getMinutes(); // 分
        minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
        let second = date.getSeconds(); // 秒
        second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
        this.newMessage.time = `${year}/${month}/${day} ${hour}:${minute}:${second} ${weekArr[week]}`;
      },

      submit(){
        // this.historyMessage.push({
        //     title: this.newMessage.title,
        //     username: this.newMessage.username,
        //     content: this.newMessage.content});
        // alert("提交成功!");

        //提交将发表的信息传入数据库中
        this.getTime()
        let name = this.newMessage.username;
        let title = this.newMessage.title;
        let content = this.newMessage.content;
        let time = this.newMessage.time;
        this.$axios.post('/api/message/addMessage', {
          username: name,
          title: title,
          content: content,
          time: time,
        },{}).then((response) => {
          this.showPublish = ''
        });
        alert("发表成功！")
      },

      showHistory(){
        this.showPublish = ''
        this.showMessage = true;
        this.$axios.get('api/message/searchMessage',
          {}).then((response) => {
          // console.log(response.data);
          this.historyMessage = response.data;
          //提取出留言过的用户，得到他们的头像
          for (let i=0; i<this.historyMessage.length; i++){
            this.user.username.push(this.historyMessage[i].username);
          }
          //去除重复用户
          for (let i=0; i<this.historyMessage.length; i++){
            for(let j=1; j<this.historyMessage.length; j++){
              if (this.user.username[i] === this.user.username[j]){
                this.user.username.splice(j,1);
              }
            }
          }
          //为各个用户绑定头像
          for (let i=0; i<this.user.username.length; i++){
            this.$http.post('api/user/searchAvatar',{
              username:this.user.username[i]
            },{}).then((response)=>{
              this.user.userAvatar[i] = response.data[0].pic;
              if (!this.user.userAvatar[i]){
                this.user.userAvatar[i] = this.defaultAvatar;
              }
            });
          }
          this.setCurrentPage();
          //为每条留言赋予头像
          // console.log(this.historyMessage)
          // console.log(this.user);
        });
        // this.$axios.post('api/user/search')
        this.showMessage = true;
        this.showPage = true;
      },

      setCurrentPage(){
        //改变当前页面的数据
        for(let i=0; i<this.page.pageData.length; i++) {
          for (let j = 0; j < this.user.username.length; j++) {
            if (this.page.pageData[i].username === this.user.username[j]) {
              this.page.pageData[i].avatar = this.user.userAvatar[j]
              break
            }
          }
        }
        let beginData = (this.page.current - 1) * this.page.size;
        let endData = this.page.current * this.page.size;
        this.page.pageData = this.historyMessage.slice(beginData, endData);

      },

      goNextPage(){
        if(this.page.current < this.totalPages) {
          this.page.current++;
          this.setCurrentPage();
        }
      },

      goPrevPage(){
        if(this.page.current > 1) {
          this.page.current--;
          this.setCurrentPage();
        }
      },

      goSetPage(val){
        if (val >= 1 && val <= this.totalPages){
          this.page.current = val;
          console.log = val;
          this.setCurrentPage();
        }
      },

      exit(){
        this.cookie.clearCookie("username");
        this.cookie.clearCookie("password");
        this.$router.replace('/logIn')
      },
    },
    mounted () {
      //自动触发写入的函数
      //get my avatar from database
      let name = this.$route.query.username;
      this.$axios.post('api/user/searchAvatar',{
        username:name
      },{}).then((response)=>{
        this.myAvatar = response.data[0].pic;
        if (!this.myAvatar){
          this.myAvatar = this.defaultAvatar;
        }
      });
    }
  }
</script>

<style scoped>
  #forum{
    width: 800px;
    left: 50%;
    margin: auto auto;
  }


</style>
