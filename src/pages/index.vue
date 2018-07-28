<template>
  <div style="text-align: center">
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
        lampList: [],
        sensorList: []
      }
    },
    computed: {
      isEmpty() {
        return this.lampList.length + this.sensorList.length == 0
      }
    },
    methods: {
      getListData() {
        this.lampList = bus.lampList
      }
    },
    mounted() {
      this.getListData()
      bus.$on('updateList', list => this.lampList = list)
    }
  }
</script>

<style>
  .lamp,.sensor{
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
