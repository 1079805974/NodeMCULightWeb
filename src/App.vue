<template>
  <div id="app">
    <d-header :icon="icon" @back="back"/>
    <router-view/>
  </div>
</template>

<script>
import DHeader from "./components/Header.vue";
import bus from "./bus.js"
export default {
  components: {DHeader},
  name: 'App',
  data(){
    return{
      title: '',
      icon: false
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  },
  mounted(){
    bus.$on('icon', icon=>this.icon=icon)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
  html,body{
    width: 100%;
    height: 100%;
  }

</style>
