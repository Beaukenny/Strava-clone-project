import React,{useEffect, useState} from "react"
import * as d3 from "d3"
import {calculateChartData} from "../routeUtil/utils"


const Chart = ({chartData})=> {
const margin = { top: 10, right: 30, bottom: 30, left: 50 }
const width = 700 - margin.left - margin.right
const height = 155 - margin.top - margin.bottom
const [data, setData] = useState([
{x:0, y:0},{x:5, y:0},{x:10, y:0}])

useEffect(()=> {

  if (data.length !== chartData.length){
        destroyChart()
      }
      drawChart(chartData)
}, [chartData])

  const destroyChart = () => {
    d3.selectAll("#elevationChart > *").remove()
  }


 const drawChart = (data) => {
  const xAxisSpace = 10
  const yAxisSpace = 6
  const xScale = d3
    .scaleLinear()
    // .domain(d3.extent(data, each => each.x))
    .domain([d3.min(data, co => co.x), d3.max(data, co => co.x)])
    .range([0, width])
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(data, co => co.y), d3.max(data, co => co.y)])
    .range([height, 0])
  const svg = d3
    .select("#elevationChart")
    .append("svg")
    .attr("width", 700)
    .attr("height", 155)
    .attr("viewBox", "0 -10 " + width + " " + 160)
    .attr("preserveAspectRatio", "xMinYMid")
    .append("g")
    .attr("transform", `translate(${margin.left}, 2.5)`)
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(
      d3
        .axisBottom(xScale)
        .ticks(xAxisSpace)
        .tickFormat(d => d3.format(".1f")((d)) + " mi")
        .tickSize(0)
        .tickPadding(9)
    )
  svg.append("g").call(
    d3
      .axisLeft(yScale)
      .ticks(yAxisSpace)
      .tickFormat(d => d3.format(",.0f")((d)) + " ft")
      .tickSize(0)
      .tickPadding(8)
  )
  const area = d3
  .area()
  .x(d => xScale(d.x))
  .y0(yScale(yScale.domain()[0]))
  .y1(d => yScale(d.y))
  .curve(d3.curveCatmullRom.alpha(0.005))
  svg
  .append("path")
  .attr("d", area(data))
  .style("stroke", "#787979")
  .style("stroke-opacity", 0.2)
  .style("stroke-width", 1)
  .style("fill", "#787979")
  .style("fill-opacity", 0.2)

}
  

    return (
      <>

      <div className="elevationChart" style={{
        display: "flex",
        justifyContent: "center",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 0.625rem 0px",
      }}> 
    <div id="elevationChart"/>
      </div>
      </>
    )
  }




export default Chart




