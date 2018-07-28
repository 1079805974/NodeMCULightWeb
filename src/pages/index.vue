<template>
  <div style="text-align: center">
    <mu-raised-button @click="refresh" label="刷新"/>
    <p v-if="isEmpty">emmm。没有任何设备接入~请尝试刷新</p>
    <div v-else>
      <div class="lamp" v-for="item,index in lampList" :key="index">
        <lamp-card :lamp="item"/>
      </div>
      <div class="sensor" v-for="item,index in sensorList" :key="index">
        <sensor-card :sensor="item"/>
      </div>
    </div>
  </div>
</template>


<script>
  import LampCard from "../components/LampCard";
  import SensorCard from "../components/SensorCard";
  import bus from '../bus'
  export default {
    components: {SensorCard, LampCard},
    data() {
      return {
        lampList: [{name:'灯泡1',voltage:3.2}],
        sensorList: [{name:'传感器1',voltage:0.5},{name:'传感器2',voltage:2.5}]
      }
    },
    computed: {
      isEmpty() {
        return this.lampList.length + this.sensorList.length == 0
      }
    },
    methods: {
      getListData() {
        this.axios.get(bus.host+'/lamp/list').then(res => this.lampList = res.data)
        this.axios.get(bus.host+'/sensor/list').then(res => this.sensorList = res.data)
      },
      refresh() {
        this.getListData()
      }
    },
    mounted() {
      //this.getListData()
    }
  }
</script>

<style>
  .lamp,.sensor{
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
