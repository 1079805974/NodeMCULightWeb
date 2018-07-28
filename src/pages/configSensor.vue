<template>
  <div>
    <mu-list>
      <mu-list-item describeText="名字" @click="modifyName">
        <battery :percent="batteryLevel" slot="right"/>
        <span style="font-size: larger;" v-show="!modify">{{name}}</span>
        <mu-text-field v-show="modify" ref="textField" v-model="name" @keyup.enter.native="modify=false"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="开关" @click="open=!open">
        <mu-switch slot="right" v-model="open" @change="open=!open"/>
      </mu-list-item>
      <mu-list-item title="感应间隔时间" @click="modifyInterval">
        <span style="font-size: larger;" v-show="!modifingInterval">{{interval+'s'}}</span>
        <mu-text-field v-show="modifingInterval" ref="intervalTextField" v-model="interval"
                       @keyup.enter.native="modifingInterval=false"/>
      </mu-list-item>
      <mu-divider/>
      <div ref="mainChart" style="width: 100%;height: 400px;"></div>
    </mu-list>
  </div>
</template>

<script>
  import Battery from "../components/Battery";
  import bus from "../bus"
  var echarts = require('echarts');
  export default {
    name: 'configSensor',
    components: {Battery},
    props: {
      batteryLevel: {
        type: Number,
        default: 50,
      }
    },
    data() {
      return {
        name: '传感器',
        modify: false,
        open: true,
        interval: 1,
        modifingInterval: false,
        option: {
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            },
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'line'
          }]
        },
        op:{series:[{data:[]}]}
      }
    },
    watch:{
      interval(){
        if(this.open)
          this.axios.post(bus.host+'/sensorStatus?id='+this.id, JSON.stringify({cmd:'setInterval',interval:this.interval}))
      }
    },
    methods: {
      modifyName() {
        this.modify = !this.modify
        this.$nextTick(() =>
          this.$refs.textField.focus()
        )
      },
      modifyInterval() {
        this.modifingInterval = !this.modifingInterval
        this.$nextTick(() =>
          this.$refs.intervalTextField.focus()
        )
      }
    },
    mounted() {
      window.myChart = echarts.init(this.$refs.mainChart)
      myChart.setOption(this.option)
      window.aaa = () => {
        myChart.hideLoading()
        this.op.series[0].data.push(Math.random())
        myChart.setOption(this.op)
        //setTimeout(window.aaa, 100)
      }
      window.aaa()
    }
  }
</script>

<style>

</style>
