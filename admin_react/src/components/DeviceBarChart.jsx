import React  from 'react'
import { Fragment } from 'react'
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { Axes } from "@nivo/axes";
import { line } from "d3-shape";
import { computeXYScalesForSeries } from "@nivo/scales";
import { useTooltip, TableTooltip } from "@nivo/tooltip";
import { BoxLegendSvg } from "@nivo/legends";

// 라인 색
const lineColor = "rgba(255, 113, 113, 0.8)";
const lineColor2 = "rgba(80, 175, 73, 0.8)";

// 바 색
const colorsbar = {
  temp: "rgba(255, 168, 115, 0.8)",
  humi: "rgba(255, 255, 108, 0.8)",
  co2_sensor : lineColor,
  ph_ec_sensor: lineColor2
};
const getColor = (bar) => colorsbar[bar.id];




// 
const customLegendSpec = {
  anchor: "bottom",
  direction: "row",
  itemHeight: 20,
  itemWidth: 80,
  translateY: 80,
  translateX: 0,
  symbolShape: "circle",
  symbolSize: 10
};


  // 차트 설명
  const CustomLegend = (props) => {

    return (
      <BoxLegendSvg
        {...customLegendSpec}
        
        containerWidth={props.innerWidth}
        containerHeight={props.innerHeight}
        data={
          [
            {
              id:"temp",
              label:"온도",
              color:colorsbar["temp"],

            },
            {
              id:"humi",
              label:"습도",
              color:colorsbar["humi"],
            },
            {
              id:"co2_sensor",
              label:"co2센서",
              color:lineColor,
            },
            {
              id:"ph_ec_sensor",
              label:"phec센서",
              color:lineColor2,

            },
          ]
        }
      />
    );
  };



  // 오버 시 나타나는 메시지
function CustomTooltip({ timeValue, tempValue, humiValue , co2Value, phecValue }) {
  return (
    <TableTooltip
      rows={[
        ["시간", timeValue],
        ["온도", tempValue],
        ["습도", humiValue],
        ["co2센서", co2Value],
        ["phec센서", phecValue],
      ]}
    />
  );
}




const DeviceBarChart = ({ isDashboard = false , Data}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  // const databox = Array.from({length : 24},(_,index) => ({
  //   time: index+1,
  //   temp:0,
  //   humi:0,
  //   co2_sensor:0,
  //   ph_ec_sensor:0
  // }))

  // const combinedData = databox.map(box => {
  //   const apiEntry = Data.find(d => d.time === databox.time);
  //   return {
  //     time: databox.time,
  //     temp:apiEntry? apiEntry.temp : databox.temp,
  //     humi:apiEntry? apiEntry.humi : databox.humi,
  //     co2_sensor:apiEntry? apiEntry.co2_sensor : databox.co2_sensor,
  //     ph_ec_sensor:apiEntry? apiEntry.ph_ec_sensor : databox.ph_ec_sensor 
  //   }
  // })

  // 라인 그리기
  const Line = ({ bars, xScale, innerWidth, innerHeight, tooltip }) => {

    const scale = computeXYScalesForSeries(
      [
        {
          id: "co2_sensor",
          data: Data&&Data.length? Data.map((it) => ({ x: it.time, y: it.co2_sensor  })) :[]
        }
      ],
      { type: "linear" },
      { type: "linear" },
      innerWidth,
      innerHeight
    );

    const scale2 = computeXYScalesForSeries(
      [
        {
          id: "ph_ec_sensor",
          data: Data&&Data.length?  Data.map((it) => ({ x: it.time, y: it.ph_ec_sensor  })) :[]
        }
      ],
      { type: "linear" },
      { type: "linear" },
      innerWidth,
      innerHeight
    );
  
    
    // 선그리기
    const lineGenerator = line()
      // .x((bar) =>  bar.x + bar.width / 2 )
      .x((bar) => {
         return bar.x+ bar.width / 2 
        })
      .y((bar) => {    
        if(bar.data.data.co2_sensor === "0" ) return scale.yScale(0)
        return typeof bar.data.data.co2_sensor == "undefined"?scale.yScale(0):scale.yScale(bar.data.data.co2_sensor)
    });
    const lineGenerator2 = line()
      .x((bar) => { 
         return  bar.x+ bar.width / 2 
        })
      .y((bar) => { 
        if(bar.data.data.ph_ec_sensor === "0" ) return scale.yScale(0)
        return typeof bar.data.data.ph_ec_sensor == "undefined" ?scale2.yScale(0):scale2.yScale(bar.data.data.ph_ec_sensor)
    });

    
  
    const tip = useTooltip();
  
    function renderTip(e, idx) {

      return tip.showTooltipFromEvent(
        <CustomTooltip timeValue={Data&&Data.length?  Data[idx].time : null} tempValue={Data&&Data.length?   Data[idx].temp : null} humiValue={Data&&Data.length?  Data[idx].humi : null} co2Value={Data&&Data.length?  Data[idx].co2_sensor: null} phecValue={Data&&Data.length?  Data[idx].ph_ec_sensor: null}/>,
        e
      );
    }
    
    return (
      <Fragment>
        {/* y좌표  */}
        
        <Axes
          yScale={scale.yScale}
          xScale={xScale}
          width={innerWidth}
          height={innerHeight}
          right={{
            ticksPosition: "after",
            legend:"co2센서",
            legendPosition:"middle",
            legendOffset: 30,
            
          }}
        />
        <Axes
          yScale={scale2.yScale}
          xScale={xScale}
          width={innerWidth + 50}
          height={innerHeight}
          right={{
            ticksPosition: "after",
            legend:"phec센서",
            legendPosition:"middle",
            legendOffset: 30,
          }}
        />
        {/* 선삽입 */}
        <path
          d={lineGenerator(bars)}
          fill="none"
          stroke={lineColor}
          style={{ pointerEvents: "none" ,strokeWidth:"3"}}
        />
        <path
          d={lineGenerator2(bars)}
          fill="none"
          stroke={lineColor2 }
          style={{ pointerEvents: "none" ,strokeWidth:"3"}}
        />

        {/* 선 꼭짓점 */}
        {bars.map((bar) => (
          <circle
            key={bar.key}
            cx={bar.x + bar.width / 2}
            cy={(typeof bar.data.data.count == "undefined")|| bar.data.data.count === "0" ? scale.yScale(0)  : scale.yScale(bar.data.data.count)}
            r={3}
            fill={lineColor}
            stroke={lineColor}
            style={{ pointerEvents: "none" }}
          />
          
        ))}
        {bars.map((bar) => (
          <circle
            key={bar.key}
            cx={bar.x + bar.width / 2}
            cy={(typeof bar.data.data.pay == "undefined") || bar.data.data.pay === "0" ?  scale.yScale(0)  : scale2.yScale(bar.data.data.pay)}
            r={3}
            fill={lineColor2}
            stroke={lineColor2}
            style={{ pointerEvents: "none" }}
          />

          
        ))}

       
        
        {bars.map((bar, idx) => (
          <rect
            key={bar.key}
            x={bar.x}
            y={0}
            height={innerHeight}
            width={bar.width}
            fill="transparent"
            onMouseEnter={(e) => renderTip(e, idx)}
            onMouseMove={(e) => renderTip(e, idx)}
            onMouseLeave={tip.hideTooltip}
          />
        ))}


      </Fragment>
    );
  };





 

  return (
    <ResponsiveBar
      // groupMode="grouped"
      data={Data&&Data.length? Data:[]}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip:{
          container:{
            // backgroundColor:colors.blueAccent[700],  // 바탕
            color:"black", // 글자색
          },

          
        }
        
      }}
      keys={["temp","humi","co2_sensor","ph_ec_sensor"]}
      indexBy="time"
      // maxValue={6} //최댓값
      groupMode='grouped'
      margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      // colors={{ scheme: "nivo" }}    // nivo 기본
      colors={getColor}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "시간", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "측정값", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      // enableGridY={true}  // 바탕선 기본 true
      // legends={[
        
      //   {
      //     dataFrom: "keys",
      //     // data:["hi"],
      //     anchor: "bottom-right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 120,
      //     translateY: 0,
      //     itemsSpacing: 2,
      //     itemWidth: 100,
      //     itemHeight: 20,
      //     itemDirection: "left-to-right",
      //     itemOpacity: 0.85,
      //     symbolSize: 20,
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
      role="application"
      barAriaLabel={function (e) {
        return e.time + ": " + e.formattedValue + " in country: " + e.indexValue;
        
      }}
      // tooltip={pointer =>{
      //   return <div width="10%" height="10%">{pointer}</div>
      // }}

      // layers={["grid", "axes", "bars", Line,CustomLegend,"markers"]}
      layers={["grid", "axes", "bars", CustomLegend,"markers"]}
      // layers={["grid", "axes", "bars",  "legends"]}
    />
  );
};

export default React.memo(DeviceBarChart);