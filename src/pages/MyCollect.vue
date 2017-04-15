<template>
    <div class="mr-root">
        <back-header>
            <p class="title">我的收藏</p>
        </back-header>
        <div class="mr-content">
            <home-item v-for="(l,index) in arr" :r="l" :key="index" >
            </home-item>
        </div>
    </div>
</template>
<script>
    import BackHeader from '../components/BackHeader'
    import HomeItem from './HomeItem'
    export default{
        data(){
            return{
                loginname:localStorage.getItem('loginname'),
                accesstoken:localStorage.getItem('accesstoken'),
                arr:''
            }
        },
        components:{
            BackHeader,HomeItem
        },
        methods:{
            cancel(){
                var data = 'accesstoken='+this.accesstoken+'&topic_id='+
                this.axios.post('/vueapi/v1/topic/de_collect',data)
            }
        },
        created(){
            this.axios.get('/vueapi/v1/user/'+this.loginname)
            .then(data=>{
                this.arr = data.data.data.collect_topics
                    console.log(this.arr)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
</script>
<style>
    
</style>