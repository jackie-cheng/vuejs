<template>
    <div class="mr-root">
       <back-header>
           <p class="title">个人资料</p>
       </back-header>
       <div class="mr-content">
           <div class="my">
                <img src="../assets/image/moren.png" alt="">
                <div class="message">
                    <p>{{loginname}}</p>
                    <p class="score">score {{msg.score}}</p>      
                </div>
                          
           </div>
           <div class="fenlei">
               <ul>
                   <li>最近创建的话题
                       <router-link to="/user/mytopics">
                            <span>
                                {{msg.recent_topics.length}}
                                <i class="icon-chevron-right"></i>
                            </span>
                       </router-link>
                   </li>
                   <li>最近参与的话题
                       <router-link to="/user/jointopics">
                            <span>
                                {{msg.recent_replies.length}}
                                <i class="icon-chevron-right"></i>
                            </span>
                       </router-link>
                    </li>
                   <li>收藏主题
                       <router-link to="/user/mycollect">
                            <span>
                                {{msg.collect_topics.length}}
                                <i class="icon-chevron-right"></i>
                            </span> 
                       </router-link>
                   </li>
                   <li>未读消息
                       <router-link to="/user/weidu">
                            <span>
                                <span class="aa" :class="{color:active}">{{weidu}}</span>
                                
                                <i class="icon-chevron-right"></i>
                            </span> 
                       </router-link>
                   </li>
               </ul>
           </div>
           <div class="tuichu" @click="tuichu" :class="{active:divActive}">退出登录</div>
       </div>
    </div>
</template>
<script>
    import BackHeader from '../components/BackHeader'
    import bus from '../bus.js'
    export default{
        data(){
            return{
                loginname:localStorage.getItem('loginname'),
                msg:'',
                weidu:'',
                active:false,
                divActive:false
            }
        },
        components:{
            BackHeader
        },
        methods:{
            tuichu(){
                this.divActive=true
                localStorage.removeItem('loginname')
                localStorage.removeItem('accesstoken')               
                this.$router.push('/home')
            }
        },
        created(){
            this.axios.get('/vueapi/v1/user/'+this.loginname)
            .then(data=>{
                this.msg = data.data.data
                    // console.log(data.data)                    
            })
            .catch(err=>{
                console.log(err)
            })
            var accesstoken = localStorage.getItem('accesstoken')
            console.log(accesstoken)
            this.axios.get('/vueapi/v1/message/count/?accesstoken='+accesstoken)
            .then(data=>{
                this.weidu = data.data.data
                if(this.weidu!=0){
                    this.active=true
                }
                // console.log(data)                    
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
</script>
<style scoped>
    .mr-content{
        padding:44px 15px 0;
    }
    .mr-content>div{
        margin-top: 15px;
        padding: 10px 0;
    }
    .my{
        border-bottom: 1px dotted #ccc;
    }
    .my div{
        display: inline-block;
        position: relative;
        top: -8px;
        font-size: .5rem;
    }
    .my div p.score{
        font-size: .4rem;
        color:#d99e1a; 
    }
    li{
        width: 100%;
        height: 60px;
        font-size: .5rem;
        border-bottom: 1px solid #ccc;
        line-height: 60px;
    }
    li i{
        position: relative;
        width: 100%;
        color: #999;
    }
    li>a>span{
        display: inline-block;
        position: absolute;
        right: 20px;
    }
    .aa{
        width: 25px;
        height: 15px;
        margin: 0;
        padding: 0;
    }
    span.color{
        padding: 0 4px;
        color: #fff;
        background: #de5044;
        border-radius: 50%;
    }
    .tuichu{
        font-size: .5rem;
        text-align: center;
        border: 1px solid #3fb681;
        border-radius: 5px;
        color: #3fb681;
    }
    div.active{
        background: #3fb681;
        color: #fff;
    }
</style>