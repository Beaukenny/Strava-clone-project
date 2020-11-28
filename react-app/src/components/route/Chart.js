import React,{useEffect} from "react"
import * as d3 from "d3"


const Chart = ()=> {
const margin = { top: 0, right: 0, bottom: 15, left: 50 }
const width = 700 - margin.left - margin.right
const height = 155 - margin.top - margin.bottom
const data = [
  { x: 5, y: 15 },
  { x: 15, y: 20 },
  { x: 35, y: 5 }
]
useEffect(() => {
  drawChart()

}, []);
 console.log("data here", data)
 const drawChart = () => {
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.x))
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
    .attr("viewBox", "0 0 " + width + " " + 160)
    .attr("preserveAspectRatio", "xMinYMid")
    .append("g")
    .attr("transform", `translate(${margin.left}, 2.5)`)
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
  svg.append("g").call(d3.axisLeft(yScale))
}
  

    return (
      <>
      <h1>Chart</h1>
      <div style={{
        display: "flex",
        justifyContent: "center",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 0.625rem 0px"
      }}>
    <div id="elevationChart"/>
      </div>
      </>
    )
  }




export default Chart