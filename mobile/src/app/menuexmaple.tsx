import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TamaguiProvider } from '@tamagui/core';
import tamaguiConfig from 'mobile/tamagui.config';
import { Menu } from '../com/menu/custommenu';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import colors from 'mobile/constant/colors';
import fonts from 'mobile/constant/font';
import { Bell, CalendarDays } from '@tamagui/lucide-icons';
// import { Ionicons } from '@expo/vector-icons';
export default function meuexmple() {
  const calllist = [
    {
      id: '1',
      callType: 'Incoming',
      callName: 'Amit Sharma',
      callNumber: '+91 98765 43210',
      dateTime: '2026-02-12 10:15 AM',
      duration: '02:35',
    },
    {
      id: '2',
      callType: 'Outgoing',
      callName: 'Priya Patel',
      callNumber: '+91 98234 56789',
      dateTime: '2026-02-12 09:40 AM',
      duration: '05:12',
    },
    {
      id: '3',
      callType: 'Missed',
      callName: 'Rahul Verma',
      callNumber: '+91 90123 45678',
      dateTime: '2026-02-11 08:05 PM',
      duration: '00:00',
    },
    {
      id: '4',
      callType: 'Incoming',
      callName: 'Neha Singh',
      callNumber: '+91 91234 87654',
      dateTime: '2026-02-11 06:22 PM',
      duration: '11:08',
    },
    {
      id: '5',
      callType: 'Outgoing',
      callName: 'Office HR',
      callNumber: '+91 99887 66554',
      dateTime: '2026-02-11 03:10 PM',
      duration: '07:45',
    },
    {
      id: '6',
      callType: 'Missed',
      callName: 'Delivery Guy',
      callNumber: '+91 90909 12345',
      dateTime: '2026-02-10 01:55 PM',
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
  ];

  //   const maxlistsize = 4;
  //   const [filteredCallList, setFilteredCallList] = useState([]);

  //   useEffect(() => {
  //     const firstFour = calllist.slice(0, maxlistsize);
  //     setFilteredCallList(firstFour);
  //   }, []);

  const handleEdit = () => {
    console.log('Edit clicked');
    // Handle edit action
  };

  const handleDelete = () => {
    console.log('Delete clicked');
    // Handle delete action
  };

  const handleShare = () => {
    console.log('Share clicked');
    // Handle share action
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    // Handle settings action
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

          {/* Basic Menu - Will open relative to button */}
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
                side='left'
              >
                <Menu.Item textStyle={{fontFamily:fonts.bol, color:colors.primary}} onPress={() => console.log('Today')}>Today</Menu.Item>
                <Menu.Item textStyle={{fontFamily:fonts.bol,color:colors.primary}}  onPress={() => console.log('Share')}>
                  Yesterday
                </Menu.Item>
                <Menu.Item textStyle={{fontFamily:fonts.bol,color:colors.primary}}  onPress={() => console.log('Share')}>
                  Week
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item textStyle={{fontFamily:fonts.bol,color:colors.primary}} icon={<CalendarDays size={18} color={colors.primary}/>}  onPress={() => console.log('Delete')} destructive>
                  Custom
                </Menu.Item>
              </Menu.Content>
            </Menu.Root>
          </View>

          {/* Menu with Icons */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Menu with Icons</Text>
            <Menu.Root>
              <Menu.Trigger style={styles.menuTrigger}>
                <View style={styles.triggerContent}>
                  {/* <Ionicons name="menu-outline" size={20} color="#4B5563" /> */}
                  <Text style={styles.triggerText}>Actions Menu</Text>
                </View>
              </Menu.Trigger>
              <Menu.Content width={220}>
                <Menu.Item
                  onPress={() => console.log('Edit')}
                  //   icon={<Ionicons name="create-outline" size={18} color="#4B5563" />}
                >
                  Edit Item
                </Menu.Item>
                <Menu.Item
                  onPress={() => console.log('Share')}
                  //   icon={<Ionicons name="share-outline" size={18} color="#4B5563" />}
                >
                  Share
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item
                  onPress={() => console.log('Delete')}
                  destructive
                  //   icon={<Ionicons name="trash-outline" size={18} color="#EF4444" />}
                >
                  Delete
                </Menu.Item>
              </Menu.Content>
            </Menu.Root>
          </View>

          {/* Menu positioned at top */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Menu on Top</Text>
            <Menu.Root>
              <Menu.Trigger style={styles.menuTrigger}>
                <Text>Open Top Menu</Text>
              </Menu.Trigger>
              <Menu.Content
                width={180}
                side="top"
                align="center"
                sideOffset={8}
              >
                <Menu.Item onPress={() => console.log('Edit')}>Edit</Menu.Item>
                <Menu.Item onPress={() => console.log('Share')}>
                  Share
                </Menu.Item>
                <Menu.Item onPress={() => console.log('Delete')} destructive>
                  Delete
                </Menu.Item>
              </Menu.Content>
            </Menu.Root>
          </View>

          {/* Menu positioned at right */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Menu on Right</Text>
            <View style={styles.row}>
              <Menu.Root>
                <Menu.Trigger style={styles.smallTrigger}>
                  <Text>Right Menu</Text>
                </Menu.Trigger>
                <Menu.Content width={180} side="right" align="start">
                  <Menu.Item>Option 1</Menu.Item>
                  <Menu.Item>Option 2</Menu.Item>
                  <Menu.Item>Option 3</Menu.Item>
                </Menu.Content>
              </Menu.Root>
            </View>
          </View>

          {/* Menu positioned at left */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Menu on Left</Text>
            <View style={[styles.row, { justifyContent: 'flex-end' }]}>
              <Menu.Root>
                <Menu.Trigger style={styles.smallTrigger}>
                  <Text>Left Menu</Text>
                </Menu.Trigger>
                <Menu.Content width={180} side="left" align="start">
                  <Menu.Item>Option 1</Menu.Item>
                  <Menu.Item>Option 2</Menu.Item>
                  <Menu.Item>Option 3</Menu.Item>
                </Menu.Content>
              </Menu.Root>
            </View>
          </View>

          {/* Nested Submenu with proper positioning */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nested Submenu</Text>
            <Menu.Root>
              <Menu.Trigger style={styles.menuTrigger}>
                <Text>More Options</Text>
              </Menu.Trigger>
              <Menu.Content width={200}>
                <Menu.Item onPress={() => console.log('Save')}>Save</Menu.Item>
                <Menu.NestedSub
                  title="Export"
                  // icon={<Ionicons name="download-outline" size={18} color="#4B5563" />}
                >
                  <Menu.Item onPress={() => console.log('Export as PDF')}>
                    Export as PDF
                  </Menu.Item>
                  <Menu.Item onPress={() => console.log('Export as CSV')}>
                    Export as CSV
                  </Menu.Item>
                  <Menu.Item onPress={() => console.log('Export as JSON')}>
                    Export as JSON
                  </Menu.Item>
                </Menu.NestedSub>
                <Menu.Item onPress={() => console.log('Print')}>
                  Print
                </Menu.Item>
              </Menu.Content>
            </Menu.Root>
          </View>

          {/* Multiple menus in same view */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Multiple Menus</Text>
            <View style={styles.multiMenuRow}>
              <Menu.Root>
                <Menu.Trigger style={styles.multiTrigger}>
                  <Text>Menu 1</Text>
                </Menu.Trigger>
                <Menu.Content width={150}>
                  <Menu.Item>Item 1-1</Menu.Item>
                  <Menu.Item>Item 1-2</Menu.Item>
                </Menu.Content>
              </Menu.Root>

              <Menu.Root>
                <Menu.Trigger style={styles.multiTrigger}>
                  <Text>Menu 2</Text>
                </Menu.Trigger>
                <Menu.Content width={150}>
                  <Menu.Item>Item 2-1</Menu.Item>
                  <Menu.Item>Item 2-2</Menu.Item>
                </Menu.Content>
              </Menu.Root>

              <Menu.Root>
                <Menu.Trigger style={styles.multiTrigger}>
                  <Text>Menu 3</Text>
                </Menu.Trigger>
                <Menu.Content width={150}>
                  <Menu.Item>Item 3-1</Menu.Item>
                  <Menu.Item>Item 3-2</Menu.Item>
                </Menu.Content>
              </Menu.Root>
            </View>
          </View>
        </ScrollView>
      </SafeAreaProvider>
      {/* <View>
        <Text>Dashboard</Text>
        <FlatList
          data={filteredCallList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View> */}
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
