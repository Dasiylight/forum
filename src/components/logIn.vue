<template>
  <div id="logIn">
    <router-view></router-view>
    <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">登录界面</h2>
      <el-form-item class="name">
        <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item class="pwd">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item class="login-button">
        <el-button type="primary" @click="Submit">log in</el-button>
        <el-button type="primary" @click="Reg">register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  //mapMutation：起映射作用的辅助函数？用于储存函数方法
  import {mapMutations} from 'vuex';
  export default{
    name: "login",
    data(){
      //当前输入的用户名和密码
      return {
        form: {
          username: "",
          password: ""
        },
        userToken:''
      }
    },
    methods: {
      //通过子组件定义的方法传递参数，在…mapMutations引用
      ...mapMutations(['logStatus']),
      //登录跳转至留言板界面
      Submit:function () {
        let _this = this;
        let name = this.form.username;
        let password = this.form.password;
        //查找用户名

        this.$axios.post('/api/user/searchUser', {
          username: name,
          password: password
          },
          {}).then((response) => {
          console.log(response.data);
          //不存在用户名提示注册
          if(response.data == -1){
            alert("用户不存在，请先注册！");
          }
          else{
            // alert("用户存在");
            if (response.data.status === 200){
              alert("密码正确，添加token");
              console.log(response.data.token)
              _this.userToken = 'Bearer' + response.data.token;
              _this.logStatus({ Authorization: _this.userToken });
              this.$router.push({path: '/forum', query:{username:this.form.username}});
            }
            else if (response.data.status === 400){
              alert("密码错误，请重新输入");
            }
            else  {
              alert("something wrong?")
            }
          }
        })
      },

      //跳转至注册界面
      Reg:function () {
        //页面跳转至注册界面
        this.$router.push('/Register');
      },
    }
  }
</script>

<style scoped>
  .login-form {
    width: 400px;
    top: 50%;
    left: 50%;
    margin: 160px auto; /* 上下间距160px，左右自动居中*/
    background-color: rgb(255, 255, 255, 0.8);
    padding: 30px;
    border-radius: 30px;
  }
  .login-button{
    top: 50%;
    left: 50%;
  }
  /* 标题 */
  .login-title {
    color: cornflowerblue;
    text-align: center;
  }
</style>
