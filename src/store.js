import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        goods:JSON.parse(localStorage.getItem('goods')||'[]')
    },
    mutations:{
        add(state,payload){
            state.goods.push({...payload,num:1});
          },
        addNum(state,payload){
            state.goods[payload].num++;
        },
        subNum(state,payload){
            state.goods[payload].num--;
        },
        del(state,payload){
            state.goods.splice(payload,1);
        }
    },
    actions:{
        addCart(context,payload){
            var index = context.state.goods.findIndex(item=>item.id===payload.id);
            if(index == -1){
              context.commit('add',payload);
            }else{
              context.commit('addNum',index);
            }
          },
          subCart(context,payload){
            var index = context.state.goods.findIndex(res=>res.id===payload.id);
            if (context.state.goods[index].num!== 1) {
              context.commit('subNum',index);
            } else {
              if(confirm("确定要删除此商品吗？")){
              context.commit('del',index);
              }
            }
          }
    },
    getters:{
      allMoney(state){
        var m = 0;
        for(var i = 0; i < state.goods.length; i++){
          m += state.goods[i].num * state.goods[i].nowprice;
        }
        return m;
      }
    }
})
store.subscribe((mutation,state)=>{
  localStorage.setItem('goods',JSON.stringify(state.goods));
})

export default store;