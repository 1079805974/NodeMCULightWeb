<template>
  <div class="dong-footer">
  <mu-bottom-nav :value="activeTab" @change="handleTabChange">
    <mu-bottom-nav-item value="Index" title="主页" icon="home"/>
    <mu-bottom-nav-item value="TeacherList" title="找家教" icon="person_outline"/>
    <mu-bottom-nav-item value="StudentList" title="做家教" icon="face"/>
    <mu-bottom-nav-item value="PersonalCenter" title="教员中心" icon=":fa fa-user"/>
  </mu-bottom-nav>
  </div>
</template>

<script>
  import bus from '../bus.js'
  export default {
    name: 'DFooter',
    data () {
      return {
        activeTab: ''
      }
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
        this.$router.push('/'+this.activeTab)
      }
    },
    mounted(){
    }
  }
</script>

<style>
  .dong-footer{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
