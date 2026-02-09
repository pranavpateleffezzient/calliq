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
      dayTextColor: colors.primary,
      todayTextColor: colors.orange5,
      textDisabledColor: colors.blue3,

      selectedDayBackgroundColor: colors.primary,
      selectedDayTextColor: colors.white,

      arrowColor: colors.primary,

      textDayFontFamily: fonts.reg,
      textMonthFontFamily: fonts.bol,
      textDayHeaderFontFamily: fonts.med,
    };
  }

  // WHITE THEME (Default / Task screen)
  return {
    backgroundColor: colors.white,
    calendarBackground: colors.white,

    textSectionTitleColor: colors.gray6,
    selectedDayBackgroundColor: colors.primary,
    selectedDayTextColor: colors.white,

    todayTextColor: colors.primaryDark,
    dayTextColor: colors.gray9,
    textDisabledColor: colors.gray4,

    arrowColor: colors.primary,
    monthTextColor: colors.black,

    textDayFontFamily: fonts.reg,
    textMonthFontFamily: fonts.bol,
    textDayHeaderFontFamily: fonts.med,
  };
};
