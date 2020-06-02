<template>
    <div class="shopping content">
        <div class="titleBar">
            购物车
        </div>
        <div class="shopcar" @touchmove.prevent>
            <ul>
                <li v-for="item in car" :key="item.id">
                    <div class="ck">
                        <input type="checkbox" name="" id="" checked>
                    </div>
                    <div class="image">
                        <img :src="$baseurl+item.img">
                    </div>
                    <div class="text">
                        <p>{{ item.name }}</p>
                        <p class="nowPrice">
                            &yen;{{ item.nowprice }}
                            <span class="sub" @click="addCart(item)">+</span>
                            <span class="center">{{ item.num }}</span>
                            <span class="sub" @click="subCart(item)">-</span>
                        </p>
                    </div>  
                </li>
                <div class="bottomMoney"><span>总计：&yen;{{ allMoney }}</span></div>
            </ul>
        </div>
        <div class="pay">
            <div class="allmoney">
                总计：
                <span>&yen;{{ allMoney }}</span>
            </div>
            <router-link to="/pay">
                <button>下单</button>
            </router-link>
        </div>
    </div>
</template>
<script>
import Iscroll from 'iscroll'
export default {
    data() {
        return {

        }
    },
    computed: {
        car(){
            return this.$store.state.goods;
        },
        allMoney(){
            return this.$store.getters.allMoney;
        }
    },
    methods: {
        addCart(item){
            this.$store.dispatch('addCart',item);
        },
        subCart(item){
            this.$store.dispatch('subCart',item);
            setTimeout(()=>{
                this.myIscroll.refresh();
            },0)
        }
    },
    async mounted() {
        var result = await this.$axios.get(this.$baseurl2 + 'chktoken?token=' + localStorage.getItem('token'));
        if(result.data.code == 0){
            alert(result.data.msg);
            location.href = this.$baseurl2 + 'login.html';
        }
        setTimeout(()=>{
            var myIscroll = new Iscroll('.shopcar');
            this.myIscroll = myIscroll;
        },0)
    }
    
}
</script>
<style lang="scss" scoped>
.shopping{
    .titleBar{
        width: 100%;
        padding: 12px;
        background: #ffffff;
        font-size: 20px;
        border-bottom: 1px solid #f5f5f5;
    }
    .shopcar{
        overflow: hidden;
        height: 100%;
        li{
            width: 100%;
            display: flex;
            background: #ffffff;
            margin: 2px 0;
            height: 2.7rem;
            .ck{
                width: 10%;
                margin: auto 1px;
            }
            .image{
                width: 30%;
                margin: auto 1px;
                img{
                    width: 2rem;
                }
            }
            .text{
                flex: 1;
                p{
                    padding: 10px;
                    text-align: left;
                }
                .nowPrice{
                    color: #bb23bb;
                    span{
                        text-align: center;
                        color: black;
                        height: 20px;
                        float: right;
                    }
                    .center{
                        border-top: 1px solid #ccc;
                        border-bottom: 1px solid #ccc;
                        width: 35px;
                    }
                    .sub{
                        border: 1px solid #ccc;
                        width: 20px;
                    }
                }
            }
        }
        .bottomMoney{
            width: 100%;
            background: #ffffff;
            margin: 2px 0;
            height: 2.7rem;
            text-align: right;
            span{
                padding-right: 10px;
            }
        }
    }
    .pay{
        height: 1rem;
        border-bottom: 1px solid #f5f5f5;
        width: 100%;
        position: absolute;
        bottom: 1rem;
        background: #ffffff;
        .allmoney{
            padding:12px;
            float: left;
            span{
                color: #bb23bb;
            }
        }
        button{
            height: 1rem;
            width: 2rem;
            float:right;
            background: #cc54cc;
            color: #ffffff;
            border: none;
        }
    }
}
</style>