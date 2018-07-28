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
      <mu-list-item title="闹钟" describeText="每天定时亮起">
        <mu-switch slot="right" v-model="timer2" @change="switchAlarm"/>
        <mu-time-picker v-show="timer2" hintText="选择时间" :value="alertTime2"/>
      </mu-list-item>
      <mu-list-item :describeText="waiting?'正在调整...':slider+''" class="brightnessConfig">
        <div style="position: relative;height: 50px;">
          <i style="left: 10px;top:34px;" class="fa fa-sun-o"></i>
          <mu-slider :step="2" style="top:30px;left: 20%;position:absolute;display: block;width: 200px;"
                     @change="changeBrightness" :disabled="!open" v-model="slider"/>
          <i style="right: 10px; top:27px;" class="fa fa-sun-o fa-2x"></i>
        </div>
      </mu-list-item>
      <mu-list-item describeText="调整色彩(左侧预览)" class="brightnessConfig">
        <mu-avatar icon=":fa fa-lightbulb-o fa-2x" backgroundColor="white" :iconSize="40" :color="mixedColor" slot="leftAvatar"/>
        red value:{{red}}
        <mu-slider :step="2"
                   @change="changeRed" :disabled="!open" />
        green value:{{green}}
        <mu-slider :step="2"
                   @change="changeGreen" :disabled="!open" />
        blue value:{{blue}}
        <mu-slider :step="2"
                   @change="changeBlue" :disabled="!open" />
      </mu-list-item>
    </mu-list>
    <div style="text-align: center;">
    <mu-raised-button label="完成" primary/>
    </div>
  </div>
</template>

<script>

  import Battery from "../components/Battery.vue";
  import bus from '../bus'
  export default {
    components: {Battery},
    name: 'configLamp',
    props:{
      batteryLevel:{
        type:Number,
        default:50
      },
      id:{
        type:String,
      }
    },
    data() {
      return {
        previewColor:{'font-weight':'500','font-size': '2em!import'},
        modify: false,
        open: true,
        timer2: false,
        alertTime2: '',
        slider: 50,
        name: '客厅顶灯',
        red:0,
        green:0,
        blue:0,
        waiting:false
      }
    },
    watch:{
      open(val){
        if(!val){
          //当用户关掉关灯开关
          this.axios.post(bus.host+'/lampStatus?id='+this.id, JSON.stringify({cmd:'setBrightness',brightness:0}))
        }else{
          //当用户打开灯泡开关
          this.axios.post(bus.host+'/lampStatus?id='+this.id, JSON.stringify({cmd:'setBrightness',brightness:this.slider*10}))
        }
      },
      slider(val){
        if(!this.waiting){
          this.waiting = true
          setTimeout(()=>{
            this.waiting = false
              this.axios.post(bus.host+'/lampStatus?id='+this.id,JSON.stringify({cmd:'setBrightness',brightness:this.slider*10}))
            }
            , 200)
        }
      }
    },
    computed:{
      mixedColor(){
        return `rgb(${this.red}, ${this.green}, ${this.blue})`
      }
    },
    methods: {
      changeRed(val){
        this.red = Math.floor(val/100*255)
      },
      changeBlue(val){
        this.blue = Math.floor(val/100*255)
      },
      changeGreen(val){
        this.green = Math.floor(val/100*255)
      },
      switchAlarm() {
        this.timer2 = !this.timer2
      },
      changeBrightness(val) {
        console.log(val)
      },
      modifyName() {
        this.modify = !this.modify
        this.$nextTick(() =>
          this.$refs.textField.focus()
        )
      }
    }
  }
</script>

<style>
  .brightnessConfig i {
    display: inline-block;
    position: absolute;

  }
</style>


