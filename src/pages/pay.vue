<template>
  <div class="payPage">
    <div class="titStyle">
      <span class="fa fa-angle-left fa-lg" @click="goBack"></span>
      <span>确认订单</span>
    </div>
    <div class="addrWrap">
      <div class="addrInfo">
        <span class="fa fa-map-marker fa-2x"></span>
        <div class="wrap">
          <h4>{{username}}</h4>
          <h4>&emsp;{{phone}}</h4>
          <p>收货地址：</p>
          <p style="color:#aaa">{{addr}}</p>
        </div>
        <span>
            <router-link to="/addr">
            编辑 <i class="fa fa-angle-right fa-lg"></i>
            </router-link>
        </span>
      </div>
    </div>
    <ul>
      <li v-for="item in car" :key="item.id">
        <div class="image">
          <img :src="$baseurl+item.img" />
        </div>
        <div class="text">
          <p>{{ item.name }}</p>
          <p>&yen;{{ item.nowprice }}</p>
          <p style="float:right;margin-right:10px;">x{{item.num}}</p>
        </div>
      </li>
    </ul>
    <div style="margin:10px;height: 1rem;line-height:1rem;">
        <span>总计：&yen;{{ allMoney }}</span>
        <button @click="pay">提交订单</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        addr:localStorage.getItem('addr')||'请点击“编辑”填写收货信息',
        username:localStorage.getItem('name'),
        phone:localStorage.getItem('phone')
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async pay(){
      var totalMoney = this.allMoney;
      var str = '共'+this.car.length +'件商品'
      var {data} = await this.$axios.get(this.$baseurl2 + 'pay?totalMoney=' + totalMoney + '&detil=' + str);
      location.href = data.result;
    }
  },
  computed: {
    car() {
      return this.$store.state.goods;
    },
    allMoney() {
      return this.$store.getters.allMoney;
    }
  }
};
</script>
<style lang="scss" scoped>
.titStyle {
  height: 1rem;
  display: flex;
  align-items: center;
  span {
    padding-left: 20px;
  }
}
.addrWrap {
  display: flex;
  width: 100%;
  height: 3rem;
  background-color: #f5f5f5;
  .addrInfo {
    display: flex;
    height: 2.5rem;
    width: 90%;
    margin: auto;
    background-color: #fff;
    border-radius: 10px;
    span {
      margin: auto 20px;
      color: #cc54cc;
    }
    .wrap {
      flex: 1;
      margin: 15px 0;
      h4 {
        display: inline;
      }
    }
  }
}
ul{
  width: 100%;
  background-color: #f5f5f5;
  padding-bottom: 10px;
  li {
    width: 95%;
    display: flex;
    background: #ffffff;
    height: 2.7rem;
    margin: 0 auto;
    border-bottom: #f5f5f5 1px solid;
    .image {
      width: 30%;
      margin: auto 1px;
      img {
        width: 2rem;
      }
    }
    .text {
      text-align: left;
      flex: 1;
      margin: auto 0;
    }
  }
}
button {
  height: 1rem;
  width: 2rem;
  float: right;
  background: #cc54cc;
  color: #ffffff;
  border: none;
  font-size: 16px;
}
</style>