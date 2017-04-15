
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import './assets/css/font-awesome.css'
import './assets/css/style.css'
import axios from 'axios'
Vue.prototype.axios = axios

Vue.filter('message',value=>{
   if(value.length > 20){
        return value.substr(0,18)+'...'
      }else{
        return value
      }
})
Vue.filter('time',value=>{
    value=new Date(value)
    var year=value.getFullYear()
    var month=value.getMonth()+1
    var date=value.getDate()
    var hour=value.getHours()
    var minute=value.getMinutes()
    var second=value.getSeconds()
    month=month>9?month:'0' + month
    date=date>9?date:'0' + date
    hour=hour>9?hour:'0' + hour
    minute=minute>9?minute:'0'+minute
    second=second>9?second:'0'+second
    //es5的写法
    return year + '-' + month + '-' + date + ' ' 
    + hour + ':' + minute + ':' + second
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
