<template>
    <div class="inner">
        <!-- <myicon/> -->
        <nav>
            <ul>
                <li>
                    <router-link to="/treemap" >
                        <svg viewbox="0 0 35 29">
                            <use xlink:href="#svghub_userdata"></use>
                        </svg>
                    </router-link>                
                </li>
                <li>
                    <router-link to="/system_pie">
                        <svg>
                            <use xlink:href="#svghub_systemdata"></use>
                        </svg>
                    </router-link>
                </li>
            </ul>
        </nav>
        <div class="content">
            <!--mode="out-in"是過度效果，要加上去 這樣在切換的時候 才不會有個空閑的時間 div1先淡出 div2在淡入-->
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>


<script>

// import Icon from 'vue-svg-icon/Icon.vue';
// Icon.inject('userdata');
// import myicon from "./icon/svghub.svg";
// console.log(myicon)


export default {
  name: 'mycontainer',
  data(){
      return{
          isclicked:false,
      }
  },
  methods:{
      navClick:function(){
          this.isclicked==true;
      }
  }
};        
</script>

<style >
    nav use{
        fill:  #b6b6b6;
        transition: 0.3s;
        cursor: pointer;
    }

    li:hover use{
        fill:#2caadf;
    }

    .nav_act use{
        fill:#2caadf!important;}

    nav svg{
        width:35px;
        height:35px;
    }
</style>