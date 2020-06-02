<template>
    <div class="searchPage">
      <div class="search">
        <span class="fa fa-angle-left fa-2x" @click="fadeBack"></span>
        <div class="searchWrap">
        <span class="fa fa-search" style="position:absolute;padding: 0 10px;"></span>
        <input type="search" placeholder="T恤 白色" v-model="searchWord"/>
        </div>
        <span @click="searchSubmit">搜索</span>
      </div>
      <div class="hotWord" v-show="hotShow">
          <h4 style="padding:10px;">热门搜索</h4>
          <button @click="searchButton">2019新款</button>
          <button @click="searchButton">欧式挂壁灯</button>
          <button @click="searchButton">百搭跑步鞋</button>
          <button @click="searchButton">Sulwhasoo</button>
          <button @click="searchButton">男士衬衫</button>
      </div>
      <div v-show="!hotShow">
        <ul class="ulStyle" style="background-color:#f5f5f5;margin: 0.9rem auto;">
          <li v-for="item in goods" :key="item.id">
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
export default {
  data() {
    return {
      hotShow:true,
      searchWord:'',
      goods:[]
    };
  },
  methods: {
      fadeBack(){
          this.$router.go(-1);
          this.hotShow = true;
      },
      searchButton(e){
        this.$axios.get(this.$baseurl2+'search?pattern='+e.target.innerHTML).then(res=>{
          this.hotShow = false;
          this.goods=res.data;
        })
      },
      searchSubmit(){
        this.$axios.get(this.$baseurl2+'search?pattern='+this.searchWord).then(res=>{
          if(res.data.length == 0){
            alert("亲！没有找到您要的商品。");
            return
          }
          this.hotShow = false;
          this.goods=res.data;
        })
      }
  }
};
</script>
<style lang="scss" scoped>
.searchPage{
  .search {
    position: fixed;
    top: 0;
    width: 100%;
    height: 1rem;
    display: flex;
    border-bottom: 1px solid #eeeded;
    background-color: #ffffff;
    .searchWrap {
      flex: 1;
      position: relative;
      height: 1rem;
      line-height: 1rem;
      padding: 0 10px;
      input{
      height: 30px;
      width: 100%;
      padding-left: 30px;
      border:none;
      border-radius: 15px;
      background-color: #eeeded;
      }
    }
    span{
      padding: 0 10px;
      color: rgb(117, 111, 111);
      height: 1rem;
      line-height: 1rem;
    }
  }
  .hotWord{
    margin: 1rem auto;
    button{
      width: 2rem;
      height: 30px;
      line-height: 30px;
      background-color: #ffffff;
      color: rgb(133, 133, 133);
      border: 1px solid #bb23bb;
      border-radius: 15px;
      margin: 10px;
    }
  }
}
</style>