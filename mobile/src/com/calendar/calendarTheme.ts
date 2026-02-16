// import fonts from 'mobile/constant/font';
// import colors from 'mobile/constant/colors';

// export const getCalendarTheme = (variant = 'light') => {
//   // BLUE THEME (Home screen)
//   if (variant === 'blue') {
//     return {
//       backgroundColor: colors.white,
//       calendarBackground: colors.white,

//       textSectionTitleColor: colors.primary,
//       monthTextColor: colors.primary,
//       dayTextColor: colors.primary,
//       todayTextColor: colors.orange5,
//       textDisabledColor: colors.blue3,

//       selectedDayBackgroundColor: colors.primary,
//       selectedDayTextColor: colors.white,

//       arrowColor: colors.primary,

//       textDayFontFamily: fonts.reg,
//       textMonthFontFamily: fonts.bol,
//       textDayHeaderFontFamily: fonts.med,
//     };
//   }

//   // WHITE THEME (Default / Task screen)
//   return {
//     backgroundColor: colors.white,
//     calendarBackground: colors.white,

//     textSectionTitleColor: colors.gray6,
//     selectedDayBackgroundColor: colors.primary,
//     selectedDayTextColor: colors.white,

//     todayTextColor: colors.primaryDark,
//     dayTextColor: colors.gray9,
//     textDisabledColor: colors.gray4,

//     arrowColor: colors.primary,
//     monthTextColor: colors.black,

//     textDayFontFamily: fonts.reg,
//     textMonthFontFamily: fonts.bol,
//     textDayHeaderFontFamily: fonts.med,
//   };
// };
import fonts from 'mobile/constant/font';
import colors from 'mobile/constant/colors';

export const getCalendarTheme = (variant = 'light') => {
  // BLUE THEME (Home screen)
  if (variant === 'blue') {
    return {
      backgroundColor: colors.white,
      calendarBackground: colors.white,

      textSectionTitleColor: colors.primary,
      monthTextColor: colors.primary,
      dayTextColor: colors.gray9, // Changed from primary for better readability
      todayTextColor: colors.orange5,
      textDisabledColor: colors.blue3,

      // Selected day styling
      selectedDayBackgroundColor: colors.primary,
      selectedDayTextColor: colors.white,
      
      // Range mode specific styling
      selectedDayStartBackgroundColor: colors.primary,
      selectedDayStartTextColor: colors.white,
      selectedDayEndBackgroundColor: colors.primary,
      selectedDayEndTextColor: colors.white,
      selectedDayInRangeBackgroundColor: colors.primary + '20', // 20% opacity
      selectedDayInRangeTextColor: colors.primary,

      // Arrow and header styling
      arrowColor: colors.primary,
      arrowStyle: {
        marginHorizontal: -15,
      },

      // Font families
      textDayFontFamily: fonts.reg,
      textMonthFontFamily: fonts.bol,
      textDayHeaderFontFamily: fonts.med,

      // Additional styling for better range visualization
      dotColor: colors.primary,
      selectedDotColor: colors.white,
    };
  }

  // WHITE THEME (Default / Task screen)
  return {
    backgroundColor: colors.white,
    calendarBackground: colors.white,

    textSectionTitleColor: colors.gray6,
    selectedDayBackgroundColor: colors.primary,
    selectedDayTextColor: colors.white,

    // Range mode specific styling
    selectedDayStartBackgroundColor: colors.primary,
    selectedDayStartTextColor: colors.white,
    selectedDayEndBackgroundColor: colors.primary,
    selectedDayEndTextColor: colors.white,
    selectedDayInRangeBackgroundColor: colors.primary + '20', // 20% opacity
    selectedDayInRangeTextColor: colors.primary,

    todayTextColor: colors.primaryDark,
    dayTextColor: colors.gray9,
    textDisabledColor: colors.gray4,

    arrowColor: colors.primary,
    monthTextColor: colors.black,

    // Font families
    textDayFontFamily: fonts.reg,
    textMonthFontFamily: fonts.bol,
    textDayHeaderFontFamily: fonts.med,

    // Additional styling
    dotColor: colors.primary,
    selectedDotColor: colors.white,
  };
};