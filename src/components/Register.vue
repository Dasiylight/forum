<template>
  <div id="Register">

    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="newUser">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" v-model="newUser.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="newUser.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="newUser.checkedPassword"></el-input>
      </el-form-item>
      <el-form-item label="上传头像">
        <el-upload
          class="avatar-uploader"
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleChange">
          <img v-if="imageUrl" :src="imageUrl" width="100px" height="100px" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

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
  export default {
    name: 'Register',
    data () {
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

        //用于上传头像
        imageStr: '',
        imageUrl: '',
        // dialogImageUrl: '',
        file: ''
      }
    },
    methods: {
      addUser () {
        //用户名不为空

        if (this.newUser.username) {
          //检查密码两次输入的密码是否相同
          if (this.newUser.password === this.newUser.checkedPassword) {
            // console.log(this.file)

            alert("完成注册");
            let name = this.newUser.username;
            let password = this.newUser.password;
            let fd = this.imageUrl
            // alert(name);
            //添加用户，若用户已存在，则添加失败
            console.log(this.imageUrl);
            this.$axios.post('/api/user/addUser', {
              username: name,
              password: password,
              pic: fd,
            }, {}).then((response) => {
              // console.log(response);
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

          } else {
            this.checkSame = true;
          }
        } else {
          this.checkUsername = true;
        }
      },

      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // this.dialogImageUrl = file.url;
      },

      handleChange (file) {
        var _this = this;
        // this.dialogImageUrl = file.url;
        this.imageUrl = URL.createObjectURL(file.raw);
        this.file = file.raw;
        console.log(file);
        const isJPG = file.raw.type === 'image/jpeg';
        const isLt2M = file.raw.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          this.imageUrl = '';
        } else if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          this.imageUrl = '';
        } else {
          let reader = new FileReader();
          reader.readAsDataURL(this.file);
          reader.onload = function () {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
            _this.imageUrl = reader.result;
            console.log(_this.imageUrl);
            // 下面逻辑处理
          };
        }
      },
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


  // import VueRouter from 'vue-router'
  // import VueResource from 'vue-resource'
  // app.use(VueRouter)
  // app.use(VueResource)
</script>

<style scoped>
  #Register{
    width: 800px;
    /*left: 50%;*/
    margin: auto auto;
  }
  .avatar-uploader  {
    width: 100px;
    height: auto;
    border: 1px dashed #409EFF;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader :hover {
    border-color: #8c939d;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }


</style>
