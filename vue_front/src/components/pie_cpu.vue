<template>
    <div class="pie_cpu">
        <h3>
            <svg width="30" height="30">
                <use xlink:href="#svghub_cpuIcon"></use>
            </svg>
            CPU用量
        </h3>
        <svg :style="{width:pieWidth,height:pieHeight}" id="pie_svg_cpu"></svg>
    </div>
</template>

<script>
import * as d3 from 'd3';
import $ from "jquery";
import axios from 'axios';
import d3_config from "./d3_config"

    
    export default {
        name:"pie_cpu",
        data(){
            return{
                cpu_link:"static/json/aisnd_cpu.json",
                pieWidth:d3_config.pieWidth,
                pieHeight:d3_config.pieHeight,
                cpudata:null,
                color_range:d3_config.color_range,
                radius : d3_config.pieWidth/3.5,
                mouserover_color:d3_config.mouserover_color
            }
        },
        mounted(){
            this.getCPUdata();
        },
        methods:{
            getCPUdata:function(){
                let that = this;
                axios.get(that.cpu_link)
                .then(function(res){
                    that.cpudata = res.data;
                    that.cpu_pie(that.cpudata)

                })
            },
            cpu_pie:function(data){
                let self =this;
                console.log(data,"cpu看有沒有傳進去function => 20180606 OK");
                
                //d3.svg.arc()是弧形產生器，總共有四個參數
                //outerRadius、innerRadius、startAngle、endAngle。
                //外半徑、內半徑、弧形起始、弧形結束
                //但如果是為圓形的話，省略弧形的起始節數值，內半徑設為0（則代表填滿的狀態）如果大於零的話，中間就會是摟空的狀態
                //而外半徑則是決定大小
                let arc = d3.arc().innerRadius(0).outerRadius(self.radius);
                let textArc =d3.arc().innerRadius(0).outerRadius(self.radius-40);
                let color = d3.scaleOrdinal()
                    .range(self.color_range)

                let pie = d3.pie().sort(null)
                        .value(function(d) {console.log(d); return d.value; });
                let svg = d3.select("#pie_svg_cpu")
                            .append("g")
                            .attr("transform", "translate(" + self.pieWidth/2 + "," + self.pieHeight/2 + ")")
                            .selectAll("g")
                            .data(pie(data))
                            .enter()
                            .append("g")

                svg.append("path")
                    .attr("d",arc)
                    .style("fill",function(d){
                               return color(d.value) 
                        })
                    .transition()
                    .duration(500)
                    .attrTween("d",function(d){
                        //當我們利用d3.transition的時候，底層用interpolate的function在運作，所以我們也要利用他
                        //利用補間函數處理 3.interpolate(a, String(value.call(this, d, i)))
                        //starAngle跟endAngle是內建的 代表起始弧度跟終止弧度
		                var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                        //需要有個終止
		                return function(t) {
			                d.endAngle = i(t); 
			                return arc(d)
			            }
                    })                                
                    // .on("mouseover",function(d){
                    //     d3.select(this)
                    //         .transition()
                    //         .style("fill",self.mouserover_color)
                    // })
                    // .on("mouseout",function(d){
                    //     d3.select(this)
                    //         .transition()
                    //         .style("fill",function(d){ return color(d.value)})
                    // })

                svg.selectAll("path")
                     .on("mouseover",function(d){
                        d3.select(this)
                            .transition()
                            .style("fill",self.mouserover_color)
                    })
                    .on("mouseout",function(d){
                        d3.select(this)
                            .transition()
                            .style("fill",function(d){ return color(d.value)})
                    })    


                //圓餅圖上的字
                svg.append("text")
                    .transition()
                    .duration(800)
                    .attr("transform",function(d) { return "translate(" + textArc.centroid(d) + ")"; })
                    //centroid為返回圓形的中心位置 不加的話 字會疊再一起，這種感覺有點像自己的圈圈找到正中間的意思
                    .attr("dy", "0.35em")
                    .text(function(d) { return d.data.value+"%";});

                //圖標的字
                svg.append("text")
                    .attr("x",function(d,i){
                         //i*某個數 通常這個數字會決定寬度 然後後面的數字是座落的位置
                        return i*180-(self.pieWidth/2)+20
                    })
                    .attr("y",function(d,i){
                        return 0-(self.pieHeight/2)+50
                    }
                        //i*某個數 通常這個數字會決定行距 然後後面加的數據是座落的高度
                    )
                    .text(function(d){
                        return d.data.name+d.data.value;
                    });
                
                //圖標
                svg.append("rect")
                    .attr("width",10)
                    .attr("height",10)
                    .attr("x",function(d,i){
                        return i*180-(self.pieWidth/2)
                    })
                    .attr("y",function(d,i){
                        return 0-(self.pieHeight/2)+40
                    })
                    .attr("fill",function(d){return color(d.data.value)})

            }
        }
    }

</script>
<style>

    #pie_svg_cpu{
        cursor: pointer;        
    }
    .pie_cpu h3{
        width:100%;
        padding:20px 0 0 0;
        text-align: center;
        font-size:30px;
        /* font-weight: bold; */
        color:#8a8a8a;
    }
        .pie_cpu h3 use{
            fill:#8a8a8a;
            transform: scale(0.8);
        }
</style>