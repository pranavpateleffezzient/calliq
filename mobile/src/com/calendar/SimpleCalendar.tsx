import React, { useState, useCallback, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';
import fonts from 'mobile/constant/font';
// Memoize the component to prevent unnecessary re-renders
const SimpleCalendar = memo(({
  // Selection props
  value,
  onDateChange,
  mode = 'single',
  startDate,
  endDate,
  onRangeChange,
  
  // Date constraints
  minDate,
  maxDate,
  
  // Visual customization
  showTodayButton = true,
  showResetButton = false,
  showHeader = true,
  showMonthYearHeader = true,
  showDayNames = true,
  
  // Colors - FULLY CUSTOMIZABLE
  selectedDayColor = colors.blue6,
  selectedDayTextColor = colors.white,
  todayTextColor = colors.blue6,
  todayBackgroundColor = 'transparent',
  disabledTextColor = colors.gray5,
  dayTextColor = colors.gray10,
  headerColor = colors.gray9,
  todayButtonColor = colors.gray2,
  resetButtonColor = colors.red2,
  calendarBackgroundColor = colors.white,
  dayBackgroundColor = 'transparent',
  selectedRangeColor = colors.blue2,
  selectedRangeTextColor = colors.blue9,
  monthYearTextColor = colors.gray9,
  navButtonColor = colors.gray7,
  
  // Text Styles - FULLY CUSTOMIZABLE
  dayTextStyle = {},
  headerTextStyle = {},
  todayButtonTextStyle = {},
  resetButtonTextStyle = {},
  monthYearTextStyle = {},
  weekdayTextStyle = {},
  disabledDayTextStyle = {},
  
  // Fonts
  dayFontFamily = fonts.reg,
  headerFontFamily = fonts.bol,
  buttonFontFamily = fonts.med,
  
  // Sizes - FULLY CUSTOMIZABLE
  calendarWidth,
  daySize = 40,
  dayFontSize = 14,
  headerFontSize = 18,
  buttonFontSize = 14,
  monthYearFontSize = 18,
  weekdayFontSize = 12,
  
  // Spacing
  calendarPadding = dimonds.space[4],
  buttonPadding = dimonds.space[2],
  dayPadding = 0,
  
  // Border Radius
  dayBorderRadius = dimonds.radius[2],
  buttonBorderRadius = dimonds.radius[2],
  calendarBorderRadius = dimonds.radius[4],
  
  // Button texts
  todayButtonText = 'Today',
  resetButtonText = 'Reset',
  
  // Navigation
  previousTitle = '<',
  nextTitle = '>',
  
  // Callbacks
  onTodayPress,
  onResetPress,
  
  // Performance
  scrollable = false,
  
  // Additional props
  ...restProps
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(startDate || value || null);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate || null);

  // Memoized handlers
  const handleDateChangeInternal = useCallback((date, type) => {
    if (mode === 'single') {
      setSelectedStartDate(date);
      onDateChange?.(date);
    } else {
      if (type === 'START_DATE') {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
        onRangeChange?.(date, null);
      } else {
        setSelectedEndDate(date);
        if (selectedStartDate) {
          onRangeChange?.(selectedStartDate, date);
        }
      }
    }
  }, [mode, onDateChange, onRangeChange, selectedStartDate]);

  const handleTodayPress = useCallback(() => {
    const today = new Date();
    setSelectedStartDate(today);
    setSelectedEndDate(null);
    onDateChange?.(today);
    onTodayPress?.();
  }, [onDateChange, onTodayPress]);

  const handleResetPress = useCallback(() => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    onDateChange?.(null);
    onResetPress?.();
  }, [onDateChange, onResetPress]);

  const renderCustomHeader = useCallback((date) => {
    if (!showMonthYearHeader) return null;
    
    const currentYear = date.getFullYear();
    const currentMonth = date.toLocaleDateString('en-US', { month: 'long' });
    
    return (
      <View style={styles.customHeader}>
        <Text style={[
          styles.monthYearText,
          { 
            color: monthYearTextColor,
            fontSize: monthYearFontSize,
            fontFamily: headerFontFamily,
          },
          monthYearTextStyle
        ]}>
          {currentMonth} {currentYear}
        </Text>
      </View>
    );
  }, [showMonthYearHeader, monthYearTextColor, monthYearFontSize, headerFontFamily, monthYearTextStyle]);

  // Calculate width
  const calculatedWidth = calendarWidth || 350;

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: calendarBackgroundColor,
        borderRadius: calendarBorderRadius,
        padding: calendarPadding,
      }
    ]}>
      {/* Action Buttons */}
      {(showTodayButton || showResetButton) && (
        <View style={styles.buttonRow}>
          {showTodayButton && (
            <TouchableOpacity 
              style={[
                styles.actionButton, 
                styles.todayButton,
                { 
                  backgroundColor: todayButtonColor,
                  borderRadius: buttonBorderRadius,
                  paddingHorizontal: buttonPadding * 2,
                  paddingVertical: buttonPadding,
                }
              ]} 
              onPress={handleTodayPress}
            >
              <Text style={[
                styles.todayButtonText,
                {
                  color: colors.gray9,
                  fontSize: buttonFontSize,
                  fontFamily: buttonFontFamily,
                },
                todayButtonTextStyle
              ]}>
                {todayButtonText}
              </Text>
            </TouchableOpacity>
          )}
          
          {showResetButton && (
            <TouchableOpacity 
              style={[
                styles.actionButton, 
                styles.resetButton,
                { 
                  backgroundColor: resetButtonColor,
                  borderRadius: buttonBorderRadius,
                  paddingHorizontal: buttonPadding * 2,
                  paddingVertical: buttonPadding,
                }
              ]} 
              onPress={handleResetPress}
            >
              <Text style={[
                styles.resetButtonText,
                {
                  color: colors.red7,
                  fontSize: buttonFontSize,
                  fontFamily: buttonFontFamily,
                },
                resetButtonTextStyle
              ]}>
                {resetButtonText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      {/* Calendar Component - Optimized with memoized props */}
      <CalendarPicker
        key={`calendar-${mode}-${calculatedWidth}`}
        startFromMonday={false}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        onDateChange={handleDateChangeInternal}
        allowRangeSelection={mode === 'range'}
        minDate={minDate}
        maxDate={maxDate}
        
        // Header
        renderHeader={showHeader ? renderCustomHeader : undefined}
        
        // Colors - ALL customizable
        selectedDayColor={selectedDayColor}
        selectedDayTextColor={selectedDayTextColor}
        selectedRangeColor={selectedRangeColor}
        selectedRangeStartTextColor={selectedDayTextColor}
        selectedRangeEndTextColor={selectedDayTextColor}
        
        // Today styling
        todayBackgroundColor={todayBackgroundColor}
        todayTextStyle={{ 
          color: todayTextColor, 
          fontWeight: 'bold',
          fontFamily: dayFontFamily,
        }}
        
        // Day styling
        textStyle={[
          styles.dayText,
          { 
            color: dayTextColor,
            fontSize: dayFontSize,
            fontFamily: dayFontFamily,
          },
          dayTextStyle
        ]}
        
        // Custom day styles
        customDatesStyles={[{
          date: selectedStartDate,
          style: {
            backgroundColor: selectedDayColor,
            borderRadius: dayBorderRadius,
          },
          textStyle: {
            color: selectedDayTextColor,
            fontFamily: dayFontFamily,
          }
        }]}
        
        // Disabled dates
        disabledDatesTextStyle={[
          { color: disabledTextColor },
          disabledDayTextStyle
        ]}
        
        // Weekdays
        weekdays={showDayNames ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] : []}
        weekdayTextStyle={[
          styles.weekdayText,
          {
            color: dayTextColor,
            fontSize: weekdayFontSize,
            fontFamily: dayFontFamily,
          },
          weekdayTextStyle
        ]}
        
        // Navigation
        previousTitle={previousTitle}
        nextTitle={nextTitle}
        previousTitleStyle={{
          color: navButtonColor,
          fontSize: 20,
          fontFamily: headerFontFamily,
        }}
        nextTitleStyle={{
          color: navButtonColor,
          fontSize: 20,
          fontFamily: headerFontFamily,
        }}
        
        // Dimensions
        width={calculatedWidth}
        dayShape="square"
        
        // Performance
        scrollable={scrollable}
        restrictMonthNavigation={!scrollable}
        
        // Day size
        selectedDayStyle={{
          height: daySize,
          width: daySize,
          borderRadius: dayBorderRadius,
        }}
        selectedRangeStartStyle={{
          height: daySize,
          width: daySize,
          borderTopLeftRadius: dayBorderRadius,
          borderBottomLeftRadius: dayBorderRadius,
        }}
        selectedRangeEndStyle={{
          height: daySize,
          width: daySize,
          borderTopRightRadius: dayBorderRadius,
          borderBottomRightRadius: dayBorderRadius,
        }}
        selectedRangeStyle={{
          height: daySize,
          backgroundColor: selectedRangeColor,
        }}
        dayLabelsWrapper={{
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        
        // Additional props
        {...restProps}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: dimonds.space[2],
    marginBottom: dimonds.space[4],
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayButtonText: {
    // Styled inline for better customization
  },
  resetButtonText: {
    // Styled inline for better customization
  },
  customHeader: {
    alignItems: 'center',
    marginBottom: dimonds.space[3],
  },
  monthYearText: {
    // Styled inline
  },
  dayText: {
    // Styled inline
  },
  weekdayText: {
    // Styled inline
  },
});

// Add display name for debugging
SimpleCalendar.displayName = 'SimpleCalendar';

export default SimpleCalendar;