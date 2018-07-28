<template>
  <mu-card>
    <mu-card-header :title="sensor.name" titleClass="sensor-name">
      <i style="position: absolute; left: 70%" class="fa fa-tag fa-4x"></i>
      <battery slot="default" :percent="parseInt(sensor.voltage / 3.3 * 100)"/>
    </mu-card-header>
    <mu-card-actions>
      <mu-raised-button @click="configSensor" label="遥控" primary/>
    </mu-card-actions>
  </mu-card>
</template>

<script>
  import Battery from "./Battery.vue";

  export default {
    components: {
      Battery},
    name: 'SensorCard',
    props:['sensor'],
    data() {
      return {
        voltage: 0.6,
        name:'Sensor2'
      }
    },
    computed:{
    },
    methods:{
      configSensor(){
        this.$router.push('/configSensor/' + this.sensor.id)
      }
    }
  }
</script>

<style>
  .sensor-name{
    font-weight: 300!important;
    font-size: 25px!important;
  }
</style>
