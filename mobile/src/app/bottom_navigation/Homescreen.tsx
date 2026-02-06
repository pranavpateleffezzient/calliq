import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import SimpleCalendar from '../../com/calendar/SimpleCalendar';
import { CalendarPresets } from '../../com/calendar/CalendarPresets';
import { CardBackground } from 'tamagui';

export default function Homescreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [calendarMode, setCalendarMode] = useState('single'); // 'single' or 'range'
  const [range, setRange] = useState({ start: null, end: null });

  const handleDateChange = (date) => {
    console.log('Selected date:', date);
    setSelectedDate(date);
  };

  const handleRangeChange = (start, end) => {
    console.log('Range changed:', { start, end });
    setRangeStart(start);
    setRangeEnd(end);
  };

  const clearSelection = () => {
    setSelectedDate(new Date());
    setRangeStart(null);
    setRangeEnd(null);
  };

  const theme = {
    selectedDayColor: '#8B5CF6', // Purple
    todayTextColor: '#8B5CF6',
    headerColor: '#6D28D9',
    dayTextColor: '#374151',
    todayButtonColor: '#F3E8FF',
    todayButtonText: 'Select Today',
    CardBackground:"#000"
  };

  return (
    // <SafeAreaView style={styles.safeArea}>
    //   <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    //     <Text style={styles.title}>Calendar Demo</Text>
        
    //     {/* Mode Toggle */}
    //     <View style={styles.modeContainer}>
    //       <TouchableOpacity 
    //         style={[
    //           styles.modeButton, 
    //           calendarMode === 'single' && styles.activeModeButton
    //         ]}
    //         onPress={() => setCalendarMode('single')}
    //       >
    //         <Text style={[
    //           styles.modeButtonText,
    //           calendarMode === 'single' && styles.activeModeButtonText
    //         ]}>
    //           Single Date
    //         </Text>
    //       </TouchableOpacity>
          
    //       <TouchableOpacity 
    //         style={[
    //           styles.modeButton, 
    //           calendarMode === 'range' && styles.activeModeButton
    //         ]}
    //         onPress={() => setCalendarMode('range')}
    //       >
    //         <Text style={[
    //           styles.modeButtonText,
    //           calendarMode === 'range' && styles.activeModeButtonText
    //         ]}>
    //           Date Range
    //         </Text>
    //       </TouchableOpacity>
    //     </View>

    //     {/* Calendar */}
    //     <View style={styles.calendarWrapper}>
    //       <SimpleCalendar
    //         value={calendarMode === 'single' ? selectedDate : undefined}
    //         startDate={calendarMode === 'range' ? rangeStart : undefined}
    //         endDate={calendarMode === 'range' ? rangeEnd : undefined}
    //         onDateChange={handleDateChange}
    //         onRangeChange={handleRangeChange}
    //         mode={calendarMode}
    //         showTodayButton={true}
    //         selectedDayColor="#007AFF"
    //       />
    //     </View>

    //     {/* Selection Info */}
    //     <View style={styles.infoContainer}>
    //       <Text style={styles.infoTitle}>Selection Info:</Text>
          
    //       {calendarMode === 'single' ? (
    //         <View>
    //           <Text style={styles.infoText}>
    //             Selected Date: {selectedDate.toLocaleDateString()}
    //           </Text>
    //           <Text style={styles.infoSubText}>
    //             Day: {selectedDate.getDate()}, 
    //             Month: {selectedDate.getMonth() + 1}, 
    //             Year: {selectedDate.getFullYear()}
    //           </Text>
    //         </View>
    //       ) : (
    //         <View>
    //           {rangeStart && rangeEnd ? (
    //             <>
    //               <Text style={styles.infoText}>
    //                 Range: {rangeStart.toLocaleDateString()} to {rangeEnd.toLocaleDateString()}
    //               </Text>
    //               <Text style={styles.infoSubText}>
    //                 Total Days: {Math.round((rangeEnd - rangeStart) / (1000 * 60 * 60 * 24)) + 1}
    //               </Text>
    //             </>
    //           ) : rangeStart ? (
    //             <Text style={styles.infoText}>
    //               Start: {rangeStart.toLocaleDateString()} (Select end date)
    //             </Text>
    //           ) : (
    //             <Text style={styles.infoText}>
    //               Select a start date
    //             </Text>
    //           )}
    //         </View>
    //       )}
    //     </View>

    //     {/* Action Buttons */}
    //     <View style={styles.buttonContainer}>
    //       <TouchableOpacity 
    //         style={[styles.button, styles.clearButton]}
    //         onPress={clearSelection}
    //       >
    //         <Text style={styles.clearButtonText}>Clear Selection</Text>
    //       </TouchableOpacity>
          
    //       <TouchableOpacity 
    //         style={[styles.button, styles.actionButton]}
    //         onPress={() => {
    //           if (calendarMode === 'single') {
    //             Alert.alert(
    //               'Date Selected',
    //               `You selected: ${selectedDate.toLocaleDateString()}`,
    //               [{ text: 'OK' }]
    //             );
    //           } else if (rangeStart && rangeEnd) {
    //             Alert.alert(
    //               'Range Selected',
    //               `${rangeStart.toLocaleDateString()} to ${rangeEnd.toLocaleDateString()}`,
    //               [{ text: 'OK' }]
    //             );
    //           } else {
    //             Alert.alert(
    //               'Incomplete Selection',
    //               calendarMode === 'range' 
    //                 ? 'Please select both start and end dates' 
    //                 : 'Please select a date',
    //               [{ text: 'OK' }]
    //             );
    //           }
    //         }}
    //       >
    //         <Text style={styles.actionButtonText}>Confirm Selection</Text>
    //       </TouchableOpacity>
    //     </View>

    //     {/* Quick Actions */}
    //     <View style={styles.quickActions}>
    //       <Text style={styles.quickActionsTitle}>Quick Actions:</Text>
    //       <View style={styles.quickActionsRow}>
    //         <TouchableOpacity 
    //           style={styles.quickActionButton}
    //           onPress={() => {
    //             const yesterday = new Date();
    //             yesterday.setDate(yesterday.getDate() - 1);
    //             handleDateChange(yesterday);
    //           }}
    //         >
    //           <Text style={styles.quickActionText}>Yesterday</Text>
    //         </TouchableOpacity>
            
    //         <TouchableOpacity 
    //           style={styles.quickActionButton}
    //           onPress={() => {
    //             const tomorrow = new Date();
    //             tomorrow.setDate(tomorrow.getDate() + 1);
    //             handleDateChange(tomorrow);
    //           }}
    //         >
    //           <Text style={styles.quickActionText}>Tomorrow</Text>
    //         </TouchableOpacity>
            
    //         <TouchableOpacity 
    //           style={styles.quickActionButton}
    //           onPress={() => {
    //             const nextWeek = new Date();
    //             nextWeek.setDate(nextWeek.getDate() + 7);
    //             handleDateChange(nextWeek);
    //           }}
    //         >
    //           <Text style={styles.quickActionText}>Next Week</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>

    //     {/* Example with Limits */}
    //     <View style={styles.exampleContainer}>
    //       <Text style={styles.exampleTitle}>Limited Date Calendar</Text>
    //       <Text style={styles.exampleDescription}>
    //         Can only select dates between Jan 1, 2024 and Dec 31, 2024
    //       </Text>
          
    //       <View style={styles.exampleCalendar}>
    //         <SimpleCalendar
    //           value={new Date(2024, 5, 15)} // June 15, 2024
    //           onDateChange={(date) => console.log('Limited calendar selected:', date)}
    //           minDate={new Date(2024, 0, 1)} // Jan 1, 2024
    //           maxDate={new Date(2024, 11, 31)} // Dec 31, 2024
    //           showTodayButton={false}
    //           selectedDayColor="#34C759"
    //         />
    //       </View>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <View >
      {/* <SimpleCalendar
        value={selectedDate}
        onDateChange={setSelectedDate}
        mode="single"
        {...CalendarPresets.useCases.booking}
        {...CalendarPresets.colorSchemes.blue}
        headerColor='#000'
      /> */}

      {/* <SimpleCalendar
      mode="range"
      startDate={range.start}
      endDate={range.end}
      onRangeChange={(start, end) => setRange({ start, end })}
      
      // Combine presets
      {...CalendarPresets.useCases.dateRange}
      {...CalendarPresets.colorSchemes.green}
      {...CalendarPresets.sizes.large}
      
      // Custom overrides
      todayButtonText="Today"
      resetButtonText="Clear Range"
      showHeader={true}
      style={{ borderWidth: 1, borderColor: '#e5e5ea', borderRadius: 12, margin: 20 }}
    /> */}

    {/* <SimpleCalendar
      {...CalendarPresets.useCases.birthDate}
      maxDate={new Date()}
      minDate={new Date(1900, 0, 1)}
      headerTextStyle={{ fontSize: 20, textAlign: 'center' }}
    /> */}

    {/* <SimpleCalendar
    {...theme}
      {...CalendarPresets.useCases.minimal}
      {...CalendarPresets.sizes.small}
      calendarWidth={280}
      dayTextStyle={{ fontSize: 12, fontFamily: 'InstrumentSans-Regular' }}
    /> */}

    {/* <SimpleCalendar
      {...theme}
      mode="single"
      showResetButton={true}
      resetButtonColor="#FEE2E2"
      resetButtonText="Clear Date"
    /> */}


        <SimpleCalendar
      mode="single"
      
      // Colors - Everything is customizable
      selectedDayColor="#FF6B6B"
      selectedDayTextColor="#FFFFFF"
      todayTextColor="#FF6B6B"
      dayTextColor="#000"
      headerColor="#fff"
      todayButtonColor="#FFEAA7"
      calendarBackgroundColor="#fff"
      navButtonColor="#0984E3"
      
      // Text Styles
      dayTextStyle={{
        fontWeight: '600',
        letterSpacing: 0.5,
      }}
      headerTextStyle={{
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}
      todayButtonTextStyle={{
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }}
      
      // Fonts
      dayFontFamily="InstrumentSans-Medium"
      headerFontFamily="InstrumentSans-Bold"
      buttonFontFamily="InstrumentSans-SemiBold"
      
      // Sizes
      daySize={45}
      dayFontSize={16}
      headerFontSize={20}
      monthYearFontSize={20}
      calendarWidth={380}
      
      // Spacing
      dayPadding={2}
      buttonPadding={10}
      
      // Border Radius
      dayBorderRadius={22.5} // half of daySize for circles
      buttonBorderRadius={20}
      calendarBorderRadius={16}
      
      // Button Texts
      todayButtonText="Select Today"
      resetButtonText="Clear Selection"
      
      // Navigation
      previousTitle="←"
      nextTitle="→"
      
    />
    </View>
  );
}


