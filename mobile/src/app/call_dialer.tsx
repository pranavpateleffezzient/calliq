import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
  FlatList,
  SafeAreaView,
} from 'react-native';
import RNPhoneCall from 'react-native-phone-call';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const call_dialer = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callLogs, setCallLogs] = useState([]);
  const inputRef = useRef(null);

  const dialPad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#'],
  ];

  const dialPadSpecial = [
    { label: '+', value: '+' },
    { label: 'Call', value: 'call' },
    { label: 'Back', value: 'backspace' },
  ];

  // Check and request permissions
  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
          {
            title: 'Phone Call Permission',
            message: 'This app needs access to make phone calls.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      const result = await request(PERMISSIONS.IOS.PHONE_CALLS);
      return result === RESULTS.GRANTED;
    }
  };

  // Make phone call
  const makeCall = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }

    const hasPermission = await checkPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Please grant phone call permissions in settings'
      );
      return;
    }

    const args = {
      number: phoneNumber,
      prompt: true, // Shows system dialer prompt on iOS
      skipCanOpen: true,
    };

    try {
      await RNPhoneCall.call(args).catch(console.error);
      
      // Add to call logs
      const newCall = {
        id: Date.now().toString(),
        number: phoneNumber,
        timestamp: new Date().toLocaleString(),
        type: 'outgoing',
      };
      
      setCallLogs(prev => [newCall, ...prev.slice(0, 9)]);
    } catch (error) {
      Alert.alert('Error', 'Failed to make call: ' + error.message);
    }
  };

  // Handle dial pad press
  const handlePress = (value) => {
    if (value === 'call') {
      makeCall();
    } else if (value === 'backspace') {
      setPhoneNumber(prev => prev.slice(0, -1));
    } else if (value === '+') {
      setPhoneNumber(prev => prev + '+');
    } else {
      setPhoneNumber(prev => prev + value);
    }
  };

  // Render dial pad button
  const renderButton = (item) => (
    <TouchableOpacity
      key={item}
      style={styles.dialButton}
      onPress={() => handlePress(item)}
      onLongPress={item === '0' ? () => handlePress('+') : null}
      delayLongPress={500}
    >
      <Text style={styles.dialButtonText}>{item}</Text>
      {item === '0' && (
        <Text style={styles.plusText}>+</Text>
      )}
    </TouchableOpacity>
  );

  // Render special buttons
  const renderSpecialButton = (item) => (
    <TouchableOpacity
      key={item.value}
      style={[
        styles.specialButton,
        item.value === 'call' && styles.callButton,
      ]}
      onPress={() => handlePress(item.value)}
    >
      <Text style={[
        styles.specialButtonText,
        item.value === 'call' && styles.callButtonText,
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  // Render call log item
  const renderCallLog = ({ item }) => (
    <View style={styles.callLogItem}>
      <View>
        <Text style={styles.callNumber}>{item.number}</Text>
        <Text style={styles.callTimestamp}>{item.timestamp}</Text>
      </View>
      <TouchableOpacity
        style={styles.callAgainButton}
        onPress={() => {
          setPhoneNumber(item.number);
          setTimeout(() => makeCall(), 300);
        }}
      >
        <Text style={styles.callAgainText}>Call</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Phone Number Display */}
      <View style={styles.numberDisplay}>
        <TextInput
          ref={inputRef}
          style={styles.numberInput}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          editable={true}
          selectTextOnFocus={true}
        />
        {phoneNumber.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setPhoneNumber('')}
          >
            <Text style={styles.clearText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Dial Pad */}
      <View style={styles.dialPad}>
        {dialPad.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.dialRow}>
            {row.map(renderButton)}
          </View>
        ))}
        
        {/* Special Buttons Row */}
        <View style={styles.specialRow}>
          {dialPadSpecial.map(renderSpecialButton)}
        </View>
      </View>

      {/* Recent Calls */}
      {callLogs.length > 0 && (
        <View style={styles.callLogsContainer}>
          <Text style={styles.callLogsTitle}>Recent Calls</Text>
          <FlatList
            data={callLogs}
            renderItem={renderCallLog}
            keyExtractor={(item) => item.id}
            style={styles.callLogsList}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  numberDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  numberInput: {
    flex: 1,
    fontSize: 24,
    color: '#333',
    padding: 10,
  },
  clearButton: {
    padding: 10,
  },
  clearText: {
    fontSize: 24,
    color: '#666',
  },
  dialPad: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  dialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dialButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dialButtonText: {
    fontSize: 28,
    fontWeight: '300',
    color: '#333',
  },
  plusText: {
    fontSize: 16,
    color: '#666',
    position: 'absolute',
    bottom: 10,
  },
  specialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  specialButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  callButton: {
    backgroundColor: '#4CAF50',
  },
  specialButtonText: {
    fontSize: 18,
    color: '#333',
  },
  callButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  callLogsContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  callLogsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  callLogItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  callNumber: {
    fontSize: 16,
    color: '#333',
  },
  callTimestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  callAgainButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  callAgainText: {
    color: 'white',
    fontSize: 14,
  },
});

export default call_dialer;