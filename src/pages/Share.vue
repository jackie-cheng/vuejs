<template>
    <div class="mr-root">
        <div class="mr-content">
            <home-item v-for="list in homeList" :r="list" :Tab="list.tab"></home-item>
            <p v-if="error">不好意思，加载失败，请稍后再试...</p>
            <div class="clear"></div>
            <load-more v-if="!showLoading" @click="more"></load-more>
            <back-top></back-top>
        </div>
        <loading v-if="showLoading"></loading>
    </div>
</template>
<script>
    import Public from '../public.js'
    export default{
        data(){
            return {
                showLoading:true,
                error:false,
                homeList:[],
                count:1
            }
        },
        mixins:[Public],
        created(){
          this.getRoomList(this.count)
        },
        methods:{
            getRoomList(page){
                  this.axios.get('/vueapi/v1/topics?page='+page)
                .then(data=>{
                this.error=false
                var aa = data.data.data
                console.log(aa.size)
                for(var i=0;i<20;i++){
                    if(aa[i].tab=='share'){
                        this.homeList = this.homeList.concat(aa[i])
                    }
                }
                    this.showLoading=false
                })
                .catch(err=>{
                    this.error=true
                    this.showLoading=false
                })
            },
            more(){
                this.count++
                this.getRoomList(this.count)
            }
        }
    }
</script>
<style>
    .mr-content{
         overflow: hidden;
         padding-bottom: 49px;
     }
</style>