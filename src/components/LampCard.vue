<template>
  <mu-card>
    <mu-card-header :title="lamp.name" titleClass="lamp-name">
      <i style="position: absolute;left: 70%" class="fa fa-lightbulb-o fa-5x"></i>
      <battery slot="default" :percent="lamp.voltage ? parseInt(lamp.voltage / 3.3 * 100) : 100"/>
    </mu-card-header>
    <mu-card-actions>
      <mu-raised-button @click="configLamp" label="遥控" primary/>
    </mu-card-actions>
  </mu-card>
</template>

<script>
  import Battery from "./Battery.vue";

  export default {
    components: {
      Battery},
    name: 'LampCard',
    props:['lamp'],
    data() {
      return {

      }
    },
    methods:{
      configLamp(){
        this.$router.push('/configLamp/' + this.lamp.id)
      }
    }
  }
</script>

<style>
  .lamp-name{
    font-size: 25px!important;
  }
</style>
