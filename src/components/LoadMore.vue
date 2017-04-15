<template>      
    <div class="loadMore">
        <span class="load" @click="loadMore">点击加载更多</span>
    </div>
</template>
<script>

    export default{
        methods:{
            loadMore(){
                this.$emit('click')
            }
        }
    }
</script>
<style>
     .loadMore{
         margin: 10px 0;
         text-align: center;
     }
     .load{
         display: inline-block;
         border: 1px solid #34485d;
         color: #34485d;
         border-radius: 10px;
         line-height: 40px;
         width: 3rem;
     }
</style>