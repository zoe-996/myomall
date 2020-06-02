<template>
  <div class="recommend content">
    <div class="goods" @touchmove.prevent>
      <ul class="ulStyle">
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
  </div>
</template>
<script>
import Iscroll from "iscroll";
import { Indicator, Toast } from "mint-ui";
export default {
  name: "Recommend",
  data() {
    return {
      arr: [],
      p: 1
    };
  },
  methods: {
    iscrollRefresh() {
      setTimeout(() => {
        this.myScroll.refresh();
      }, 500);
    },
    async init() {
      var { data } = await this.$axios.get(this.$baseurl2 + "list?p=1");
      this.arr = data;
      this.iscrollRefresh();
    },
    async more() {
      this.p++;
      var { data } = await this.$axios.get(this.$baseurl2 + "list?p=" + this.p);
      this.arr = [...this.arr, ...data];
      this.iscrollRefresh();
    }
  },
  mounted() {
    this.init();
    setTimeout(() => {
      var myScroll = new Iscroll(".goods", { mouseWheel: true });
      this.myScroll = myScroll;

      this.myScroll.on("scrollEnd", () => {
        if (myScroll.y == 0) {
          Indicator.open({
            text: "正在刷新...",
            spinnerType: "triple-bounce"
          });
          this.init();
          this.p = 1;
          setTimeout(() => {
            Indicator.close();
          }, 1000);
        }
        var ulH = document.querySelector(".goods>ul").offsetHeight;
        var contentH = document.querySelector(".goods").clientHeight;
        if (myScroll.y == contentH - ulH) {
          if (this.p == 4) {
            Toast({
              message: "啊哦！商品加载完了^_^",
              duration: 1000
            });
            return;
          }
          Indicator.open({
            text: "加载中...",
            spinnerType: "fading-circle"
          });
          this.more();
          setTimeout(() => {
            Indicator.close();
          }, 1000);
        }
      });
    }, 500);
  }
};
</script>
<style lang="scss" scoped>
.recommend {
  .goods {
    height: 100%;
  }
}
</style>