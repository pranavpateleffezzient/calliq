// import React from 'react';
// import { Calendar } from 'react-native-calendars';
// import { getCalendarTheme } from './calendarTheme';
// import useCalendar from './useCalendar';

// export default function CalendarInline({
//   mode = 'single',
//   themeVariant = 'light',
//   minDate,
//   maxDate,
//   disabledDates = [],
//   markedDates = {},
//   onChange,
// }) {
//   const theme = getCalendarTheme(themeVariant);
//   const { selected, onDayPress } = useCalendar(mode);

//   const handleDayPress = (day) => {
//     onDayPress(day);
//     onChange && onChange(day);
//   };

//   const disabledObj = {};
//   disabledDates.forEach((d) => {
//     disabledObj[d] = { disabled: true };
//   });

//   return (
//     <Calendar
//       theme={theme}
//       hideExtraDays={true}
//       showSixWeeks={true}
//       firstDay={1}
//       minDate={minDate}
//       maxDate={maxDate}
//       markingType={mode === 'range' ? 'period' : 'simple'}
//       markedDates={{ ...markedDates, ...selected, ...disabledObj }}
//       onDayPress={handleDayPress}
//     />
//   );
// }
// CalendarInline.js
// CalendarInline.js
// import React from 'react';
// import { Calendar } from 'react-native-calendars';
// import { getCalendarTheme } from './calendarTheme';
// import useCalendar from './useCalendar';
// import { View, StyleSheet } from 'react-native';
// import colors from 'mobile/constant/colors';

// export default function CalendarInline({
//   mode = 'single',
//   themeVariant = 'light',
//   minDate,
//   maxDate,
//   disabledDates = [],
//   markedDates = {},
//   onChange,
//   selectedDates = {},
// }) {
//   const theme = getCalendarTheme(themeVariant);
//   const { selected, onDayPress, setSelected } = useCalendar(mode);

//   React.useEffect(() => {
//     if (Object.keys(selectedDates).length > 0) {
//       setSelected(selectedDates);
//     }
//   }, [selectedDates]);

//   const handleDayPress = (day) => {
//     onDayPress(day);
//     if (onChange) {
//       onChange(day);
//     }
//   };

//   const disabledObj = {};
//   disabledDates.forEach((d) => {
//     disabledObj[d] = { disabled: true, disableTouchEvent: true };
//   });

//   return (
//     <View style={styles.container}>
//       <Calendar
//         theme={theme}
//         hideExtraDays={true}
//         showSixWeeks={true}
//         firstDay={1}
//         minDate={minDate}
//         maxDate={maxDate}
//         markingType={mode === 'range' ? 'period' : 'simple'}
//         markedDates={{ ...markedDates, ...selected, ...disabledObj }}
//         onDayPress={handleDayPress}
//         style={styles.calendar}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   calendar: {
//     borderWidth: 1,
//     borderColor: colors.gray2,
//     borderRadius: 8,
//   },
// });

// CalendarInline.js
// import React, { useEffect } from 'react';
// import { Calendar } from 'react-native-calendars';
// import { getCalendarTheme } from './calendarTheme';
// import useCalendar from './useCalendar';
// import { View, StyleSheet } from 'react-native';
// import colors from 'mobile/constant/colors';
// import moment from 'moment';

// export default function CalendarInline({
//   mode = 'single',
//   themeVariant = 'light',
//   minDate,
//   maxDate,
//   disabledDates = [],
//   markedDates = {},
//   onChange,
//   selectedDates = {}, // External selected dates
// }) {
//   const theme = getCalendarTheme(themeVariant);
//   const { selected, onDayPress, setSelected } = useCalendar(mode, selectedDates);

//   // Update internal state when external selectedDates changes
//   useEffect(() => {
//     if (Object.keys(selectedDates).length > 0) {
//       setSelected(selectedDates);
//     }
//   }, [selectedDates]);

//   const handleDayPress = (day) => {
//     onDayPress(day);
//     if (onChange) {
//       // Pass the updated selection
//       setTimeout(() => {
//         onChange(day, selected);
//       }, 0);
//     }
//   };

//   const disabledObj = {};
//   disabledDates.forEach((d) => {
//     disabledObj[d] = { disabled: true, disableTouchEvent: true };
//   });

//   return (
//     <View style={styles.container}>
//       <Calendar
//         theme={theme}
//         hideExtraDays={true}
//         showSixWeeks={true}
//         firstDay={1}
//         minDate={minDate}
//         maxDate={maxDate}
//         markingType={mode === 'range' ? 'period' : 'simple'}
//         markedDates={{ ...markedDates, ...selected, ...disabledObj }}
//         onDayPress={handleDayPress}
//         style={styles.calendar}
//         // Add these props to ensure proper rendering
//         enableSwipeMonths={true}
//         current={Object.keys(selected)[0] || moment().format('YYYY-MM-DD')}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   calendar: {
//     borderWidth: 1,
//     borderColor: colors.gray2,
//     borderRadius: 8,
//   },
// });

//////////////

// CalendarInline.js
import React, { useEffect, useRef } from 'react';
import { Calendar } from 'react-native-calendars';
import { getCalendarTheme } from './calendarTheme';
import useCalendar from './useCalendar';
import { View, StyleSheet } from 'react-native';
import colors from 'mobile/constant/colors';
import moment from 'moment';

export default function CalendarInline({
  mode = 'single',
  themeVariant = 'light',
  minDate,
  maxDate,
  disabledDates = [],
  markedDates = {},
  onChange,
  selectedDates = {},
}) {
  const theme = getCalendarTheme(themeVariant);
  const { selected, onDayPress, setSelected } = useCalendar(mode, selectedDates);
  const isInitialMount = useRef(true);

  // Update internal state when external selectedDates changes
  useEffect(() => {
    if (!isInitialMount.current) {
      setSelected(selectedDates);
    } else {
      isInitialMount.current = false;
    }
  }, [selectedDates]);

  const handleDayPress = (day) => {
    onDayPress(day);
  };

  // Effect to call onChange after selected state updates
  useEffect(() => {
    if (!isInitialMount.current && onChange) {
      onChange(selected);
    }
  }, [selected]);

  const disabledObj = {};
  disabledDates.forEach((d) => {
    disabledObj[d] = { disabled: true, disableTouchEvent: true };
  });

  // Get current month from selected dates or use today
  const currentDate = Object.keys(selected)[0] || moment().format('YYYY-MM-DD');

  return (
    <View style={styles.container}>
      <Calendar
        theme={theme}
        hideExtraDays={true}
        showSixWeeks={true}
        firstDay={1}
        minDate={minDate}
        maxDate={maxDate}
        markingType={mode === 'range' ? 'period' : 'simple'}
        markedDates={{ ...markedDates, ...selected, ...disabledObj }}
        onDayPress={handleDayPress}
        style={styles.calendar}
        enableSwipeMonths={true}
        current={currentDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  calendar: {
    // borderWidth: 1,
    // borderColor: colors.gray2,
    // borderRadius: 8,
  },
});