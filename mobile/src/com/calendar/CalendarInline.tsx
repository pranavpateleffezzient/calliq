import React from 'react';
import { Calendar } from 'react-native-calendars';
import { getCalendarTheme } from './calendarTheme';
import useCalendar from './useCalendar';

export default function CalendarInline({
  mode = 'single',
  themeVariant = 'light',
  minDate,
  maxDate,
  disabledDates = [],
  markedDates = {},
  onChange,
}) {
  const theme = getCalendarTheme(themeVariant);
  const { selected, onDayPress } = useCalendar(mode);

  const handleDayPress = (day) => {
    onDayPress(day);
    onChange && onChange(day);
  };

  const disabledObj = {};
  disabledDates.forEach((d) => {
    disabledObj[d] = { disabled: true };
  });

  return (
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
    />
  );
}
