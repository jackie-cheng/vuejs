<template>
    <div class="mr-root">
        <back-header>
            <p class="title">登录</p>
        </back-header>
        <div class="mr-content">
            <img src="../assets/image/logo.png" alt="">
        <p class="vue">Vue.js</p>
        <form @submit.prevent="onsubmit">
            <div>
                <i class="icon-user"></i>
                <input type="text" name="loginname" placeholder="请输入用户名" required pattern="^[a-z]{3,20}$" v-model="loginname">
            </div>
            <div class="second">
                <i class="icon-lock"></i>
                <input type="password" placeholder="请输入ID号" name="accesstoken" required 
                pattern="^[\w-]{10,40}$" v-model="accesstoken">
            </div>
            <p class="error" v-show="error">{{errorMsg}}</p>
            <button>登录</button>
        </form>
        
        </div>
        
    </div>
</template>
<script>
    import BackHeader from '../components/BackHeader'
    import bus from '../bus.js'
    export default{
        data(){
            return{
                loginname:'',
                error:false,
                accesstoken:'',
                errorMsg:''
            }
        },
        components:{
            BackHeader
        },
        methods:{
            onsubmit(){
                this.error=false
                this.serialize
                //  93676544-9f9f-407a-a44d-58e1117c3fa0
                this.axios.post('/vueapi/v1/accesstoken','accesstoken='+this.accesstoken)
                .then(data=>{
                    // console.log(data)
                    if(data.data.loginname==this.loginname){
                        this.axios.get('/vueapi/v1/user/'+this.loginname)
                        .then(data=>{
                            console.log(data)
                            if(!data.data.error_msg){
                                localStorage.setItem('loginname',data.data.data.loginname)
                                localStorage.setItem('score',data.data.data.score) 
                                localStorage.setItem('accesstoken',this.accesstoken)
                                // this.$router.go(-1)
                            }else{
                                this.error=true
                            }
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }else{
                        this.errorMsg='用户名错误,请重新输入...'
                        this.error=true
                    }
                })
                .catch(err=>{
                    this.errorMsg='ID错误,请重新输入...'
                    this.error=true
                })
            }   
        }
    } 
</script>
<style scoped>
    img{
        width: 4rem;
        margin-left: calc(50%  - 2rem);
        margin-top: 30px;
    }
    .vue{
        width: 100%;
        font-size: 1rem;
        text-align: center;
        margin-bottom: 20px;
    }
    form div{
        width: 8rem;
        height: 40px;
        line-height: 40px;
        margin-left: calc(50%  - 4rem);
        border: 1px solid #ccc;
        font-size: .6rem;
        padding-left: 10px;
    }
    div.second{
        border-top: none;
    }
    input{
        outline: none;
        border: none;
    }
    button{
        width: 8rem;
        height: 60px;
        margin-top: 10px;
        margin-left: calc(50%  - 4rem);
        color: white;
        text-align: center;
        line-height: 60px;
        font-size: .6rem;
        background: #3fb681;
        border: none;
    }
    .error{     
         width: 8rem;
         margin-left: calc(50%  - 4rem);         
         margin-top: 10px;                     
         color: red;
    }
</style>