// import { View, Text, ScrollView } from 'react-native';
// import React from 'react';
// import {
//   BarChart,
//   LineChart,
//   PieChart,
//   PopulationPyramid,
//   RadarChart,
//   BubbleChart,
// } from 'react-native-gifted-charts';

// export default function Taskscreen() {
//   const barData = [
//     { value: 50, label: 'Jan' },
//     { value: 80, label: 'Feb' },
//     { value: 90, label: 'Mar' },
//     { value: 70, label: 'Apr' },
//   ];
//     const lineData = [{value: 10}, {value: 30}, {value: 80}, {value: 60}, {value: 90}];


//   const data = [
//     { value: 50, label: 'Jan' },
//     { value: 80, label: 'Feb' },
//     { value: 90, label: 'Mar' },
//     { value: 70, label: 'Apr' },
//   ];

//   return (
//     <View>
//       <Text>Taskscreen</Text>

//       <ScrollView>
//         <View style={{ flexDirection: 'column' }}>
//           <BarChart
//             data={barData}
//             isAnimated 
//             showGradient
//             gradientColor={'#63C7FF'}
//             frontColor={'#177AD5'}
//             barWidth={40}
//             noOfSections={4}
//             maxValue={100}
//             showValuesAsTopLabel
//             xAxisLabelTextStyle={{ color: 'gray' }}
//             yAxisTextStyle={{ color: 'gray' }}
//           />
//           <LineChart
//       data={lineData}
//       isAnimated // Enables the entrance animation
//       areaChart // Turns the line chart into an area chart
//       color="green"
//       thickness={3}
//       startFillColor="rgba(0, 255, 0, 0.5)"
//       endFillColor="rgba(0, 255, 0, 0.0)"
//       startOpacity={0.9}
//       endOpacity={0.2}
//       spacing={50}
//       hideDataPoints
//       showStripOnFocus
//       showTextOnFocus
//     />
//           <PieChart data={data} isAnimated />
//           <PopulationPyramid
//             data={[
//               { left: 10, right: 12 },
//               { left: 9, right: 8 },
//             ]}
//           />
//           <RadarChart data={[50, 80, 90, 70]} />
//           <BubbleChart
//             data={[
//               { x: 20, y: 4, r: 10 },
//               { x: 40, y: 6, r: 20 },
//             ]}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }


import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
  BubbleChart,
} from 'react-native-gifted-charts';
import colors from 'mobile/constant/colors';
import fonts from 'mobile/constant/font';

export default function Taskscreen() {
  const [chartKey, setChartKey] = useState(Date.now());

  useFocusEffect(
    React.useCallback(() => {
      setChartKey(Date.now());
    }, [])
  );

  // Bar Chart Data
  const barData = [
    { value: 50, label: 'Jan' },
    { value: 80, label: 'Feb' },
    { value: 90, label: 'Mar' },
    { value: 70, label: 'Apr' },
  ];
  
  // Line Chart Data
  const lineData = [
    { value: 10, label: 'Mon' },
    { value: 30, label: 'Tue' },
    { value: 80, label: 'Wed' },
    { value: 60, label: 'Thu' },
    { value: 90, label: 'Fri' },
  ];

  // Pie Chart Data (needs colors for each slice)
  const pieData = [
    { value: 50, label: 'Jan', color: colors.primary, text: '50' },
    { value: 80, label: 'Feb', color: colors.primaryLight, text: '80' },
    { value: 90, label: 'Mar', color: colors.green3 || '#FFA500', text: '90' },
    { value: 70, label: 'Apr', color: colors.red5 || '#FFD700', text: '70' },
  ];

  // Population Pyramid Data
  const populationData = [
    { left: 10, right: 12, label: '0-4' },
    { left: 15, right: 14, label: '5-9' },
    { left: 20, right: 18, label: '10-14' },
    { left: 25, right: 24, label: '15-19' },
    { left: 30, right: 28, label: '20-24' },
  ];

  // Radar Chart Data with labels
  const radarData = [50, 80, 90, 70, 60];
  const radarLabels = ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'];

  // Bubble Chart Data
  const bubbleData = [
    { 
      x: 20, 
      y: 4, 
      r: 10, 
      label: 'A',
      bubbleTextStyle: { fontFamily: fonts.bol, fontSize: 10 }
    },
    { 
      x: 40, 
      y: 6, 
      r: 20, 
      label: 'B',
      bubbleTextStyle: { fontFamily: fonts.bol, fontSize: 12 }
    },
    { 
      x: 60, 
      y: 8, 
      r: 15, 
      label: 'C',
      bubbleTextStyle: { fontFamily: fonts.bol, fontSize: 10 }
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background || '#fff' }}>
      <Text style={{ 
        fontFamily: fonts.bol, 
        fontSize: 20, 
        padding: 16,
        color: colors.primary || '#000'
      }}>
        Taskscreen
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16, gap: 24 }}>
          
          {/* Bar Chart */}
          <View style={{ backgroundColor: '#fff', green12Radius: 12, padding: 16 }}>
            <Text style={{ fontFamily: fonts.bol, fontSize: 16, marginBottom: 16 }}>
              Bar Chart
            </Text>
            <BarChart
              key={`bar-${chartKey}`}
              data={barData}
              animationDuration={2000}
              isAnimated
              showGradient
              gradientColor={colors.primaryLight}
              frontColor={colors.primary}
              barWidth={40}
              noOfSections={4}
              maxValue={100}
              showValuesAsTopLabel
              xAxisLabelTextStyle={{ 
                color: colors.primary || 'gray',
                fontFamily: fonts.reg,
                fontSize: 12
              }}
              yAxisTextStyle={{ 
                color: colors.primary || 'gray',
                fontFamily: fonts.reg,
                fontSize: 12
              }}
              topLabelTextStyle={{ 
                fontFamily: fonts.bol,
                fontSize: 10,
                color: colors.primary
              }}
              hideRules={false}
              rulesColor={colors.green10 || '#ddd'}
              backgroundColor="#fff"
              showLine={false}
            />
          </View>

          {/* Line Chart */}
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16 }}>
            <Text style={{ fontFamily: fonts.bol, fontSize: 16, marginBottom: 16 }}>
              Line Chart
            </Text>
            <LineChart
              key={`line-${chartKey}`}
              data={lineData}
              isAnimated
              areaChart
              animationDuration={2000}
              color={colors.primary}
              thickness={3}
              startFillColor={colors.primary}
              endFillColor={colors.primaryLight}
              startOpacity={0.9}
              endOpacity={0.2}
              spacing={50}
              hideDataPoints={false}
              dataPointsColor={colors.primary}
              dataPointsRadius={4}
              showStripOnFocus
              showTextOnFocus
              xAxisLabelTextStyle={{ 
                fontFamily: fonts.reg,
                color: colors.primary || 'gray',
                fontSize: 12
              }}
              yAxisTextStyle={{ 
                fontFamily: fonts.reg,
                color: colors.primary || 'gray',
                fontSize: 12
              }}
              focusTextStyle={{ 
                fontFamily: fonts.bol,
                fontSize: 12,
                color: colors.primary
              }}
              dataPointsLabelStyle={{ 
                fontFamily: fonts.bol,
                fontSize: 10,
                color: colors.primary
              }}
              backgroundColor="#fff"
              rulesColor={colors.green10 || '#ddd'}
            />
          </View>

          {/* Pie Chart */}
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16 }}>
            <Text style={{ fontFamily: fonts.bol, fontSize: 16, marginBottom: 16 }}>
              Pie Chart
            </Text>
            <PieChart 
              key={`pie-${chartKey}`}
              data={pieData}
              isAnimated
              animationDuration={2000}
              showText
              textColor={colors.primary || '#000'}
              textSize={12}
              radius={120}
              innerRadius={50}
              showTextBackground
              textBackgroundColor="white"
              textBackgroundRadius={10}
              textStyle={{ 
                fontFamily: fonts.bol,
                fontSize: 12
              }}
              labelStyle={{ 
                fontFamily: fonts.bol,
                fontSize: 14,
                color: colors.primary || '#000'
              }}
              innerCircleColor="white"
              centerLabelComponent={() => (
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontFamily: fonts.bol, fontSize: 18, color: colors.primary }}>
                    Total
                  </Text>
                  <Text style={{ fontFamily: fonts.reg, fontSize: 14 }}>
                    290
                  </Text>
                </View>
              )}
            />
          </View>

          {/* Population Pyramid */}
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16 }}>
            <Text style={{ fontFamily: fonts.bol, fontSize: 16, marginBottom: 16 }}>
              Population Pyramid
            </Text>
            <PopulationPyramid
              key={`population-${chartKey}`}
              data={populationData}
              leftColor={colors.primary}
              rightColor={colors.primaryLight}
              leftBarBorderRadius={4}
              rightBarBorderRadius={4}
              showValuesAsTopLabel
              animationDuration={2000}
              isAnimated
              xAxisLabelTextStyle={{ 
                fontFamily: fonts.reg,
                fontSize: 12,
                color: colors.primary || 'gray'
              }}
              yAxisLabelTextStyle={{ 
                fontFamily: fonts.reg,
                fontSize: 12,
                color: colors.primary || 'gray'
              }}
              topLabelTextStyle={{ 
                fontFamily: fonts.bol,
                fontSize: 10,
                color: colors.primary
              }}
              leftLabelComponent={(item) => (
                <Text style={{ fontFamily: fonts.bol, fontSize: 10 }}>
                  {item.left}
                </Text>
              )}
              rightLabelComponent={(item) => (
                <Text style={{ fontFamily: fonts.bol, fontSize: 10 }}>
                  {item.right}
                </Text>
              )}
            />
          </View>

          {/* Radar Chart */}
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16 }}>
            <Text style={{ fontFamily: fonts.bol, fontSize: 16, marginBottom: 16 }}>
              Radar Chart
            </Text>
            <RadarChart 
              key={`radar-${chartKey}`}
              data={radarData}
              labels={radarLabels}
              labelColor={colors.primary || '#000'}
              strokeColor={colors.primary}
              fillColor={colors.primaryLight}
              fillOpacity={0.5}
              strokeWidth={2}
              maxValue={100}
              isAnimated
              animationDuration={2000}
              labelStyle={{ 
                fontFamily: fonts.reg,
                fontSize: 12,
                color: colors.primary || 'gray'
              }}
              axisLabelStyle={{ 
                fontFamily: fonts.reg,
                fontSize: 10,
                color: colors.primary || 'gray'
              }}
              webColor={colors.green10 || '#ddd'}
            />
          </View>

          {/* Bubble Chart */}
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16 }}>
            <Text style={{ fontFamily: fonts.bol, fontSize: 16, marginBottom: 16 }}>
              Bubble Chart
            </Text>
            <BubbleChart
              key={`bubble-${chartKey}`}
              data={bubbleData}
              bubbleColor={colors.primary}
              bubbleBorderColor="white"
              bubbleBorderWidth={2}
              showLabels
              maxValue={100}
              noOfSections={4}
              isAnimated
              animationDuration={2000}
              xAxisLabelTextStyle={{ 
                fontFamily: fonts.reg,
                fontSize: 12,
                color: colors.primary || 'gray'
              }}
              yAxisLabelTextStyle={{ 
                fontFamily: fonts.reg,
                fontSize: 12,
                color: colors.primary || 'gray'
              }}
              bubbleTextStyle={{ 
                fontFamily: fonts.bol,
                fontSize: 10,
                color: 'white'
              }}
              backgroundColor="#fff"
              rulesColor={colors.green10 || '#ddd'}
              showYAxisIndices
              showXAxisIndices
            />
          </View>

        </View>
      </ScrollView>
    </View>
  );
}