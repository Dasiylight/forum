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
  </div>
</template>

<script>
  export default{
    data(){
      return {
        labelPosition: 'top',
        newUser: {
          username: '',
          password: '',
          checkedPassword: ''
        },
        checkUsername: '',
        checkSame: ''
      }
    },
    methods:{
      addUser() {
        //用户名不为空
        if(this.newUser.username) {
          //检查密码两次输入的密码是否相同
          if (this.newUser.password === this.newUser.checkedPassword) {
            //判断用户名是否已存在
            // this.$axios.get('api/user/searchUser', {
            //   username: name
            // },{}).then((response) => {
            //   console.log(response);
            // })
            //添加用户
            alert("完成注册");
            var name = this.newUser.username;
            var password = this.newUser.password;
            alert(name)
            this.$axios.post('/api/user/addUser', {
              username: name,
              password: password
            },{}).then((response) => {
              console.log(response);
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
