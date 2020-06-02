<template>
  <div class="addrPage">
    <div class="titStyle">
      <span class="fa fa-angle-left fa-lg" @click="goBack"></span>
      <span>添加收货地址</span>
    </div>
    <div id="container"></div>
    <div class="address">
      <input type="text" v-model="addr" placeholder="定位失败，请输入收货地址！">
    </div>
    <mt-field label="姓名:" v-model="username"></mt-field>
    <mt-field label="电话:" v-model="phone"></mt-field>
    <button @click="saveAddr">保存</button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      addr:'',
      username:'',
      phone:''
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    saveAddr(){
      localStorage.setItem('addr',this.addr);
      localStorage.setItem('name',this.username);
      localStorage.setItem('phone',this.phone);
      Toast({
        message: "保存成功",
        duration: 1000
      })
    }
  },
  mounted() {
    var that = this;
    var qq = window.qq;
    var geolocation = new qq.maps.Geolocation("6LLBZ-QMLCX-HNA4L-T3ADN-4O3V5-BFFLB", "myapp");
    geolocation.getLocation(function showPosition(position) {
      var latLng = new qq.maps.LatLng(Number(position.lat),Number(position.lng));
      map.setCenter(latLng)
      var marker = new qq.maps.Marker({
        position: latLng,
        map: map
      });
      var geocoder = new qq.maps.Geocoder();
      geocoder.setComplete(function(result) {
        that.addr = result.detail.address;
      });
      geocoder.getAddress(marker.getPosition());
      marker.setDraggable(true);
      qq.maps.event.addListener(marker, 'dragend', function() {
        var geocoder = new qq.maps.Geocoder();
        geocoder.setComplete(function(result) {
          that.addr = result.detail.address;
        });
        geocoder.getAddress(marker.getPosition());
      });        
    }, ()=>{
            console.log('获取位置失败，如果是PC，请设置模拟器，Sensors')
    })
    var map = new qq.maps.Map(document.getElementById("container"), {
        center: new qq.maps.LatLng(37.80789920419703, 112.56275080159814),
        zoom: 18,
        mapStyleId: 'style1',
    });
  },
};
</script>
<style lang="scss" scoped>
.titStyle {
  height: 1rem;
  display: flex;
  align-items: center;
  span {
    padding-left: 20px;
  }
}
#container{
    width:100%;
    height:300px;
}
.address{
  margin: 10px;
  border-bottom: #ccc 1px solid;
  input{
    border: none;
    height: 40px;
    width: 100%;
  }
}
button {
  margin-right: 15px;
  height: 0.8rem;
  width:2rem;
  float: right;
  background: #cc54cc;
  color: #ffffff;
  border: none;
  font-size: 16px;
}
</style>