<template>
    <div class="pie_cpu">
        <svg :style="{width:svgpie_width,height:svgpie_height}" id="pie_svg"></svg>
    </div>
</template>

<script>
import * as d3 from 'd3';
import $ from "jquery";
import axios from 'axios';

    const pieWidth =450;
    const pieHeight=350;

    export default {
        name:"pie",
        data(){
            return{
                cpu_link:"static/json/aisnd_cpu.json",
                svgpie_width:pieWidth,
                svgpie_height:pieHeight,
                cpudata:null,
                pieColor:["#ffd076","#2fcfe7","#ff4964","#1f8ed5","#c3c3c3"],
                radius : pieWidth/3.5,
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
                let color_range = self.pieColor;
                let color = d3.scaleOrdinal()
                    .range(color_range)

                let pie = d3.pie().sort(null)
                        .value(function(d) {console.log(d); return d.value; });
                let svg = d3.select("#pie_svg")
                            .append("g")
                            .attr("transform", "translate(" + self.svgpie_width / 2 + "," + self.svgpie_height / 2 + ")")
                            .selectAll("g")
                            .data(pie(data))
                            .enter()
                            .append("g")

                svg.append("path")
                    .attr("d",arc)
                    .style("fill",function(d){ return color(d.value)})        
                    .on("mouseover",function(d){
                        d3.select(this)
                            .transition()
                            .style("fill","#dfedf0")
                    })
                    .on("mouseout",function(d){
                        d3.select(this)
                            .transition()
                            .style("fill",function(d){ return color(d.value)})
                    })

                //圓餅圖上的字
                svg.append("text")
                    .attr("transform",function(d) { return "translate(" + textArc.centroid(d) + ")"; })
                    //centroid為返回圓形的中心位置 不加的話 字會疊再一起，這種感覺有點像自己的圈圈找到正中間的意思
                    .attr("dy", "0.35em")
                    .text(function(d) { return d.data.value+"%";});

                //圖標的字
                svg.append("text")
                    .attr("x",function(d,i){
                         //i*某個數 通常這個數字會決定寬度 然後後面的數字是座落的位置
                        return i*200-(self.svgpie_width/2)+20
                    })
                    .attr("y",function(d,i){
                        return 0-(self.svgpie_height/2)+30
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
                        return i*200-(self.svgpie_width/2)
                    })
                    .attr("y",function(d,i){
                        return 0-(self.svgpie_height/2)+20
                    })
                    .attr("fill",function(d){return color(d.data.value)})

            }
        }
    }

</script>
<style>

    .pie_cpu{
        width:auto;
        background:#f7f7f7;
    }
    #pie_svg{
        cursor: pointer;        
    }
</style>