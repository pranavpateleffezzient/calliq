import React, { useState, useCallback, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';
import fonts from 'mobile/constant/font';
const FastCalendar = memo(({
  // Selection
  value,
  onDateChange,
  mode = 'single',
  startDate,
  endDate,
  onRangeChange,
  
  // Constraints
  minDate,
  maxDate,
  
  // Colors - FULL CONTROL
  selectedColor = colors.blue6,
  selectedTextColor = colors.white,
  todayColor = colors.blue6,
  todayTextColor = colors.blue6,
  dayTextColor = colors.gray10,
  monthTextColor = colors.gray9,
  disabledTextColor = colors.gray5,
  backgroundColor = colors.white,
  
  // Text styles
  dayFontSize = 14,
  monthFontSize = 16,
  headerFontSize = 18,
  
  // Sizes
  daySize = 40,
  calendarWidth = 350,
  
  // Simple mode
  showTodayButton = true,
  todayButtonText = 'Today',
  
  // Performance
  hideExtraDays = true,
  
  ...props
}) => {
  const [markedDates, setMarkedDates] = useState({});

  // Format date for react-native-calendars
  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  // Handle date press
  const handleDayPress = useCallback((day) => {
    const date = new Date(day.dateString);
    
    if (mode === 'single') {
      const newMarkedDates = {
        [day.dateString]: {
          selected: true,
          selectedColor,
          selectedTextColor,
        }
      };
      setMarkedDates(newMarkedDates);
      onDateChange?.(date);
    } else {
      // Range selection logic
      // You can implement range selection here
    }
  }, [mode, selectedColor, selectedTextColor, onDateChange]);

  const handleTodayPress = useCallback(() => {
    const today = new Date();
    const todayStr = formatDate(today);
    
    const newMarkedDates = {
      [todayStr]: {
        selected: true,
        selectedColor,
        selectedTextColor,
      }
    };
    setMarkedDates(newMarkedDates);
    onDateChange?.(today);
  }, [selectedColor, selectedTextColor, onDateChange]);

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor,
        borderRadius: dimonds.radius[4],
        padding: dimonds.space[4],
        width: calendarWidth,
      }
    ]}>
      {showTodayButton && (
        <TouchableOpacity 
          style={styles.todayButton}
          onPress={handleTodayPress}
        >
          <Text style={styles.todayButtonText}>
            {todayButtonText}
          </Text>
        </TouchableOpacity>
      )}
      
      <Calendar
        // Basic props
        current={formatDate(new Date())}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        
        // Styling - FULL CONTROL
        theme={{
          // Calendar container
          backgroundColor,
          
          // Month header
          monthTextColor,
          textMonthFontSize: monthFontSize,
          textMonthFontFamily: fonts.bol,
          textMonthFontWeight: 'bold',
          
          // Day header
          textSectionTitleColor: colors.gray7,
          textDayHeaderFontSize: 12,
          textDayHeaderFontFamily: fonts.med,
          
          // Days
          textDayFontSize: dayFontSize,
          textDayFontFamily: fonts.reg,
          textDayFontWeight: 'normal',
          textDefaultColor: dayTextColor,
          textDisabledColor: disabledTextColor,
          
          // Today
          todayTextColor: todayTextColor,
          todayBackgroundColor: 'transparent',
          
          // Selected day
          selectedDayBackgroundColor: selectedColor,
          selectedDayTextColor: selectedTextColor,
          
          // Dot (for marked dates)
          dotColor: selectedColor,
          selectedDotColor: selectedTextColor,
          
          // Arrow
          arrowColor: colors.gray7,
          arrowStyle: { padding: 8 },
          
          // Disabled
          disabledArrowColor: colors.gray5,
          
          // Month/year header
          textMonthFontWeight: '600',
          
          // Week vertical separator
          'stylesheet.calendar.header': {
            week: {
              marginTop: 5,
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }
          },
          
          // Day container
          'stylesheet.day.basic': {
            base: {
              width: daySize,
              height: daySize,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: daySize / 2,
            },
            selected: {
              backgroundColor: selectedColor,
            },
            today: {
              backgroundColor: 'transparent',
            }
          }
        }}
        
        // Hide extra days for cleaner look
        hideExtraDays={hideExtraDays}
        
        // Performance
        enableSwipeMonths={false}
        
        // Date constraints
        minDate={minDate ? formatDate(minDate) : undefined}
        maxDate={maxDate ? formatDate(maxDate) : undefined}
        
        {...props}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  todayButton: {
    backgroundColor: colors.gray2,
    paddingVertical: dimonds.space[2],
    paddingHorizontal: dimonds.space[4],
    borderRadius: dimonds.radius[2],
    alignSelf: 'flex-start',
    marginBottom: dimonds.space[4],
  },
  todayButtonText: {
    fontSize: 14,
    fontFamily: fonts.med,
    color: colors.gray9,
  },
});

FastCalendar.displayName = 'FastCalendar';

export default FastCalendar;