<template>
  <div class="footer">
    <li>
      <router-link to='/'>
      <span class="fa fa-shopping-bag"></span><br/>
        买货
      </router-link>
    </li>
    <li>
      <router-link to='/classify'>
      <span class="fa fa-search"></span><br/>
        分类
      </router-link>
    </li>
    <li>
      <router-link to='/recommend'>
      <span class="fa fa-star-o"></span><br/>
        推荐
      </router-link>
    </li>
    <li>
      <router-link to='/shopping'>
      <span class="fa fa-shopping-cart"></span><br/>
        购物车
      </router-link>
    </li>
    <li>
      <router-link to='/mine'>
      <span class="fa fa-user-o"></span><br/>
        我的
      </router-link>
    </li>
  </div>
</template>

<script>
export default {
  
}
</script>