<template>
    <div class="mr-root">
        <back-header>
            <p class="title">参与话题</p>
        </back-header>
        <div class="mr-content">
            <home-item v-for="(l,index) in arr" :r="l" :key="index">
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
                arr:''
            }
        },
        components:{
            BackHeader,HomeItem
        },
        methods:{
            cancel(){
                
            }
        },
        created(){
            this.axios.get('/vueapi/v1/user/'+this.loginname)
            .then(data=>{
                this.arr = data.data.data.recent_replies
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