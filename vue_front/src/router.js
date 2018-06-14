import Vue from 'vue';
//引入router
import VueRouter from 'vue-router';

//定義router
import treemap from "./components/treemap";
import system_pie from "./components/system_pie";
import conindex from "./components/conindex"

Vue.use(VueRouter)  

//ES6裡引入了impot跟export的概念，必須要用exprot default才能操控模板
export default new VueRouter({
    linkActiveClass:"nav_act",
    routes:[
        {
            path:"/",
            name:"conindex",
            component:conindex
        },
        {
            path:"/treemap",
            name:"treemap",
            component:treemap
        },
        {
            path:"/system_pie",
            name:"system_pie",
            component:system_pie        
        }
    ],
})

  
