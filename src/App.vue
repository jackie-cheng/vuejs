<template>
  <div id="app">
    <transition  name="side">
        <side-menu v-show="show" @hide="hide"></side-menu>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
    import SideMenu from './components/SideMenu'
    import bus from './bus.js'
    export default {
        data(){
      return {
          show:false
      }
    },
    components:{
      SideMenu
    },
    mounted(){
      bus.$on('sideShow',this.side)
    },
    methods:{
        side(){
          this.show=!this.show
        },
        hide(){
          this.show=false
        }
      }
    }
</script>

<style>
    .side-enter-active,.side-leave-active{
      transition: all .3s linear;
    }
    .side-enter,.side-leave-active{
      opacity: 0;
    }
    .side-enter,.side-leave-active{
      transform: translateX(-50%);
      opacity: 0;
    }
</style>
