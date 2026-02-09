import CalendarInline from 'mobile/src/com/calendar/CalendarInline';
import CalendarModal from 'mobile/src/com/calendar/CalendarModal';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Homescreen() {
  const [open, setOpen] = useState(true);
  const events = {
    '2026-02-14': { marked: true, dotColor: 'red' },
    '2026-02-20': { marked: true, dotColor: 'green' },
  };

  return (
    <View style={{ flex: 1 }}>
      {/* normal */}
      {/* <CalendarModal
            visible={open}
            onClose={() => setOpen(false)}
            mode="single"
            onChange={(d) => console.log('Selected:', d)}
          /> */}

      {/* range */}
      {/* <CalendarModal
        visible={open}
        onClose={() => setOpen(false)}
        mode="range"
      /> */}

      {/* CalendarInline */}
      {/* <CalendarInline
        mode="multi"
        onChange={(d) => console.log(d)}
        markedDates={events}
      /> */}

      <CalendarModal
  visible={open}
  onClose={() => setOpen(false)}
  mode="single"
  themeVariant="blue"
  markedDates={events}
/>
    </View>
  );
}
