<template>
  <div class="detail">
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <div class="titlebar">
      <li>
        <span class="fa fa-angle-left fa-lg" @click="goback"></span>
      </li>
      <li>
        <a href="#top1">商品</a>
      </li>
      <li>
        <a href="#top2">口碑</a>
      </li>
      <li>
        <a href="#top3">详情</a>
      </li>
    </div>
    <div id="top1" class="im">
      <img :src="$baseurl + img" v-if="img" />
    </div>
    <span class="nowPrice">&yen;{{nowprice}}</span>
    <span class="oldPrice">&yen;{{oldprice}}</span>
    <div class="im2">
      <mt-badge size="small" color="#bb23bb">全球直邮</mt-badge>
      <span>&emsp;{{title}}</span>
      <br/>
      <span class="share fa fa-share-alt" @click="share"></span>
    </div>
    <mt-cell title="发货" label="📍 中国大陆" value="月销28"></mt-cell>
    <mt-cell title="活动" value="【满件折】 2件8折火爆进行中" is-link></mt-cell>
    <mt-cell title="保障" value="假一赔四 . 七天内无理由退换" is-link></mt-cell>
    <mt-cell title="运费" value="满299.0免运费"></mt-cell>
    <mt-cell title="选择" value="颜色分类，鞋码" is-link></mt-cell>
    <div id="top2">
      <div class="im3">
        <span class="fa fa-caret-right fa-lg" style="color:#bb23bb;"></span>&emsp;用户口碑
        <span class="fa fa-chevron-right" style="float:right;color:#ccc"></span>
      </div>
      <div class="con">
          <img :src="this.$baseurl + 'comment.jpeg'"/>
          <div>好评！这是一个评论！这是一个评论！这是一个评论！hahahaha</div>
        </div>
    </div>
    <div id="top3">
      <div class="im3">商品详情</div>
      <img v-for="val in imgName" :key="val.id" :src="$baseurl + val"/>
    </div>
    <mt-button size="small" @click="addCart">加入购物车</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      item: {},
      id: 0,
      img: "",
      title: "",
      nowprice: "",
      oldprice: "",
      actions: [
        { name: "微信", method: "" },
        { name: "QQ", method: "" },
        { name: "朋友圈", method: "" }
      ],
      sheetVisible: false,
      imgName:['xq01.jpg','xq02.jpg','xq03.jpg','xq04.jpg','xq05.jpg','xq06.jpg','xq07.jpg','xq08.jpg','xq09.jpg','xq10.jpg','xq11.jpg']
    };
  },
  async created() {
    this.id = this.$route.query.id;
    var { data } = await this.$axios.get(
      this.$baseurl2 + "commodity?id=" + this.id
    );
    this.item = data[0];
    this.title = this.item.name;
    this.img = this.item.img;
    this.nowprice = this.item.nowprice;
    this.oldprice = this.item.oldprice;
  },
  methods: {
    share() {
      this.sheetVisible = true;
    },
    goback() {
    this.$router.go(-1);
    },
    addCart() {
      this.$store.dispatch("addCart", this.item);
      Toast({
        message: "添加成功",
        iconClass: "mintui mintui-success",
        duration: 2000
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.detail {
  position: absolute;
  top: 0;
  bottom: 0;
  background: #f5f5f5;
  width: 100%;
  .titlebar {
      position: fixed;
      top: 0;
      z-index: 999;
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #ffffff;
    border-bottom: 1px solid #f5f5f5;
  }
  .im {
    height: 4rem;
    overflow: hidden;
    width: 100%;
    background: #ffffff;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 1rem;
    img {
      width: 50%;
    }
  }
  .im2 {
    position: relative;
    height: 1rem;
    margin: 10px 0;
    padding: 20px 10px;
    background: #ffffff;
    .share {
      position: absolute;
      right: 0;
      bottom: 20px;
      padding: 0 25px;
    }
  }
  #top2 {
    height: 4rem;
    width: 100%;
    background: #ffffff;
    margin: 10px 0 20px 0;
    .im3 {
      padding: 10px 16px 10px 10px;
    }
    .con{
        img{
            width:50%;
            margin: 10px;
            float: left;
        }
    }
  }
  #top3{
      margin: 10px 0;
      .im3{
          text-align: center;
          width: 4.5rem;
          height: 40px;
          line-height: 40px;
          border-radius: 20px;
          background: #313131;
          color: #f5f5f5;
          margin: 10px auto;
      }
      img{
          display: block;
          width: 100%;
      }
  }
  .mint-button {
    position: fixed;
    right: 0.5rem;
    bottom: 1.3rem;
    color: #ffffff;
    background: #cc54cc;
    border-radius: 25px;
  }
}
</style>