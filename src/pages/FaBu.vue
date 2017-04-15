<template>
    <div class="mr-root">
        <back-header>
            <p class="title">发布话题</p>
        </back-header>
        <div class="mr-content">
            <form @submit.prevent="formSubmit">
                <textarea v-model="title" class="title" placeholder="请输入标题" required></textarea>
                <span>请选择版块</span>
                <select v-model="tab" required>
                    <option value="ask">问答</option>
                    <option value="share">分享</option>
                    <option value="job">招聘</option>
                </select>
                <textarea v-model="content" class="content"  placeholder="请输入话题内容" required></textarea>
                <button>发表</button>
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
                title:'',
                tab:'',
                content:''
            }
        },
        methods:{
            formSubmit(){
                var accesstoken = localStorage.getItem('accesstoken')
                var data = {"title":this.title,"tab":this.tab,"content":this.content,"accesstoken":accesstoken}
                this.axios.post('/vueapi/v1/topics',data)
                .then(data=>{
                    // console.log(data)
                    this.$router.push('/home')
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>
<style scoped>
    textarea,button{
        width: calc(100% - 30px);
        margin: 10px 15px 0;
    }
    .title{
        height: 2rem;
    }
    .content{
        height: 6rem;
    }
    span{
        padding-top: 8px;
        margin-left: 15px;
        font-size: .4rem;
    }
    select{
        margin-top: 8px;
        height: 30px;
        width: 7rem;
    }
    button{
       height: 50px;
       background: #3fb681;
       border: none;
       color: white;
       font-size: .5rem;
    }
</style>