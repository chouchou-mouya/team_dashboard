
//vue全域
Vue.component("web-bg",
{
    template:`
    <div class="background">
        <div class="bg_mask"></div>
        <div class="bg_img"><img src="/static/images/bg_img.png"></div>
    </div>    
    `
});

const vm =new Vue({
    el:"#myapp",
    delimiters: ['[[', ']]'],
    data:{
        "username":"admin"
    }

})


