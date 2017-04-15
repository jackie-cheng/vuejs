<template>
    <div class="mr-root">
        <back-header>
            <p class="title">详情</p>
        </back-header>
        <back-top></back-top>
        <div class="mr-content">
            <div class="one">
                <div class="author">
                    <img :src="message.author.avatar_url" alt="">
                    <div>
                        <p>{{message.author.loginname}}</p>
                        <p class="author-time">{{message.create_at | time}}</p>
                    </div>
                    <router-link :to="'/commentauthor/'+message.id">
                         <i class="icon-comment-alt"></i>
                    </router-link>
                    <span class="collect" :class="{active:!show}">
                        <span class="addcollect" v-if="show" @click="addCollect">收藏话题</span>
                        <span class="qucollect" v-if="!show" @click="quCollect">取消收藏</span> 
                    </span>
                    <div class="clear"></div>
                </div>
                <p class="author-title">{{message.title}}</p>
                <p class="read">{{message.visit_count}}次阅</p>
                <div class="content" v-html="message.content"></div>
            </div>
            <div class="reply">
                <div class="head">
                    评论 {{message.reply_count}}
                </div>
                <reply v-for="(l,index) in reply" :r="l" :m="message.id" :key="index"></reply>
            </div>
        </div>
    </div>
</template>
<script>
    import Public from '../public.js'
    import Reply  from './Reply'
    import BackHeader from '../components/BackHeader'
    export default{
        mixins:[Public],
        components:{
            BackHeader,Reply
        },
        data(){
            return {
                message:'',
                reply:'',
                show:true,
                accesstoken:localStorage.getItem('accesstoken'),
                topic_id:this.$route.params.id
            }
        },
        methods:{
            addCollect(){
                if(this.accesstoken){
                    var data = 'accesstoken='+this.accesstoken+'&topic_id='+this.topic_id
                    this.axios.post('/vueapi/v1/topic/collect',data)
                    .then(data=>{
                        // console.log(data)
                        this.show=!this.show
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }else{
                    this.$router.push('/login')
                }
            },
            quCollect(){
                if(this.accesstoken){
                    var data = 'accesstoken='+this.accesstoken+'&topic_id='+this.topic_id
                    this.axios.post('/vueapi/v1/topic/de_collect',data)
                    .then(data=>{
                        console.log(data)
                        this.show=!this.show
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }else{
                    this.$router.push('/login')
                }
            }
        },
        created(){
            this.axios.get(`/vueapi/v1/topic/${this.$route.params.id}`)
            .then(data=>{
                // console.log(data)
                this.message = data.data.data
                this.reply = this.message.replies
            })
            .catch(err=>{
                console.log(err)
            })
            // 获取用户信息  验证收藏初始状态
            var loginname = localStorage.getItem('loginname')
            this.axios.get('/vueapi/v1/user/'+loginname)
            .then(data=>{
                var collect = data.data.data.collect_topics
                    for(var l in collect){
                            // console.log(collect[l])
                        if(collect[l].id==this.topic_id){
                            this.show=false
                        }
                    }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
</script>
<style scoped>
    .mr-content{
        padding: 50px 5px 0;
        color: black;
    }
    .author{
        position: relative;
        border-bottom: 1px dotted #ccc;
        padding: 5px 0;
    }
    .author>div{
        display: inline-block;
        font-size: .2rem;
        position: relative;
        top: -4px;
    }
    p.author-time{
        color: #bbb;
    }
    span.collect{
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 3px;
        border: 1px solid #3fb681;
        border-radius: 2px;
        color: #3fb681;
    }
    p.author-title{
        margin: 5px 0 10px 0;
        font-size: .5rem;
        font-weight: bolder;
    }
    .one>.content{
        font-size: .4rem;
        word-break: break-all;
    }
    p.read{
        color: #bbb;
        font-size: .1rem;
        padding-bottom: 10px; 
    }
    img{ 
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .reply{
        margin-top: 10px;
    }
    .reply .head{
        padding: 0 20px ;
        width: 110%;
        height: 20px;
        line-height: 20px;
        margin-left: -15px;
        background: #ebebeb;
        color: #ffa6a6;
        font-size: .4rem;
    }
   .icon-comment-alt{
       position: relative;
       top: -15px;
       left: 3rem;
       font-size: .4rem;
       color: #3fb681;
   }
   span.active{
       color: white;
       background: #3fb681;
   }
</style>
