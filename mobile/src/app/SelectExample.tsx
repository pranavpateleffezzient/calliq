// import { TamaguiProvider } from '@tamagui/core';
// import tamaguiConfig from 'mobile/tamagui.config';
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
// import { PortalProvider } from 'tamagui';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import AppDropdown from '../com/selecter';

// const SelectExample = () => {
//   const [country, setCountry] = useState("");

//   return (
//          <View style={{ padding: 20 }}>
//       <AppDropdown
//   label="Country"
//   required
//   value={country}
//   setValue={setCountry}
//   data={[
//     { key: "1", value: "India" },
//     { key: "2", value: "USA" },
//     { key: "3", value: "Canada" },
//   ]}
// />

// <AppDropdown
//   label="Gender"
//   searchable={false}
//   value={country}
//   setValue={setCountry}
//  data={[
//     { key: "1", value: "India" },
//     { key: "2", value: "USA" },
//     { key: "3", value: "Canada" },
//   ]}
// />

//     </View>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor:'#000',
//     flex:1
//   },
// });

// export default SelectExample;

// screens/DropdownExampleScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';
import fonts from 'mobile/constant/font';
import CustomDropdown from '../com/selecter/CustomDropdown';
import MultiSelectDropdown from '../com/selecter/MultiSelectDropdown';
import UnifiedDropdown from '../com/selecter/UnifiedDropdown';

const SelectExample = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [gender, setGender] = useState('');

  const [selectedContact, setSelectedContact] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);

  const contacts = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      status: 'Online',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'Product Manager',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 891',
      status: 'Busy',
      badgeColor: colors.orange5,
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      role: 'Lead Developer',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 234 567 892',
      status: 'Away',
      badgeColor: colors.yellow5,
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      role: 'UX Designer',
    },
  ];

  // Product data with images, prices, ratings
  const products = [
    {
      id: 'p1',
      name: 'MacBook Pro',
      category: 'Laptops',
      price: 1299,
      rating: 4.8,
      image: 'https://example.com/macbook.jpg',
      badge: 'Sale',
      badgeColor: colors.red1,
    },
    {
      id: 'p2',
      name: 'iPhone 15',
      category: 'Smartphones',
      price: 999,
      rating: 4.9,
      image: 'https://example.com/iphone.jpg',
      badge: 'New',
      badgeColor: colors.green1,
    },
  ];

  // Country data with flags and dial codes
  const countries = [
    {
      id: 'us',
      name: 'United States',
      code: 'US',
      dialCode: '+1',
      flag: 'https://flagcdn.com/w320/us.png',
    },
    {
      id: 'in',
      name: 'India',
      code: 'IN',
      dialCode: '+91',
      flag: 'https://flagcdn.com/w320/in.png',
    },
  ];
  const languagesList = [
    'English',
    'Spanish',
    'French',
    'German',
    'Hindi',
    'Chinese',
  ];

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  // Sample data
  // const countries = [
  //   { key: '1', value: 'United States' },
  //   { key: '2', value: 'United Kingdom' },
  //   { key: '3', value: 'Canada' },
  //   { key: '4', value: 'Australia' },
  //   { key: '5', value: 'Germany' },
  //   { key: '6', value: 'France' },
  //   { key: '7', value: 'Japan' },
  //   { key: '8', value: 'India' },
  //   { key: '9', value: 'Brazil' },
  //   { key: '10', value: 'South Africa' },
  // ];

  const cities = [
    'New York',
    'London',
    'Toronto',
    'Sydney',
    'Berlin',
    'Paris',
    'Tokyo',
    'Mumbai',
    'São Paulo',
    'Cape Town',
  ];

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Toys',
    'Automotive',
    'Health',
    'Beauty',
    'Food',
  ];

  const sectionedData = [
    {
      title: 'North America',
      data: [
        { id: '1', name: 'United States' },
        { id: '2', name: 'Canada' },
        { id: '3', name: 'Mexico' },
      ],
    },
    {
      title: 'Europe',
      data: [
        { id: '4', name: 'United Kingdom' },
        { id: '5', name: 'Germany' },
        { id: '6', name: 'France' },
        { id: '7', name: 'Italy' },
      ],
    },
    {
      title: 'Asia',
      data: [
        { id: '8', name: 'Japan' },
        { id: '9', name: 'South Korea' },
        { id: '10', name: 'China' },
        { id: '11', name: 'India' },
      ],
    },
  ];

  const contactSections = [
    {
      title: 'Executive Team',
      data: [
        {
          id: '1',
          name: 'John Doe',
          role: 'CEO',
          email: 'john.doe@company.com',
          phone: '+1 234 567 890',
          status: 'Online',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          online: true,
        },
        {
          id: '2',
          name: 'Jane Smith',
          role: 'CTO',
          email: 'jane.smith@company.com',
          phone: '+1 234 567 891',
          status: 'Busy',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
          online: false,
        },
        {
          id: '3',
          name: 'Mike Johnson',
          role: 'CFO',
          email: 'mike.johnson@company.com',
          phone: '+1 234 567 892',
          status: 'Available',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          online: true,
        },
      ],
    },
    {
      title: 'Engineering',
      data: [
        {
          id: '4',
          name: 'Sarah Wilson',
          role: 'Lead Developer',
          email: 'sarah.wilson@company.com',
          phone: '+1 234 567 893',
          status: 'Online',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
          online: true,
        },
        {
          id: '5',
          name: 'Alex Chen',
          role: 'Frontend Developer',
          email: 'alex.chen@company.com',
          phone: '+1 234 567 894',
          status: 'In Meeting',
          badge: 'Meeting',
          badgeColor: colors.orange5,
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
          online: false,
        },
        {
          id: '6',
          name: 'Emily Davis',
          role: 'Backend Developer',
          email: 'emily.davis@company.com',
          phone: '+1 234 567 895',
          status: 'Available',
          avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
          online: true,
        },
        {
          id: '7',
          name: 'James Lee',
          role: 'DevOps Engineer',
          email: 'james.lee@company.com',
          phone: '+1 234 567 896',
          status: 'Away',
          badge: 'Lunch',
          badgeColor: colors.yellow5,
          avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
          online: false,
        },
      ],
    },
    {
      title: 'Product & Design',
      data: [
        {
          id: '8',
          name: 'Lisa Anderson',
          role: 'Product Manager',
          email: 'lisa.anderson@company.com',
          phone: '+1 234 567 897',
          status: 'Online',
          avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
          online: true,
        },
        {
          id: '9',
          name: 'David Kim',
          role: 'UX Designer',
          email: 'david.kim@company.com',
          phone: '+1 234 567 898',
          status: 'Busy',
          avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
          online: false,
        },
        {
          id: '10',
          name: 'Anna Martinez',
          role: 'UI Designer',
          email: 'anna.martinez@company.com',
          phone: '+1 234 567 899',
          status: 'Available',
          avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
          online: true,
        },
      ],
    },
    {
      title: 'Marketing',
      data: [
        {
          id: '11',
          name: 'Robert Taylor',
          role: 'Marketing Director',
          email: 'robert.taylor@company.com',
          phone: '+1 234 567 900',
          status: 'Online',
          avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
          online: true,
        },
        {
          id: '12',
          name: 'Maria Garcia',
          role: 'Content Strategist',
          email: 'maria.garcia@company.com',
          phone: '+1 234 567 901',
          status: 'In Meeting',
          badge: 'Campaign',
          badgeColor: colors.purple5,
          avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
          online: false,
        },
      ],
    },
  ];

  const handleCountrySelect = (value) => {
    setSelectedCountry(value);
    Alert.alert('Selected', `You selected: ${value}`);
  };

  const handleMultiSelect = (values) => {
    setSelectedCategories(values);
    console.log('Selected categories:', values);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dropdown Components</Text>

      {/* Basic Dropdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Basic Dropdown</Text>
        <CustomDropdown
          data={countries}
          setSelected={setSelectedCountry}
          onSelect={handleCountrySelect}
          placeholder="Select a country"
          label="Country"
          required
          variant="outlined"
          size="medium"
        />
        {selectedCountry && (
          <Text style={styles.result}>Selected: {selectedCountry}</Text>
        )}
      </View>

      {/* Dropdown with Search */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Dropdown with Search</Text>
        <CustomDropdown
          data={cities}
          setSelected={setSelectedCity}
          placeholder="Search and select a city"
          label="City"
          search
          searchPlaceholder="Type to search..."
          variant="filled"
        />
        {selectedCity && (
          <Text style={styles.result}>Selected: {selectedCity}</Text>
        )}
      </View>

      {/* Different Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Different Variants</Text>

        <Text style={styles.subtitle}>Outlined (Default)</Text>
        <CustomDropdown
          data={['Option 1', 'Option 2', 'Option 3']}
          placeholder="Outlined variant"
          variant="outlined"
          size="medium"
        />

        <Text style={styles.subtitle}>Filled</Text>
        <CustomDropdown
          data={['Option 1', 'Option 2', 'Option 3']}
          placeholder="Filled variant"
          variant="filled"
          size="medium"
        />

        <Text style={styles.subtitle}>Underlined</Text>
        <CustomDropdown
          data={['Option 1', 'Option 2', 'Option 3']}
          placeholder="Underlined variant"
          variant="underlined"
          size="medium"
        />
      </View>

      {/* Different Sizes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Different Sizes</Text>

        <Text style={styles.subtitle}>Small</Text>
        <CustomDropdown
          data={['Small', 'Size', 'Dropdown']}
          placeholder="Small dropdown"
          size="small"
          variant="outlined"
        />

        <Text style={styles.subtitle}>Medium (Default)</Text>
        <CustomDropdown
          data={['Medium', 'Size', 'Dropdown']}
          placeholder="Medium dropdown"
          size="medium"
          variant="outlined"
        />

        <Text style={styles.subtitle}>Large</Text>
        <CustomDropdown
          data={['Large', 'Size', 'Dropdown']}
          placeholder="Large dropdown"
          size="large"
          variant="outlined"
        />
      </View>

      {/* Loading State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Loading State</Text>
        <TouchableOpacity
          style={styles.loadingButton}
          onPress={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
        >
          <Text style={styles.loadingButtonText}>Simulate Loading</Text>
        </TouchableOpacity>
        <CustomDropdown
          data={countries}
          placeholder="Loading dropdown"
          label="Loading Example"
          loading={loading}
          disabled={loading}
        />
      </View>

      {/* Error State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Error State</Text>
        <CustomDropdown
          data={countries}
          placeholder="Select an option"
          label="Required Field"
          required
          error={!selectedCountry}
          errorMessage="Please select a country"
        />
      </View>

      {/* Disabled State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Disabled State</Text>
        <CustomDropdown
          data={countries}
          placeholder="Disabled dropdown"
          label="Disabled Field"
          disabled
          defaultOption="United States"
        />
      </View>

      {/* Sectioned Dropdown */}

      {/* Multi-Select Dropdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>9. Multi-Select Dropdown</Text>
        <MultiSelectDropdown
          data={categories}
          setSelected={handleMultiSelect}
          placeholder="Select categories"
          label="Categories"
          helperText="You can select multiple categories"
          maxSelections={5}
          search={false}
        />
        {selectedCategories.length > 0 && (
          <View style={styles.selectedContainer}>
            <Text style={styles.resultLabel}>Selected categories:</Text>
            <View style={styles.selectedTags}>
              {selectedCategories.map((cat, index) => (
                <View key={index} style={styles.selectedTag}>
                  <Text style={styles.selectedTagText}>{cat}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Custom Styled Dropdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>10. Custom Styled Dropdown</Text>
        <CustomDropdown
          required
          data={countries}
          size="small"
          placeholder="Custom styled dropdown"
          label="Custom Style"
          variant="outlined"
          boxStyles={{
            backgroundColor: colors.primary,
            borderColor: colors.blue5,
            borderWidth: 1,
            borderRadius: dimonds.radius[5],
          }}
          inputStyles={{
            color: colors.white,
            fontFamily: fonts.med,
          }}
          dropdownStyles={{
            backgroundColor: colors.blue1,
            borderColor: colors.blue4,
          }}
          dropdownItemStyles={{
            borderBottomColor: colors.blue3,
          }}
          dropdownTextStyles={{
            color: colors.blue8,
          }}
        />
      </View>

      {/* Single Select - Required */}
      <UnifiedDropdown
        mode="single"
        label="Country"
        required
        value={country}
        setValue={setCountry}
        data={countries}
        placeholder="Select your country"
        variant="outlined"
        size="medium"
        error={!country && true}
        errorMessage="Country is required"
      />

      {/* Single Select - With Search */}
      <UnifiedDropdown
        mode="single"
        label="Gender"
        value={gender}
        setValue={setGender}
        data={genderOptions}
        placeholder="Select gender"
        variant="filled"
        search
      />

      {/* Multi Select - With Chips */}
      <UnifiedDropdown
        mode="multi"
        label="Languages"
        value={languages}
        setValue={setLanguages}
        data={languagesList}
        placeholder="Select languages"
        helperText="You can select multiple languages"
        maxSelections={3}
        search
        variant="outlined"
        size="small"
      />

      {/* <Text style={styles.title}>Contact Selection</Text> */}

      {/* Contact Dropdown - Single Select with Images */}
      <UnifiedDropdown
        mode="single"
        label="Select Contact"
        value={selectedContact}
        setValue={setSelectedContact}
        data={contacts}
        placeholder="Choose a contact"
        itemTemplate="contact"
        search
        searchPlaceholder="Search by name or email..."
        variant="outlined"
      />

      {/* Team Selection - Multi Select with User Template */}
      <UnifiedDropdown
        mode="multi"
        label="Team Members"
        value={selectedTeam}
        setValue={setSelectedTeam}
        data={contacts}
        placeholder="Add team members"
        itemTemplate="user"
        search
        maxSelections={3}
        variant="filled"
        helperText="Select up to 3 team members"
      />

      {/* Product Dropdown - Custom Template */}
      <UnifiedDropdown
        mode="single"
        label="Select Product"
        data={products}
        placeholder="Choose a product"
        itemTemplate="product"
        search
      />

      {/* Country Dropdown with Flags */}
      <UnifiedDropdown
        mode="single"
        label="Country"
        data={countries}
        placeholder="Select country"
        itemTemplate="country"
        search
        variant="underlined"
      />

      {/* Custom Render Example - For any future requirement */}
      <UnifiedDropdown
        mode="multi"
        label="Custom Items"
        data={contacts}
        placeholder="Custom render"
        renderItem={(item, isSelected) => (
          <View
            style={[styles.customItem, isSelected && styles.customSelected]}
          >
            <View style={styles.customIcon}>
              <Text>{item.role?.charAt(0) || '👤'}</Text>
            </View>
            <View style={styles.customInfo}>
              <Text style={styles.customName}>{item.name}</Text>
              <Text style={styles.customRole}>{item.role}</Text>
            </View>
            {isSelected && <Text style={styles.customCheck}>✓</Text>}
          </View>
        )}
        renderSelectedItem={(item, index, removeItem) => (
          <View key={index} style={styles.customChip}>
            <Text style={styles.customChipText}>{item}</Text>
            <TouchableOpacity onPress={() => removeItem(item)}>
              <Text style={styles.customChipClose}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <UnifiedDropdown
        mode="single"
        label="Team Member"
        value={selectedContact}
        setValue={setSelectedContact}
        placeholder="Choose a team member"
        itemTemplate="contact"
        grouped={true}
        sections={contactSections}
        search={true}
        searchPlaceholder="Search by name, email or role..."
        variant="outlined"
        helperText="Select one team member"
        showSelectedCheck={true}
        closeOnSelect={true}
      />

      {selectedContact ? (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedLabel}>Selected:</Text>
          <Text style={styles.selectedValue}>{selectedContact}</Text>
        </View>
      ) : null}

      <UnifiedDropdown
        mode="single"
        data={['Today', 'Yesterday', 'Tomorrow']}
        dropdownType="inline"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: dimonds.space[4],
    //  scrollEnabled={false} 
  },
  header: {
    fontSize: 24,
    fontFamily: fonts.bol,
    color: colors.gray9,
    marginBottom: dimonds.space[6],
    textAlign: 'center',
  },
  section: {
    marginBottom: dimonds.space[6],
    padding: dimonds.space[4],
    backgroundColor: colors.gray1,
    borderRadius: dimonds.radius[4],
    borderWidth: 1,
    borderColor: colors.gray3,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bol,
    color: colors.gray8,
    marginBottom: dimonds.space[4],
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.med,
    color: colors.gray6,
    marginTop: dimonds.space[3],
    marginBottom: dimonds.space[2],
  },
  result: {
    marginTop: dimonds.space[3],
    fontSize: 14,
    fontFamily: fonts.med,
    color: colors.primary,
    padding: dimonds.space[3],
    backgroundColor: colors.blue1,
    borderRadius: dimonds.radius[2],
  },
  resultLabel: {
    fontSize: 14,
    fontFamily: fonts.med,
    color: colors.gray7,
    marginBottom: dimonds.space[2],
  },
  selectedContainer: {
    marginTop: dimonds.space[3],
  },
  selectedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: dimonds.space[2],
  },
  selectedTag: {
    backgroundColor: colors.primary,
    paddingVertical: dimonds.space[1],
    paddingHorizontal: dimonds.space[3],
    borderRadius: dimonds.radius[2],
  },
  selectedTagText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.med,
  },
  loadingButton: {
    backgroundColor: colors.primary,
    padding: dimonds.space[3],
    borderRadius: dimonds.radius[3],
    marginBottom: dimonds.space[3],
    alignItems: 'center',
  },
  loadingButtonText: {
    color: colors.white,
    fontFamily: fonts.med,
    fontSize: 14,
  },
  customItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
    backgroundColor: colors.white,
  },
  customSelected: {
    backgroundColor: colors.blue1,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  customIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: dimonds.space[3],
  },
  customIconText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.bol,
  },
  customInfo: {
    flex: 1,
  },
  customName: {
    fontSize: 15,
    fontFamily: fonts.med,
    color: colors.gray9,
    marginBottom: 2,
  },
  customRole: {
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.gray6,
  },
  customCheck: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: dimonds.space[2],
  },

  // Custom Chip Styles
  customChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: dimonds.radius[3],
    paddingVertical: dimonds.space[1],
    paddingLeft: dimonds.space[3],
    paddingRight: dimonds.space[2],
    marginRight: dimonds.space[2],
    borderWidth: 1,
    borderColor: colors.primaryDark,
  },
  customChipText: {
    fontSize: 12,
    fontFamily: fonts.med,
    color: colors.white,
    marginRight: dimonds.space[2],
  },
  customChipClose: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
    padding: 2,
  },

  // Additional Custom Styles for different templates
  customProductItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  customProductImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: dimonds.space[3],
  },
  customProductInfo: {
    flex: 1,
  },
  customProductTitle: {
    fontSize: 15,
    fontFamily: fonts.med,
    color: colors.gray9,
    marginBottom: 2,
  },
  customProductPrice: {
    fontSize: 14,
    fontFamily: fonts.bol,
    color: colors.primary,
  },
  customProductBadge: {
    backgroundColor: colors.green1,
    paddingHorizontal: dimonds.space[2],
    paddingVertical: 2,
    borderRadius: dimonds.radius[1],
    marginLeft: dimonds.space[2],
  },
  customProductBadgeText: {
    fontSize: 10,
    fontFamily: fonts.med,
    color: colors.green7,
  },

  // Custom Country Item Styles
  customCountryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  customCountryFlag: {
    width: 32,
    height: 24,
    borderRadius: 4,
    marginRight: dimonds.space[3],
  },
  customCountryName: {
    flex: 1,
    fontSize: 15,
    fontFamily: fonts.med,
    color: colors.gray9,
  },
  customCountryCode: {
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.gray6,
    marginRight: dimonds.space[2],
  },
  customCountryDialCode: {
    fontSize: 13,
    fontFamily: fonts.med,
    color: colors.primary,
  },

  // Custom Contact Item Styles
  customContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  customContactAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: dimonds.space[3],
  },
  customContactAvatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: dimonds.space[3],
  },
  customContactAvatarText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.bol,
  },
  customContactDetails: {
    flex: 1,
  },
  customContactName: {
    fontSize: 15,
    fontFamily: fonts.med,
    color: colors.gray9,
    marginBottom: 2,
  },
  customContactEmail: {
    fontSize: 11,
    fontFamily: fonts.reg,
    color: colors.gray6,
    marginBottom: 2,
  },
  customContactPhone: {
    fontSize: 11,
    fontFamily: fonts.reg,
    color: colors.gray6,
  },
  customContactStatus: {
    fontSize: 10,
    fontFamily: fonts.med,
    color: colors.green7,
    marginLeft: dimonds.space[2],
  },

  // Custom Section Header Styles
  customSectionHeader: {
    backgroundColor: colors.gray1,
    paddingVertical: dimonds.space[2],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray3,
  },
  customSectionHeaderText: {
    fontSize: 13,
    fontFamily: fonts.bol,
    color: colors.gray7,
    textTransform: 'uppercase',
  },

  // Custom Empty State Styles
  customEmptyContainer: {
    padding: dimonds.space[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
  customEmptyIcon: {
    fontSize: 48,
    color: colors.gray4,
    marginBottom: dimonds.space[3],
  },
  customEmptyText: {
    fontSize: 16,
    fontFamily: fonts.med,
    color: colors.gray5,
    marginBottom: dimonds.space[2],
  },
  customEmptySubtext: {
    fontSize: 13,
    fontFamily: fonts.reg,
    color: colors.gray5,
  },

  // Custom Button Styles
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray4,
    borderRadius: dimonds.radius[3],
    paddingHorizontal: dimonds.space[4],
    paddingVertical: dimonds.space[3],
    minHeight: 50,
  },
  customButtonText: {
    fontSize: 14,
    fontFamily: fonts.reg,
    color: colors.gray9,
  },
  customButtonPlaceholder: {
    fontSize: 14,
    fontFamily: fonts.reg,
    color: colors.gray5,
  },
  customButtonIcon: {
    marginLeft: dimonds.space[2],
  },

  // Custom Search Bar Styles
  customSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: dimonds.space[3],
    backgroundColor: colors.gray1,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray3,
  },
  customSearchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.reg,
    color: colors.gray9,
    paddingVertical: dimonds.space[2],
    paddingHorizontal: dimonds.space[3],
    backgroundColor: colors.white,
    borderRadius: dimonds.radius[3],
    borderWidth: 1,
    borderColor: colors.gray4,
  },
  customSearchIcon: {
    position: 'absolute',
    right: dimonds.space[6],
  },

  // Custom Modal Header Styles
  customModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: dimonds.space[4],
    backgroundColor: colors.primary,
  },
  customModalTitle: {
    fontSize: 18,
    fontFamily: fonts.bol,
    color: colors.white,
  },
  customModalCloseButton: {
    padding: dimonds.space[2],
  },
  customModalCloseText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
  },

  // Custom Footer Styles
  customFooter: {
    padding: dimonds.space[4],
    backgroundColor: colors.gray1,
    borderTopWidth: 1,
    borderTopColor: colors.gray3,
  },
  customDoneButton: {
    backgroundColor: colors.primary,
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderRadius: dimonds.radius[3],
    alignItems: 'center',
  },
  customDoneButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.med,
  },
  customCancelButton: {
    backgroundColor: colors.gray3,
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderRadius: dimonds.radius[3],
    alignItems: 'center',
    marginTop: dimonds.space[2],
  },
  customCancelButtonText: {
    color: colors.gray8,
    fontSize: 14,
    fontFamily: fonts.med,
  },

  // Custom Dropdown Container Styles
  customDropdownContainer: {
    backgroundColor: colors.white,
    borderRadius: dimonds.radius[4],
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  // Custom Chip Variations
  customChipPrimary: {
    backgroundColor: colors.primary,
    borderRadius: dimonds.radius[2],
    paddingVertical: dimonds.space[1],
    paddingHorizontal: dimonds.space[3],
    marginRight: dimonds.space[2],
    marginBottom: dimonds.space[1],
  },
  customChipSecondary: {
    backgroundColor: colors.gray2,
    borderRadius: dimonds.radius[2],
    paddingVertical: dimonds.space[1],
    paddingHorizontal: dimonds.space[3],
    marginRight: dimonds.space[2],
    marginBottom: dimonds.space[1],
  },
  customChipOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: dimonds.radius[2],
    paddingVertical: dimonds.space[1],
    paddingHorizontal: dimonds.space[3],
    marginRight: dimonds.space[2],
    marginBottom: dimonds.space[1],
  },
  customChipSuccess: {
    backgroundColor: colors.green6,
    borderRadius: dimonds.radius[2],
    paddingVertical: dimonds.space[1],
    paddingHorizontal: dimonds.space[3],
    marginRight: dimonds.space[2],
    marginBottom: dimonds.space[1],
  },
  customChipWarning: {
    backgroundColor: colors.orange5,
    borderRadius: dimonds.radius[2],
    paddingVertical: dimonds.space[1],
    paddingHorizontal: dimonds.space[3],
    marginRight: dimonds.space[2],
    marginBottom: dimonds.space[1],
  },

  // Custom Text Styles for Different States
  customTextPrimary: {
    color: colors.primary,
    fontFamily: fonts.med,
  },
  customTextSuccess: {
    color: colors.green7,
    fontFamily: fonts.med,
  },
  customTextWarning: {
    color: colors.orange7,
    fontFamily: fonts.med,
  },
  customTextDanger: {
    color: colors.danger,
    fontFamily: fonts.med,
  },
  customTextMuted: {
    color: colors.gray5,
    fontFamily: fonts.reg,
  },

  // Custom Divider Styles
  customDivider: {
    height: 1,
    backgroundColor: colors.gray3,
    marginVertical: dimonds.space[2],
  },
  customDividerDashed: {
    height: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.gray3,
    borderStyle: 'dashed',
    marginVertical: dimonds.space[2],
  },

  // Custom Animation Styles
  customFadeIn: {
    opacity: 1,
  },
  customSlideIn: {
    transform: [{ translateY: 0 }],
  },

  // Custom Badge Styles
  customBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  customBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontFamily: fonts.bol,
  },

  // Custom Tooltip Styles
  customTooltip: {
    backgroundColor: colors.gray8,
    borderRadius: dimonds.radius[2],
    padding: dimonds.space[2],
    position: 'absolute',
    top: -30,
    left: 0,
  },
  customTooltipText: {
    color: colors.white,
    fontSize: 11,
    fontFamily: fonts.reg,
  },

  // Custom Loading Styles
  customLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: dimonds.radius[3],
  },
  customLoadingText: {
    marginTop: dimonds.space[2],
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.gray6,
  },
  selectedInfo: {
    marginTop: dimonds.space[3],
    padding: dimonds.space[3],
    backgroundColor: colors.blue1,
    borderRadius: dimonds.radius[2],
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedLabel: {
    fontSize: 13,
    fontFamily: fonts.med,
    color: colors.gray7,
    marginRight: dimonds.space[2],
  },
  selectedValue: {
    fontSize: 14,
    fontFamily: fonts.med,
    color: colors.primary,
    flex: 1,
  },
});

export default SelectExample;
