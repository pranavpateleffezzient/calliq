import colors from "mobile/constant/colors";


export const CalendarPresets = {
  // Different color schemes
  colorSchemes: {
    blue: {
      selectedDayColor: colors.blue6,
      todayTextColor: colors.blue6,
      headerColor: colors.blue8,
    },
    green: {
      selectedDayColor: colors.green6,
      todayTextColor: colors.green6,
      headerColor: colors.green8,
    },
    orange: {
      selectedDayColor: colors.orange6,
      todayTextColor: colors.orange6,
      headerColor: colors.orange8,
    },
    red: {
      selectedDayColor: colors.red6,
      todayTextColor: colors.red6,
      headerColor: colors.red8,
    },
  },

  // Size presets
  sizes: {
    small: {
      calendarWidth: 300,
      daySize: 35,
    },
    medium: {
      calendarWidth: 350,
      daySize: 40,
    },
    large: {
      calendarWidth: 400,
      daySize: 45,
    },
  },

  // Specific use case presets
  useCases: {
    // For booking/reservation systems
    booking: {
      mode: 'single',
      showTodayButton: true,
      showResetButton: true,
      minDate: new Date(),
      selectedDayColor: colors.blue6,
      todayButtonColor: colors.blue1,
      todayButtonText: 'Select Today',
    },
    
    // For date range selection (reports, analytics)
    dateRange: {
      mode: 'range',
      showTodayButton: true,
      showResetButton: true,
      showMonthYearHeader: true,
      selectedDayColor: colors.green6,
    },
    
    // For date of birth selection
    birthDate: {
      mode: 'single',
      maxDate: new Date(),
      showTodayButton: false,
      showResetButton: true,
      selectedDayColor: colors.orange6,
      resetButtonText: 'Clear DOB',
    },
    
    // For event planning
    eventPlanning: {
      mode: 'single',
      minDate: new Date(),
      showTodayButton: true,
      showResetButton: true,
      selectedDayColor: colors.red6,
      todayButtonText: 'Event Date',
    },
    
    // Minimal calendar
    minimal: {
      showTodayButton: false,
      showResetButton: false,
      showMonthYearHeader: false,
      dayTextStyle: { fontSize: 12 },
    },
  },
};