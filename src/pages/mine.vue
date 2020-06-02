<template>
    <div class="mine content">
        <div class="myC">
            <div class="imgDiv" @click="trigger2"> 
                <img :src="$baseurl2 + this.img">
            </div>
            <div class="nichen">普通会员：{{userName}}</div>
            <span class="fa fa-bars fa-lg" @click="trigger"></span>
        </div>
        <div class="nav">
            <div class="top">
                <span>我的订单</span>
                <a href="#" style="float:right;">全部订单></a>
            </div>
            <div class="con">
                    <li v-for="(val,tit) in arrObj" :key="val.id">
                        <a href="#"><img :src="$baseurl + val"></a>
                        <p>{{tit}}</p>
                    </li>
            </div>
        </div>
        <div class="nav">
            <div class="top">
                <span>我的服务</span>
            </div>
            <div class="con">
                    <li v-for="(val,tit) in arrObj1" :key="val.id">
                        <a href="#"><img :src="$baseurl + val"></a>
                        <p>{{tit}}</p>
                    </li>
            </div>
            <div class="con">
                    <li v-for="(val,tit) in arrObj2" :key="val.id">
                        <a href="#"><img :src="$baseurl + val"></a>
                        <p>{{tit}}</p>
                    </li>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userName:localStorage.getItem('username'),
            id:localStorage.getItem('id'),
            img:localStorage.getItem('img'),
            arrObj:{"待付款":'m1.jpg',"待发货":'m2.jpg',"待收货":'m3.jpg',"退款/售后":'m4.jpg'},
            arrObj1:{"优惠":'m5.jpg',"我的积分":'m8.jpg',"我的收藏":'m7.jpg',"去抢购":'m6.jpg'},
            arrObj2:{"消息":'m9.jpg',"帮助中心":'m12.jpg',"所在店铺":'m11.jpg',"待评价":'m10.jpg'}
        }
    },
    methods: {
        trigger(){
            this.$eventbus.$emit('trigger')
        },
        trigger2(){
            this.$eventbus.$emit('showPic')
        }
    },
    created() {
    this.$eventbus.$on(
      "refreshPic",
      function() {
        this.img = localStorage.getItem('img');
      }.bind(this)
    );
  },
    async mounted() {
        var result = await this.$axios.get(this.$baseurl2 + 'chktoken?token=' + localStorage.getItem('token'));
        if(result.data.code == 0){
            alert(result.data.msg);
            location.href = this.$baseurl2 + 'login.html';
        }
    },
}
</script>
<style lang="scss" scoped>
    .myC{
        background: url('../assets/image/bk.jpg') no-repeat;
        width: 100%;
        height: 4rem;
        border-radius: 20px 20px 0 0;
        color: #ffffff;
        position: relative;
        margin-bottom: 15px;
        .imgDiv{
            position: absolute;
            top: 1rem;
            left: 1rem;
            width: 2rem;
            height: 2rem;
            overflow: hidden;
            border-radius: 50%;
            img{
                width: 2rem;
            }
        }
        .nichen{
            position: absolute;
            top:1.2rem; 
            left: 3.5rem;
        }
        span{
            position: absolute;
            top:20px;
            right: 0.6rem;
        }
    }
    .nav{
        margin: 0 10px 10px 10px;
        background: #ffffff;
        border-radius: 14px;
        .top{
            padding: 10px;
            border-bottom: 1px solid #f5f5f5;
        }
        .con{
            display: flex;
            align-items: center;
            justify-content: space-around;
            li{
                padding: 10px;
                img{
                    width: 30px;
                }
            }
        }
    }
</style>