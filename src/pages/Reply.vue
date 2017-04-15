<template>
    <div class="reply">
        <div class="content">
            <div class="author">
                <img :src="r.author.avatar_url" alt="">
                    <div>
                    <p>{{r.author.loginname}}</p>
                    <p class="author-time">{{r.create_at | time}}</p>
                </div>
                <div class="icon">
                    <router-link :to="'/comment/' + m + '/'+ replyId">
                        <i class="icon-comment-alt"></i>
                    </router-link>
                    <span  @click="ups" class="zan">
                        <i class="icon-thumbs-up" v-if="!show"></i>
                        <i class="icon-thumbs-up-alt" v-if="show"></i>
                    </span>{{len}}
                </div>
                <div class="clear"></div>
            </div>
            <div class="reply-content" v-html="r.content"></div>
        </div>
    </div>
</template>
<script>
    export default{
         props:['r','m'],
        data(){
            return{
                len:this.r.ups.length,
                action:''
            }
        },
        data(){
            return{
                 accesstoken:localStorage.getItem('accesstoken'),
                 replyId:this.r.id,
                 show:true
            }
        },
        methods:{
            ups(){
                if(this.accesstoken){
                    this.axios.post('/vueapi/v1/reply/'+this.replyId+'/ups','accesstoken='+this.accesstoken)
                    .then(data=>{
                        console.log(this.len)
                        this.len=this.r.ups.length
                         console.log(this.len)
                        this.action=data.data.action
                        if(this.action=='up'){
                            this.show=false
                            this.len ++
                        }else{
                            this.show=true
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }else{
                    this.router.push('/login')
                }
            }
        },
        created(){
            this.len = this.r.ups.length
        }
    }
</script>
<style scoped>
    .reply{
        border-bottom: 1px solid #ccc;
        margin: 5px 0;
    }
    p.author-time{
        color: #bbb;
    }
    img{ 
        width: 30px;
        height: 30px;
        border-radius: 50%;
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
   div.icon{
        margin-left: 3.6rem;
        position: relative;
        top: -10px;
    }
    .icon i{
         color: #3fb681;
         margin-right: 20px;
    }
    /*.icon i:not(.icon-thumbs-up){
        margin-right: 20px;
    }
    .icon i:icon-thumbs-up-alt{
        margin-right: 20px;        
    }*/
    span.zan{
        width: 30px;
    }
    .zan>i{
        margin-right: 5px;
        width: 20px;
    }
    .content .reply-content{
        padding: 25px 0;
        font-size: .4rem;
        word-break: break-all;
    }
    /*.markdown-text p a{
        color: blue;
    }*/
</style>