<template>  
    <header>
        <i class="icon-chevron-left" @click="back"></i>
        <slot></slot>
    </header>
</template>
<script>
    export default{
        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>
<style scoped>
    header{
        height: 44px;
        background: #3fb681;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 100;
        padding: 0 15px;
        color: #fff;
        line-height: 44px;
        font-size: 16px;
    }
    header i{
        color: #fff;
    }
    .title{
        position: absolute;
        left: calc(50% - 30px);
        font-size: .5rem; 
        font-weight: bolder;    
        display: inline-block;
    }
</style>