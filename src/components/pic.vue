<template>
  <transition enter-active-class="animated bounceIn" leave-active-class="animated fadeOut">
    <div class="pic" v-if="showPic">
      <div class="wrap">
        <div style="height:1rem;line-height:1rem;">
          修改头像
          <span
            class="fa fa-times"
            @click="goback"
            style="float:right;height:1rem;line-height:1rem;margin-right:15px;"
          ></span>
        </div>
        <div class="box">
          <form @submit="formSubmit" id="form">
            <input type="text" name="id" :value="this.id" />
            <input type="file" name="file" @change="showImg" />
            <img :src="$baseurl2 + this.img" id="imgSrc" />
            <br/>
            <label>从相册中选择图片</label>
            <br/>
            <br/>
            <button>上 传</button>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      showPic: false,
      id: localStorage.getItem("id"),
      img: localStorage.getItem("img")
    };
  },
  created() {
    this.$eventbus.$on(
      "showPic",
      function() {
        this.showPic = !this.showPic;
      }.bind(this)
    );
  },
  methods: {
    goback() {
      this.showPic = !this.showPic;
    },
    showImg(e) {
      var choose_file = e.target.files[0];
      if (!choose_file.type.includes("image/")) {
        Toast({
          message: "格式错误，请选择图片！",
          duration: 1000
        });
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(choose_file);
      reader.onload = function() {
        var elImg = document.getElementById("imgSrc");
        elImg.setAttribute("src", this.result);
      };
    },
    formSubmit(e) {
      e.preventDefault();
      var fd = new FormData(document.getElementById("form"));
      this.$axios.put(this.$baseurl2 + "user", fd).then(res => {
        localStorage.setItem("img",res.data.img);
        alert(res.data.msg);
        this.$eventbus.$emit('refreshPic');
        this.showPic = !this.showPic;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.pic {
  .wrap {
    width: 70%;
    height: 5rem;
    background: #fff;
    margin: 2rem auto;
    text-align: center;
    border-radius: 10px;
    .box {
      position: relative;
      img {
        display: block;
        height:1.5rem;
        margin: 0 auto;
      }
      input {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2.2rem;
      }
      button{
        width: 50%;
        height: 0.8rem;
        border: none;
        border-radius: 10px;
        font-size: 18px;
      }
    }
  }
}
</style>