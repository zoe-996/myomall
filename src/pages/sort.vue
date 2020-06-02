<template>
  <div class="sortPage">
    <div class="titStyle">
      <span class="fa fa-angle-left fa-lg" @click="goBack"></span>
      <span>{{title}}</span>
      <span class="fa fa-external-link"></span>
    </div>
    <img :src="$baseurl + 'swiper2.jpg'" style="width:100%;display:block;margin-top:0.9rem;">
    <ul class="ulStyle" style="background-color:#f5f5f5;">
      <li v-for="item in arr" :key="item.id">
        <router-link :to="'/detail?id='+item._id">
          <img :src="$baseurl + item.img" />
          <p>{{item.name}}</p>
          <span class="nowPrice">&yen;{{item.nowprice}}</span>
          <span class="oldPrice">&yen;{{item.oldprice}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      arr: []
    };
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    }
  },
  created() {
    if(this.$route.query.sort != null){
      this.title = this.$route.query.sort;
      this.$axios.get(this.$baseurl2 + "sort?sort=" + this.title).then(res => {
      this.arr = res.data;
      });
    }
    if(this.$route.query.brand != null){
      this.title = this.$route.query.brand;
      this.$axios.get(this.$baseurl2 + "brand?brand=" + this.title).then(res => {
      this.arr = res.data;
      });
    }
    if(this.$route.query.productID == '1'){
      this.title = 'America';
      this.$axios.get(this.$baseurl2 + "productID?productID=1").then(res => {
      this.arr = res.data;
      });
    }
    if(this.$route.query.productID == '3'){
      this.title = 'China';
      this.$axios.get(this.$baseurl2 + "productID?productID=3").then(res => {
      this.arr = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.titStyle {
  width: 100%;
  height: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 0;
  background-color: #ffffff;
  border-bottom: 1px solid #eeeded;
}
</style>