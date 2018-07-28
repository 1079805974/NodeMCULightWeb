<template>
  <div>
    <div class="battery" :style="batteryStyle">
      <div class="battery-cover" :style="coverStyle"></div>
      <div class="battery-inner" :style="linearStyle" ></div>
    </div>
    <span>{{percent}}%</span>
  </div>
</template>

<script>
  export default {
    name: 'Battery',
    props:{
      color:{
        type:String,
        default:null
      },
      size:{
        type:Number,
        default:7
      },
      percent:{
        type:Number,
        default:50
      },
      width:{
        type:Number,
        default:27
      }
    },
    data() {
      return {
        voltage:20,
      }
    },
    computed:{
      batteryStyle(){
        return {
          'height': this.size + 4 + 'px',
          'border-radius': (this.size ? (this.size+4) / 2 : '') + 'px',
          'width':this.width + 'px'
        }
      },
      linearStyle () {
          return {
            height: this.size + 'px',
            'background-color': this.getColor(),
            'border-radius': (this.size ? this.size / 2 : '') + 'px',
          }
      },
      coverStyle(){
        return {
          height: this.size + 'px',
          'background-color': 'white',
          'border-bottom-left-radius': (this.size ? this.size / 2 : '') + 'px',
          'border-top-left-radius': (this.size ? this.size / 2 : '') + 'px',
          width: (100 - this.percent) / 100 * this.width - 4 + 'px',
        }
      }    },
    methods:{
      getColor(){
        return this.color ? this.color : (this.percent<=20?'red':'#47c201')
      }
    }
  }
</script>

<style>
  .battery{
    padding: 1px;
    border: 1px solid brown;
    display: inline-block;
    position: relative;
  }
  .battery-inner{
    position: absolute;
    left:1px;
    right:1px;
    display: inline;
  }
  .battery-cover{
    position: absolute;
    left:0.9px;
    display: inline;
    z-index: 2;
  }
</style>
