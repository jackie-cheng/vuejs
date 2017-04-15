<template>
    <div class="mr-root">
        <public-header>
            <p class="title">vue.js</p>
        </public-header>
        <router-view></router-view>
        <div class="tabbar">
            <router-link  v-for="(l,index) in list" :to="l.uri" :key="l.index">
                <i :class="l.class"></i>
                <p>{{l.name}} </p>
            </router-link>
        </div>
    </div>
</template>
<script>
    import  PublicHeader from './Header'
    export default{
        data(){
            return{
                list:[
                    {name:"全部",uri:"/home",class:"icon-home"},
                    {name:"分享",uri:"/share",class:"icon-reply"},
                    {name:"问答",uri:"/askanswer",class:"icon-edit"},
                    {name:"招聘",uri:"/job",class:"icon-user"}
                ]
            }
        },
        components:{
            PublicHeader
        },

    }
</script>
<style>
    .mr-content{
        padding-top: 44px;
    }
    .tabbar{
      height: 49px;
      position: fixed;
      bottom: 0;
      background: #fff;
      border-top: 1px solid #ccc;
      line-height: 49px;
      text-align: center;
      width: 100%;
      display: flex;
    }
    .tabbar a{
      flex-basis: 25%;
      color: #ccc;
    }
    .tabbar>a>i{
       width:25px;
       height: 25px;
       position: relative;
       top: -.15rem;
       font-size: .5rem;
    }
    .tabbar p{
        height: .15rem;
        width: 100%;
        margin-top: -40px;
        font-size: .4rem;
    }
    a.is-active{
      color: #34485d;
    }
</style>