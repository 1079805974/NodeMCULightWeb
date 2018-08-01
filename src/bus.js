import Vue from 'vue'
import io from 'socket.io-client'

const socket = io('/'); 

socket.on('connect', function () { 
  console.log('连接服务器成功!')
  bus.connected = true
});

socket.on('message', function (message) { 
  console.log('服务器发来消息:'+message)
  if(message=='新设备'){
    bus.lampList.push({
        id: 123,
        name:'客厅顶灯',
        voltage: 3.2,
        red: 12,
        green: 12,
        blue: 12,
        PIR: true,
        sensor: 1023,
        open:true
    })
  }else if(message == `{"光感亮度": 250}`){
    var msg = JSON.parse(message)
    console.log(msg.光感亮度)
  }else if(message == `{"sensor" : "GY", "type" : "sunrise"}`){
    console.log(`白天到了!!!!!`)
  }
});

function openLight() {
  console.log('你想开灯?')
  socket.send('嘤嘤嘤')
}

function closeLight() {
  console.log('你要关灯!')
}

function changeBrightness(brightness) {
  console.log(`你把亮度调整为 ${brightness}`)
}

function changeRed(red) {
  console.log(`你把红灯调整为:${red}`)
}

function changeBlue(blue) {
  console.log('调整蓝灯!')
}

function changeGreen(green) {
  console.log('调绿的呢!')
}

function changeName(name) {
  console.log(`你把名字改成${name}了`)
}

function complete() {
  console.log('你点击了完成按钮!')
}

var events = {
  'openLight': openLight,
  'closeLight': closeLight,
  'changeBrightness': changeBrightness,
  'changeRed': changeRed,
  'changeBlue': changeBlue,
  'changeGreen': changeGreen,
  'complete': complete,
  'changeName': changeName
}

export default window.bus = new Vue({
  data: {
    connected: false,
    lampList: [//有设备连接时 在这个列表中加入.
      {
        id: 123,
        name: '客厅顶灯',
        voltage: 3.2,
        red: 12,
        green: 12,
        blue: 12,
        PIR: true,
        sensor: 1023,
        open: true,
        brightness: 20
      },
      {
        id: 456,
        name: '卧室灯',
        voltage: 2.2
      },
    ],
    sensorList: []
  },
  watch: {
    lampList(val) {
      this.$emit('updateList', val)
    }
  },
  methods: {
    getTime() {
      let d = new Date()
      return { h: d.getHours(), m: d.getMinutes() }
    },
    dispatch(message) {
      try {
        let msg = JSON.parse(message)
        this.$emit('onMessage', msg)
      } catch (e) {
      }
      console.log(message)
    }
  },
  created() {
    console.log('bus.startUp()!')
    for (let index in events) {
      this.$on(index, events[index])
    }
  }
})
