<template>
    <div class="classify content">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">分类</mt-tab-item>
            <mt-tab-item id="2">品牌</mt-tab-item>
            <mt-tab-item id="3">地区</mt-tab-item>
        </mt-navbar>
        <br/>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <ul>
                    <li v-for="val in arr" :key="val.id" style="text-align:left;">
                        <router-link :to="'/sort?sort='+val">
                            <mt-cell :title="val"/>
                        </router-link>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="center">
                    <li v-for="(val,brand) in obj" :key="val.id">
                        <router-link :to="'/sort?brand='+brand">
                            <img :src="$baseurl + val">
                        </router-link>
                    </li>
                </div>
            </mt-tab-container-item>
            <mt-index-list id="3">
                <mt-index-section index="A">
                    <router-link to="/sort?productID=1">
                        <mt-cell title="America"></mt-cell>
                    </router-link>
                    <mt-cell title="Austin"></mt-cell>
                    <mt-cell title="Austria"></mt-cell>
                </mt-index-section>
                <mt-index-section index="B">
                    <mt-cell title="Brunei"></mt-cell>
                    <mt-cell title="Byelorussia"></mt-cell>
                </mt-index-section>
                <mt-index-section index="C">
                    <mt-cell title="Cambodia"></mt-cell>
                    <mt-cell title="Canada"></mt-cell>
                    <router-link to="/sort?productID=3">
                        <mt-cell title="China"></mt-cell>
                    </router-link>
                </mt-index-section>
                <mt-index-section index="D">
                    <mt-cell title="Denmark"></mt-cell>
                    </mt-index-section>
                <mt-index-section index="E">
                    <mt-cell title="EastTimor"></mt-cell>
                    <mt-cell title="Estonia"></mt-cell>
                </mt-index-section>
                <mt-index-section index="F">
                    <mt-cell title="Finland"></mt-cell>
                    <mt-cell title="France"></mt-cell>
                </mt-index-section>
                <mt-index-section index="G">
                    <mt-cell title="Germany"></mt-cell>
                    <mt-cell title="Greece"></mt-cell>
                </mt-index-section>
                <mt-index-section index="I">
                    <mt-cell title="Iceland"></mt-cell>
                    <mt-cell title="Ireland"></mt-cell>
                    <mt-cell title="Italy"></mt-cell>
                </mt-index-section>
                <mt-index-section index="J">
                    <mt-cell title="Japan"></mt-cell>
                </mt-index-section>
                <mt-index-section index="K">
                    <mt-cell title="Korea"></mt-cell>
                </mt-index-section>
                <mt-index-section index="M">
                    <mt-cell title="Malaysia"></mt-cell>
                    <mt-cell title="Micor"></mt-cell>
                </mt-index-section>
                <mt-index-section index="N">
                    <mt-cell title="NewZealand"></mt-cell>
                </mt-index-section>
                <mt-index-section index="R">
                    <mt-cell title="Russian"></mt-cell>
                </mt-index-section>
                <mt-index-section index="S">
                    <mt-cell title="Samoa"></mt-cell>
                    <mt-cell title="Syrian"></mt-cell>
                </mt-index-section>
                <mt-index-section index="Z">
                  <mt-cell title="Zack"></mt-cell>
                  <mt-cell title="Zane"></mt-cell>
                </mt-index-section>
            </mt-index-list>
        </mt-tab-container>
    </div>
</template>
<script>
export default {
    name:'Classify',
    data(){
        return {
            selected:'2',
            arr:["至IN美妆","时尚衣柜","品质家具","家电数码","优质跑鞋","轻奢时尚","品质包包"],
            obj:{
                'G＆G':'GG.jpg',
                '狄恩纪':'DG.jpg',
                'RALPH LAUREN':'POLO.jpg',
                '七匹狼':'W.jpg',
                '宜家':'YJ.jpg',
                'Sulwhasoo':'Sulwhasoo.jpg',
                'MAC':'MAC.jpeg',
                'NIKE':'NIKE.jpg',
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.classify{
    .mint-navbar{
        .is-selected{
            border-bottom:3px solid #bb23bb;
            color: black;
        }
    }
    .mint-tab-container{
        .mint-tab-container-item{
            .center{
                text-align: center;
                li{
                    display: inline-block;
                    margin: 7px;
                    width: 3.4rem;
                    height: 2rem;
                    background: #ffffff;
                    img{
                        height: 2rem;
                    }
                }
            }
        }
        .mint-indexlist{
            li{
                text-align: left;
            }
        }
    }
}
</style>