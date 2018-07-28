<template>
  <mu-appbar :title="title" class="dong-header">
  <mu-icon-button v-show="icon" icon="keyboard_arrow_left" @click="back" slot="left"/>
    <div slot="right">{{date}}</div>
</mu-appbar>
</template>

<script>


  export default {
    name:'DHeader',
    props:{
      title:{
        type: String,
        default: 'Controller Center'
      },
      icon:{
        type: Boolean,
        default:null
      }
    },
    data(){
      return{
        date:''
      }
    },
    methods:{
      back(){
        this.$emit('back')
      },
      getTime(){
        window.getTime = ()=>{
          let d = new Date()
          let h = this.appendZeroIfLessThanTen(d.getHours())
          let m = this.appendZeroIfLessThanTen(d.getMinutes())
          let s = this.appendZeroIfLessThanTen(d.getSeconds())
          this.date = h + ":" + m +":"+ s
          window.setTimeout(window.getTime,1000)
        }
        window.getTime()
      },
      appendZeroIfLessThanTen(h){
       return (h<10?'0'+h:h)
      }
    },
    mounted(){
      this.getTime()
    }
  }
</script>

<style>
  .dong-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
