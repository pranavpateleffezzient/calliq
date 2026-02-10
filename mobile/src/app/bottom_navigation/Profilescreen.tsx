// import React, { useState } from 'react';
// import { TamaguiProvider } from '@tamagui/core';
// import tamaguiConfig from 'mobile/tamagui.config';
// import { PortalProvider } from '@tamagui/portal';
// import { View, Text, Button} from 'react-native';
// import CustomSheet from 'mobile/src/com/bottomsheet/CustomSheet';
// export default function Profilescreen() {
//   const [sheetOpen, setSheetOpen] = useState(false);
//   return (
//     <TamaguiProvider config={tamaguiConfig}>
//       <PortalProvider>
//         <View style={{ flex: 1, padding: 20 }}>
//           <Text style={{ fontSize: 24, marginBottom: 20 }}>Profile Screen</Text>
//           <Button title="Open Sheet" onPress={() => setSheetOpen(true)} />

//           <CustomSheet
//             isOpen={sheetOpen}
//             onOpenChange={setSheetOpen}
//             title="Basic Sheet"
//             description="This is a basic sheet example"            
//             size="full"
//             showActionButtons
//             primaryActionLabel="Save"
//             secondaryActionLabel="Cancel"
//             onPrimaryAction={() => {
//               console.log('Saved!');
//               setSheetOpen(false);
//             }}
//             onSecondaryAction={() => setSheetOpen(false)}
//             backgroundColor="#fff"
//             animation='medium'
//             showFooter
//             showHeader
//           >
//             <View>
//               <Text>This is the sheet content area.</Text>
//               <Text>You can put any components here.</Text>
//               <Text>The sheet is fully customizable!</Text>
//             </View>
//           </CustomSheet>
//         </View>
//       </PortalProvider>
//     </TamaguiProvider>
//   );
// }

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
//   Switch,
// } from 'react-native';
// import CustomSheet from '../../com/bottomsheet/CustomSheet';
// import tamaguiConfig from 'mobile/tamagui.config';
// import { PortalProvider } from '@tamagui/portal';
// import { TamaguiProvider } from '@tamagui/core';
// const ProfileScreen = () => {
//   const [sheetOpen, setSheetOpen] = useState(false);
//   const [sheetPosition, setSheetPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');
//   const [sheetSize, setSheetSize] = useState<'small' | 'medium' | 'large' | 'full'>('medium');
//   const [customSnapPoints, setCustomSnapPoints] = useState([85, 50, 25]);
//   const [dismissOnOverlayPress, setDismissOnOverlayPress] = useState(true);
//   const [disableDrag, setDisableDrag] = useState(false);

//   const handleOpenSheet = (position: 'top' | 'bottom' | 'left' | 'right', size: 'small' | 'medium' | 'large' | 'full') => {
//     setSheetPosition(position);
//     setSheetSize(size);
//     setSheetOpen(true);
//   };

//   return (
//      <TamaguiProvider config={tamaguiConfig}>
//       <PortalProvider>
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.title}>CustomSheet Demo</Text>

//         <View style={styles.buttonGroup}>
//           <Text style={styles.sectionTitle}>Position Examples:</Text>
//           <Button title="Bottom Sheet" onPress={() => handleOpenSheet('bottom', 'medium')} />
//           <Button title="Top Sheet" onPress={() => handleOpenSheet('top', 'medium')} />
//           <Button title="Left Panel" onPress={() => handleOpenSheet('left', 'medium')} />
//           <Button title="Right Panel" onPress={() => handleOpenSheet('right', 'medium')} />
//         </View>

//         <View style={styles.buttonGroup}>
//           <Text style={styles.sectionTitle}>Size Examples:</Text>
//           <Button title="Small Sheet" onPress={() => handleOpenSheet('bottom', 'small')} />
//           <Button title="Medium Sheet" onPress={() => handleOpenSheet('bottom', 'medium')} />
//           <Button title="Large Sheet" onPress={() => handleOpenSheet('bottom', 'large')} />
//           <Button title="Full Sheet" onPress={() => handleOpenSheet('bottom', 'full')} />
//         </View>

//         <View style={styles.controls}>
//           <Text style={styles.sectionTitle}>Customization Options:</Text>

//           <View style={styles.controlItem}>
//             <Text>Dismiss on Overlay Press:</Text>
//             <Switch
//               value={dismissOnOverlayPress}
//               onValueChange={setDismissOnOverlayPress}
//             />
//           </View>

//           <View style={styles.controlItem}>
//             <Text>Disable Drag Handle:</Text>
//             <Switch
//               value={disableDrag}
//               onValueChange={setDisableDrag}
//             />
//           </View>
//         </View>
//       </View>

//       {/* CustomSheet with ALL properties */}
//       <CustomSheet
//         // Basic Required Props
//         isOpen={sheetOpen}
//         onOpenChange={setSheetOpen}

//         // Title and Description
//         title="Complete Sheet Example"
//         description="This demonstrates all available properties of CustomSheet"

//         // Position and Size
//         position={sheetPosition}
//         size={sheetSize}

//         // Snap Points (for bottom sheets)
//         snapPoints={customSnapPoints}
//         defaultSnapPoint={0}

//         // Header Options
//         showHeader={true}
//         showCloseButton={true}

//         // Footer Options
//         showFooter={true}
//         showActionButtons={true}
//         primaryActionLabel="Save Changes"
//         secondaryActionLabel="Discard"
//         onPrimaryAction={() => {
//           console.log('Primary action triggered');
//           setSheetOpen(false);
//         }}
//         onSecondaryAction={() => {
//           console.log('Secondary action triggered');
//           setSheetOpen(false);
//         }}

//         // Style Props
//         backgroundColor="#ffffff"
//         borderRadius={16}
//         padding={24}

//         // Animation
//         animation="medium" // try 'quick' or 'slow'

//         // Behavior Props
//         dismissOnOverlayPress={dismissOnOverlayPress}
//         disableDrag={disableDrag}
//       >
//         {/* Content inside the sheet */}
//         <View style={styles.sheetContent}>
//           <Text style={styles.sheetTitle}>Sheet Content Area</Text>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Name:</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your name"
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email:</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your email"
//               keyboardType="email-address"
//             />
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.label}>Preferences:</Text>
//             {['Notifications', 'Dark Mode', 'Auto-save', 'Sync Data'].map((pref) => (
//               <TouchableOpacity key={pref} style={styles.preferenceItem}>
//                 <Text>{pref}</Text>
//                 <Switch value={true} onValueChange={() => {}} />
//               </TouchableOpacity>
//             ))}
//           </View>

//           <Text style={styles.note}>
//             This sheet demonstrates how all properties work together.
//             You can customize position, size, animations, and behavior.
//           </Text>
//         </View>
//       </CustomSheet>
//     </SafeAreaView>
//     </PortalProvider>
//     </TamaguiProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginVertical: 10,
//   },
//   buttonGroup: {
//     marginBottom: 20,
//   },
//   controls: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 2,
//   },
//   controlItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   sheetContent: {
//     paddingVertical: 10,
//   },
//   sheetTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 8,
//     color: '#333',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   formGroup: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   preferenceItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   note: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#e3f2fd',
//     borderRadius: 8,
//     color: '#1976d2',
//     fontSize: 14,
//     lineHeight: 20,
//   },
// });

// export default ProfileScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomSheet from '../../com/bottomsheet/CustomSheet';
import { Download, Filter, Search, Share, Star } from '@tamagui/lucide-icons';
import tamaguiConfig from 'mobile/tamagui.config';
import { PortalProvider } from '@tamagui/portal';
import { TamaguiProvider } from '@tamagui/core';
const ProductScreen = () => {
  const [productSheetOpen, setProductSheetOpen] = useState(false);
  const [customHeaderSheetOpen, setCustomHeaderSheetOpen] = useState(false);

  // Custom Header Component
  const CustomHeader = () => (
    <View style={styles.customHeader}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerTitle}>Product Details</Text>
        <Text style={styles.headerSubtitle}>Premium Edition</Text>
      </View>
      <TouchableOpacity style={styles.headerBadge}>
        <Text style={styles.badgeText}>NEW</Text>
      </TouchableOpacity>
    </View>
  );

  // Custom Footer Component
  const CustomFooter = () => (
    <View style={styles.customFooter}>
      <TouchableOpacity style={styles.footerIconButton}>
        <Share size={20} color="#666" />
        <Text style={styles.footerIconText}>Share</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerIconButton}>
        <Star size={20} color="#666" />
        <Text style={styles.footerIconText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerIconButton}>
        <Download size={20} color="#666" />
        <Text style={styles.footerIconText}>Download</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <PortalProvider>
        <View style={styles.container}>
          <Text style={styles.title}>Custom Header/Footer Examples</Text>

          <Button
            title="Product Details Sheet"
            onPress={() => setProductSheetOpen(true)}
          />

          <Button
            title="Custom Header Sheet"
            onPress={() => setCustomHeaderSheetOpen(true)}
          />

          {/* Example 1: Product Details Sheet */}
          <CustomSheet
            isOpen={productSheetOpen}
            onOpenChange={setProductSheetOpen}
            title="Product Information"
            description="Complete details about the product"
            size="large"
            showHeader={true}
            showCloseButton={true}
            showFooter={true}
            footerComponent={<CustomFooter />}
            backgroundColor="#0A4EDC"
            borderRadius={20}
            padding={16}
            animation="medium"
            dismissOnOverlayPress={true}
            disableDrag={false}
          >
            <View style={styles.productContent}>
              <Image
                source={{ uri: 'https://picsum.photos/400/300' }}
                style={styles.productImage}
              />

              <Text style={styles.productName}>
                Premium Wireless Headphones
              </Text>

              <View style={styles.productMeta}>
                <Text style={styles.productPrice}>$199.99</Text>
                <Text style={styles.productRating}>⭐ 4.8 (245 reviews)</Text>
              </View>

              <Text style={styles.productDescription}>
                Experience crystal-clear audio with our premium wireless
                headphones. Featuring noise cancellation, 30-hour battery life,
                and premium materials for all-day comfort.
              </Text>

              <View style={styles.featuresList}>
                {[
                  'Noise Cancelling',
                  '30h Battery',
                  'Bluetooth 5.2',
                  'Water Resistant',
                ].map((feature) => (
                  <View key={feature} style={styles.featureItem}>
                    <Text style={styles.featureText}>✓ {feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </CustomSheet>

          {/* Example 2: Custom Header Sheet */}
          <CustomSheet
            isOpen={customHeaderSheetOpen}
            onOpenChange={setCustomHeaderSheetOpen}
            size="medium"
            showHeader={true}
            headerComponent={<CustomHeader />}
            showCloseButton={false}
            showFooter={false}
            backgroundColor="#fff"
            borderRadius={16}
            padding={20}
            animation="quick"
            snapPoints={[70, 40]}
            defaultSnapPoint={0}
            dismissOnOverlayPress={true}
            disableDrag={true}
          >
            <View style={styles.searchContent}>
              <Text style={styles.searchTitle}>Advanced Search</Text>

              <View style={styles.searchOptions}>
                {[
                  'Category',
                  'Price Range',
                  'Brand',
                  'Rating',
                  'Color',
                  'Size',
                ].map((option) => (
                  <TouchableOpacity key={option} style={styles.searchOption}>
                    <Text style={styles.searchOptionText}>{option}</Text>
                    <Filter size={16} color="#666" />
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.searchButton}>
                <Search size={20} color="#fff" />
                <Text style={styles.searchButtonText}>Search Now</Text>
              </TouchableOpacity>
            </View>
          </CustomSheet>
        </View>
      </PortalProvider>
    </TamaguiProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  headerBadge: {
    backgroundColor: '#ff4757',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  customFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerIconButton: {
    alignItems: 'center',
  },
  footerIconText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  productContent: {
    paddingVertical: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  productRating: {
    fontSize: 14,
    color: '#fff',
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
    marginBottom: 20,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureItem: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featureText: {
    color: '#1976d2',
    fontSize: 14,
  },
  searchContent: {
    paddingVertical: 10,
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
  },
  searchOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },
  searchOptionText: {
    fontSize: 14,
    color: '#fff',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductScreen;
