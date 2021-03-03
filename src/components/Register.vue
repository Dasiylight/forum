<template>
  <div id="app">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="newUser">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" v-model="newUser.username"></el-input>
        <!--                <el-alert v-if="checkUsername"-->
        <!--                        title="用户名已被占用"-->
        <!--                        type="error"-->
        <!--                        show-icon>-->
        <!--                </el-alert>-->
        <!--                <el-alert v-else-->
        <!--                          title="用户名可用"-->
        <!--                          type="success"-->
        <!--                          show-icon>-->
        <!--                </el-alert>-->
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="newUser.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="newUser.checkedPassword"></el-input>
      </el-form-item>
    </el-form>
    <el-button label="fin" v-on:click="addUser">完成注册</el-button>
    <el-alert v-if="checkUsername"
              title="用户名不能为空"
              type="error"
              show-icon>
    </el-alert>
    <el-alert v-if="checkSame"
              title="两次输入的密码不同，请重新输入"
              type="error"
              show-icon>
    </el-alert>
    <el-alert v-if="repeatedUser"
              title="用户名已存在，请重新选择用户名"
              type="error"
              show-icon>
    </el-alert>
  </div>
</template>

<script>
  export default{
    name:'Register',
    data(){
      return {
        labelPosition: 'top',
        newUser: {
          username: '',
          password: '',
          checkedPassword: ''
        },
        checkUsername: '',
        checkSame: '',
        repeatedUser: '',
      }
    },
    methods:{
      addUser() {
        //用户名不为空
        if(this.newUser.username) {
          //检查密码两次输入的密码是否相同
          if (this.newUser.password === this.newUser.checkedPassword) {

            alert("完成注册");
            var name = this.newUser.username;
            var password = this.newUser.password;
            alert(name);
            //添加用户，若用户已存在，则添加失败
            this.$axios.post('/api/user/addUser', {
              username: name,
              password: password
            },{}).then((response) => {
              console.log(response);
              //判断添加是否成功
              if (response.data == -1) {
                this.repeatedUser = true;
              } else {
                //注册成功
                this.$alert('注册成功，即将跳转至登录界面', '完成注册', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push('/logIn')
                  }
                })
              }
            })

          }
          else {
            this.checkSame = true;
          }
        }
        else {
          this.checkUsername = true;
        }
      }
    }
    // judge() {
    //     //用户名不为空
    //     if(this.newUser.name) {
    //         //检查密码两次输入的密码是否相同
    //         if (this.newUser.password === this.newUser.checkedPassword) {
    //             //添加用户
    //             alert("完成注册");
    //             this.$http.post('api/user/addUser', {
    //                 username: this.newUser.name,
    //                 password: this.newUser.password
    //             }, {}).then((response) => {
    //                 alert(response);
    //             })
    //         }
    //         else {
    //             this.checkSame = true;
    //         }
    //     }
    //     else {
    //         this.checkUsername = true;
    //     }
    // }


  }
  // import VueRouter from 'vue-router'
  // import VueResource from 'vue-resource'
  // app.use(VueRouter)
  // app.use(VueResource)
</script>
