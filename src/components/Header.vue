<template> 
    <header>
        <i class="icon-reorder" @click="showSide"></i>
        <slot></slot>
        <i class="icon-search"></i>
    </header>
</template>
<script>
    import bus from '../bus.js'
    export default {
        methods:{
            showSide(){
                 bus.$emit('sideShow')
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
        color: white;
        font-size: .5rem;
    }
    .title{
        margin-left: calc(50% - 60px);     
        display: inline-block;
        font-size: .7rem;
        font-weight: bolder;
    }
    .icon-search{
        float: right;
        line-height: 44px;
        padding-left:20px;
    }
</style>
