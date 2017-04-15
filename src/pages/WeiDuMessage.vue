<template>
    <div class="mr-root">
        <back-header>
            <p class="title">未读消息</p>
        </back-header>
        <div class="mr-content">
            <div class="weidu">
                <p>
                    <router-link to="/home" class="home">
                        <span>主页</span>
                    </router-link>
                    <span>/ 新消息</span>
                </p>
                <div class="content">
                    <ul>
                        <li v-for="(l,index) in notread" :key="index">
                            <router-link to="/">
                                <span class="author">{{l.author.loginname}}</span>
                            </router-link> 
                            回复了您的话题
                            <router-link :to="'/detail/' + l.topic.id" @click="markAll">
                                <span class="topictitle">{{l.topic.title}}</span>
                            </router-link> 
                        </li>
                    </ul>
                </div>
            </div>
            <div class="yidu">
                <p class="header">过往消息</p>
                <div class="content">
                    <ul>
                        <li v-for="(l,index) in hasread" :key="index">
                            <router-link to="/">
                                <span class="author">{{l.author.loginname}}</span>
                            </router-link> 
                            回复了您的话题
                            <router-link :to="'/detail/' + l.topic.id">
                                <span class="topictitle">{{l.topic.title}}</span>
                            </router-link> 
                        </li>
                    </ul>
                </div>
            </div>  
        </div>
    </div>
</template>
<script>
    import BackHeader from '../components/BackHeader'
    export default{
        data(){
            return{
                hasread:'',
                notread:'',
                accesstoken:localStorage.getItem('accesstoken')
            }
        },
        components:{
            BackHeader
        },
        methods:{
            markAll(){
                var  data = 'accesstoken='+this.accesstoken
                this.axios.post('/vueapi/v1/message/mark_all',data)
                .then(data=>{
                    console.log(data)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },
        created(){
            this.axios.get('/vueapi/v1/messages/?accesstoken='+this.accesstoken)
            .then(data=>{
                this.hasread = data.data.data.has_read_messages
                this.notread = data.data.data.hasnot_read_messages
            })
            .catch(err=>{
                console.log(err)              
            })
        }
    }
</script>
<style scoped>
    .mr-content{
        width: 100%;
        padding: 44px 15px 0;
        font-size: .4rem;
    }
    div.weidu>p,div.yidu>p{
        background: #ddd;
        margin-left: -15px;
        padding-left: 15px;
        width: 110%;
        height: 30px;
        line-height: 30px;
    }
    .yidu{
        margin-top: 10px;
    }
    .home{
        color: #3fb681;
    }
    li{
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px dotted #ccc;
        line-height: 20px;
    }
    li span{
        color: #0088cc;
    }
    .author{
         color:  #de5044;
    }
</style>