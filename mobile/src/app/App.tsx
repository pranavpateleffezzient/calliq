// import { TamaguiProvider, View } from '@tamagui/core';
// import { AppButton } from '../com/button/AppButton';
// import tamaguiConfig from '../../tamagui.config';
// import { Activity } from '@tamagui/lucide-icons';
// import { ScrollView } from 'react-native';
// import { Input } from 'tamagui';
// import { CustomButton } from '../com/button/CustomButton';

// export default function App() {
//   return (
//     // 1. Wrap app with TamaguiProvider (provides theme)
//     <TamaguiProvider config={tamaguiConfig}>
//       <ScrollView>
//         <View flex={1} backgroundColor="#000" padding="$md">
//           <Input flex={1} size={12} placeholder={`Size ...`} />
// {/* <CustomButton size="sm" type="outline" >Click me</CustomButton> */}
//           {/* SECTION 1: Basic Buttons */}
//           <View marginBottom="$lg">
//             <AppButton preset={[ 'large','outline']} margin="$5" style={{borderRadius:20}}>
//               Primary Button
//             </AppButton>

//             <AppButton preset="secondary" marginBottom="$2">
//               Secondary Button
//             </AppButton>

//             <AppButton preset="outline" marginBottom="$2">
//               Outline Button
//             </AppButton>

//             <AppButton preset="danger" marginBottom="$4" >
//               Danger Button
//             </AppButton>

//             <AppButton preset="ghost">Ghost Button</AppButton>
//           </View>

//           {/* SECTION 2: Button Sizes */}
//           <View marginBottom="$lg">
//             <AppButton preset={['primary', 'small']} marginRight="$sm">
//               Small
//             </AppButton>

//             <AppButton preset={['primary', 'medium']} marginRight="$sm">
//               Medium
//             </AppButton>

//             <AppButton preset={['primary', 'large']}>Large</AppButton>
//           </View>

//           {/* SECTION 3: With Icons */}
//           <View marginBottom="$lg">
//             <AppButton preset="primary" icon={<Activity />} marginRight="$sm">
//               With Icon
//             </AppButton>

//             <AppButton preset="outline" iconAfter={<Activity />}>
//               Icon After
//             </AppButton>
//           </View>

//           {/* SECTION 4: Full Width */}
//           <View marginBottom="$lg">
//             <AppButton preset={['primary', 'fullWidth']}>
//               Full Width Button
//             </AppButton>
//           </View>

//           {/* SECTION 5: States */}
//           <View marginBottom="$lg">
//             <AppButton preset="primary" disabled marginRight="$sm">
//               Disabled
//             </AppButton>

//             <AppButton preset="primary" loading>
//               Loading
//             </AppButton>
//           </View>

//           {/* SECTION 6: Custom Overrides */}
//           <View>
//             <AppButton
//               preset="primary"
//               // Override preset styles
//               backgroundColor="purple"
//               borderRadius="$full"
//               marginBottom="$sm"
//             >
//               Custom Color
//             </AppButton>

//             <AppButton
//               // No preset, fully custom
//               backgroundColor="#FF9500"
//               color="white"
//               borderRadius="$lg"
//               padding="$lg"
//             >
//               Fully Custom
//             </AppButton>
//           </View>
//         </View>
//       </ScrollView>
//       {/* 2. Main container */}
//     </TamaguiProvider>
//   );
// }

// // App.tsx
import { TamaguiProvider, View, Text } from '@tamagui/core'
import { AppInput, AppTextArea } from '../com/input/AppInput'
import { AppButton } from '../com/button/AppButton'
import tamaguiConfig from '../../tamagui.config'
import { 
  Mail, 
  Lock, 
  Search, 
  User, 
  Phone, 
  MessageCircle,
  Calendar,
  DollarSign
} from '@tamagui/lucide-icons'
import { useState } from 'react'
import { ScrollView, XStack, YStack } from 'tamagui'

export default function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    search: '',
    username: '',
    phone: '',
    message: '',
    amount: '',
    bio: '',
  })
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = { email: '', password: '' }
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData)
      // Submit logic here
    }
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ScrollView>
      <View 
        flex={1} 
        backgroundColor="$background" 
        padding="$4"
      >
        <Text fontSize="$8" fontWeight="bold" marginBottom="$4">
          Input System Demo
        </Text>
        
        {/* SECTION 1: Basic Input Variants */}
        <YStack gap="$4" marginBottom="$6">
          <Text fontSize="$6" fontWeight="600">Basic Input Variants</Text>
          
          <AppInput
            preset="default"
            placeholder="Default input"
            value={formData.search}
            onChangeText={(val) => handleChange('search', val)}
          />
          
          <AppInput
            preset={"outline"}
            placeholder="Outline input"
          />
          
          <AppInput
            preset="filled"
            placeholder="Filled input"
          />
          
          <AppInput
            preset="underline"
            placeholder="Underline input"
          />
        </YStack>
        
        {/* SECTION 2: Input Sizes */}
        <YStack gap="$4" marginBottom="$6">
          <Text fontSize="$6" fontWeight="600">Input Sizes</Text>
          
          <AppInput
            preset={['default', 'xsmall']}
            placeholder="Extra Small"
          />
          
          <AppInput
            preset={['default', 'small']}
            placeholder="Small"
          />
          
          <AppInput
            preset={['default', 'medium']}
            placeholder="Medium (Default)"
          />
          
          <AppInput
            preset={['default', 'large']}
            placeholder="Large"
          />
        </YStack>
        
        {/* SECTION 3: Input with Icons */}
        <YStack gap="$4" marginBottom="$6">
          <Text fontSize="$6" fontWeight="600">Input with Icons</Text>
          
          <AppInput
            preset="default"
            placeholder="Email address"
            leftIcon={<Mail color="$gray6" size="$5" />}
            value={formData.email}
            onChangeText={(val) => handleChange('email', val)}
            error={errors.email}
          />
          
          <AppInput
            preset="default"
            placeholder="Password"
            leftIcon={<Lock color="$gray6" size="$5" />}
            isPassword
            value={formData.password}
            onChangeText={(val) => handleChange('password', val)}
            error={errors.password}
          />
          
          <AppInput
            preset="default"
            placeholder="Search..."
            leftIcon={<Search color="$gray6" size="$5" />}
            rightIcon={<Search color="$gray6" size="$5" />}
          />
        </YStack>
        
        {/* SECTION 4: Validation States */}
        <YStack gap="$4" marginBottom="$6">
          <Text fontSize="$6" fontWeight="600">Validation States</Text>
          
          <AppInput
            preset="success"
            placeholder="Success state"
            value="Valid input"
            success="This looks good!"
          />
          
          <AppInput
            preset="error"
            placeholder="Error state"
            value="Invalid input"
            error="This field is required"
          />
          
          <AppInput
            preset="warning"
            placeholder="Warning state"
            value="Warning input"
            warning="Please double check this"
          />
          
          <AppInput
            preset="disabled"
            placeholder="Disabled input"
            value="Cannot edit this"
          />
        </YStack>
        
        {/* SECTION 5: TextArea */}
        <YStack gap="$4" marginBottom="$6">
          <Text fontSize="$6" fontWeight="600">TextArea</Text>
          
          <AppTextArea
            preset="default"
            placeholder="Enter your message here..."
            label="Message"
            rows={4}
            value={formData.message}
            onChangeText={(val) => handleChange('message', val)}
          />
          
          <AppTextArea
            preset="outline"
            placeholder="Bio"
            label="About You"
            rows={3}
            maxLength={200}
            value={formData.bio}
            onChangeText={(val) => handleChange('bio', val)}
            helperText="Tell us about yourself"
          />
        </YStack>
        
        {/* SECTION 6: Complete Form Example */}
        <YStack gap="$4" marginBottom="$6">
          <Text fontSize="$6" fontWeight="600">Complete Form Example</Text>
          
          <AppInput
            label="Username"
            placeholder="Enter username"
            leftIcon={<User color="$gray6" size="$1" />}
            required
            value={formData.username}
            onChangeText={(val) => handleChange('username', val)}
          />
          
          <AppInput
            label="Phone Number"
            placeholder="Enter phone number"
            leftIcon={<Phone color="$gray6" size="$5" />}
            value={formData.phone}
            onChangeText={(val) => handleChange('phone', val)}
            helperText="We'll never share your phone number"
          />
          
          <AppInput
            label="Amount"
            placeholder="0.00"
            leftIcon={<DollarSign color="$gray6" size="$1" />}
            preset="outline"
            value={formData.amount}
            onChangeText={(val) => handleChange('amount', val)}
          />
          
          <XStack gap="$3" marginTop="$2">
            <AppButton
              preset="primary"
              onPress={handleSubmit}
            >
              Submit Form
            </AppButton>
            
            <AppButton
              preset="outline"
              onPress={() => setFormData({
                email: '', password: '', search: '', username: '',
                phone: '', message: '', amount: '', bio: ''
              })}
            >
              Clear All
            </AppButton>
          </XStack>
        </YStack>
        
        {/* SECTION 7: Special Inputs */}
        <YStack gap="$4">
          <Text fontSize="$6" fontWeight="600">Special Inputs</Text>
          
          <AppInput
            preset={['default', 'rounded']}
            placeholder="Rounded input"
          />
          
          <AppInput
            preset={['default', 'pill']}
            placeholder="Pill shaped input"
          />
          
          <AppInput
            preset={['default', 'fullWidth']}
            placeholder="Full width input"
          />
          
          <AppInput
            placeholder="With character limit"
            maxLength={50}
            value={formData.message}
            onChangeText={(val) => handleChange('message', val)}
            helperText="Maximum 50 characters"
          />
        </YStack>
      </View>
      </ScrollView>

    </TamaguiProvider>
  )
}
// App.tsx
// import { TamaguiProvider, View, Text } from '@tamagui/core'
// import { AppCheckbox, AppCheckboxGroup } from '../com/check_box/AppCheckbox'
// import { AppButton } from '../com/button/AppButton'
// import { AppInput } from '../com/input/AppInput'
// import tamaguiConfig from '../../tamagui.config'
// import { useState } from 'react'
// import {  YStack, XStack, ScrollView } from 'tamagui'


// export default function App() {
//   const [checkboxes, setCheckboxes] = useState({
//     basic: false,
//     primary: true,
//     secondary: false,
//     success: false,
//     danger: false,
//     warning: false,
//     outline: false,
//     filled: true,
//     rounded: false,
//     circle: false,
//     disabled: false,
//     indeterminate: false,
//     withLabel: true,
//     sizeSmall: false,
//     sizeMedium: true,
//     sizeLarge: false,
//     terms: false,
//     notifications: {
//       email: true,
//       push: false,
//       sms: false,
//     },
//     preferences: {
//       darkMode: false,
//       autoSave: true,
//       analytics: false,
//     },
//   })

//   const handleCheckboxChange = (key: string, value: boolean) => {
//     setCheckboxes(prev => ({
//       ...prev,
//       [key]: value,
//     }))
//   }

//   const handleNestedChange = (parent: string, key: string, value: boolean) => {
//     setCheckboxes(prev => ({
//       ...prev,
//       [parent]: {
//         ...prev[parent as keyof typeof prev],
//         [key]: value,
//       },
//     }))
//   }

//   const handleSelectAll = (parent: string, selectAll: boolean) => {
//     const nested = checkboxes[parent as keyof typeof checkboxes] as Record<string, boolean>
//     const updated = Object.keys(nested).reduce((acc, key) => ({
//       ...acc,
//       [key]: selectAll,
//     }), {})
    
//     setCheckboxes(prev => ({
//       ...prev,
//       [parent]: updated,
//     }))
//   }

//   return (
//     <TamaguiProvider config={tamaguiConfig}>
//       <ScrollView>
//         <View 
//           flex={1} 
//           backgroundColor="$background" 
//           padding="$4"
//         >
//           <Text fontSize="$8" fontWeight="bold" marginBottom="$4">
//             Checkbox System Demo
//           </Text>
          
//           {/* SECTION 1: Basic Checkbox Variants */}
//           <YStack gap="$4" marginBottom="$6">
//             <Text fontSize="$6" fontWeight="600">Basic Checkbox Variants</Text>
            
//             <AppCheckbox
//               label="Default Checkbox"
//               checked={checkboxes.basic}
//               onChange={(val) => handleCheckboxChange('basic', val)}
//             />
            
//             <AppCheckbox
//               preset="primary"
//               label="Primary Checkbox"
//               checked={checkboxes.primary}
//               onChange={(val) => handleCheckboxChange('primary', val)}
//             />
            
//             <AppCheckbox
//               preset="secondary"
//               label="Secondary Checkbox"
//               checked={checkboxes.secondary}
//               onChange={(val) => handleCheckboxChange('secondary', val)}
//             />
            
//             <AppCheckbox
//               preset="outline"
//               label="Outline Checkbox"
//               checked={checkboxes.outline}
//               onChange={(val) => handleCheckboxChange('outline', val)}
//             />
            
//             <AppCheckbox
//               preset="filled"
//               label="Filled Checkbox"
//               checked={checkboxes.filled}
//               onChange={(val) => handleCheckboxChange('filled', val)}
//             />
//           </YStack>
          
//           {/* SECTION 2: Validation States */}
//           <YStack gap="$4" marginBottom="$6">
//             <Text fontSize="$6" fontWeight="600">Validation States</Text>
            
//             <AppCheckbox
//               preset="success"
//               label="Success State"
//               checked={checkboxes.success}
//               onChange={(val) => handleCheckboxChange('success', val)}
//               success="This is valid"
//             />
            
//             <AppCheckbox
//               preset="danger"
//               label="Error State"
//               checked={checkboxes.danger}
//               onChange={(val) => handleCheckboxChange('danger', val)}
//               error="This is required"
//               required
//             />
            
//             <AppCheckbox
//               preset="warning"
//               label="Warning State"
//               checked={checkboxes.warning}
//               onChange={(val) => handleCheckboxChange('warning', val)}
//               helperText="Please consider this carefully"
//             />
            
//             <AppCheckbox
//               label="Disabled Checkbox"
//               checked={checkboxes.disabled}
//               onChange={(val) => handleCheckboxChange('disabled', val)}
//               disabled
//               helperText="This checkbox is disabled"
//             />
//           </YStack>
          
//           {/* SECTION 3: Shapes */}
//           <YStack gap="$4" marginBottom="$6">
//             <Text fontSize="$6" fontWeight="600">Checkbox Shapes</Text>
            
//             <AppCheckbox
//               label="Square (Default)"
//               checked={checkboxes.basic}
//               onChange={(val) => handleCheckboxChange('basic', val)}
//             />
            
//             <AppCheckbox
//               preset={['primary', 'rounded']}
//               label="Rounded Corners"
//               checked={checkboxes.rounded}
//               onChange={(val) => handleCheckboxChange('rounded', val)}
//             />
            
//             <AppCheckbox
//               preset={['primary', 'circle']}
//               label="Circular (Radio Style)"
//               checked={checkboxes.circle}
//               onChange={(val) => handleCheckboxChange('circle', val)}
//             />
//           </YStack>
          
//           {/* SECTION 4: Sizes */}
//           <YStack gap="$4" marginBottom="$6">
//             <Text fontSize="$6" fontWeight="600">Checkbox Sizes</Text>
            
//             <AppCheckbox
//               preset={['primary', 'small']}
//               label="Small Size"
//               checked={checkboxes.sizeSmall}
//               onChange={(val) => handleCheckboxChange('sizeSmall', val)}
//             />
            
//             <AppCheckbox
//               preset={['primary', 'medium']}
//               label="Medium Size (Default)"
//               checked={checkboxes.sizeMedium}
//               onChange={(val) => handleCheckboxChange('sizeMedium', val)}
//             />
            
//             <AppCheckbox
//               preset={['primary', 'large']}
//               label="Large Size"
//               checked={checkboxes.sizeLarge}
//               onChange={(val) => handleCheckboxChange('sizeLarge', val)}
//             />
            
//             <AppCheckbox
//               label="Custom Size (40px)"
//               checked={checkboxes.basic}
//               onChange={(val) => handleCheckboxChange('basic', val)}
//               customSize={40}
//               helperText="Custom size using customSize prop"
//             />
//           </YStack>
          
//           {/* SECTION 5: Indeterminate State */}
//           <YStack gap="$4" marginBottom="$6">
//             <Text fontSize="$6" fontWeight="600">Indeterminate State</Text>
            
//             <AppCheckbox
//               label="Indeterminate Checkbox"
//               checked={checkboxes.indeterminate}
//               onChange={(val) => handleCheckboxChange('indeterminate', val)}
//               indeterminate
//               helperText="Partially selected state"
//             />
            
//             <AppCheckbox
//               preset="primary"
//               label="Indeterminate with Primary"
//               checked={checkboxes.indeterminate}
//               onChange={(val) => handleCheckboxChange('indeterminate', val)}
//               indeterminate
//             />
//           </YStack>
          
//           {/* SECTION 6: Checkbox Groups */}
//           <YStack gap="$4" marginBottom="$6">
//             <Text fontSize="$6" fontWeight="600">Checkbox Groups</Text>
            
//             {/* Vertical Group */}
//             <AppCheckboxGroup
//               label="Notification Preferences"
//               direction="vertical"
//               required
//             >
//               <AppCheckbox
//                 label="Email Notifications"
//                 checked={checkboxes.notifications.email}
//                 onChange={(val) => handleNestedChange('notifications', 'email', val)}
//               />
//               <AppCheckbox
//                 label="Push Notifications"
//                 checked={checkboxes.notifications.push}
//                 onChange={(val) => handleNestedChange('notifications', 'push', val)}
//               />
//               <AppCheckbox
//                 label="SMS Notifications"
//                 checked={checkboxes.notifications.sms}
//                 onChange={(val) => handleNestedChange('notifications', 'sms', val)}
//                 helperText="Standard carrier rates may apply"
//               />
//             </AppCheckboxGroup>
            
//             {/* Horizontal Group */}
//             <AppCheckboxGroup
//               label="App Preferences"
//               direction="horizontal"
//               gap="$4"
//             >
//               <AppCheckbox
//                 label="Dark Mode"
//                 checked={checkboxes.preferences.darkMode}
//                 onChange={(val) => handleNestedChange('preferences', 'darkMode', val)}
//               />
//               <AppCheckbox
//                 label="Auto Save"
//                 checked={checkboxes.preferences.autoSave}
//                 onChange={(val) => handleNestedChange('preferences', 'autoSave', val)}
//               />
//               <AppCheckbox
//                 label="Analytics"
//                 checked={checkboxes.preferences.analytics}
//                 onChange={(val) => handleNestedChange('preferences', 'analytics', val)}
//               />
//             </AppCheckboxGroup>
//           </YStack>
          
//           {/* SECTION 7: Form Integration */}
//           <YStack gap="$4" marginBottom="$6">
//             <Text fontSize="$6" fontWeight="600">Form Integration Example</Text>
            
//             <AppInput
//               label="Full Name"
//               placeholder="Enter your name"
//               preset="default"
//             />
            
//             <AppInput
//               label="Email Address"
//               placeholder="you@example.com"
//               preset="outline"
//               required
//             />
            
//             <AppCheckbox
//               label="I agree to the Terms and Conditions"
//               checked={checkboxes.terms}
//               onChange={(val) => handleCheckboxChange('terms', val)}
//               required
//               error={!checkboxes.terms ? "You must agree to the terms" : undefined}
//               helperText="Please read the terms carefully"
//             />
            
//             <AppCheckbox
//               preset={['primary', 'withLabel']}
//               label="Subscribe to newsletter"
//               checked={checkboxes.withLabel}
//               onChange={(val) => handleCheckboxChange('withLabel', val)}
//               helperText="Get updates about new features"
//             />
            
//             <XStack gap="$3" marginTop="$2">
//               <AppButton preset="primary">
//                 Submit Form
//               </AppButton>
              
//               <AppButton preset="outline">
//                 Cancel
//               </AppButton>
//             </XStack>
//           </YStack>
          
//           {/* SECTION 8: Label Positions */}
//           <YStack gap="$4" marginBottom="$6">
//             <Text fontSize="$6" fontWeight="600">Label Positions</Text>
            
//             <AppCheckbox
//               label="Label on right (default)"
//               labelPosition="right"
//               checked={checkboxes.basic}
//               onChange={(val) => handleCheckboxChange('basic', val)}
//             />
            
//             <AppCheckbox
//               label="Label on left"
//               labelPosition="left"
//               checked={checkboxes.basic}
//               onChange={(val) => handleCheckboxChange('basic', val)}
//             />
            
//             <AppCheckbox
//               label={
//                 <XStack alignItems="center" gap="$2">
//                   <Text fontWeight="600">Custom Label Component</Text>
//                   <Text fontSize="$1" backgroundColor="$blue1" color="$blue9" paddingHorizontal="$1" borderRadius="$1">
//                     Pro
//                   </Text>
//                 </XStack>
//               }
//               checked={checkboxes.basic}
//               onChange={(val) => handleCheckboxChange('basic', val)}
//               helperText="Using custom React component as label"
//             />
//           </YStack>
          
//           {/* SECTION 9: Multiple Presets */}
//           <YStack gap="$4">
//             <Text fontSize="$6" fontWeight="600">Multiple Presets Combination</Text>
            
//             <AppCheckbox
//               preset={['primary', 'large', 'circle']}
//               label="Primary + Large + Circle"
//               checked={checkboxes.basic}
//               onChange={(val) => handleCheckboxChange('basic', val)}
//             />
            
//             <AppCheckbox
//               preset={['success', 'rounded', 'withLabel']}
//               label="Success + Rounded"
//               checked={checkboxes.basic}
//               onChange={(val) => handleCheckboxChange('basic', val)}
//             />
            
//             <AppCheckbox
//               preset={['outline', 'small', 'circle']}
//               label="Outline + Small + Circle"
//               checked={checkboxes.basic}
//               onChange={(val) => handleCheckboxChange('basic', val)}
//             />
            
//             <AppCheckbox
//               preset={['danger', 'filled', 'large']}
//               label="Danger + Filled + Large"
//               checked={checkboxes.basic}
//               onChange={(val) => handleCheckboxChange('basic', val)}
//             />
//           </YStack>
//         </View>
//       </ScrollView>
//     </TamaguiProvider>
//   )
// }