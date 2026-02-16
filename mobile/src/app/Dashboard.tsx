import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { TamaguiProvider } from '@tamagui/core';
import tamaguiConfig from 'mobile/tamagui.config';
import { Menu } from '../com/menu/custommenu';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import colors from 'mobile/constant/colors';
import fonts from 'mobile/constant/font';
import { Bell, CalendarDays } from '@tamagui/lucide-icons';
import moment from 'moment';
import CalendarModal from '../com/calendar/CalendarModal';
import { Ionicons } from '@expo/vector-icons';
// export default function Dashboard() {
//   const calllist_row = [
//     {
//       id: '1',
//       callType: 'Incoming',
//       callName: 'Amit Sharma',
//       callNumber: '+91 98765 43210',
//       dateTime: '2026-02-16 10:15 AM',
//       duration: '02:35',
//     },
//     {
//       id: '2',
//       callType: 'Outgoing',
//       callName: 'Priya Patel',
//       callNumber: '+91 98234 56789',
//       dateTime: '2026-02-16 09:40 AM',
//       duration: '05:12',
//     },
//     {
//       id: '3',
//       callType: 'Missed',
//       callName: 'Rahul Verma',
//       callNumber: '+91 90123 45678',
//       dateTime: '2026-02-15 08:05 PM',
//       duration: '00:00',
//     },
//     {
//       id: '4',
//       callType: 'Incoming',
//       callName: 'Neha Singh',
//       callNumber: '+91 91234 87654',
//       dateTime: '2026-02-15 06:22 PM',
//       duration: '11:08',
//     },
//     {
//       id: '5',
//       callType: 'Outgoing',
//       callName: 'Office HR',
//       callNumber: '+91 99887 66554',
//       dateTime: '2026-02-13 03:10 PM',
//       duration: '07:45',
//     },
//     {
//       id: '6',
//       callType: 'Missed',
//       callName: 'Delivery Guy',
//       callNumber: '+91 90909 12345',
//       dateTime: '2026-02-11 01:55 PM',
//       duration: '00:00',
//     },
//     {
//       id: '7',
//       callType: 'Incoming',
//       callName: 'Mom',
//       callNumber: '+91 90000 11111',
//       dateTime: '2026-02-10 09:12 AM',
//       duration: '18:21',
//     },
//     {
//       id: '8',
//       callType: 'Outgoing',
//       callName: 'Rohit Mehta',
//       callNumber: '+91 93456 78901',
//       dateTime: '2026-02-09 07:30 PM',
//       duration: '03:50',
//     },
//     {
//       id: '9',
//       callType: 'Outgoing',
//       callName: 'jay Patel',
//       callNumber: '+91 98234 56788',
//       dateTime: '2026-02-16 09:40 AM',
//       duration: '05:12',
//     },
//   ];

//     const [callList, setCallList] = useState(calllist_row);
//   const [itemselect, setItemSelect] = useState<string | null>(null);
//   const [open, setOpen] = useState(false);
//   const [selectedCalendarDates, setSelectedCalendarDates] = useState({}); // Store calendar selections
//   const [tempSelectedDates, setTempSelectedDates] = useState({}); // Temporary selection before apply
//   // const maxlistsize = 4;
//   // const [filteredCallList, setFilteredCallList] = useState([]);

//   // useEffect(() => {
//   //   const firstFour = calllist.slice(0, maxlistsize);
//   //   setFilteredCallList(firstFour);
//   // }, []);



// //    const filter = async (type?: string) => {
// //     const today = moment().format('YYYY-MM-DD');
// //     const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

// //     let filteredlist = [];

// //     if (type === 'today') {
// //       filteredlist = calllist_row.filter((item) => {
// //         const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
// //         return itemDate === today;
// //       });
// //       setCallList(filteredlist);
// //     } else if (type === 'yesterday') {
// //       filteredlist = calllist_row.filter((item) => {
// //         const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
// //         return itemDate === yesterday;
// //       });
// //       setCallList(filteredlist);
// //     } else if (type === 'week') {
// //       const weekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
// //       filteredlist = calllist_row.filter((item) => {
// //         const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
// //         return itemDate >= weekAgo && itemDate <= today;
// //       });
// //       setCallList(filteredlist);
// //     } else if (type === 'custom') {
// //       console.log("=====custom");
// //       setOpen(true);
// //       setTempSelectedDates({}); // Reset temporary selection
// //     }
    
// //     setItemSelect(type);
// //   };

//   const renderItem = ({ item }: any) => {
//     return (
//       <View style={{ padding: 10, borderBottomWidth: 1 }}>
//         <Text>{item.callType}</Text>
//         <Text>{item.callName}</Text>
//         <Text>{item.callNumber}</Text>
//         <Text>{item.dateTime}</Text>
//         <Text>{item.duration}</Text>
//       </View>
//     );
//   };

//     const handleCustomDateSelect = (date: any) => {
//     // Add your custom date filtering logic here
//     const selectedDate = moment(date).format('YYYY-MM-DD');
//     const filteredlist = calllist_row.filter((item) => {
//       const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
//       return itemDate === selectedDate;
//     });
//     setCallList(filteredlist);
//     setOpen(false); // Close the modal
//   };

// //    const handleApply = () => {
// //     // Get the selected date from tempSelectedDates
// //     const selectedDateKey = Object.keys(tempSelectedDates)[0];
    
// //     if (selectedDateKey) {
// //       const filteredlist = calllist_row.filter((item) => {
// //         const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
// //         return itemDate === selectedDateKey;
// //       });
// //       setCallList(filteredlist);
// //       setSelectedCalendarDates(tempSelectedDates); // Save selection
// //     }
    
// //     setOpen(false); // Close modal
// //   };

// //     const handleDateChange = (date: any) => {
// //     // Store temporary selection
// //     const dateString = date.dateString;
// //     const newSelected = {};
// //     newSelected[dateString] = {
// //       selected: true,
// //       selectedColor: colors.primary,
// //     };
// //     setTempSelectedDates(newSelected);
// //   };



//   const filter = async (type?: string) => {
//     const today = moment().format('YYYY-MM-DD');
//     const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

//     let filteredlist = [];

//     if (type === 'today') {
//       filteredlist = calllist_row.filter((item) => {
//         const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
//         return itemDate === today;
//       });
//       setCallList(filteredlist);
//     } else if (type === 'yesterday') {
//       filteredlist = calllist_row.filter((item) => {
//         const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
//         return itemDate === yesterday;
//       });
//       setCallList(filteredlist);
//     } else if (type === 'week') {
//       const weekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
//       filteredlist = calllist_row.filter((item) => {
//         const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
//         return itemDate >= weekAgo && itemDate <= today;
//       });
//       setCallList(filteredlist);
//     } else if (type === 'custom') {
//       console.log("=====custom");
//       setOpen(true);
//       // Set temporary selection to the previously selected dates
//       setTempSelectedDates(selectedCalendarDates);
//     }
    
//     setItemSelect(type);
//   };

//   const handleDateChange = (day: any, updatedSelection: any) => {
//     // Store the complete selection object
//     setTempSelectedDates(updatedSelection);
//   };

//   const handleApply = () => {
//     // Get the selected dates from tempSelectedDates
//     const selectedKeys = Object.keys(tempSelectedDates);
    
//     if (selectedKeys.length > 0) {
//       if (selectedKeys.length === 1) {
//         // Single date selected
//         const filteredlist = calllist_row.filter((item) => {
//           const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
//           return itemDate === selectedKeys[0];
//         });
//         setCallList(filteredlist);
//       } else {
//         // Range selected - filter between start and end
//         const startDate = selectedKeys[0];
//         const endDate = selectedKeys[selectedKeys.length - 1];
        
//         const filteredlist = calllist_row.filter((item) => {
//           const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
//           return itemDate >= startDate && itemDate <= endDate;
//         });
//         setCallList(filteredlist);
//       }
      
//       // Save the selection
//       setSelectedCalendarDates(tempSelectedDates);
//     }
    
//     setOpen(false); // Close modal
//   };

//   const handleClose = () => {
//     // Reset temp selection to previously saved selection
//     setTempSelectedDates(selectedCalendarDates);
//     setOpen(false);
//   };
//   return (
//     <TamaguiProvider config={tamaguiConfig}>
//       <SafeAreaProvider>
//         <ScrollView style={styles.container}>
//           <Text style={styles.title}>Menu Examples</Text>

//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Basic Menu</Text>
//             <Menu.Root>
//               <Menu.Trigger style={styles.menuTrigger}>
//                 <Text>Open Menu</Text>
//               </Menu.Trigger>
//               <Menu.Content
//                 width={180}
//                 style={{
//                   backgroundColor: colors.white,
//                   borderRadius: 18,
//                   paddingVertical: 8,
//                   shadowColor: colors.primary,
//                   shadowOffset: {
//                     width: 0,
//                     height: 2,
//                   },
//                   shadowOpacity: 0.25,
//                   shadowRadius: 3.84,
//                   elevation: 5,
//                 }}
//                 side="left"
//               >
//                 <Menu.Item
//                   textStyle={{ fontFamily: fonts.bol, color: colors.primary }}
//                   onPress={() => {
//                     filter('today');
//                   }}
//                   isselected={itemselect === 'today'}
//                 >
//                   Today
//                 </Menu.Item>
//                 <Menu.Item
//                   textStyle={{ fontFamily: fonts.bol, color: colors.primary }}
//                   onPress={() => {
//                     filter('yesterday');
//                   }}
//                   isselected={itemselect === 'yesterday'}
//                 >
//                   Yesterday
//                 </Menu.Item>
//                 <Menu.Item
//                   textStyle={{ fontFamily: fonts.bol, color: colors.primary }}
//                   onPress={() => {
//                     filter('week');
//                   }}
//                   isselected={itemselect === 'week'}
//                   rightIcon={<Bell size={18} color={colors.primary} />}
//                 >
//                   Week
//                 </Menu.Item>
//                 <Menu.Separator />
//                 <Menu.Item
//                   textStyle={{ fontFamily: fonts.bol, color: colors.primary }}
//                   icon={<CalendarDays size={18} color={colors.primary} />}
//                   onPress={() => {
//                     filter('custom');
//                   }}
//                   destructive
//                   rightIcon={<Bell size={18} color={colors.primary} />}
//                   isselected={itemselect === 'custom'}
//                 >
//                   Custom
//                 </Menu.Item>
//               </Menu.Content>
//             </Menu.Root>
//           </View>

//           <View>
//             <Text>Dashboard</Text>
//             <FlatList
//               data={callList}
//               keyExtractor={(item) => item.id}
//               renderItem={renderItem}
//             />
//           </View>
//             <CalendarModal
//             visible={open}
//             onClose={handleClose}
//             onChange={handleDateChange}
//             onApply={handleApply}
//             mode="range" // or "single" based on your needs
//             themeVariant="blue"
//             selectedDates={tempSelectedDates} // Use temp selected dates
//             closeButtonVisble={true}
//             applyButtonVisible={true}
//           />
//           {/* <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Menu with Icons</Text>
//             <Menu.Root>
//               <Menu.Trigger style={styles.menuTrigger}>
//                 <View style={styles.triggerContent}>
//                   <Text style={styles.triggerText}>Actions Menu</Text>
//                 </View>
//               </Menu.Trigger>
//               <Menu.Content width={220}>
//                 <Menu.Item
//                   onPress={() => console.log('Edit')}
//                 >
//                   Edit Item
//                 </Menu.Item>
//                 <Menu.Item
//                   onPress={() => console.log('Share')}
//                 >
//                   Share
//                 </Menu.Item>
//                 <Menu.Separator />
//                 <Menu.Item
//                   onPress={() => console.log('Delete')}
//                   destructive
//                 >
//                   Delete
//                 </Menu.Item>
//               </Menu.Content>
//             </Menu.Root>
//           </View>

          
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Menu on Top</Text>
//             <Menu.Root>
//               <Menu.Trigger style={styles.menuTrigger}>
//                 <Text>Open Top Menu</Text>
//               </Menu.Trigger>
//               <Menu.Content
//                 width={180}
//                 side="top"
//                 align="center"
//                 sideOffset={8}
//               >
//                 <Menu.Item onPress={() => console.log('Edit')}>Edit</Menu.Item>
//                 <Menu.Item onPress={() => console.log('Share')}>
//                   Share
//                 </Menu.Item>
//                 <Menu.Item onPress={() => console.log('Delete')} destructive>
//                   Delete
//                 </Menu.Item>
//               </Menu.Content>
//             </Menu.Root>
//           </View>

         
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Menu on Right</Text>
//             <View style={styles.row}>
//               <Menu.Root>
//                 <Menu.Trigger style={styles.smallTrigger}>
//                   <Text>Right Menu</Text>
//                 </Menu.Trigger>
//                 <Menu.Content width={180} side="right" align="start">
//                   <Menu.Item>Option 1</Menu.Item>
//                   <Menu.Item>Option 2</Menu.Item>
//                   <Menu.Item>Option 3</Menu.Item>
//                 </Menu.Content>
//               </Menu.Root>
//             </View>
//           </View>

         
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Menu on Left</Text>
//             <View style={[styles.row, { justifyContent: 'flex-end' }]}>
//               <Menu.Root>
//                 <Menu.Trigger style={styles.smallTrigger}>
//                   <Text>Left Menu</Text>
//                 </Menu.Trigger>
//                 <Menu.Content width={180} side="left" align="start">
//                   <Menu.Item>Option 1</Menu.Item>
//                   <Menu.Item>Option 2</Menu.Item>
//                   <Menu.Item>Option 3</Menu.Item>
//                 </Menu.Content>
//               </Menu.Root>
//             </View>
//           </View>

          
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Nested Submenu</Text>
//             <Menu.Root>
//               <Menu.Trigger style={styles.menuTrigger}>
//                 <Text>More Options</Text>
//               </Menu.Trigger>
//               <Menu.Content width={200}>
//                 <Menu.Item onPress={() => console.log('Save')}>Save</Menu.Item>
//                 <Menu.NestedSub
//                   title="Export"
               
//                 >
//                   <Menu.Item onPress={() => console.log('Export as PDF')}>
//                     Export as PDF
//                   </Menu.Item>
//                   <Menu.Item onPress={() => console.log('Export as CSV')}>
//                     Export as CSV
//                   </Menu.Item>
//                   <Menu.Item onPress={() => console.log('Export as JSON')}>
//                     Export as JSON
//                   </Menu.Item>
//                 </Menu.NestedSub>
//                 <Menu.Item onPress={() => console.log('Print')}>
//                   Print
//                 </Menu.Item>
//               </Menu.Content>
//             </Menu.Root>
//           </View>

         
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Multiple Menus</Text>
//             <View style={styles.multiMenuRow}>
//               <Menu.Root>
//                 <Menu.Trigger style={styles.multiTrigger}>
//                   <Text>Menu 1</Text>
//                 </Menu.Trigger>
//                 <Menu.Content width={150}>
//                   <Menu.Item>Item 1-1</Menu.Item>
//                   <Menu.Item>Item 1-2</Menu.Item>
//                 </Menu.Content>
//               </Menu.Root>

//               <Menu.Root>
//                 <Menu.Trigger style={styles.multiTrigger}>
//                   <Text>Menu 2</Text>
//                 </Menu.Trigger>
//                 <Menu.Content width={150}>
//                   <Menu.Item>Item 2-1</Menu.Item>
//                   <Menu.Item>Item 2-2</Menu.Item>
//                 </Menu.Content>
//               </Menu.Root>

//               <Menu.Root>
//                 <Menu.Trigger style={styles.multiTrigger}>
//                   <Text>Menu 3</Text>
//                 </Menu.Trigger>
//                 <Menu.Content width={150}>
//                   <Menu.Item>Item 3-1</Menu.Item>
//                   <Menu.Item>Item 3-2</Menu.Item>
//                 </Menu.Content>
//               </Menu.Root>
//             </View>
//           </View> */}
//         </ScrollView>
//       </SafeAreaProvider>
//     </TamaguiProvider>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 20,
//   },
//   section: {
//     marginBottom: 40,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 10,
//   },
//   menuTrigger: {
//     backgroundColor: '#0000',
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     alignSelf: 'flex-end',
//   },
//   triggerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   triggerText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#374151',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   smallTrigger: {
//     backgroundColor: '#FFFFFF',
//     padding: 10,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   multiMenuRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 10,
//   },
//   multiTrigger: {
//     backgroundColor: '#FFFFFF',
//     padding: 10,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     width: 80,
//     alignItems: 'center',
//   },
// });

// Dashboard.js - Fix the filter logic and state management
export default function Dashboard() {
   const calllist_row = [
    {
      id: '1',
      callType: 'Incoming',
      callName: 'Amit Sharma',
      callNumber: '+91 98765 43210',
      dateTime: '2026-02-16 10:15 AM',
      duration: '02:35',
    },
    {
      id: '2',
      callType: 'Outgoing',
      callName: 'Priya Patel',
      callNumber: '+91 98234 56789',
      dateTime: '2026-02-16 09:40 AM',
      duration: '05:12',
    },
    {
      id: '3',
      callType: 'Missed',
      callName: 'Rahul Verma',
      callNumber: '+91 90123 45678',
      dateTime: '2026-02-15 08:05 PM',
      duration: '00:00',
    },
    {
      id: '4',
      callType: 'Incoming',
      callName: 'Neha Singh',
      callNumber: '+91 91234 87654',
      dateTime: '2026-02-15 06:22 PM',
      duration: '11:08',
    },
    {
      id: '5',
      callType: 'Outgoing',
      callName: 'Office HR',
      callNumber: '+91 99887 66554',
      dateTime: '2026-02-13 03:10 PM',
      duration: '07:45',
    },
    {
      id: '6',
      callType: 'Missed',
      callName: 'Delivery Guy',
      callNumber: '+91 90909 12345',
      dateTime: '2026-02-11 01:55 PM',
      duration: '00:00',
    },
    {
      id: '7',
      callType: 'Incoming',
      callName: 'Mom',
      callNumber: '+91 90000 11111',
      dateTime: '2026-02-10 09:12 AM',
      duration: '18:21',
    },
    {
      id: '8',
      callType: 'Outgoing',
      callName: 'Rohit Mehta',
      callNumber: '+91 93456 78901',
      dateTime: '2026-02-09 07:30 PM',
      duration: '03:50',
    },
    {
      id: '9',
      callType: 'Outgoing',
      callName: 'jay Patel',
      callNumber: '+91 98234 56788',
      dateTime: '2026-02-16 09:40 AM',
      duration: '05:12',
    },
  ];

  const [callList, setCallList] = useState(calllist_row);
  const [itemselect, setItemSelect] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedCalendarDates, setSelectedCalendarDates] = useState({});
const MemoizedCalendarModal = memo(CalendarModal);
//   const filter = async (type?: string) => {
//     const today = moment().format('YYYY-MM-DD');
//     const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

//     let filteredlist = [];

//     if (type === 'today') {
//       filteredlist = calllist_row.filter((item) => {
//         const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
//         return itemDate === today;
//       });
//       setCallList(filteredlist);
//     } else if (type === 'yesterday') {
//       filteredlist = calllist_row.filter((item) => {
//         const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
//         return itemDate === yesterday;
//       });
//       setCallList(filteredlist);
//     } else if (type === 'week') {
//       const weekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
//       filteredlist = calllist_row.filter((item) => {
//         const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
//         return itemDate >= weekAgo && itemDate <= today;
//       });
//       setCallList(filteredlist);
//     } else if (type === 'custom') {
//       setOpen(true);
//     }
    
//     setItemSelect(type);
//   };

// In your Dashboard component
const filter = async (type?: string) => {
  // Move these calculations outside or memoize them
  if (type === 'custom') {
    setOpen(true);
    setItemSelect(type);
    return; // Return early to avoid unnecessary calculations
  }

  // Only do these calculations for non-custom filters
  const today = moment().format('YYYY-MM-DD');
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

  let filteredlist = [];

  if (type === 'today') {
    filteredlist = calllist_row.filter((item) => {
      const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
      return itemDate === today;
    });
  } else if (type === 'yesterday') {
    filteredlist = calllist_row.filter((item) => {
      const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
      return itemDate === yesterday;
    });
  } else if (type === 'week') {
    const weekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
    filteredlist = calllist_row.filter((item) => {
      const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
      return itemDate >= weekAgo && itemDate <= today;
    });
  }

  setCallList(filteredlist);
  setItemSelect(type);
};
  const handleDateChange = (selectedDates) => {
    // Just update the local state in modal, don't filter yet
    console.log('Selected dates:', selectedDates);
  };

  const handleApply = (selectedDates) => {
    const selectedKeys = Object.keys(selectedDates);
    
    if (selectedKeys.length > 0) {
      if (selectedKeys.length === 1) {
        // Single date selected
        const filteredlist = calllist_row.filter((item) => {
          const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
          return itemDate === selectedKeys[0];
        });
        setCallList(filteredlist);
        setItemSelect('custom');
      } else {
        // Range selected - need to sort dates
        const sortedKeys = selectedKeys.sort((a, b) => moment(a).diff(moment(b)));
        const startDate = sortedKeys[0];
        const endDate = sortedKeys[sortedKeys.length - 1];
        
        const filteredlist = calllist_row.filter((item) => {
          const itemDate = moment(item.dateTime, 'YYYY-MM-DD HH:mm A').format('YYYY-MM-DD');
          return itemDate >= startDate && itemDate <= endDate;
        });
        setCallList(filteredlist);
        setItemSelect('custom');
      }
      
      // Save the selection
      setSelectedCalendarDates(selectedDates);
    }
    
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={{ padding: 10, borderBottomWidth: 1 }}>
        <Text>{item.callType}</Text>
        <Text>{item.callName}</Text>
        <Text>{item.callNumber}</Text>
        <Text>{item.dateTime}</Text>
        <Text>{item.duration}</Text>
      </View>
    );
  };

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <SafeAreaProvider>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Menu Examples</Text>
          <TouchableOpacity onPress={()=> setOpen(true)}>
            <Text style={styles.sectionTitle}>Dialog</Text>
          </TouchableOpacity>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Menu</Text>
            <Menu.Root>
              <Menu.Trigger style={styles.menuTrigger}>
                <Text>Open Menu</Text>
              </Menu.Trigger>
              <Menu.Content
                width={180}
                style={{
                  backgroundColor: colors.white,
                  borderRadius: 18,
                  paddingVertical: 8,
                  shadowColor: colors.primary,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                side="left"
              >
                <Menu.Item
                  textStyle={{ fontFamily: fonts.bol, color: colors.primary }}
                  onPress={() => filter('today')}
                  isselected={itemselect === 'today'}
                >
                  Today
                </Menu.Item>
                <Menu.Item
                  textStyle={{ fontFamily: fonts.bol, color: colors.primary }}
                  onPress={() => filter('yesterday')}
                  isselected={itemselect === 'yesterday'}
                >
                  Yesterday
                </Menu.Item>
                <Menu.Item
                  textStyle={{ fontFamily: fonts.bol, color: colors.primary }}
                  onPress={() => filter('week')}
                  isselected={itemselect === 'week'}
                  rightIcon={<Bell size={18} color={colors.primary} />}
                >
                  Week
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item
                  textStyle={{ fontFamily: fonts.bol, color: colors.primary }}
                  icon={<CalendarDays size={18} color={colors.primary} />}
                  onPress={() => filter('custom')}
                  destructive
                  rightIcon={<Bell size={18} color={colors.primary} />}
                  isselected={itemselect === 'custom'}
                >
                  Custom
                </Menu.Item>
              </Menu.Content>
            </Menu.Root>
          </View>

          <View>
            <Text>Dashboard</Text>
            <FlatList
              data={callList}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          </View>

          <CalendarModal
            visible={open}
            onClose={handleClose}
            onChange={handleDateChange}
            onApply={handleApply}
            mode="range"
            themeVariant="blue"
            selectedDates={selectedCalendarDates}
            closeButtonVisble={true}
            applyButtonVisible={true}
            maxDate={moment().format('YYYY-MM-DD')} 
            
          />
        </ScrollView>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  menuTrigger: {
    backgroundColor: '#0000',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignSelf: 'flex-end',
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  triggerText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#374151',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  smallTrigger: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 100,
    alignItems: 'center',
  },
  multiMenuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  multiTrigger: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: 80,
    alignItems: 'center',
  },
});