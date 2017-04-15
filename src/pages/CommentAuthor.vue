<template>
    <div class="mr-root">
        <back-header>
            <p class="title">评论</p>
        </back-header>
        <div class="mr-content">
            <form action="" @submit.prevent="submit">
                <textarea  v-model="content" style="resize: none" required maxlength="100"></textarea>
                <button>提交</button>
            </form>
        </div>
    </div>
</template>
<script>
    import BackHeader from '../components/BackHeader'
    export default{
        components:{
            BackHeader
        },
        data(){
            return{
                content:'',
                accesstoken:localStorage.getItem('accesstoken')
            }
        },
        methods:{
            submit(){
                var data = 'accesstoken='+this.accesstoken+'&content='+this.content
                this.axios.post(`/vueapi/v1/topic/${this.$route.params.topicId}/replies`,data)
                .then(data=>{
                    console.log('评论成功')
                    this.$router.go(-1)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>
<style>
    .mr-content{
        padding: 44px 15px 0; 
    }
    textarea{
        margin:15px 0;
        width: 100%;
        height: 5rem;
    }
    textarea.title-text{
        width: 100%;
        height: 1rem;
    }
    button{
        margin: 20px 0;
        width:100%;
        height: 50px; 
        background: #3fb681;
        border: none;
        color: white;
        font-size: .5rem;
    }
</style>