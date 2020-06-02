<template>
  <transition
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <div class="user" v-if="isShow">
      <div class="titlebar">
        <span
          class="fa fa-angle-left fa-lg"
          @click="goback"
          style="margin-left:10px;"
        ></span>
        <span>用户信息</span>
        <span @click="changeDiv" style="margin-right:10px;">切换</span>
      </div>
      <div v-show="dataShow">
        <mt-field label="用户名" v-model="username" readonly></mt-field>
        <mt-field label="性别" v-model="sex" readonly></mt-field>
        <mt-field label="邮箱" v-model="email" readonly></mt-field>
        <mt-field label="手机号" v-model="phone" readonly></mt-field>
        <mt-field label="生日" v-model="birthday" readonly></mt-field>
        <mt-field label="收货地址" v-model="addr" readonly></mt-field>
        <br />
        <br />
        <mt-button size="large" @click="logout">退出当前登录</mt-button>
      </div>
      <div v-show="!dataShow">
        <mt-field label="用户名" v-model="username" readonly></mt-field>
        <mt-field label="性别" placeholder="请填写您的性别"></mt-field>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email"></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel"></mt-field>
        <mt-field label="生日" placeholder="请输入生日" type="date"></mt-field>
        <mt-field label="收货地址" placeholder="请输入收货地址" type="text"></mt-field>
        <br />
        <br />
        <mt-button size="large" @click="alter">修改</mt-button>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      dataShow:true,
      username: localStorage.getItem("username"),
      sex: localStorage.getItem("sex")||'未填写',
      email: localStorage.getItem("email")||'未填写',
      phone: localStorage.getItem("phone")||'未填写',
      birthday: localStorage.getItem("birthday")||'未填写',
      addr: localStorage.getItem("addr")||'未填写'
    };
  },
  created() {
    this.$eventbus.$on(
      "trigger",
      function() {
        this.isShow = !this.isShow;
      }.bind(this)
    );
  },
  methods: {
    goback() {
      this.isShow = !this.isShow;
    },
    changeDiv(){
        this.dataShow = !this.dataShow;
    },
    logout() {
      localStorage.removeItem('token');
      location.href = this.$baseurl2 + 'login.html';
    },
    alter(){
      var a = document.getElementsByTagName('input');
      this.$axios.put('/userInfo','username=' + this.username + '&sex=' + a[7].value + '&email='+ a[8].value + '&phone='+ a[9].value + '&birthday='+ a[10].value + '&addr='+ a[11].value).then(res => {
        this.sex = res.data.sex;
        this.email = res.data.email;
        this.phone = res.data.phone;
        this.birthday = res.data.birthday;
        this.addr = res.data.addr;
        localStorage.setItem('sex',res.data.sex);
        localStorage.setItem('email',res.data.email);
        localStorage.setItem('phone',res.data.phone);
        localStorage.setItem('birthday',res.data.birthday);
        localStorage.setItem('addr',res.data.addr);
        alert(res.data.msg);
        this.dataShow = !this.dataShow;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user {
  .titlebar {
    display: flex;
    align-items: center;
    justify-content:space-between;
    height: 1rem;
    width: 100%;
  }
  .mint-button {
    background: #cc54cc;
    color: #ffffff;
  }
}
</style>