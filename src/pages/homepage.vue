<template>
  <div class="homepage content">
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <div class="search">
      <span class="fa fa-search" style="position:absolute;padding: 0 20px;"></span>
      <router-link to="/search">
        <input type="search" placeholder="搜索"/>
      </router-link>
      <span class="fa fa-share-alt fa-lg" @click="share"></span>
    </div>
    <div class="scroll" @touchmove.prevent>
      <div>
        <div class="swiper-container box">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="val in arr1" :key="val.id">
              <img :src="$baseurl + val" />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <ul class="nav">
          <li v-for="(val,tit) in obj" :key="val.id">
            <router-link :to="'/sort?sort='+tit">
              <img :src="$baseurl + val" />
              <p>{{tit}}</p>
            </router-link>
          </li>
        </ul>
        <div class="products">
          <div class="top">
            <span class="fa fa-clock-o fa-lg">&emsp;每日上新</span>
            <a href="#" style="float:right;">查看更多></a>
          </div>
          <div class="con">
            <ul>
              <li v-for="val in arr2" :key="val.id">
                <a href="#">
                  <img :src="$baseurl + val" />
                </a>
                <p class="nowPrice">&yen;10.00</p>
                <p class="oldPrice">&yen;100.00</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="sift">
          <h3 style="color: #bb23bb;text-align: center;">/// 精选活动 ///</h3>
          <ul>
            <li v-for="val in [1,2,3,4]" :key="val.id">
              <a href="#">
                <img :src="$baseurl + 'sift1.jpg'" />
              </a>
            </li>
          </ul>
        </div>
        <h3 style="color: #bb23bb;text-align: center;">/// 猜你喜欢 ///</h3>
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
  </div>
</template>
<script>
import Iscroll from "iscroll";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { Indicator, Toast } from "mint-ui";
export default {
  name: "Homepage",
  data() {
    return {
      actions: [
        { name: "微信", method: "" },
        { name: "QQ", method: "" },
        { name: "朋友圈", method: "" }
      ],
      sheetVisible: false,
      p: 1,
      arr: [],
      arr2: ["p1.jpg", "p2.jpg", "p3.jpg"],
      arr1: [
        "swiper1.jpeg",
        "swiper2.jpg",
        "swiper3.jpeg",
        "swiper4.jpeg",
        "swiper5.jpg",
        "swiper6.jpg"
      ],
      obj: {
        至IN美妆: "i1.jpg",
        时尚衣柜: "i2.jpg",
        品质家具: "i3.png",
        家电数码: "i4.png",
        优质跑鞋: "i5.png",
        秒杀: "i6.gif",
        轻奢时尚: "i7.png",
        品质包包: "i8.png"
      }
    };
  },
  methods: {
    share() {
      this.sheetVisible = true;
    },
    iscrollRefresh() {
      setTimeout(() => {
        this.myScroll.refresh();
      }, 1000);
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
      var myScroll = new Iscroll(".scroll");
      this.myScroll = myScroll;
      this.myScroll.on("scrollEnd", () => {
        var ulH = document.querySelector(".scroll>div").offsetHeight;
        var contentH = document.querySelector(".scroll").clientHeight;
        if (myScroll.y == contentH - ulH) {
          if (this.p == 4) {
            Toast({
              message: "我也是有底线滴！",
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
  },
  activated() {
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: true,
      observerParents:true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
    this.iscrollRefresh();
  },
};
</script>
<style lang="scss" scoped>
.homepage {
  .search,.box,.nav,.products,.sift {
    background: #ffffff;
  }
  .search {
    width: 100%;
    height: 0.9rem;
    display: flex;
    a{
      flex: 1;
      margin: auto 10px;
      input{
      width: 100%;
      height: 30px;
      padding-left: 30px;
      border: none;
      border-radius: 15px;
      background-color: #eeeded;
      }
    }
    span {
      padding: 0 10px 0 0;
      color: rgb(117, 111, 111);
      height: 0.9rem;
      line-height: 0.9rem;
    }
  }
  .scroll {
    overflow: hidden;
    height: 100%;
    .box {
      height: 4rem;
      .swiper-slide img {
        width: 100%;
        height: 4rem;
      }
    }
    .swiper-pagination {
      --swiper-pagination-color: #bb23bb;
    }
    .nav {
      margin: 0 auto;
      padding-top: 10px;
      width: 100%;
      height: 2.8rem;
      li {
        display: inline-block;
        width: 25%;
          img {
            height: 0.8rem;
          }
          p {
            font-size: 13px;
            height: 25px;
            line-height: 25px;
          }
      }
    }
    .products {
      margin: 10px auto;
      padding: 10px;
      .con {
        margin-top: 10px;
        li {
          display: inline-block;
          width: 33.333%;
            img {
              height: 2rem;
            }
        }
      }
    }
    .sift {
      padding: 10px;
      height: 4.5rem;
      ul {
        margin: 10px auto;
        li {
          display: inline-block;
          width: 50%;
          img {
            height: 1.85rem;
          }
        }
      }
    }
  }
}
</style>