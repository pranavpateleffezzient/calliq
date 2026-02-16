// // import { useState } from 'react'
// // import { formatDate, getRange } from './helpers'

// // export default function useCalendar(mode = 'single') {
// //   const [selected, setSelected] = useState({})
// //   const [startDate, setStartDate] = useState(null)

// //   const onDayPress = (day) => {
// //     const date = day.dateString

// //     // SINGLE DATE
// //     if (mode === 'single') {
// //       setSelected({
// //         [date]: { selected: true }
// //       })
// //     }

// //     // MULTI DATE
// //     if (mode === 'multi') {
// //       setSelected(prev => ({
// //         ...prev,
// //         [date]: {
// //           selected: !prev[date]
// //         }
// //       }))
// //     }

// //     // RANGE DATE
// //     if (mode === 'range') {
// //       if (!startDate) {
// //         setStartDate(date)
// //         setSelected({
// //           [date]: { startingDay: true, color: '#0A4EDC', textColor: 'white' }
// //         })
// //       } else {
// //         const range = getRange(startDate, date)
// //         setSelected(range)
// //         setStartDate(null)
// //       }
// //     }
// //   }

// //   return { selected, onDayPress, setSelected }
// // }
// // useCalendar.js

// import { useState } from 'react';
// import moment from 'moment';
// import colors from 'mobile/constant/colors';

// export default function useCalendar(mode = 'single') {
//   const [selected, setSelected] = useState({});

//   const onDayPress = (day) => {
//     const dateString = day.dateString;
    
//     if (mode === 'single') {
//       // Single mode - just select one date
//       const newSelected = {};
//       newSelected[dateString] = {
//         selected: true,
//         selectedColor: colors.primary,
//       };
//       setSelected(newSelected);
//     } else if (mode === 'range') {
//       // Range mode implementation
//       const selectedKeys = Object.keys(selected);
      
//       if (selectedKeys.length === 0) {
//         // First date selected
//         const newSelected = {};
//         newSelected[dateString] = {
//           startingDay: true,
//           endingDay: false,
//           selected: true,
//           color: colors.primary,
//           textColor: colors.white,
//         };
//         setSelected(newSelected);
//       } else if (selectedKeys.length === 1) {
//         // Second date selected
//         const startDate = selectedKeys[0];
//         const endDate = dateString;
        
//         if (moment(startDate).isAfter(endDate)) {
//           // If start date is after end date, swap
//           const newSelected = {};
//           newSelected[endDate] = {
//             startingDay: true,
//             endingDay: false,
//             selected: true,
//             color: colors.primary,
//             textColor: colors.white,
//           };
//           setSelected(newSelected);
//         } else {
//           // Create range
//           const newSelected = {};
//           let currentDate = moment(startDate);
//           const lastDate = moment(endDate);
          
//           while (currentDate <= lastDate) {
//             const currentDateString = currentDate.format('YYYY-MM-DD');
            
//             if (currentDateString === startDate) {
//               newSelected[currentDateString] = {
//                 startingDay: true,
//                 endingDay: false,
//                 selected: true,
//                 color: colors.primary,
//                 textColor: colors.white,
//               };
//             } else if (currentDateString === endDate) {
//               newSelected[currentDateString] = {
//                 startingDay: false,
//                 endingDay: true,
//                 selected: true,
//                 color: colors.primary,
//                 textColor: colors.white,
//               };
//             } else {
//               newSelected[currentDateString] = {
//                 selected: true,
//                 color: colors.primary + '20', // 20% opacity for middle days
//                 textColor: colors.primary,
//               };
//             }
            
//             currentDate.add(1, 'day');
//           }
//           setSelected(newSelected);
//         }
//       } else {
//         // Reset and start new range
//         const newSelected = {};
//         newSelected[dateString] = {
//           startingDay: true,
//           endingDay: false,
//           selected: true,
//           color: colors.primary,
//           textColor: colors.white,
//         };
//         setSelected(newSelected);
//       }
//     }
//   };

//   return { selected, onDayPress, setSelected };
// }

///////////////

// useCalendar.js
import { useState, useEffect } from 'react';
import moment from 'moment';
import colors from 'mobile/constant/colors';

export default function useCalendar(mode = 'single', initialSelectedDates = {}) {
  const [selected, setSelected] = useState({});

  // Update selected when initialSelectedDates changes
  useEffect(() => {
    if (Object.keys(initialSelectedDates).length > 0) {
      setSelected(initialSelectedDates);
    } else {
      setSelected({});
    }
  }, [initialSelectedDates]);

  const onDayPress = (day) => {
    const dateString = day.dateString;
    
    if (mode === 'single') {
      // Single mode - just select one date
      const newSelected = {};
      newSelected[dateString] = {
        selected: true,
        selectedColor: colors.primary,
      };
      setSelected(newSelected);
    } else if (mode === 'range') {
      // Range mode implementation
      const selectedKeys = Object.keys(selected);
      
      if (selectedKeys.length === 0) {
        // First date selected
        const newSelected = {};
        newSelected[dateString] = {
          startingDay: true,
          endingDay: false,
          color: colors.primary,
          textColor: colors.white,
        };
        setSelected(newSelected);
      } else if (selectedKeys.length === 1) {
        // Check if the first selected has startingDay
        const firstSelected = selected[selectedKeys[0]];
        const startDate = selectedKeys[0];
        const endDate = dateString;
        
        if (moment(startDate).isSame(endDate)) {
          // Same date - just select that date
          const newSelected = {};
          newSelected[dateString] = {
            selected: true,
            selectedColor: colors.primary,
          };
          setSelected(newSelected);
        } else if (moment(startDate).isAfter(endDate)) {
          // If start date is after end date, start new range with end date
          const newSelected = {};
          newSelected[endDate] = {
            startingDay: true,
            endingDay: false,
            color: colors.primary,
            textColor: colors.white,
          };
          setSelected(newSelected);
        } else {
          // Create proper range from start to end
          const newSelected = {};
          let currentDate = moment(startDate);
          const lastDate = moment(endDate);
          
          while (currentDate <= lastDate) {
            const currentDateString = currentDate.format('YYYY-MM-DD');
            
            if (currentDateString === startDate) {
              newSelected[currentDateString] = {
                startingDay: true,
                endingDay: false,
                color: colors.primary,
                textColor: colors.white,
              };
            } else if (currentDateString === endDate) {
              newSelected[currentDateString] = {
                startingDay: false,
                endingDay: true,
                color: colors.primary,
                textColor: colors.white,
              };
            } else {
              newSelected[currentDateString] = {
                color: colors.primary + '20',
                textColor: colors.primary,
              };
            }
            currentDate.add(1, 'day');
          }
          setSelected(newSelected);
        }
      } else {
        // Reset and start new range
        const newSelected = {};
        newSelected[dateString] = {
          startingDay: true,
          endingDay: false,
          color: colors.primary,
          textColor: colors.white,
        };
        setSelected(newSelected);
      }
    }
  };

  return { selected, onDayPress, setSelected };
}