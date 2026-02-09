import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import CalendarInline from './CalendarInline';
import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';

export default function CalendarModal({
  visible,
  onClose,
  onChange,
  mode,
  themeVariant,
  ...props
}) {
    const { width } = useWindowDimensions()
  const modalHeight = width * 1.18  
  const calendarHeight = width * 0.6  
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.container,{height: modalHeight }]}>
          <View style={{ height: calendarHeight }}>
            <CalendarInline
              mode={mode}
              themeVariant={themeVariant}
              onChange={onChange}
              {...props}
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.txt}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.white,
    margin: 20,
    borderRadius: dimonds.radius[4],
    padding: dimonds.space[4],
    height: 460, 
    // height: width * 10,         
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: dimonds.radius[3],
    marginTop: 10,
  },
  txt: {
    color: colors.white,
    textAlign: 'center',
  },
});
