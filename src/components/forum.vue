<template>

  <div id="forum">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"><el-button type="primary" icon="el-icon-edit" @click="publish">留言</el-button></el-col>
      <el-col :span="6"><el-button type="info" icon="el-icon-message" @click="showHistory">列表</el-button></el-col>
      <el-col :span="6">欢迎您， {{this.$route.query.username}}</el-col>
      <el-col :span="6"><el-button type="alert"  @click="exit">退出</el-button></el-col>
    </el-row>
    <div>{{newMessage.time}}</div>

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
    <p v-for="(user,i) in page.pageData" v-if="showMessage">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span >{{user.title}}</span>

          <span style="float: right; padding: 3px 0">By: {{user.username}}</span>
        </div>
        <div  class="text item">
          <div>{{user.content}}</div>
          <span style="padding-right: 3px">{{user.time}}</span>
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
        showPublish:'',
        showMessage:'',
        showPage:'',

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
          console.log(response);
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
          console.log(this.historyMessage.length);
          this.setCurrentPage()
        });
        this.showMessage = true;
        this.showPage = true;
        // console.log(this.page.current)
      },

      setCurrentPage(){
        //改变当前页面的数据
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
