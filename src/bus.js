import Vue from 'vue'

const socket = new WebSocket('ws://127.0.0.1:8080/socket')

export default window.bus = new Vue({
  data: {
    connected: false,
    host:'http://127.0.0.1:8080'
  },
  methods: {
    getTime() {
      let d = new Date()
      return {h: d.getHours(), m: d.getMinutes()}
    },
    dispatch(message) {
      try {
        let msg = JSON.parse(message)
        this.$emit('onMessage', msg)
      } catch (e){
      }
      console.log(message)
    }
  },
  created() {
    console.log('bus.startUp()!')
    socket.onmessage = (e) => this.dispatch(e.data)
    socket.onopen = () => {
      this.connected = true
      this.$emit('connected')
    }
    socket.onclose = () => {
      this.connected = false
      this.$emit('disconnect')
    }
    this.$on('send', this.send)
    //this.socket.connect(host)
  }
})
