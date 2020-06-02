import VueRouter from 'vue-router';
import Vue from 'vue';
const Homepage  = ()=>import('./pages/homepage.vue')
const Classify  = ()=>import('./pages/classify.vue')
const Recommend  = ()=>import('./pages/recommend.vue')
const Shopping  = ()=>import('./pages/shopping.vue')
const Mine  = ()=>import('./pages/mine.vue')
const Detail = ()=>import('./pages/detail.vue')
const Search  = ()=>import('./pages/search.vue')
const Sort  = ()=>import('./pages/sort.vue')
const Pay = ()=>import('./pages/pay.vue')
const Addr = ()=>import('./pages/addr.vue')
Vue.use(VueRouter);
var routes = [
    {path:'/',component:Homepage},
    {path:'/classify',component:Classify},
    {path:'/recommend',component:Recommend},
    {path:'/shopping',component:Shopping},
    {path:'/mine',component:Mine},
    {path:'/detail',component:Detail},
    {path:'/search',component:Search},
    {path:'/sort',component:Sort},
    {path:'/pay',component:Pay},
    {path:'/addr',component:Addr},
];
var router = new VueRouter({routes,mode:'history'});

export default router;