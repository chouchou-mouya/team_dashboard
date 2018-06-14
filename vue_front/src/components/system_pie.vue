<template>
    <div class="system_pie">
        <h1>AISND系統現況</h1>
        <p>{{system_mes}}</p>
        <Div class="system_svg">
            <cpu/>
            <ram/>            
        </Div>

    </div>
</template>
<script>
import cpu from "./pie_cpu"
import ram from "./pie_ram"

    export default {
        name:"system",
        components:{
            cpu,
            ram
        },
        data(){
            return{
                system_mes:"目前系統正常運作中"
            }
        }

    }


</script>