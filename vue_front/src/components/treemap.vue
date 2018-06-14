<template>
    <div>
        <h1>AISND服務類型之各單位比例</h1>
        <p><span class="triangle"></span>目前<span>{{team}}</span>個團隊服務中</p>
        <div class="treeIndex">
            <ul>
                <li v-for="(teamName,i) in teamNames">
                    <span class="indexColor" :style="{background:color_range[i]}"></span>{{teamName}}
                </li>
            </ul>
        </div>
        <div class="treemap_blcok">
            <svg :style="{width: widthdata,height:heightdata}" id="treeimg"></svg>
        </div>
    </div>

</template>

<script>

import * as d3 from 'd3';
import $ from "jquery";
import axios from 'axios';
import d3_config from "./d3_config";
    // 宣告全域變數
    const treewidth= 800;
    const treeheight=400;
    //要記得在export default裡面操作喔
    export default {
		name:"treemap",
		data(){
			return{
                team:0,
                treeDatalink:"static/json/aisnd_project.json",
                treedata:null,
                widthdata:treewidth,
                heightdata:treeheight,
                teamNames:["研究計畫","專案計畫","教學計畫","產學合作"],
                color_range:d3_config.color_range,
                mouserover_color:d3_config.mouserover_color
			};
        },
        mounted(){
            this.getdata();
        },
        methods:{
            getdata:function(){
                let that = this;
                axios.get(that.treeDatalink)
                .then(function(res){
                    that.treedata=res.data;
                    that.user_treemap(that.treedata);
                })
                // $.ajax({
                //     type:"get",
                //     url:this.treeDatalink,
                //     dataType:"json",
                //     success:function(ajaxdata){
                //         this.treedata = ajaxdata;
                //         console.log(this.treedata,"in ajax");
                //         that.user_treemap(this.treedata);
                //     }
                // })
            },

            user_treemap:function(mydata){
                let self =this
                console.log(mydata,"test")
                //選用layout
                var treemap = d3.treemap()
                    .size([treewidth, treeheight])
                    //內部間距
                    .paddingInner(5);

                var color = d3.scaleOrdinal()
                    .range(self.color_range)

                var root = d3.hierarchy(mydata)
                    .sum(function(d){
                        if(d.size){
                            self.team += d.size;
                        }
                        return d.size})
                    .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

    
                treemap(root);

                var svg = d3.select("#treeimg").selectAll("g")
                    .data(root.leaves())
                    .enter().append("g")
                    .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

                var div =d3.select(".treemap_blcok").append("div")
                        .attr("class","tooltip")
                        .style("opacity",0);


                svg.append("rect")
                    .attr("width", function(d) { return d.x1 - d.x0; })
                    .attr("height", function(d) { return d.y1 - d.y0; })
                    .attr("fill", function(d) { return color(d.parent.data.name); })
                    .on("mouseover",function(d){

                        // var mouseover_data=d.data.conatin.length
                        // for(i=0,i)
                        // console.log(d.data["contain"].length);
                        
                        d3.select(this)
                            .transition()
                            .attr("fill",self.mouserover_color)

                        let all_t =[];
                        let t_length = d.data["contain"].length;
                        function t_loop(d){
                            for(let i=0 ; i < t_length ;i++){
                                // console.log(i,"i")
                                // console.log(d.data.contain[i].teacher,"T")
                                
                                // console.log(d.data.contain[0].teacher)
                                all_t[i]=d.data.contain[i].teacher;
                            }
                        }t_loop(d)
                        console.log(all_t,"all_t")
                            div.transition()
                            .style("opacity",0.9).text(all_t.join("、"))
                            .style("top",d.y0+"px")
                            .style("left",d.x1+"px");
                    })
                    .on("mouseout",function(d){
                        d3.select(this)
                            .transition()
                            .attr("fill", function(d) { return color(d.parent.data.name); })
                        div.transition().style("opacity",0)
                    })


                svg.append("text")
                    //先把數據抓出來
                    .attr("x","10")
                    .attr("y","20")
                    .text(function(d){console.log(d.data.name); return d.data.size})
                    //用tspan去換行
                    .selectAll("tspan")
                    //處理data，所以需要呼叫data
                    //split()是js的function 是用在於分裂，分段（裡面也可以使用正規表達式去判斷
                    .data(function(d) { return d.data.name.split(" ")})
                        .enter()
                        .append("tspan")
                        .attr("x", 30)
                        .attr("y", function(d, i) { return 20 + i * 20; })
                        .text(function(d) { console.log(d); return d})          
            }
        },
    };

// function init(){

//     $.ajax({
//         type:"get",
//         url:"static/json/aisnd_project.json",
//         dataType:"json",
//         success:function(ajaxData){
//             user_treemap(ajaxData)
//         }
//     })
// }


// $(function(){
//     init()
// })





</script>

<style>

    #treeimg{
        max-width:800px;
        display:block;
        margin:0 auto;
        text-align: center;
        cursor: pointer;
        
    }
    .treemap_blcok{
        position:relative;
    }
	.tooltip{
        max-width:100px;
        background: #afafaf;
        padding:10px;
        border-radius: 5px;
		color:#fff;
		position: absolute;
		z-index: 999;
	}
</style>