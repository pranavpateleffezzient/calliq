// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   Platform,
//   PermissionsAndroid,
//   Alert,
//   FlatList,
//   SafeAreaView,
// } from 'react-native';
// import RNPhoneCall from 'react-native-phone-call';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const call_dialer = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [callLogs, setCallLogs] = useState([]);
//   const inputRef = useRef(null);

//   const dialPad = [
//     ['1', '2', '3'],
//     ['4', '5', '6'],
//     ['7', '8', '9'],
//     ['*', '0', '#'],
//   ];

//   const dialPadSpecial = [
//     { label: '+', value: '+' },
//     { label: 'Call', value: 'call' },
//     { label: 'Back', value: 'backspace' },
//   ];

//   // Check and request permissions
//   const checkPermissions = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CALL_PHONE,
//           {
//             title: 'Phone Call Permission',
//             message: 'This app needs access to make phone calls.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     } else {
//       const result = await request(PERMISSIONS.IOS.PHONE_CALLS);
//       return result === RESULTS.GRANTED;
//     }
//   };
// const sanitizeNumber = (num) => {
//   if (!num) return '';
//   return num.replace(/[^0-9+]/g, '');
// };
//   // Make phone call
// const makeCall = async (numberToCall = phoneNumber) => {
//   const sanitized = sanitizeNumber(numberToCall);

//   console.log('RAW:', numberToCall);
//   console.log('SANITIZED:', sanitized);

//   if (!sanitized) {
//     Alert.alert('Invalid number', 'Please enter a valid phone number');
//     return;
//   }

//   const args = {
//     number: sanitized,
//     prompt: true,
//   };

//   try {
//     await RNPhoneCall.call(args);

//     setCallLogs((prev) => [
//       {
//         id: Date.now().toString(),
//         number: sanitized,
//         timestamp: new Date().toLocaleString(),
//         type: 'outgoing',
//       },
//       ...prev.slice(0, 9),
//     ]);
//   } catch (e) {
//     Alert.alert('Call failed', e.message);
//   }
// };


//   // Handle dial pad press
//   const handlePress = (value) => {
//     if (value === 'call') 
//       { if (/[#*]/.test(phoneNumber)) {
//     Alert.alert('Invalid number', 'Remove * or # before calling');
//     return;
//   }
//       makeCall();
//     } else if (value === 'backspace') {
//       setPhoneNumber((prev) => prev.slice(0, -1));
//     } else if (value === '+') {
//       setPhoneNumber((prev) => prev + '+');
//     } else {
//       setPhoneNumber((prev) => prev + value);
//     }
//   };

//   // Render dial pad button
//   const renderButton = (item) => (
//     <TouchableOpacity
//       key={item}
//       style={styles.dialButton}
//       onPress={() => handlePress(item)}
//       onLongPress={item === '0' ? () => handlePress('+') : null}
//       delayLongPress={500}
//     >
//       <Text style={styles.dialButtonText}>{item}</Text>
//       {item === '0' && <Text style={styles.plusText}>+</Text>}
//     </TouchableOpacity>
//   );

//   // Render special buttons
//   const renderSpecialButton = (item) => (
//     <TouchableOpacity
//       key={item.value}
//       style={[styles.specialButton, item.value === 'call' && styles.callButton]}
//       onPress={() => handlePress(item.value)}
//     >
//       <Text
//         style={[
//           styles.specialButtonText,
//           item.value === 'call' && styles.callButtonText,
//         ]}
//       >
//         {item.label}
//       </Text>
//     </TouchableOpacity>
//   );

//   // Render call log item
//   const renderCallLog = ({ item }) => (
//     <View style={styles.callLogItem}>
//       <View>
//         <Text style={styles.callNumber}>{item.number}</Text>
//         <Text style={styles.callTimestamp}>{item.timestamp}</Text>
//       </View>
//       <TouchableOpacity
//         style={styles.callAgainButton}
//         onPress={() => makeCall(item.number)}
//       >
//         <Text style={styles.callAgainText}>Call</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Phone Number Display */}
//       <View style={styles.numberDisplay}>
//         <TextInput
//           ref={inputRef}
//           style={styles.numberInput}
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           placeholder="Enter phone number"
//           keyboardType="phone-pad"
//           editable={true}
//           selectTextOnFocus={true}
//         />
//         {phoneNumber.length > 0 && (
//           <TouchableOpacity
//             style={styles.clearButton}
//             onPress={() => setPhoneNumber('')}
//           >
//             <Text style={styles.clearText}>×</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Dial Pad */}
//       <View style={styles.dialPad}>
//         {dialPad.map((row, rowIndex) => (
//           <View key={rowIndex} style={styles.dialRow}>
//             {row.map(renderButton)}
//           </View>
//         ))}

//         {/* Special Buttons Row */}
//         <View style={styles.specialRow}>
//           {dialPadSpecial.map(renderSpecialButton)}
//         </View>
//       </View>

//       {/* Recent Calls */}
//       {callLogs.length > 0 && (
//         <View style={styles.callLogsContainer}>
//           <Text style={styles.callLogsTitle}>Recent Calls</Text>
//           <FlatList
//             data={callLogs}
//             renderItem={renderCallLog}
//             keyExtractor={(item) => item.id}
//             style={styles.callLogsList}
//           />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   numberDisplay: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: 'white',
//     margin: 10,
//     borderRadius: 10,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1,
//   },
//   numberInput: {
//     flex: 1,
//     fontSize: 24,
//     color: '#333',
//     padding: 10,
//   },
//   clearButton: {
//     padding: 10,
//   },
//   clearText: {
//     fontSize: 24,
//     color: '#666',
//   },
//   dialPad: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   dialRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   dialButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   dialButtonText: {
//     fontSize: 28,
//     fontWeight: '300',
//     color: '#333',
//   },
//   plusText: {
//     fontSize: 16,
//     color: '#666',
//     position: 'absolute',
//     bottom: 10,
//   },
//   specialRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//   },
//   specialButton: {
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     backgroundColor: '#f0f0f0',
//   },
//   callButton: {
//     backgroundColor: '#4CAF50',
//   },
//   specialButtonText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   callButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   callLogsContainer: {
//     flex: 1,
//     margin: 10,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 10,
//   },
//   callLogsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   callLogItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   callNumber: {
//     fontSize: 16,
//     color: '#333',
//   },
//   callTimestamp: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 2,
//   },
//   callAgainButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderRadius: 15,
//   },
//   callAgainText: {
//     color: 'white',
//     fontSize: 14,
//   },
// });

// export default call_dialer;

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   TextInput,
// } from 'react-native';
// import { Linking } from 'react-native';

// // Get initial window dimensions
// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// // Responsive scaling functions
// const wp = (percentage) => (SCREEN_WIDTH * percentage) / 100;
// const hp = (percentage) => (SCREEN_HEIGHT * percentage) / 100;

// const call_dialer = () => {
//   const [number, setNumber] = useState('');
//   const [selection, setSelection] = useState({ start: 0, end: 0 });
//   const [dimensions, setDimensions] = useState({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT });
//   const inputRef = useRef(null);

//   // Listen for orientation changes
//   useEffect(() => {
//     const subscription = Dimensions.addEventListener('change', ({ window }) => {
//       setDimensions({ width: window.width, height: window.height });
//     });
//     return () => subscription?.remove();
//   }, []);

//   // Recalculate sizes when dimensions change
//   const currentWp = (percentage) => (dimensions.width * percentage) / 100;
//   const currentHp = (percentage) => (dimensions.height * percentage) / 100;

//   // Handle keypad press with cursor awareness
//   const handlePress = (value) => {
//     if (value === 'delete') {
//       // Delete based on selection
//       if (selection.start !== selection.end) {
//         // Delete selected range
//         const newNumber = number.substring(0, selection.start) + number.substring(selection.end);
//         setNumber(newNumber);
//         setSelection({ start: selection.start, end: selection.start });
//       } else if (selection.start > 0) {
//         // Delete character before cursor
//         const newNumber = number.substring(0, selection.start - 1) + number.substring(selection.start);
//         setNumber(newNumber);
//         setSelection({ start: selection.start - 1, end: selection.start - 1 });
//       }
//     } else {
//       // Insert key at cursor position (replace selection if any)
//       const newNumber = number.substring(0, selection.start) + value + number.substring(selection.end);
//       const newPosition = selection.start + 1;
//       setNumber(newNumber);
//       setSelection({ start: newPosition, end: newPosition });
//     }
//   };

//   const makeCall = () => {
//     if (number.length > 0) {
//       const url = `tel:${number}`;
//       Linking.openURL(url).catch(err => console.error('Error opening dialer', err));
//     }
//   };

//   // Keypad layout
//   const keys = [
//     ['1', '2', '3'],
//     ['4', '5', '6'],
//     ['7', '8', '9'],
//     ['*', '0', '#'],
//     ['delete']
//   ];

//   // Dynamic styles based on current dimensions
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#f5f5f5',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       paddingVertical: currentHp(2),
//     },
//     displayContainer: {
//       width: currentWp(90),
//       height: currentHp(15),
//       backgroundColor: '#fff',
//       borderRadius: currentWp(2),
//       justifyContent: 'center',
//       paddingHorizontal: currentWp(4),
//       marginTop: currentHp(2),
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     numberInput: {
//       fontSize: currentWp(8),
//       color: '#333',
//       padding: 0,
//       textAlign: 'right',
//     },
//     keypadContainer: {
//       width: currentWp(90),
//       marginVertical: currentHp(2),
//     },
//     row: {
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//       marginVertical: currentHp(.5),
//     },
//     keyButton: {
//       width: currentWp(25),
//       aspectRatio: 1,
//       backgroundColor: '#fff',
//       borderRadius: currentWp(10),
//       justifyContent: 'center',
//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 1 },
//       shadowOpacity: 0.05,
//       shadowRadius: 2,
//       elevation: 2,
//     },
//     deleteButton: {
//       width: currentWp(44),
//       aspectRatio: 2.2,
//       borderRadius: currentWp(5),
//     },
//     keyText: {
//       fontSize: currentWp(6),
//       color: '#333',
//     },
//     deleteText: {
//       fontSize: currentWp(6),
//       color: '#ff3b30',
//     },
//     callButton: {
//       width: currentWp(70),
//       height: currentHp(7),
//       backgroundColor: '#34c759',
//       borderRadius: currentWp(5),
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom: currentHp(2),
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.2,
//       shadowRadius: 4,
//       elevation: 5,
//     },
//     callButtonText: {
//       fontSize: currentWp(5),
//       color: '#fff',
//       fontWeight: 'bold',
//     },
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Number display with cursor */}
//       <View style={styles.displayContainer}>
//         <TextInput
//           ref={inputRef}
//           style={styles.numberInput}
//           value={number}
//           onChangeText={setNumber} // Allow manual text changes if needed (optional)
//           selection={selection}
//           onSelectionChange={(event) => setSelection(event.nativeEvent.selection)}
//           showSoftInputOnFocus={false} // Prevents system keyboard
//           caretHidden={false} // Show cursor
//           autoCorrect={false}
//           spellCheck={false}
//           contextMenuHidden={true} // Disable copy/paste menu (optional)
//           editable={true}
//         />
//       </View>

//       {/* Keypad */}
//       <View style={styles.keypadContainer}>
//         {keys.map((row, rowIndex) => (
//           <View key={rowIndex} style={styles.row}>
//             {row.map(key => (
//               <TouchableOpacity
//                 key={key}
//                 style={[
//                   styles.keyButton,
//                   key === 'delete' && styles.deleteButton
//                 ]}
//                 onPress={() => handlePress(key)}
//                 onLongPress={()=>setNumber("")}
//               >
//                 <Text style={[
//                   styles.keyText,
//                   key === 'delete' && styles.deleteText
//                 ]}>
//                   {key === 'delete' ? '⌫' : key}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         ))}
//       </View>

//       {/* Call button */}
//       <TouchableOpacity style={styles.callButton} onPress={makeCall}>
//         <Text style={styles.callButtonText}>Call</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default call_dialer;

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import { Linking } from 'react-native';

// Optional: For better icons, install react-native-vector-icons
// npm install react-native-vector-icons
// Then import: import Icon from 'react-native-vector-icons/MaterialIcons';
// and replace the <Text> icons with <Icon name="backspace" ... /> and <Icon name="call" ... />

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive scaling functions
const wp = (percentage) => (SCREEN_WIDTH * percentage) / 100;
const hp = (percentage) => (SCREEN_HEIGHT * percentage) / 100;

const call_dialer = () => {
  const [number, setNumber] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [dimensions, setDimensions] = useState({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT });
  const inputRef = useRef(null);

  // Listen for orientation changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });
    return () => subscription?.remove();
  }, []);

  const currentWp = (percentage) => (dimensions.width * percentage) / 100;
  const currentHp = (percentage) => (dimensions.height * percentage) / 100;

  // Handle keypad press with cursor awareness
  const handlePress = (value) => {
    if (value === 'delete') {
      if (selection.start !== selection.end) {
        // Delete selected range
        const newNumber = number.substring(0, selection.start) + number.substring(selection.end);
        setNumber(newNumber);
        setSelection({ start: selection.start, end: selection.start });
      } else if (selection.start > 0) {
        // Delete character before cursor
        const newNumber = number.substring(0, selection.start - 1) + number.substring(selection.start);
        setNumber(newNumber);
        setSelection({ start: selection.start - 1, end: selection.start - 1 });
      }
    } else {
      // Insert digit at cursor (replace any selection)
      const newNumber = number.substring(0, selection.start) + value + number.substring(selection.end);
      const newPosition = selection.start + 1;
      setNumber(newNumber);
      setSelection({ start: newPosition, end: newPosition });
    }
  };

  const makeCall = () => {
    if (number.length > 0) {
      const url = `tel:${number}`;
      Linking.openURL(url).catch(err => console.error('Error opening dialer', err));
    }
  };

  // Keypad rows with digit and letter labels (Samsung style)
  const keypadRows = [
    [
      { digit: '1', letters: '' },
      { digit: '2', letters: 'ABC' },
      { digit: '3', letters: 'DEF' },
    ],
    [
      { digit: '4', letters: 'GHI' },
      { digit: '5', letters: 'JKL' },
      { digit: '6', letters: 'MNO' },
    ],
    [
      { digit: '7', letters: 'PQRS' },
      { digit: '8', letters: 'TUV' },
      { digit: '9', letters: 'WXYZ' },
    ],
    [
      { digit: '*', letters: '' },
      { digit: '0', letters: '+' },
      { digit: '#', letters: '' },
    ],
  ];

  // Dynamic styles based on current dimensions
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212', // Dark background (Samsung One UI dark theme)
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: currentHp(2),
    },
    header: {
      width: currentWp(90),
      alignItems: 'center',
      marginTop: currentHp(1),
    },
    headerText: {
      fontSize: currentWp(5),
      color: '#fff',
      fontWeight: '600',
    },
    displayContainer: {
      width: currentWp(90),
      height: currentHp(15),
      backgroundColor: '#1e1e1e',
      borderRadius: currentWp(3),
      justifyContent: 'center',
      paddingHorizontal: currentWp(4),
      marginTop: currentHp(1),
      borderWidth: 1,
      borderColor: '#333',
    },
    numberInput: {
      fontSize: currentWp(8),
      color: '#fff',
      padding: 0,
      textAlign: 'right',
    },
    keypadContainer: {
      width: currentWp(90),
      marginVertical: currentHp(1),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: currentHp(0.5),
    },
    keyButton: {
      width: currentWp(25), // 3 buttons per row with spacing
      aspectRatio: 1.2,     // Slightly taller to accommodate letters
      backgroundColor: '#2c2c2c',
      borderRadius: currentWp(5),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#3a3a3a',
    },
    keyTextDigit: {
      fontSize: currentWp(6),
      color: '#fff',
      fontWeight: '500',
    },
    keyTextLetters: {
      fontSize: currentWp(3),
      color: '#aaa',
      marginTop: currentHp(0.2),
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: currentWp(90),
      marginVertical: currentHp(2),
    },
    actionButton: {
      width: currentWp(40),
      height: currentHp(7),
      borderRadius: currentWp(5),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    callButton: {
      backgroundColor: '#34c759', // Green call button
    },
    deleteButton: {
      backgroundColor: '#ff3b30', // Red delete button
    },
    actionButtonText: {
      fontSize: currentWp(4.5),
      color: '#fff',
      fontWeight: '600',
      marginLeft: currentWp(2),
    },
    iconText: {
      fontSize: currentWp(6),
      color: '#fff',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Keypad</Text>
      </View>

      {/* Number display with cursor */}
      <View style={styles.displayContainer}>
        <TextInput
          ref={inputRef}
          style={styles.numberInput}
          value={number}
          onChangeText={setNumber}               // Allow manual changes if needed
          selection={selection}
          onSelectionChange={(event) => setSelection(event.nativeEvent.selection)}
          showSoftInputOnFocus={false}           // Keep system keyboard hidden
          caretHidden={false}
          autoCorrect={false}
          spellCheck={false}
          contextMenuHidden={true}                // Disable copy/paste
          editable={true}
        />
      </View>

      {/* Keypad with letters */}
      <View style={styles.keypadContainer}>
        {keypadRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((key) => (
              <TouchableOpacity
                key={key.digit}
                style={styles.keyButton}
                onPress={() => handlePress(key.digit)}
              >
                <Text style={styles.keyTextDigit}>{key.digit}</Text>
                {key.letters !== '' && (
                  <Text style={styles.keyTextLetters}>{key.letters}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Action row: Delete and Call */}
      <View style={styles.actionRow}>
        {/* Delete Button */}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handlePress('delete')}
        >
          {/* If using vector icons: <Icon name="backspace" size={currentWp(6)} color="#fff" /> */}
          <Text style={styles.iconText}>⌫</Text>
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>

        {/* Call Button */}
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={makeCall}
        >
          {/* <Icon name="phone" size={currentWp(6)} color="#fff" /> */}
          <Text style={styles.iconText}>📞</Text>
          <Text style={styles.actionButtonText}>Call</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default call_dialer;