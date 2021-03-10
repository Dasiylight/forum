<template>
  <div id="forum">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"><el-button type="primary" icon="el-icon-edit" @click="publish">留言</el-button></el-col>
      <el-col :span="6"><el-button type="info" icon="el-icon-message" @click="showHistory">列表</el-button></el-col>
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

    <p v-for="(user,i) in historyMessage" v-if="showMessage">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{user.title}}</span>
          <span style="float: right; padding: 3px 0">{{user.username}}</span>
        </div>
        <div  class="text item">
          {{user.content}}
        </div>
      </el-card>
    </p>

  </div>
</template>

<script>

  export default {
    name: 'forum',
    data(){
      return{
        newMessage:{
          title:"",
          content:"",
          username:""
        },
        historyMessage:[],
        showPublish:'',
        showMessage:'',
      }
    },
    methods:{
      publish(){
         this.showPublish = true;
         this.newMessage.username = this.$route.query.username;
         this.showMessage = '';
      },
      submit(){
        // this.historyMessage.push({
        //     title: this.newMessage.title,
        //     username: this.newMessage.username,
        //     content: this.newMessage.content});
        // alert("提交成功!");

        //提交将发表的信息传入数据库中
        var name = this.newMessage.username;
        var title = this.newMessage.title;
        var content = this.newMessage.content;
        this.$axios.post('/api/message/addMessage', {
          username: name,
          title: title,
          content: content
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
          console.log(response.data);
          this.historyMessage = response.data
        });
        console.log(this.historyMessage)
        this.showMessage = true;
      },
      exit(){
        this.cookie.clearCookie("username");
        this.cookie.clearCookie("password");
        this.$router.replace('/logIn')
      }
    }
  }
</script>

<style scoped>

</style>
