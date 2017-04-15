<template>
    <div class="mr-root side-menu" @click="sideHide">
        <img src="../assets/image/moren.png" alt="">
        <div>
            <p>{{name}}</p>
            <p class="score">积分 {{score}}</p>
        </div>
        <ul>
            <router-link tag="li" v-for="(l,index) in list" :to="l.uri" :key="l.index">
                <i :class="l.class"></i>
                {{l.name}}
            </router-link>
        </ul>
    </div>
</template>
<script>
    import bus from '../bus.js'
    export default{
        data(){
            return {
                list:[
                    {name:'首页',uri:'/',class:"icon-book"},
                    {name:'发布',uri:'/fabu',class:"icon-comment"},
                    {name:'我的',uri:'/user',class:"icon-user"},
                    {name:'登录',uri:'/login',class:"icon-user"}
                ],
                name:localStorage.getItem('loginname'),
                score:localStorage.getItem('score')
            }
        },
        methods:{
            sideHide(){
                this.$emit('hide')
            }
        }
    }
</script>
<style scoped>
    .side-menu{
       width:7rem;
       height: 18rem;
       padding-top:74px; 
       background: #383838;
    }
    .side-menu img{
        width:80px;
        height: 80px;
        border-radius: 50%;
        margin-left: 10px;
    }
    .side-menu div{
        font-size: .5rem;
        color: white;
        margin:-60px 0 0 100px;
    }
    .side-menu ul{
        margin-top:80px;
        width: 100%;
        height:100%;
        opacity: .9;
    }
    .side-menu ul li{
        height: 50px;
        border-bottom: 1px dotted #666;
        font-size: 14px;
        line-height: 50px;
        padding: 0 30px 0 20px;
        color: #9a9a9a;
    }
    .side-menu ul li i{
        width: .5rem;
        height: .5rem;
        color: white;
        line-height: 50px;
    }
    .score{
        font-size: .4rem;
        color:#d99e1a; 
    }
</style>