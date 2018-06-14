<template>
    <div class="contain">
        <myicon/>
        <myheader/>
        <mycontainer/>
    </div>
</template>

<script>
    import myheader from './myheader';
    import mycontainer from "./components/mycontainer";
    import myicon from "./components/icon/svghub.svg";


    export default {
        name:"my_main",
        components:{
            myheader,
            mycontainer,
            myicon,
        },
    }
</script>

<style>


</style>