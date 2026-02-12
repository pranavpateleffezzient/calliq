// // components/UnifiedDropdown.jsx
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   FlatList,
//   ActivityIndicator,
//   ViewStyle,
//   TextStyle,
//   Image,
//   ImageStyle,
// } from 'react-native';
// import colors from 'mobile/constant/colors';
// import dimonds from 'mobile/constant/dimonds';
// import fonts from 'mobile/constant/font';

// // Types
// type DropdownVariant = 'outlined' | 'filled' | 'underlined' | 'unstyled';
// type DropdownSize = 'small' | 'medium' | 'large';
// type DropdownMode = 'single' | 'multi';

// // Extended item type with rich data support
// interface DropdownItem {
//   key?: string;
//   id?: string;
//   value: string;
//   label?: string;
//   name?: string;
//   title?: string;
//   subtitle?: string;
//   description?: string;
//   image?: string;
//   icon?: React.ReactNode;
//   avatar?: string;
//   email?: string;
//   phone?: string;
//   status?: string;
//   disabled?: boolean;
//   selected?: boolean;
//   badge?: string;
//   badgeColor?: string;
//   [key: string]: any;
// }

// interface UnifiedDropdownProps {
//   // Core Props
//   mode?: DropdownMode;
//   data: Array<string | DropdownItem>;
//   value?: string | string[];
//   setValue?: (value: any) => void;
//   onChange?: (value: any) => void;
//   defaultOption?: string | string[];
//   placeholder?: string;
  
//   // Styling Variants
//   variant?: DropdownVariant;
//   size?: DropdownSize;
  
//   // Features
//   search?: boolean;
//   searchPlaceholder?: string;
//   maxHeight?: number;
//   maxSelections?: number;
//   showSelectedCheck?: boolean;
//   closeOnSelect?: boolean; // For single select only
  
//   // States
//   loading?: boolean;
//   disabled?: boolean;
//   error?: boolean;
//   errorMessage?: string;
//   required?: boolean;
  
//   // Labels & Helpers
//   label?: string;
//   labelStyle?: TextStyle;
//   helperText?: string;
//   helperTextStyle?: TextStyle;
  
//   // Custom Styles
//   boxStyles?: ViewStyle;
//   inputStyles?: TextStyle;
//   dropdownStyles?: ViewStyle;
//   dropdownItemStyles?: ViewStyle;
//   dropdownTextStyles?: TextStyle;
//   chipStyles?: ViewStyle;
//   chipTextStyles?: TextStyle;
//   imageStyles?: ImageStyle;
  
//   // Icons (custom render props)
//   arrowIcon?: React.ReactNode;
//   closeIcon?: React.ReactNode;
//   searchIcon?: React.ReactNode;
//   checkIcon?: React.ReactNode;
//   emptyIcon?: React.ReactNode;
  
//   // Custom Render Functions - EXTENDED FOR FUTURE REQUIREMENTS
//   renderItem?: (item: DropdownItem, isSelected: boolean) => React.ReactNode;
//   renderSelectedItem?: (item: string, index: number, removeItem: (val: string) => void) => React.ReactNode;
//   renderButton?: (selectedItems: any[], isOpen: boolean) => React.ReactNode;
//   renderEmpty?: () => React.ReactNode;
//   renderHeader?: (closeDropdown: () => void) => React.ReactNode;
//   renderFooter?: (selectedItems: any[], closeDropdown: () => void) => React.ReactNode;
//   renderSearch?: (query: string, setQuery: (q: string) => void) => React.ReactNode;
  
//   // Item templates - Pre-built renderers for common use cases
//   itemTemplate?: 'default' | 'contact' | 'product' | 'country' | 'user' | 'custom';
  
//   // Group/Section support
//   grouped?: boolean;
//   sections?: Array<{ title: string; data: Array<string | DropdownItem> }>;
//   renderSectionHeader?: (section: { title: string }) => React.ReactNode;
  
//   // Other
//   [key: string]: any;
// }

// const UnifiedDropdown: React.FC<UnifiedDropdownProps> = ({
//   // Core Props
//   mode = 'single',
//   data = [],
//   value,
//   setValue,
//   onChange,
//   defaultOption,
//   placeholder = 'Select an option',
  
//   // Styling Variants
//   variant = 'outlined',
//   size = 'medium',
  
//   // Features
//   search = false,
//   searchPlaceholder = 'Search...',
//   maxHeight = 300,
//   maxSelections,
//   showSelectedCheck = true,
//   closeOnSelect = true,
  
//   // States
//   loading = false,
//   disabled = false,
//   error = false,
//   errorMessage = '',
//   required = false,
  
//   // Labels & Helpers
//   label,
//   labelStyle,
//   helperText,
//   helperTextStyle,
  
//   // Custom Styles
//   boxStyles,
//   inputStyles,
//   dropdownStyles,
//   dropdownItemStyles,
//   dropdownTextStyles,
//   chipStyles,
//   chipTextStyles,
//   imageStyles,
  
//   // Icons
//   arrowIcon,
//   closeIcon,
//   searchIcon,
//   checkIcon,
//   emptyIcon,
  
//   // Custom Render Functions
//   renderItem,
//   renderSelectedItem,
//   renderButton,
//   renderEmpty,
//   renderHeader,
//   renderFooter,
//   renderSearch,
  
//   // Item Templates
//   itemTemplate = 'default',
  
//   // Group support
//   grouped = false,
//   sections = [],
//   renderSectionHeader,
  
//   ...restProps
// }) => {
//   // State management
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [selectedSingle, setSelectedSingle] = useState<string>('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isFocused, setIsFocused] = useState(false);

//   // Initialize from props
//   useEffect(() => {
//     if (mode === 'multi') {
//       if (value && Array.isArray(value)) {
//         setSelectedItems(value);
//       } else if (defaultOption && Array.isArray(defaultOption)) {
//         setSelectedItems(defaultOption);
//       }
//     } else {
//       if (value && typeof value === 'string') {
//         setSelectedSingle(value);
//       } else if (defaultOption && typeof defaultOption === 'string') {
//         setSelectedSingle(defaultOption);
//       }
//     }
//   }, [value, defaultOption, mode]);

//   // Format data for display - Enhanced for rich data
//   const formattedData = useMemo(() => {
//     const items = grouped ? sections.flatMap(s => s.data) : data;
    
//     return items.map((item, index) => {
//       if (typeof item === 'string') {
//         return { 
//           key: index.toString(), 
//           value: item,
//           label: item,
//           title: item,
//           subtitle: '',
//           description: '',
//           image: null,
//           icon: null,
//           disabled: false 
//         };
//       }
      
//       return {
//         key: item.key || item.id || index.toString(),
//         value: item.value || item.name || item.label || '',
//         label: item.label || item.name || item.title || item.value || '',
//         title: item.title || item.label || item.name || item.value || '',
//         subtitle: item.subtitle || item.description || item.email || item.phone || '',
//         description: item.description || '',
//         image: item.image || item.avatar || null,
//         icon: item.icon || null,
//         email: item.email || null,
//         phone: item.phone || null,
//         status: item.status || null,
//         badge: item.badge || null,
//         badgeColor: item.badgeColor || colors.primary,
//         disabled: item.disabled || false,
//         selected: item.selected || false,
//         ...item,
//       };
//     });
//   }, [data, sections, grouped]);

//   // Filter data based on search
//   const filteredData = useMemo(() => {
//     if (!search || !searchQuery) return formattedData;
//     return formattedData.filter(item => 
//       item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
//       (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
//       (item.phone && item.phone.includes(searchQuery))
//     );
//   }, [formattedData, searchQuery, search]);

//   // Group data if grouped prop is true
//   const groupedData = useMemo(() => {
//     if (!grouped) return null;
//     return sections.map(section => ({
//       title: section.title,
//       data: formattedData.filter(item => 
//         section.data.some(s => 
//           (typeof s === 'string' && (item.value === s || item.label === s)) ||
//           (typeof s === 'object' && (item.value === s.value || item.key === s.key))
//         )
//       )
//     }));
//   }, [sections, formattedData, grouped]);

//   // Handlers
//   const handleSingleSelect = (item: DropdownItem) => {
//     const newValue = item.value;
//     setSelectedSingle(newValue);
//     if (setValue) setValue(newValue);
//     if (onChange) onChange(newValue);
//     if (closeOnSelect) closeDropdown();
//   };

//   const handleMultiSelect = (item: DropdownItem) => {
//     let newSelected = [...selectedItems];
//     const itemValue = item.value;

//     if (selectedItems.includes(itemValue)) {
//       newSelected = selectedItems.filter(i => i !== itemValue);
//     } else {
//       if (maxSelections && selectedItems.length >= maxSelections) {
//         return;
//       }
//       newSelected.push(itemValue);
//     }

//     setSelectedItems(newSelected);
//     if (setValue) setValue(newSelected);
//     if (onChange) onChange(newSelected);
//   };

//   const removeItem = (val: string, e?: any) => {
//     if (e) e.stopPropagation();
//     if (mode === 'multi') {
//       const newSelected = selectedItems.filter(item => item !== val);
//       setSelectedItems(newSelected);
//       if (setValue) setValue(newSelected);
//       if (onChange) onChange(newSelected);
//     }
//   };

//   const openDropdown = () => {
//     if (!disabled && !loading) {
//       setModalVisible(true);
//       setSearchQuery('');
//     }
//   };

//   const closeDropdown = () => {
//     setModalVisible(false);
//     setSearchQuery('');
//     setIsFocused(false);
//   };

//   // Get full item object by value
//   const getItemByValue = (value: string): DropdownItem | undefined => {
//     return formattedData.find(item => item.value === value);
//   };

//   // Style getters (keeping existing implementation)
//   const getVariantStyles = () => {
//     switch (variant) {
//       case 'filled':
//         return {
//           backgroundColor: colors.gray1,
//           borderWidth: 0,
//           borderBottomWidth: 1,
//           borderBottomColor: error ? colors.danger : colors.gray3,
//         };
//       case 'underlined':
//         return {
//           backgroundColor: 'transparent',
//           borderWidth: 0,
//           borderBottomWidth: 1.5,
//           borderBottomColor: error ? colors.danger : colors.gray4,
//           borderRadius: 0,
//         };
//       case 'unstyled':
//         return {
//           backgroundColor: 'transparent',
//           borderWidth: 0,
//           paddingHorizontal: 0,
//         };
//       default:
//         return {
//           backgroundColor: colors.white,
//           borderWidth: 1,
//           borderColor: error ? colors.danger : colors.gray4,
//         };
//     }
//   };

//   const getSizeStyles = () => {
//     switch (size) {
//       case 'small':
//         return {
//           minHeight: 36,
//           paddingHorizontal: dimonds.space[3],
//           paddingVertical: dimonds.space[2],
//         };
//       case 'large':
//         return {
//           minHeight: 56,
//           paddingHorizontal: dimonds.space[5],
//           paddingVertical: dimonds.space[4],
//         };
//       default:
//         return {
//           minHeight: 48,
//           paddingHorizontal: dimonds.space[4],
//           paddingVertical: dimonds.space[3],
//         };
//     }
//   };

//   const getFontSize = () => {
//     switch (size) {
//       case 'small': return 12;
//       case 'large': return 16;
//       default: return 14;
//     }
//   };

//   const variantStyles = getVariantStyles();
//   const sizeStyles = getSizeStyles();
//   const fontSize = getFontSize();

//   // ============ PRE-BUILT ITEM TEMPLATES ============
  
//   // Template 1: Contact/User Item with Image, Name, Email
// const renderContactItem = (item: DropdownItem, isSelected: boolean) => (
//   <TouchableOpacity
//     style={[
//       styles.contactItem,
//       isSelected && styles.selectedItem,
//       item.disabled && styles.disabledItem,
//     ]}
//     onPress={() => mode === 'multi' ? handleMultiSelect(item) : handleSingleSelect(item)}
//     disabled={item.disabled || disabled}
//     activeOpacity={0.7}
//   >
//     {item.image || item.avatar ? (
//       <Image 
//         source={typeof (item.image || item.avatar) === 'string' 
//           ? { uri: item.image || item.avatar } 
//           : item.image || item.avatar
//         } 
//         style={[styles.contactImage, imageStyles]}
//       />
//     ) : item.icon ? (
//       item.icon
//     ) : (
//       <View style={[styles.contactImagePlaceholder, { backgroundColor: colors.primary }]}>
//         <Text style={styles.contactImagePlaceholderText}>
//           {item.title?.charAt(0) || item.label?.charAt(0) || '?'}
//         </Text>
//       </View>
//     )}
    
//     <View style={styles.contactInfo}>
//       <Text style={[styles.contactName, isSelected && styles.selectedText]}>
//         {item.title || item.label}
//       </Text>
//       {item.subtitle || item.email || item.phone ? (
//         <Text style={styles.contactSubtitle} numberOfLines={1}>
//           {item.subtitle || item.email || item.phone}
//         </Text>
//       ) : null}
//       {item.description ? (
//         <Text style={styles.contactDescription} numberOfLines={1}>
//           {item.description}
//         </Text>
//       ) : null}
//     </View>
    
//     {item.status && (
//       <View style={[styles.statusBadge, { backgroundColor: item.badgeColor || colors.green1 }]}>
//         <Text style={[styles.statusText, { color: item.badgeColor ? colors.white : colors.green7 }]}>
//           {item.status}
//         </Text>
//       </View>
//     )}
    
//     {isSelected && showSelectedCheck && (
//       <View style={styles.checkbox}>
//         {checkIcon || <Text style={styles.checkmark}>✓</Text>}
//       </View>
//     )}
//   </TouchableOpacity>
// );

//   // Template 2: Product Item with Image, Title, Price
// const renderProductItem = (item: DropdownItem, isSelected: boolean) => (
//   <TouchableOpacity
//     style={[
//       styles.productItem,
//       isSelected && styles.selectedItem,
//       item.disabled && styles.disabledItem,
//     ]}
//     onPress={() => mode === 'multi' ? handleMultiSelect(item) : handleSingleSelect(item)}
//     disabled={item.disabled || disabled}
//     activeOpacity={0.7}
//   >
//     {item.image ? (
//       <Image 
//         source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
//         style={[styles.productImage, imageStyles]}
//       />
//     ) : (
//       <View style={[styles.productImagePlaceholder]}>
//         <Text style={styles.productImagePlaceholderText}>📦</Text>
//       </View>
//     )}
    
//     <View style={styles.productInfo}>
//       <Text style={[styles.productTitle, isSelected && styles.selectedText]} numberOfLines={1}>
//         {item.title || item.label}
//       </Text>
//       {item.subtitle && (
//         <Text style={styles.productCategory} numberOfLines={1}>
//           {item.subtitle}
//         </Text>
//       )}
//       <View style={styles.productMeta}>
//         {item.price && (
//           <Text style={styles.productPrice}>${item.price}</Text>
//         )}
//         {item.rating && (
//           <Text style={styles.productRating}>⭐ {item.rating}</Text>
//         )}
//       </View>
//     </View>
    
//     {item.badge && (
//       <View style={[styles.productBadge, { backgroundColor: item.badgeColor || colors.orange1 }]}>
//         <Text style={styles.productBadgeText}>{item.badge}</Text>
//       </View>
//     )}
    
//     {isSelected && showSelectedCheck && (
//       <View style={styles.checkbox}>
//         {checkIcon || <Text style={styles.checkmark}>✓</Text>}
//       </View>
//     )}
//   </TouchableOpacity>
// );

// // Template 3: Country/Flag Item
// const renderCountryItem = (item: DropdownItem, isSelected: boolean) => (
//   <TouchableOpacity
//     style={[
//       styles.countryItem,
//       isSelected && styles.selectedItem,
//       item.disabled && styles.disabledItem,
//     ]}
//     onPress={() => mode === 'multi' ? handleMultiSelect(item) : handleSingleSelect(item)}
//     disabled={item.disabled || disabled}
//     activeOpacity={0.7}
//   >
//     {item.image || item.flag ? (
//       <Image 
//         source={typeof (item.image || item.flag) === 'string' 
//           ? { uri: item.image || item.flag } 
//           : item.image || item.flag
//         } 
//         style={[styles.countryFlag, imageStyles]}
//       />
//     ) : (
//       <View style={[styles.countryFlagPlaceholder]}>
//         <Text style={styles.countryFlagPlaceholderText}>🏳️</Text>
//       </View>
//     )}
    
//     <View style={styles.countryInfo}>
//       <Text style={[styles.countryName, isSelected && styles.selectedText]}>
//         {item.label || item.value}
//       </Text>
//       {item.code && (
//         <Text style={styles.countryCode}>{item.code}</Text>
//       )}
//     </View>
    
//     {item.dialCode && (
//       <Text style={styles.countryDialCode}>{item.dialCode}</Text>
//     )}
    
//     {isSelected && showSelectedCheck && (
//       <View style={styles.checkbox}>
//         {checkIcon || <Text style={styles.checkmark}>✓</Text>}
//       </View>
//     )}
//   </TouchableOpacity>
// );

// // Template 4: User/Team Member Item
// const renderUserItem = (item: DropdownItem, isSelected: boolean) => (
//   <TouchableOpacity
//     style={[
//       styles.userItem,
//       isSelected && styles.selectedItem,
//       item.disabled && styles.disabledItem,
//     ]}
//     onPress={() => mode === 'multi' ? handleMultiSelect(item) : handleSingleSelect(item)}
//     disabled={item.disabled || disabled}
//     activeOpacity={0.7}
//   >
//     {item.avatar || item.image ? (
//       <Image 
//         source={typeof (item.avatar || item.image) === 'string' 
//           ? { uri: item.avatar || item.image } 
//           : item.avatar || item.image
//         } 
//         style={[styles.userAvatar, imageStyles]}
//       />
//     ) : (
//       <View style={[styles.userAvatarPlaceholder, { backgroundColor: colors.primary }]}>
//         <Text style={styles.userAvatarPlaceholderText}>
//           {item.title?.charAt(0) || item.label?.charAt(0) || '👤'}
//         </Text>
//       </View>
//     )}
    
//     <View style={styles.userInfo}>
//       <Text style={[styles.userName, isSelected && styles.selectedText]} numberOfLines={1}>
//         {item.title || item.label}
//       </Text>
//       {item.role && (
//         <Text style={styles.userRole} numberOfLines={1}>
//           {item.role}
//         </Text>
//       )}
//       {item.email && (
//         <Text style={styles.userEmail} numberOfLines={1}>
//           {item.email}
//         </Text>
//       )}
//     </View>
    
//     {item.online && (
//       <View style={styles.onlineIndicator} />
//     )}
    
//     {isSelected && showSelectedCheck && (
//       <View style={styles.checkbox}>
//         {checkIcon || <Text style={styles.checkmark}>✓</Text>}
//       </View>
//     )}
//   </TouchableOpacity>
// );

//   // Default item renderer
//   const renderDefaultItem = (item: DropdownItem, isSelected: boolean) => (
//     <TouchableOpacity
//       style={[
//         styles.dropdownItem,
//         isSelected && styles.selectedItem,
//         item.disabled && styles.disabledItem,
//         dropdownItemStyles,
//       ]}
//       onPress={() => mode === 'multi' ? handleMultiSelect(item) : handleSingleSelect(item)}
//       disabled={item.disabled || disabled}
//     >
//       <Text style={[
//         styles.dropdownText,
//         { fontSize: fontSize - 1 },
//         isSelected && styles.selectedText,
//         item.disabled && styles.disabledText,
//         dropdownTextStyles,
//       ]}>
//         {item.label}
//       </Text>
//       {isSelected && showSelectedCheck && mode === 'multi' && (
//         <View style={styles.checkbox}>
//           {checkIcon || <Text style={styles.checkmark}>✓</Text>}
//         </View>
//       )}
//       {isSelected && showSelectedCheck && mode === 'single' && (
//         <Text style={styles.checkmark}>✓</Text>
//       )}
//     </TouchableOpacity>
//   );

//   // Get the appropriate item renderer based on template
//   const getItemRenderer = () => {
//     if (renderItem) return renderItem;
    
//     switch (itemTemplate) {
//       case 'contact':
//         return renderContactItem;
//       case 'product':
//         return renderProductItem;
//       case 'country':
//         return renderCountryItem;
//       case 'user':
//         return renderUserItem;
//       case 'default':
//       default:
//         return renderDefaultItem;
//     }
//   };

//   const itemRenderer = getItemRenderer();

//   // Render selected chips with custom renderer
//   const renderSelectedChips = () => {
//     if (renderSelectedItem) {
//       return (
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.chipScrollView}
//         >
//           {selectedItems.map((item, index) => 
//             renderSelectedItem(item, index, removeItem)
//           )}
//         </ScrollView>
//       );
//     }

//     return (
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.chipScrollView}
//       >
//         {selectedItems.map((item, index) => {
//           const fullItem = getItemByValue(item);
//           return (
//             <View key={index} style={[styles.chip, chipStyles]}>
//               {fullItem?.image && (
//                 <Image 
//                   source={typeof fullItem.image === 'string' ? { uri: fullItem.image } : fullItem.image} 
//                   style={[styles.chipImage, imageStyles]}
//                 />
//               )}
//               <Text style={[styles.chipText, chipTextStyles]}>{item}</Text>
//               <TouchableOpacity
//                 onPress={(e) => removeItem(item, e)}
//                 style={styles.chipClose}
//                 disabled={disabled}
//               >
//                 <Text style={styles.chipCloseText}>✕</Text>
//               </TouchableOpacity>
//             </View>
//           );
//         })}
//       </ScrollView>
//     );
//   };

//   // Render button content
//   const renderButtonContent = () => {
//     if (mode === 'multi') {
//       if (selectedItems.length > 0) {
//         return renderSelectedChips();
//       }
//     } else {
//       if (selectedSingle) {
//         const selectedItem = getItemByValue(selectedSingle);
        
//         if (selectedItem?.image || selectedItem?.avatar || selectedItem?.icon) {
//           return (
//             <View style={styles.selectedSingleContainer}>
//               {selectedItem.image || selectedItem.avatar ? (
//                 <Image 
//                   source={typeof (selectedItem.image || selectedItem.avatar) === 'string' 
//                     ? { uri: selectedItem.image || selectedItem.avatar } 
//                     : selectedItem.image || selectedItem.avatar
//                   } 
//                   style={[styles.selectedImage, imageStyles]}
//                 />
//               ) : selectedItem.icon ? (
//                 selectedItem.icon
//               ) : null}
//               <Text style={[styles.selectedText, { fontSize }]}>
//                 {selectedItem.label || selectedSingle}
//               </Text>
//             </View>
//           );
//         }
        
//         return (
//           <Text style={[styles.selectedText, { fontSize }]}>
//             {selectedSingle}
//           </Text>
//         );
//       }
//     }
    
//     return (
//       <Text style={[styles.placeholder, { fontSize }, disabled && styles.disabledText]}>
//         {loading ? 'Loading...' : placeholder}
//       </Text>
//     );
//   };

//   // Render dropdown items
//   const renderDropdownItem = ({ item }: { item: DropdownItem }) => {
//     const isSelected = mode === 'multi'
//       ? selectedItems.includes(item.value)
//       : selectedSingle === item.value;

//     return itemRenderer(item, isSelected);
//   };

//   // Render section header for grouped items
//   const renderGroupSectionHeader = ({ section }: { section: any }) => {
//     if (renderSectionHeader) {
//       return renderSectionHeader(section);
//     }
//     return (
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionHeaderText}>{section.title}</Text>
//       </View>
//     );
//   };

//   // Render empty state
//   const renderEmptyState = () => {
//     if (renderEmpty) {
//       return renderEmpty();
//     }
//     return (
//       <View style={styles.emptyContainer}>
//         {emptyIcon || <Text style={styles.emptyIcon}>📭</Text>}
//         <Text style={styles.emptyText}>No options available</Text>
//       </View>
//     );
//   };

//   // Render modal header
//   const renderModalHeader = () => {
//     if (renderHeader) {
//       return renderHeader(closeDropdown);
//     }
//     return (
//       <View style={styles.dropdownHeader}>
//         <Text style={styles.dropdownTitle}>
//           Select {label?.toLowerCase() || (mode === 'multi' ? 'options' : 'option')}
//         </Text>
//         <TouchableOpacity onPress={closeDropdown} style={styles.closeButton}>
//           {closeIcon || <Text style={styles.closeButtonText}>✕</Text>}
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   // Render modal footer
//   const renderModalFooter = () => {
//     if (mode !== 'multi') return null;
    
//     if (renderFooter) {
//       return renderFooter(selectedItems, closeDropdown);
//     }
    
//     return (
//       <View style={styles.dropdownFooter}>
//         <TouchableOpacity 
//           style={styles.doneButton}
//           onPress={closeDropdown}
//         >
//           <Text style={styles.doneButtonText}>
//             Done {selectedItems.length > 0 ? `(${selectedItems.length})` : ''}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   // Render search bar
//   const renderSearchBar = () => {
//     if (renderSearch) {
//       return renderSearch(searchQuery, setSearchQuery);
//     }
    
//     return (
//       <View style={styles.searchContainer}>
//         {searchIcon || <Text style={styles.searchIcon}>🔍</Text>}
//         <TextInput
//           style={styles.searchInput}
//           placeholder={searchPlaceholder}
//           placeholderTextColor={colors.gray5}
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           autoCapitalize="none"
//           autoCorrect={false}
//         />
//         {searchQuery ? (
//           <TouchableOpacity onPress={() => setSearchQuery('')}>
//             {closeIcon || <Text style={styles.clearSearch}>✕</Text>}
//           </TouchableOpacity>
//         ) : null}
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Label */}
//       {label && (
//         <View style={styles.labelContainer}>
//           <Text style={[styles.label, labelStyle]}>
//             {label}
//             {required && <Text style={styles.required}> *</Text>}
//           </Text>
//         </View>
//       )}

//       {/* Dropdown Button */}
//       {renderButton ? (
//         renderButton(mode === 'multi' ? selectedItems : [selectedSingle], modalVisible)
//       ) : (
//         <TouchableOpacity
//           onPress={openDropdown}
//           activeOpacity={0.7}
//           disabled={disabled || loading}
//           style={[
//             styles.buttonContainer,
//             variantStyles,
//             sizeStyles,
//             isFocused && !error && !disabled && styles.focused,
//             error && styles.errorBorder,
//             disabled && styles.disabled,
//             boxStyles,
//           ]}
//         >
//           {renderButtonContent()}
//           <View style={styles.arrowContainer}>
//             {loading ? (
//               <ActivityIndicator size="small" color={colors.primary} />
//             ) : (
//               arrowIcon || <Text style={[styles.arrow, disabled && styles.disabledText]}>▼</Text>
//             )}
//           </View>
//         </TouchableOpacity>
//       )}

//       {/* Helper Text */}
//       {helperText && !error && (
//         <Text style={[styles.helperText, helperTextStyle]}>
//           {helperText}
//         </Text>
//       )}

//       {/* Error Message */}
//       {error && errorMessage && (
//         <Text style={styles.errorText}>{errorMessage}</Text>
//       )}

//       {/* Dropdown Modal */}
//       <Modal
//         visible={modalVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={closeDropdown}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPress={closeDropdown}
//         >
//           <View style={[styles.dropdownContainer, dropdownStyles]}>
//             {/* Modal Header */}
//             {renderModalHeader()}

//             {/* Search Bar */}
//             {search && renderSearchBar()}

//             {/* Options List - Grouped or Flat */}
//             {grouped && groupedData ? (
//               <FlatList
//                 data={groupedData}
//                 keyExtractor={(item, index) => `section-${index}`}
//                 style={styles.dropdownList}
//                 renderItem={({ item: section }) => (
//                   <View>
//                     {renderGroupSectionHeader({ section })}
//                     <FlatList
//                       data={section.data}
//                       keyExtractor={(item) => item.key}
//                       renderItem={renderDropdownItem}
//                       scrollEnabled={false}
//                     />
//                   </View>
//                 )}
//                 showsVerticalScrollIndicator={false}
//                 ListEmptyComponent={renderEmptyState}
//               />
//             ) : (
//               <FlatList
//                 data={filteredData}
//                 keyExtractor={(item) => item.key}
//                 style={styles.dropdownList}
//                 renderItem={renderDropdownItem}
//                 showsVerticalScrollIndicator={false}
//                 ListEmptyComponent={renderEmptyState}
//               />
//             )}

//             {/* Modal Footer */}
//             {renderModalFooter()}
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// };

// // EXTENDED STYLES FOR ALL TEMPLATES
// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     marginBottom: dimonds.space[3],
//   },
//   labelContainer: {
//     marginBottom: dimonds.space[2],
//   },
//   label: {
//     fontSize: 14,
//     fontFamily: fonts.med,
//     color: colors.gray7,
//   },
//   required: {
//     color: colors.danger,
//   },
//   // Button Styles
//   buttonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: dimonds.radius[3],
//     width: '100%',
//   },
//   chipScrollView: {
//     flex: 1,
//   },
//   chip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.blue1,
//     borderRadius: dimonds.radius[2],
//     paddingVertical: dimonds.space[1],
//     paddingLeft: dimonds.space[2],
//     paddingRight: dimonds.space[1],
//     marginRight: dimonds.space[2],
//     borderWidth: 1,
//     borderColor: colors.blue3,
//   },
//   chipImage: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     marginRight: 4,
//   },
//   chipText: {
//     fontSize: 12,
//     fontFamily: fonts.med,
//     color: colors.blue7,
//     marginRight: dimonds.space[1],
//   },
//   chipClose: {
//     padding: dimonds.space[1],
//   },
//   chipCloseText: {
//     fontSize: 12,
//     color: colors.blue7,
//     fontWeight: 'bold',
//   },
//   placeholder: {
//     flex: 1,
//     fontFamily: fonts.reg,
//     color: colors.gray5,
//   },
//   selectedText: {
//     flex: 1,
//     fontFamily: fonts.reg,
//     color: colors.gray9,
//   },
//   selectedSingleContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   selectedImage: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     marginRight: 8,
//   },
//   arrowContainer: {
//     paddingLeft: dimonds.space[2],
//   },
//   arrow: {
//     fontSize: 12,
//     color: colors.gray6,
//   },
//   focused: {
//     borderColor: colors.primary,
//     borderWidth: 2,
//   },
//   // Helper & Error
//   helperText: {
//     fontSize: 12,
//     fontFamily: fonts.reg,
//     color: colors.gray5,
//     marginTop: dimonds.space[1],
//   },
//   errorText: {
//     fontSize: 12,
//     fontFamily: fonts.reg,
//     color: colors.danger,
//     marginTop: dimonds.space[1],
//   },
//   errorBorder: {
//     borderColor: colors.danger,
//   },
//   disabled: {
//     backgroundColor: colors.gray1,
//     opacity: 0.7,
//   },
//   disabledText: {
//     color: colors.gray5,
//   },
//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: dimonds.space[4],
//   },
//   dropdownContainer: {
//     width: '100%',
//     maxWidth: 400,
//     maxHeight: '80%',
//     backgroundColor: colors.white,
//     borderRadius: dimonds.radius[4],
//     overflow: 'hidden',
//     shadowColor: colors.gray9,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   dropdownHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: dimonds.space[4],
//     borderBottomWidth: 1,
//     borderBottomColor: colors.gray3,
//     backgroundColor: colors.gray1,
//   },
//   dropdownTitle: {
//     fontSize: 16,
//     fontFamily: fonts.bol,
//     color: colors.gray8,
//   },
//   closeButton: {
//     padding: dimonds.space[2],
//   },
//   closeButtonText: {
//     fontSize: 16,
//     color: colors.gray6,
//     fontWeight: 'bold',
//   },
//   // Search Styles
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: dimonds.space[3],
//     borderBottomWidth: 1,
//     borderBottomColor: colors.gray3,
//     backgroundColor: colors.white,
//   },
//   searchIcon: {
//     marginRight: dimonds.space[2],
//     color: colors.gray5,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 14,
//     fontFamily: fonts.reg,
//     color: colors.gray9,
//     paddingVertical: dimonds.space[2],
//   },
//   clearSearch: {
//     fontSize: 14,
//     color: colors.gray5,
//     padding: dimonds.space[1],
//   },
//   dropdownList: {
//     maxHeight: 300,
//   },
//   // Default Item Styles
//   dropdownItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: dimonds.space[3],
//     paddingHorizontal: dimonds.space[4],
//     borderBottomWidth: 1,
//     borderBottomColor: colors.gray2,
//   },
//   selectedItem: {
//     backgroundColor: colors.blue1,
//   },
//   dropdownText: {
//     fontFamily: fonts.reg,
//     color: colors.gray8,
//     flex: 1,
//   },
//   disabledItem: {
//     backgroundColor: colors.gray1,
//     opacity: 0.5,
//   },
//   checkbox: {
//     width: 22,
//     height: 22,
//     borderRadius: 4,
//     backgroundColor: colors.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkmark: {
//     color: colors.white,
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   dropdownFooter: {
//     padding: dimonds.space[4],
//     borderTopWidth: 1,
//     borderTopColor: colors.gray3,
//     backgroundColor: colors.gray1,
//   },
//   doneButton: {
//     backgroundColor: colors.primary,
//     paddingVertical: dimonds.space[3],
//     paddingHorizontal: dimonds.space[4],
//     borderRadius: dimonds.radius[3],
//     alignItems: 'center',
//   },
//   doneButtonText: {
//     color: colors.white,
//     fontSize: 14,
//     fontFamily: fonts.med,
//   },
//   // Empty State
//   emptyContainer: {
//     padding: dimonds.space[6],
//     alignItems: 'center',
//   },
//   emptyIcon: {
//     fontSize: 40,
//     marginBottom: dimonds.space[3],
//   },
//   emptyText: {
//     fontSize: 14,
//     fontFamily: fonts.reg,
//     color: colors.gray5,
//   },
//   // Section Header
//   sectionHeader: {
//     backgroundColor: colors.gray2,
//     paddingVertical: dimonds.space[2],
//     paddingHorizontal: dimonds.space[4],
//     borderBottomWidth: 1,
//     borderBottomColor: colors.gray3,
//   },
//   sectionHeaderText: {
//     fontSize: 12,
//     fontFamily: fonts.bol,
//     color: colors.gray6,
//     textTransform: 'uppercase',
//   },
  
//   // ============ CONTACT TEMPLATE STYLES ============
//   contactItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: dimonds.space[3],
//     paddingHorizontal: dimonds.space[4],
//     borderBottomWidth: 1,
//     borderBottomColor: colors.gray2,
//   },
//   contactImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: dimonds.space[3],
//   },
//   contactImagePlaceholder: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: dimonds.space[3],
//   },
//   contactImagePlaceholderText: {
//     color: colors.white,
//     fontSize: 16,
//     fontFamily: fonts.bol,
//   },
//   contactInfo: {
//     flex: 1,
//   },
//   contactName: {
//     fontSize: 15,
//     fontFamily: fonts.med,
//     color: colors.gray9,
//     marginBottom: 2,
//   },
//   contactSubtitle: {
//     fontSize: 12,
//     fontFamily: fonts.reg,
//     color: colors.gray6,
//     marginBottom: 2,
//   },
//   contactDescription: {
//     fontSize: 11,
//     fontFamily: fonts.reg,
//     color: colors.gray5,
//   },
//   statusBadge: {
//     paddingHorizontal: dimonds.space[2],
//     paddingVertical: dimonds.space[1],
//     borderRadius: dimonds.radius[2],
//     marginRight: dimonds.space[2],
//   },
//   statusText: {
//     fontSize: 10,
//     fontFamily: fonts.med,
//   },
  
//   // ============ PRODUCT TEMPLATE STYLES ============
//   productItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: dimonds.space[3],
//     paddingHorizontal: dimonds.space[4],
//     borderBottomWidth: 1,
//     borderBottomColor: colors.gray2,
//   },
//   productImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//     marginRight: dimonds.space[3],
//   },
//   productImagePlaceholder: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//     backgroundColor: colors.gray2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: dimonds.space[3],
//   },
//   productImagePlaceholderText: {
//     fontSize: 24,
//   },
//   productInfo: {
//     flex: 1,
//   },
//   productTitle: {
//     fontSize: 15,
//     fontFamily: fonts.med,
//     color: colors.gray9,
//     marginBottom: 2,
//   },
//   productCategory: {
//     fontSize: 12,
//     fontFamily: fonts.reg,
//     color: colors.gray6,
//     marginBottom: 2,
//   },
//   productMeta: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   productPrice: {
//     fontSize: 14,
//     fontFamily: fonts.bol,
//     color: colors.primary,
//     marginRight: dimonds.space[2],
//   },
//   productRating: {
//     fontSize: 11,
//     fontFamily: fonts.reg,
//     color: colors.gray6,
//   },
//   productBadge: {
//     paddingHorizontal: dimonds.space[2],
//     paddingVertical: 2,
//     borderRadius: dimonds.radius[1],
//     marginRight: dimonds.space[2],
//   },
//   productBadgeText: {
//     fontSize: 10,
//     fontFamily: fonts.med,
//     color: colors.orange7,
//   },
  
//   // ============ COUNTRY TEMPLATE STYLES ============
//   countryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: dimonds.space[3],
//     paddingHorizontal: dimonds.space[4],
//     borderBottomWidth: 1,
//     borderBottomColor: colors.gray2,
//   },
//   countryFlag: {
//     width: 32,
//     height: 24,
//     borderRadius: 4,
//     marginRight: dimonds.space[3],
//   },
//   countryFlagPlaceholder: {
//     width: 32,
//     height: 24,
//     borderRadius: 4,
//     backgroundColor: colors.gray2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: dimonds.space[3],
//   },
//   countryFlagPlaceholderText: {
//     fontSize: 16,
//   },
//   countryInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   countryName: {
//     fontSize: 15,
//     fontFamily: fonts.med,
//     color: colors.gray9,
//     marginRight: dimonds.space[2],
//   },
//   countryCode: {
//     fontSize: 12,
//     fontFamily: fonts.reg,
//     color: colors.gray6,
//   },
//   countryDialCode: {
//     fontSize: 13,
//     fontFamily: fonts.med,
//     color: colors.primary,
//     marginRight: dimonds.space[2],
//   },
  
//   // ============ USER TEMPLATE STYLES ============
//   userItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: dimonds.space[3],
//     paddingHorizontal: dimonds.space[4],
//     borderBottomWidth: 1,
//     borderBottomColor: colors.gray2,
//   },
//   userAvatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     marginRight: dimonds.space[3],
//   },
//   userAvatarPlaceholder: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: dimonds.space[3],
//   },
//   userAvatarPlaceholderText: {
//     color: colors.white,
//     fontSize: 18,
//     fontFamily: fonts.bol,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 15,
//     fontFamily: fonts.med,
//     color: colors.gray9,
//     marginBottom: 2,
//   },
//   userRole: {
//     fontSize: 12,
//     fontFamily: fonts.reg,
//     color: colors.primary,
//     marginBottom: 2,
//   },
//   userEmail: {
//     fontSize: 11,
//     fontFamily: fonts.reg,
//     color: colors.gray6,
//   },
//   onlineIndicator: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: colors.green6,
//     marginRight: dimonds.space[3],
//   },
// });

// import { TextInput } from 'react-native';

// export default UnifiedDropdown;

// components/UnifiedDropdown.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
} from 'react-native';
import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';
import fonts from 'mobile/constant/font';

// Types
type DropdownVariant = 'outlined' | 'filled' | 'underlined' | 'unstyled';
type DropdownSize = 'small' | 'medium' | 'large';
type DropdownMode = 'single' | 'multi';
type DropdownType = 'modal' | 'inline';
type DropdownPosition = 'bottom' | 'top';

// Extended item type with rich data support
interface DropdownItem {
  key?: string;
  id?: string;
  value: string;
  label?: string;
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  avatar?: string;
  email?: string;
  phone?: string;
  status?: string;
  disabled?: boolean;
  selected?: boolean;
  badge?: string;
  badgeColor?: string;
  [key: string]: any;
}

interface UnifiedDropdownProps {
  // Core Props
  mode?: DropdownMode;
  data: Array<string | DropdownItem>;
  value?: string | string[];
  setValue?: (value: any) => void;
  onChange?: (value: any) => void;
  defaultOption?: string | string[];
  placeholder?: string;
  
  // Styling Variants
  variant?: DropdownVariant;
  size?: DropdownSize;
  
  // Features
  search?: boolean;
  searchPlaceholder?: string;
  maxHeight?: number;
  maxSelections?: number;
  showSelectedCheck?: boolean;
  closeOnSelect?: boolean;
  
  // Dropdown Display Mode - NEW
  dropdownType?: DropdownType;
  dropdownPosition?: DropdownPosition;
  
  // States
  loading?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  
  // Labels & Helpers
  label?: string;
  labelStyle?: TextStyle;
  helperText?: string;
  helperTextStyle?: TextStyle;
  
  // Custom Styles
  boxStyles?: ViewStyle;
  inputStyles?: TextStyle;
  dropdownStyles?: ViewStyle;
  dropdownItemStyles?: ViewStyle;
  dropdownTextStyles?: TextStyle;
  chipStyles?: ViewStyle;
  chipTextStyles?: TextStyle;
  imageStyles?: ImageStyle;
  
  // Icons (custom render props)
  arrowIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  searchIcon?: React.ReactNode;
  checkIcon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  
  // Custom Render Functions - EXTENDED FOR FUTURE REQUIREMENTS
  renderItem?: (item: DropdownItem, isSelected: boolean) => React.ReactNode;
  renderSelectedItem?: (item: string, index: number, removeItem: (val: string) => void) => React.ReactNode;
  renderButton?: (selectedItems: any[], isOpen: boolean) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  renderHeader?: (closeDropdown: () => void) => React.ReactNode;
  renderFooter?: (selectedItems: any[], closeDropdown: () => void) => React.ReactNode;
  renderSearch?: (query: string, setQuery: (q: string) => void) => React.ReactNode;
  
  // Item templates - Pre-built renderers for common use cases
  itemTemplate?: 'default' | 'contact' | 'product' | 'country' | 'user' | 'custom';
  
  // Group/Section support
  grouped?: boolean;
  sections?: Array<{ title: string; data: Array<string | DropdownItem> }>;
  renderSectionHeader?: (section: { title: string }) => React.ReactNode;
  
  // Other
  [key: string]: any;
}

const UnifiedDropdown: React.FC<UnifiedDropdownProps> = ({
  // Core Props
  mode = 'single',
  data = [],
  value,
  setValue,
  onChange,
  defaultOption,
  placeholder = 'Select an option',
  
  // Styling Variants
  variant = 'outlined',
  size = 'medium',
  
  // Features
  search = false,
  searchPlaceholder = 'Search...',
  maxHeight = 300,
  maxSelections,
  showSelectedCheck = true,
  closeOnSelect = true,
  
  // Dropdown Display Mode - NEW
  dropdownType = 'modal',
  dropdownPosition = 'bottom',
  
  // States
  loading = false,
  disabled = false,
  error = false,
  errorMessage = '',
  required = false,
  
  // Labels & Helpers
  label,
  labelStyle,
  helperText,
  helperTextStyle,
  
  // Custom Styles
  boxStyles,
  inputStyles,
  dropdownStyles,
  dropdownItemStyles,
  dropdownTextStyles,
  chipStyles,
  chipTextStyles,
  imageStyles,
  
  // Icons
  arrowIcon,
  closeIcon,
  searchIcon,
  checkIcon,
  emptyIcon,
  
  // Custom Render Functions
  renderItem,
  renderSelectedItem,
  renderButton,
  renderEmpty,
  renderHeader,
  renderFooter,
  renderSearch,
  
  // Item Templates
  itemTemplate = 'default',
  
  // Group support
  grouped = false,
  sections = [],
  renderSectionHeader,
  
  ...restProps
}) => {
  // State management
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedSingle, setSelectedSingle] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // NEW: State for inline dropdown positioning
  const [dropdownLayout, setDropdownLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const buttonRef = useRef<View>(null);

  // Initialize from props
  useEffect(() => {
    if (mode === 'multi') {
      if (value && Array.isArray(value)) {
        setSelectedItems(value);
      } else if (defaultOption && Array.isArray(defaultOption)) {
        setSelectedItems(defaultOption);
      }
    } else {
      if (value && typeof value === 'string') {
        setSelectedSingle(value);
      } else if (defaultOption && typeof defaultOption === 'string') {
        setSelectedSingle(defaultOption);
      }
    }
  }, [value, defaultOption, mode]);

  // Format data for display - Enhanced for rich data
  const formattedData = useMemo(() => {
    const items = grouped ? sections.flatMap(s => s.data) : data;
    
    return items.map((item, index) => {
      if (typeof item === 'string') {
        return { 
          key: index.toString(), 
          value: item,
          label: item,
          title: item,
          subtitle: '',
          description: '',
          image: null,
          icon: null,
          disabled: false 
        };
      }
      
      return {
        key: item.key || item.id || index.toString(),
        value: item.value || item.name || item.label || '',
        label: item.label || item.name || item.title || item.value || '',
        title: item.title || item.label || item.name || item.value || '',
        subtitle: item.subtitle || item.description || item.email || item.phone || '',
        description: item.description || '',
        image: item.image || item.avatar || null,
        icon: item.icon || null,
        email: item.email || null,
        phone: item.phone || null,
        status: item.status || null,
        badge: item.badge || null,
        badgeColor: item.badgeColor || colors.primary,
        disabled: item.disabled || false,
        selected: item.selected || false,
        ...item,
      };
    });
  }, [data, sections, grouped]);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!search || !searchQuery) return formattedData;
    return formattedData.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.phone && item.phone.includes(searchQuery))
    );
  }, [formattedData, searchQuery, search]);

  // Group data if grouped prop is true
  const groupedData = useMemo(() => {
    if (!grouped) return null;
    return sections.map(section => ({
      title: section.title,
      data: formattedData.filter(item => 
        section.data.some(s => 
          (typeof s === 'string' && (item.value === s || item.label === s)) ||
          (typeof s === 'object' && (item.value === s.value || item.key === s.key))
        )
      )
    }));
  }, [sections, formattedData, grouped]);

  // Handlers
  const handleSingleSelect = (item: DropdownItem) => {
    const newValue = item.value;
    setSelectedSingle(newValue);
    if (setValue) setValue(newValue);
    if (onChange) onChange(newValue);
    if (closeOnSelect) closeDropdown();
  };

  const handleMultiSelect = (item: DropdownItem) => {
    let newSelected = [...selectedItems];
    const itemValue = item.value;

    if (selectedItems.includes(itemValue)) {
      newSelected = selectedItems.filter(i => i !== itemValue);
    } else {
      if (maxSelections && selectedItems.length >= maxSelections) {
        return;
      }
      newSelected.push(itemValue);
    }

    setSelectedItems(newSelected);
    if (setValue) setValue(newSelected);
    if (onChange) onChange(newSelected);
  };

  const removeItem = (val: string, e?: any) => {
    if (e) e.stopPropagation();
    if (mode === 'multi') {
      const newSelected = selectedItems.filter(item => item !== val);
      setSelectedItems(newSelected);
      if (setValue) setValue(newSelected);
      if (onChange) onChange(newSelected);
    }
  };

  // MODIFIED: Updated to handle both modal and inline dropdown
  const openDropdown = () => {
    if (!disabled && !loading) {
      if (dropdownType === 'inline') {
        // Measure button position for inline dropdown
        if (buttonRef.current) {
          buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
            setDropdownLayout({
              x: pageX,
              y: dropdownPosition === 'bottom' ? pageY + height : pageY - maxHeight,
              width,
              height,
            });
            setModalVisible(true);
          });
        }
      } else {
        setModalVisible(true);
      }
      setSearchQuery('');
    }
  };

  const closeDropdown = () => {
    setModalVisible(false);
    setSearchQuery('');
    setIsFocused(false);
  };

  // Get full item object by value
  const getItemByValue = (value: string): DropdownItem | undefined => {
    return formattedData.find(item => item.value === value);
  };

  // Style getters (keeping existing implementation)
  const getVariantStyles = () => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: colors.gray1,
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: error ? colors.danger : colors.gray3,
        };
      case 'underlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 1.5,
          borderBottomColor: error ? colors.danger : colors.gray4,
          borderRadius: 0,
        };
      case 'unstyled':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          paddingHorizontal: 0,
        };
      default:
        return {
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: error ? colors.danger : colors.gray4,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          minHeight: 36,
          paddingHorizontal: dimonds.space[3],
          paddingVertical: dimonds.space[2],
        };
      case 'large':
        return {
          minHeight: 56,
          paddingHorizontal: dimonds.space[5],
          paddingVertical: dimonds.space[4],
        };
      default:
        return {
          minHeight: 48,
          paddingHorizontal: dimonds.space[4],
          paddingVertical: dimonds.space[3],
        };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small': return 12;
      case 'large': return 16;
      default: return 14;
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const fontSize = getFontSize();

  // ============ PRE-BUILT ITEM TEMPLATES ============
  
  // Template 1: Contact/User Item with Image, Name, Email
  const renderContactItem = (item: DropdownItem, isSelected: boolean) => (
    <TouchableOpacity
      style={[
        styles.contactItem,
        isSelected && styles.selectedItem,
        item.disabled && styles.disabledItem,
      ]}
      onPress={() => mode === 'multi' ? handleMultiSelect(item) : handleSingleSelect(item)}
      disabled={item.disabled || disabled}
      activeOpacity={0.7}
    >
      {item.image || item.avatar ? (
        <Image 
          source={typeof (item.image || item.avatar) === 'string' 
            ? { uri: item.image || item.avatar } 
            : item.image || item.avatar
          } 
          style={[styles.contactImage, imageStyles]}
        />
      ) : item.icon ? (
        item.icon
      ) : (
        <View style={[styles.contactImagePlaceholder, { backgroundColor: colors.primary }]}>
          <Text style={styles.contactImagePlaceholderText}>
            {item.title?.charAt(0) || item.label?.charAt(0) || '?'}
          </Text>
        </View>
      )}
      
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, isSelected && styles.selectedText]}>
          {item.title || item.label}
        </Text>
        {item.subtitle || item.email || item.phone ? (
          <Text style={styles.contactSubtitle} numberOfLines={1}>
            {item.subtitle || item.email || item.phone}
          </Text>
        ) : null}
        {item.description ? (
          <Text style={styles.contactDescription} numberOfLines={1}>
            {item.description}
          </Text>
        ) : null}
      </View>
      
      {item.status && (
        <View style={[styles.statusBadge, { backgroundColor: item.badgeColor || colors.green1 }]}>
          <Text style={[styles.statusText, { color: item.badgeColor ? colors.white : colors.green7 }]}>
            {item.status}
          </Text>
        </View>
      )}
      
      {isSelected && showSelectedCheck && (
        <View style={styles.checkbox}>
          {checkIcon || <Text style={styles.checkmark}>✓</Text>}
        </View>
      )}
    </TouchableOpacity>
  );

  // Template 2: Product Item with Image, Title, Price
  const renderProductItem = (item: DropdownItem, isSelected: boolean) => (
    <TouchableOpacity
      style={[
        styles.productItem,
        isSelected && styles.selectedItem,
        item.disabled && styles.disabledItem,
      ]}
      onPress={() => mode === 'multi' ? handleMultiSelect(item) : handleSingleSelect(item)}
      disabled={item.disabled || disabled}
      activeOpacity={0.7}
    >
      {item.image ? (
        <Image 
          source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
          style={[styles.productImage, imageStyles]}
        />
      ) : (
        <View style={[styles.productImagePlaceholder]}>
          <Text style={styles.productImagePlaceholderText}>📦</Text>
        </View>
      )}
      
      <View style={styles.productInfo}>
        <Text style={[styles.productTitle, isSelected && styles.selectedText]} numberOfLines={1}>
          {item.title || item.label}
        </Text>
        {item.subtitle && (
          <Text style={styles.productCategory} numberOfLines={1}>
            {item.subtitle}
          </Text>
        )}
        <View style={styles.productMeta}>
          {item.price && (
            <Text style={styles.productPrice}>${item.price}</Text>
          )}
          {item.rating && (
            <Text style={styles.productRating}>⭐ {item.rating}</Text>
          )}
        </View>
      </View>
      
      {item.badge && (
        <View style={[styles.productBadge, { backgroundColor: item.badgeColor || colors.orange1 }]}>
          <Text style={styles.productBadgeText}>{item.badge}</Text>
        </View>
      )}
      
      {isSelected && showSelectedCheck && (
        <View style={styles.checkbox}>
          {checkIcon || <Text style={styles.checkmark}>✓</Text>}
        </View>
      )}
    </TouchableOpacity>
  );

  // Template 3: Country/Flag Item
  const renderCountryItem = (item: DropdownItem, isSelected: boolean) => (
    <TouchableOpacity
      style={[
        styles.countryItem,
        isSelected && styles.selectedItem,
        item.disabled && styles.disabledItem,
      ]}
      onPress={() => mode === 'multi' ? handleMultiSelect(item) : handleSingleSelect(item)}
      disabled={item.disabled || disabled}
      activeOpacity={0.7}
    >
      {item.image || item.flag ? (
        <Image 
          source={typeof (item.image || item.flag) === 'string' 
            ? { uri: item.image || item.flag } 
            : item.image || item.flag
          } 
          style={[styles.countryFlag, imageStyles]}
        />
      ) : (
        <View style={[styles.countryFlagPlaceholder]}>
          <Text style={styles.countryFlagPlaceholderText}>🏳️</Text>
        </View>
      )}
      
      <View style={styles.countryInfo}>
        <Text style={[styles.countryName, isSelected && styles.selectedText]}>
          {item.label || item.value}
        </Text>
        {item.code && (
          <Text style={styles.countryCode}>{item.code}</Text>
        )}
      </View>
      
      {item.dialCode && (
        <Text style={styles.countryDialCode}>{item.dialCode}</Text>
      )}
      
      {isSelected && showSelectedCheck && (
        <View style={styles.checkbox}>
          {checkIcon || <Text style={styles.checkmark}>✓</Text>}
        </View>
      )}
    </TouchableOpacity>
  );

  // Template 4: User/Team Member Item
  const renderUserItem = (item: DropdownItem, isSelected: boolean) => (
    <TouchableOpacity
      style={[
        styles.userItem,
        isSelected && styles.selectedItem,
        item.disabled && styles.disabledItem,
      ]}
      onPress={() => mode === 'multi' ? handleMultiSelect(item) : handleSingleSelect(item)}
      disabled={item.disabled || disabled}
      activeOpacity={0.7}
    >
      {item.avatar || item.image ? (
        <Image 
          source={typeof (item.avatar || item.image) === 'string' 
            ? { uri: item.avatar || item.image } 
            : item.avatar || item.image
          } 
          style={[styles.userAvatar, imageStyles]}
        />
      ) : (
        <View style={[styles.userAvatarPlaceholder, { backgroundColor: colors.primary }]}>
          <Text style={styles.userAvatarPlaceholderText}>
            {item.title?.charAt(0) || item.label?.charAt(0) || '👤'}
          </Text>
        </View>
      )}
      
      <View style={styles.userInfo}>
        <Text style={[styles.userName, isSelected && styles.selectedText]} numberOfLines={1}>
          {item.title || item.label}
        </Text>
        {item.role && (
          <Text style={styles.userRole} numberOfLines={1}>
            {item.role}
          </Text>
        )}
        {item.email && (
          <Text style={styles.userEmail} numberOfLines={1}>
            {item.email}
          </Text>
        )}
      </View>
      
      {item.online && (
        <View style={styles.onlineIndicator} />
      )}
      
      {isSelected && showSelectedCheck && (
        <View style={styles.checkbox}>
          {checkIcon || <Text style={styles.checkmark}>✓</Text>}
        </View>
      )}
    </TouchableOpacity>
  );

  // Default item renderer
  const renderDefaultItem = (item: DropdownItem, isSelected: boolean) => (
    <TouchableOpacity
      style={[
        styles.dropdownItem,
        isSelected && styles.selectedItem,
        item.disabled && styles.disabledItem,
        dropdownItemStyles,
      ]}
      onPress={() => mode === 'multi' ? handleMultiSelect(item) : handleSingleSelect(item)}
      disabled={item.disabled || disabled}
    >
      <Text style={[
        styles.dropdownText,
        { fontSize: fontSize - 1 },
        isSelected && styles.selectedText,
        item.disabled && styles.disabledText,
        dropdownTextStyles,
      ]}>
        {item.label}
      </Text>
      {isSelected && showSelectedCheck && mode === 'multi' && (
        <View style={styles.checkbox}>
          {checkIcon || <Text style={styles.checkmark}>✓</Text>}
        </View>
      )}
      {isSelected && showSelectedCheck && mode === 'single' && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </TouchableOpacity>
  );

  // Get the appropriate item renderer based on template
  const getItemRenderer = () => {
    if (renderItem) return renderItem;
    
    switch (itemTemplate) {
      case 'contact':
        return renderContactItem;
      case 'product':
        return renderProductItem;
      case 'country':
        return renderCountryItem;
      case 'user':
        return renderUserItem;
      case 'default':
      default:
        return renderDefaultItem;
    }
  };

  const itemRenderer = getItemRenderer();

  // Render selected chips with custom renderer
  const renderSelectedChips = () => {
    if (renderSelectedItem) {
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScrollView}
        >
          {selectedItems.map((item, index) => 
            renderSelectedItem(item, index, removeItem)
          )}
        </ScrollView>
      );
    }

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScrollView}
      >
        {selectedItems.map((item, index) => {
          const fullItem = getItemByValue(item);
          return (
            <View key={index} style={[styles.chip, chipStyles]}>
              {fullItem?.image && (
                <Image 
                  source={typeof fullItem.image === 'string' ? { uri: fullItem.image } : fullItem.image} 
                  style={[styles.chipImage, imageStyles]}
                />
              )}
              <Text style={[styles.chipText, chipTextStyles]}>{item}</Text>
              <TouchableOpacity
                onPress={(e) => removeItem(item, e)}
                style={styles.chipClose}
                disabled={disabled}
              >
                <Text style={styles.chipCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  // Render button content
  const renderButtonContent = () => {
    if (mode === 'multi') {
      if (selectedItems.length > 0) {
        return renderSelectedChips();
      }
    } else {
      if (selectedSingle) {
        const selectedItem = getItemByValue(selectedSingle);
        
        if (selectedItem?.image || selectedItem?.avatar || selectedItem?.icon) {
          return (
            <View style={styles.selectedSingleContainer}>
              {selectedItem.image || selectedItem.avatar ? (
                <Image 
                  source={typeof (selectedItem.image || selectedItem.avatar) === 'string' 
                    ? { uri: selectedItem.image || selectedItem.avatar } 
                    : selectedItem.image || selectedItem.avatar
                  } 
                  style={[styles.selectedImage, imageStyles]}
                />
              ) : selectedItem.icon ? (
                selectedItem.icon
              ) : null}
              <Text style={[styles.selectedText, { fontSize }]}>
                {selectedItem.label || selectedSingle}
              </Text>
            </View>
          );
        }
        
        return (
          <Text style={[styles.selectedText, { fontSize }]}>
            {selectedSingle}
          </Text>
        );
      }
    }
    
    return (
      <Text style={[styles.placeholder, { fontSize }, disabled && styles.disabledText]}>
        {loading ? 'Loading...' : placeholder}
      </Text>
    );
  };

  // Render dropdown items
  const renderDropdownItem = ({ item }: { item: DropdownItem }) => {
    const isSelected = mode === 'multi'
      ? selectedItems.includes(item.value)
      : selectedSingle === item.value;

    return itemRenderer(item, isSelected);
  };

  // Render section header for grouped items
  const renderGroupSectionHeader = ({ section }: { section: any }) => {
    if (renderSectionHeader) {
      return renderSectionHeader(section);
    }
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  };

  // Render empty state
  const renderEmptyState = () => {
    if (renderEmpty) {
      return renderEmpty();
    }
    return (
      <View style={styles.emptyContainer}>
        {emptyIcon || <Text style={styles.emptyIcon}>📭</Text>}
        <Text style={styles.emptyText}>No options available</Text>
      </View>
    );
  };

  // Render modal header
  const renderModalHeader = () => {
    if (renderHeader) {
      return renderHeader(closeDropdown);
    }
    return (
      <View style={styles.dropdownHeader}>
        <Text style={styles.dropdownTitle}>
          Select {label?.toLowerCase() || (mode === 'multi' ? 'options' : 'option')}
        </Text>
        <TouchableOpacity onPress={closeDropdown} style={styles.closeButton}>
          {closeIcon || <Text style={styles.closeButtonText}>✕</Text>}
        </TouchableOpacity>
      </View>
    );
  };

  // Render modal footer
  const renderModalFooter = () => {
    if (mode !== 'multi') return null;
    
    if (renderFooter) {
      return renderFooter(selectedItems, closeDropdown);
    }
    
    return (
      <View style={styles.dropdownFooter}>
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={closeDropdown}
        >
          <Text style={styles.doneButtonText}>
            Done {selectedItems.length > 0 ? `(${selectedItems.length})` : ''}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render search bar
  const renderSearchBar = () => {
    if (renderSearch) {
      return renderSearch(searchQuery, setSearchQuery);
    }
    
    return (
      <View style={styles.searchContainer}>
        {searchIcon || <Text style={styles.searchIcon}>🔍</Text>}
        <TextInput
          style={styles.searchInput}
          placeholder={searchPlaceholder}
          placeholderTextColor={colors.gray5}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            {closeIcon || <Text style={styles.clearSearch}>✕</Text>}
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  // NEW: Render inline dropdown
  const renderInlineDropdown = () => (
    <>
      {/* Backdrop for inline dropdown */}
      {modalVisible && (
        <TouchableOpacity
          style={styles.inlineBackdrop}
          activeOpacity={1}
          onPress={closeDropdown}
        />
      )}
      
      {/* Dropdown positioned absolutely */}
      {modalVisible && (
        <View
          style={[
            styles.inlineDropdownContainer,
            {
              position: 'absolute',
              top: dropdownLayout.y,
              left: dropdownLayout.x,
              width: dropdownLayout.width,
              maxHeight: maxHeight,
            },
            dropdownPosition === 'top' && { bottom: dropdownLayout.y - dropdownLayout.height },
            dropdownStyles,
          ]}
        >
          {/* Search Bar - Only show if search is enabled */}
          {search && renderSearchBar()}
          
          {/* Options List - Grouped or Flat */}
          {grouped && groupedData ? (
            <FlatList
              data={groupedData}
              keyExtractor={(item, index) => `section-${index}`}
              style={styles.dropdownList}
              renderItem={({ item: section }) => (
                <View>
                  {renderGroupSectionHeader({ section })}
                  <FlatList
                    data={section.data}
                    keyExtractor={(item) => item.key}
                    renderItem={renderDropdownItem}
                    scrollEnabled={false}
                  />
                </View>
              )}
              showsVerticalScrollIndicator={true}
              ListEmptyComponent={renderEmptyState}
              keyboardShouldPersistTaps="handled"
            />
          ) : (
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.key}
              style={styles.dropdownList}
              renderItem={renderDropdownItem}
              showsVerticalScrollIndicator={true}
              ListEmptyComponent={renderEmptyState}
              keyboardShouldPersistTaps="handled"
            />
          )}
          
          {/* Footer for multi-select */}
          {mode === 'multi' && renderModalFooter()}
        </View>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      {/* Label */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      {/* Dropdown Button - ADDED REF for measurement */}
      <View ref={buttonRef} collapsable={false}>
        {renderButton ? (
          renderButton(mode === 'multi' ? selectedItems : [selectedSingle], modalVisible)
        ) : (
          <TouchableOpacity
            onPress={openDropdown}
            activeOpacity={0.7}
            disabled={disabled || loading}
            style={[
              styles.buttonContainer,
              variantStyles,
              sizeStyles,
              isFocused && !error && !disabled && styles.focused,
              error && styles.errorBorder,
              disabled && styles.disabled,
              boxStyles,
            ]}
          >
            {renderButtonContent()}
            <View style={styles.arrowContainer}>
              {loading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                arrowIcon || <Text style={[styles.arrow, disabled && styles.disabledText]}>
                  {modalVisible ? '▲' : '▼'}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Helper Text */}
      {helperText && !error && (
        <Text style={[styles.helperText, helperTextStyle]}>
          {helperText}
        </Text>
      )}

      {/* Error Message */}
      {error && errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      {/* Dropdown - Conditional rendering based on dropdownType */}
      {dropdownType === 'modal' ? (
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={closeDropdown}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={closeDropdown}
          >
            <View style={[styles.dropdownContainer, dropdownStyles]}>
              {/* Modal Header */}
              {renderModalHeader()}

              {/* Search Bar */}
              {search && renderSearchBar()}

              {/* Options List - Grouped or Flat */}
              {grouped && groupedData ? (
                <FlatList
                  data={groupedData}
                  keyExtractor={(item, index) => `section-${index}`}
                  style={styles.dropdownList}
                  renderItem={({ item: section }) => (
                    <View>
                      {renderGroupSectionHeader({ section })}
                      <FlatList
                        data={section.data}
                        keyExtractor={(item) => item.key}
                        renderItem={renderDropdownItem}
                        scrollEnabled={false}
                      />
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={renderEmptyState}
                />
              ) : (
                <FlatList
                  data={filteredData}
                  keyExtractor={(item) => item.key}
                  style={styles.dropdownList}
                  renderItem={renderDropdownItem}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={renderEmptyState}
                />
              )}

              {/* Modal Footer */}
              {renderModalFooter()}
            </View>
          </TouchableOpacity>
        </Modal>
      ) : (
        renderInlineDropdown()
      )}
    </View>
  );
};

// EXTENDED STYLES FOR ALL TEMPLATES
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: dimonds.space[3],
  },
  labelContainer: {
    marginBottom: dimonds.space[2],
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.med,
    color: colors.gray7,
  },
  required: {
    color: colors.danger,
  },
  // Button Styles
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: dimonds.radius[3],
    width: '100%',
  },
  chipScrollView: {
    flex: 1,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blue1,
    borderRadius: dimonds.radius[2],
    paddingVertical: dimonds.space[1],
    paddingLeft: dimonds.space[2],
    paddingRight: dimonds.space[1],
    marginRight: dimonds.space[2],
    borderWidth: 1,
    borderColor: colors.blue3,
  },
  chipImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 4,
  },
  chipText: {
    fontSize: 12,
    fontFamily: fonts.med,
    color: colors.blue7,
    marginRight: dimonds.space[1],
  },
  chipClose: {
    padding: dimonds.space[1],
  },
  chipCloseText: {
    fontSize: 12,
    color: colors.blue7,
    fontWeight: 'bold',
  },
  placeholder: {
    flex: 1,
    fontFamily: fonts.reg,
    color: colors.gray5,
  },
  selectedText: {
    flex: 1,
    fontFamily: fonts.reg,
    color: colors.gray9,
  },
  selectedSingleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  arrowContainer: {
    paddingLeft: dimonds.space[2],
  },
  arrow: {
    fontSize: 12,
    color: colors.gray6,
  },
  focused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  // Helper & Error
  helperText: {
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.gray5,
    marginTop: dimonds.space[1],
  },
  errorText: {
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.danger,
    marginTop: dimonds.space[1],
  },
  errorBorder: {
    borderColor: colors.danger,
  },
  disabled: {
    backgroundColor: colors.gray1,
    opacity: 0.7,
  },
  disabledText: {
    color: colors.gray5,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: dimonds.space[4],
  },
  dropdownContainer: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    backgroundColor: colors.white,
    borderRadius: dimonds.radius[4],
    overflow: 'hidden',
    shadowColor: colors.gray9,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray3,
    backgroundColor: colors.gray1,
  },
  dropdownTitle: {
    fontSize: 16,
    fontFamily: fonts.bol,
    color: colors.gray8,
  },
  closeButton: {
    padding: dimonds.space[2],
  },
  closeButtonText: {
    fontSize: 16,
    color: colors.gray6,
    fontWeight: 'bold',
  },
  // Search Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: dimonds.space[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray3,
    backgroundColor: colors.white,
  },
  searchIcon: {
    marginRight: dimonds.space[2],
    color: colors.gray5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.reg,
    color: colors.gray9,
    paddingVertical: dimonds.space[2],
  },
  clearSearch: {
    fontSize: 14,
    color: colors.gray5,
    padding: dimonds.space[1],
  },
  dropdownList: {
    maxHeight: 300,
  },
  // Default Item Styles
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  selectedItem: {
    backgroundColor: colors.blue1,
  },
  dropdownText: {
    fontFamily: fonts.reg,
    color: colors.gray8,
    flex: 1,
  },
  disabledItem: {
    backgroundColor: colors.gray1,
    opacity: 0.5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dropdownFooter: {
    padding: dimonds.space[4],
    borderTopWidth: 1,
    borderTopColor: colors.gray3,
    backgroundColor: colors.gray1,
  },
  doneButton: {
    backgroundColor: colors.primary,
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderRadius: dimonds.radius[3],
    alignItems: 'center',
  },
  doneButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.med,
  },
  // Empty State
  emptyContainer: {
    padding: dimonds.space[6],
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: dimonds.space[3],
  },
  emptyText: {
    fontSize: 14,
    fontFamily: fonts.reg,
    color: colors.gray5,
  },
  // Section Header
  sectionHeader: {
    backgroundColor: colors.gray2,
    paddingVertical: dimonds.space[2],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray3,
  },
  sectionHeaderText: {
    fontSize: 12,
    fontFamily: fonts.bol,
    color: colors.gray6,
    textTransform: 'uppercase',
  },
  
  // ============ NEW STYLES FOR INLINE DROPDOWN ============
  inlineBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  inlineDropdownContainer: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderRadius: dimonds.radius[3],
    borderWidth: 1,
    borderColor: colors.gray3,
    shadowColor: colors.gray9,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    overflow: 'hidden',
  },
  
  // ============ CONTACT TEMPLATE STYLES ============
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  contactImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: dimonds.space[3],
  },
  contactImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: dimonds.space[3],
  },
  contactImagePlaceholderText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.bol,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontFamily: fonts.med,
    color: colors.gray9,
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.gray6,
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 11,
    fontFamily: fonts.reg,
    color: colors.gray5,
  },
  statusBadge: {
    paddingHorizontal: dimonds.space[2],
    paddingVertical: dimonds.space[1],
    borderRadius: dimonds.radius[2],
    marginRight: dimonds.space[2],
  },
  statusText: {
    fontSize: 10,
    fontFamily: fonts.med,
  },
  
  // ============ PRODUCT TEMPLATE STYLES ============
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: dimonds.space[3],
  },
  productImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: dimonds.space[3],
  },
  productImagePlaceholderText: {
    fontSize: 24,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 15,
    fontFamily: fonts.med,
    color: colors.gray9,
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.gray6,
    marginBottom: 2,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontFamily: fonts.bol,
    color: colors.primary,
    marginRight: dimonds.space[2],
  },
  productRating: {
    fontSize: 11,
    fontFamily: fonts.reg,
    color: colors.gray6,
  },
  productBadge: {
    paddingHorizontal: dimonds.space[2],
    paddingVertical: 2,
    borderRadius: dimonds.radius[1],
    marginRight: dimonds.space[2],
  },
  productBadgeText: {
    fontSize: 10,
    fontFamily: fonts.med,
    color: colors.orange7,
  },
  
  // ============ COUNTRY TEMPLATE STYLES ============
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  countryFlag: {
    width: 32,
    height: 24,
    borderRadius: 4,
    marginRight: dimonds.space[3],
  },
  countryFlagPlaceholder: {
    width: 32,
    height: 24,
    borderRadius: 4,
    backgroundColor: colors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: dimonds.space[3],
  },
  countryFlagPlaceholderText: {
    fontSize: 16,
  },
  countryInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryName: {
    fontSize: 15,
    fontFamily: fonts.med,
    color: colors.gray9,
    marginRight: dimonds.space[2],
  },
  countryCode: {
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.gray6,
  },
  countryDialCode: {
    fontSize: 13,
    fontFamily: fonts.med,
    color: colors.primary,
    marginRight: dimonds.space[2],
  },
  
  // ============ USER TEMPLATE STYLES ============
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dimonds.space[3],
    paddingHorizontal: dimonds.space[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: dimonds.space[3],
  },
  userAvatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: dimonds.space[3],
  },
  userAvatarPlaceholderText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.bol,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontFamily: fonts.med,
    color: colors.gray9,
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    fontFamily: fonts.reg,
    color: colors.primary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 11,
    fontFamily: fonts.reg,
    color: colors.gray6,
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.green6,
    marginRight: dimonds.space[3],
  },
});

import { TextInput } from 'react-native';

export default UnifiedDropdown;