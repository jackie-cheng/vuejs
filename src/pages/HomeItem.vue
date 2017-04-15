<template>
    <div class="mr-item" @click="visited" :class="{click:isClick}">
            <div class="author">
                <img :src="r.author.avatar_url" alt="">
                <div class="aa">
                    <p class="name">{{r.author.loginname}}</p>
                    <p class="time">{{r.create_at | time}}</p>
                </div>
                <slot></slot>
                <!--<span class="cancel">取消收藏</span>-->
            </div>
            <router-link :to="'/detail/' + r.id">
                <div class="title">
                    <span class="title">{{r.title | message}}</span>
                </div>
            </router-link>
            <div class="bottom">
                <span class="tab" v-if="isTab"  v-bind:class="{active: isActive}">
                    {{getTab(r.top,r.good,r.tab)}}
                </span>
                <span class="number">
                    阅读量.{{r.visit_count}} 回复数.{{r.reply_count}}
                </span>
            </div>
    </div>
</template>
<script>
    var Tab = document.getElementsByClassName('tab')[0]
    export default{
        data(){
            return {
                isTab:this.Tab,
                isActive:false,
                isClick:false
            }
        },
        props:['r','Tab'],
        methods:{
            getTab(top,good,tab){
                if(top){
                    tab="置顶"
                    this.isActive=true
                }else if(good){
                    tab="精华" 
                    this.isActive=true 
                }
                else{
                    switch(tab){
                        case 'share':
                            tab="分享"
                        break;
                        case 'ask':
                            tab="问答"
                        break; 
                    }
                }
                return tab
            },
            visited(){
                this.isClick=true
            }
        },
        mounted(){
            if(this.isTab==true){

            }
        }
    }

</script>
<style scoped>
    .mr-item{
        border-bottom:1px dotted #ccc;
        width: 100%;
        font-size: .4rem;
        padding: 0 15px 0 15px;
    }
    .mr-item.click{
        background: #eee;
    }
    .anthor{
        position: relative;
        overflow: hidden;
    }
    .author .aa{
        display: inline-block;
        position: relative;
        /*top: -5px;*/
    }
    .author img{
       border-radius: 50%;
       width: 30px;
       height: 30px;
       margin-top: 10px;
    }
    .title{
        padding-left: 5px;
        font-size: .5rem;
        padding: 10px 0;
    }
    .bottom{
        padding-top: 10px;
        margin-bottom: 10px;
    }
    .bottom .tab{
        color: #3fb681;
        border: 1px solid #3fb681;
        border-radius: 5px;
        display: inline-block;
        padding: 1px 3px;
        font-size: .3rem;
    }
    .bottom .active{
        background: #3fb681;
        color: white;
    }
   .author .time,.bottom .number{
       color: #ccc;
       font-size: .3rem;

   }
   .cancel{
       position: relative;
       top: -10px;
       right: -60px;
       background: #3fb681;
       color: white;
       padding: 3px 5px;
       border-radius: 5px;
   }
</style>
    
    