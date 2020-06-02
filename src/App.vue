<template>
  <div id="app">
    <keep-alive include="Homepage,Classify,Recommend">
      <router-view></router-view>
    </keep-alive>
    <Footer></Footer>
    <User></User>
    <Pic></Pic>
  </div>
</template>

<script>
import Footer from './components/footer.vue'
import User from './components/user.vue'
import Pic from './components/pic.vue'

export default {
  name: 'app',
  components: {
    Footer,
    User,
    Pic
  }
}
</script>