import colors from 'mobile/constant/colors';
import dimonds from 'mobile/constant/dimonds';
import fonts from 'mobile/constant/font';
import CalendarInline from 'mobile/src/com/calendar/CalendarInline';
import CalendarModal from 'mobile/src/com/calendar/CalendarModal';
import { AppInput } from 'mobile/src/com/input/AppInput';
import tamaguiConfig from 'mobile/tamagui.config';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
const { width } = Dimensions.get('window');
import { useTabBarHeight } from './Dashboard'; 
export default function Homescreen() {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mail, setMail] = useState('');
  const [comapnyName, setCompanyName] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    phonenumber?: string;
    mail?: string;
    companyname?: string;
  }>({});
  const [success, setSuccess] = useState<{
    username?: string;
    phonenumber?: string;
    mail?: string;
    companyname?: string;
  }>({});
    const tabBarHeight = useTabBarHeight();

  const events = {
    '2026-02-14': { marked: true, dotColor: 'red' },
    '2026-02-20': { marked: true, dotColor: 'green' },
  };
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <SafeAreaProvider style={{ flex: 1, backgroundColor: colors.white,paddingBottom: tabBarHeight  }}>
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
        {/* <CalendarModal
  visible={open}
  onClose={() => setOpen(false)}
  mode="single"
  themeVariant="blue"
  markedDates={events}
/> */}
        <ScrollView>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            {/* <Text style={style.headerStyle}>Your Account info.</Text> */}
            <View
              style={{
                height: width * 0.3,
                width: width * 0.3,
                backgroundColor: colors.white,
                borderRadius: (width * 0.3) / 2,
                alignSelf: 'center',
                // iOS shadow
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                // Android shadow
                elevation: 30,
                marginTop: dimonds.space[7],
              }}
            >
              <Image
                source={require('../../assets/profile.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: (width * 0.3) / 2,
                }}
              />
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
              <AppInput
                preset={['default', 'fullWidth']}
                placeholder="Jay shah"
                // placeholderTextColor={colors.primary}
                marginTop={'$2'}
                paddingHorizontal={'$4'}
                fontSize={15}
                label="Your name"
                required
                fontFamily={fonts.reg}
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setErrors((prev) => ({ ...prev, username: undefined }));
                }}
                error={errors.username}
                success={success.username}
              />
              <AppInput
                preset={['default', 'fullWidth']}
                placeholder="9624907845"
                // placeholderTextColor={colors.primary}
                marginTop={'$2'}
                paddingHorizontal={'$4'}
                fontSize={15}
                label="Phone number"
                required
                fontFamily={fonts.reg}
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  setErrors((prev) => ({ ...prev, phonenumber: undefined }));
                }}
                error={errors.phonenumber}
                success={success.phonenumber}
              />

              <AppInput
                preset={['default', 'fullWidth']}
                placeholder="Jayshah617@gmail.com"
                // placeholderTextColor={colors.primary}
                marginTop={'$2'}
                paddingHorizontal={'$4'}
                fontSize={15}
                label="Mail id"
                required
                fontFamily={fonts.reg}
                value={mail}
                onChangeText={(text) => {
                  setMail(text);
                  setErrors((prev) => ({ ...prev, mail: undefined }));
                }}
                error={errors.mail}
                success={success.mail}
              />

              <AppInput
                preset={['disabled', 'fullWidth']}
                placeholder="Asus"
                placeholderTextColor={colors.primary}
                marginTop={'$2'}
                paddingHorizontal={'$4'}
                fontSize={15}
                label="Company name"
                required
                fontFamily={fonts.reg}
                value={comapnyName}
                onChangeText={(text) => {
                  setCompanyName(text);
                  setErrors((prev) => ({ ...prev, companyname: undefined }));
                }}
                error={errors.companyname}
                success={success.companyname}
                disabled
              />
             <AppInput
                preset={['disabled', 'fullWidth']}
                placeholder="Asus"
                placeholderTextColor={colors.primary}
                marginTop={'$2'}
                paddingHorizontal={'$4'}
                fontSize={15}
                label="Company name"
                required
                fontFamily={fonts.reg}
                value={comapnyName}
                onChangeText={(text) => {
                  setCompanyName(text);
                  setErrors((prev) => ({ ...prev, companyname: undefined }));
                }}
                error={errors.companyname}
                success={success.companyname}
                disabled
              />
             <AppInput
                preset={['disabled', 'fullWidth']}
                placeholder="Asus"
                placeholderTextColor={colors.primary}
                marginTop={'$2'}
                paddingHorizontal={'$4'}
                fontSize={15}
                label="Company name"
                required
                fontFamily={fonts.reg}
                value={comapnyName}
                onChangeText={(text) => {
                  setCompanyName(text);
                  setErrors((prev) => ({ ...prev, companyname: undefined }));
                }}
                error={errors.companyname}
                success={success.companyname}
                disabled
              />
             <AppInput
                preset={['disabled', 'fullWidth']}
                placeholder="Asus"
                placeholderTextColor={colors.primary}
                marginTop={'$2'}
                paddingHorizontal={'$4'}
                fontSize={15}
                label="Company sasassas"
                required
                fontFamily={fonts.reg}
                value={comapnyName}
                onChangeText={(text) => {
                  setCompanyName(text);
                  setErrors((prev) => ({ ...prev, companyname: undefined }));
                }}
                error={errors.companyname}
                success={success.companyname}
                disabled
              />
             
            </View>
          </View>
        </ScrollView>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}

const style = StyleSheet.create({
  title: {
    fontFamily: fonts.med,
    color: colors.black,
    fontSize: dimonds.size[3],
    marginTop: dimonds.space[6],
    marginLeft: dimonds.space[6],
  },
  body: {
    fontFamily: fonts.bol,
    color: colors.primary,
    fontSize: dimonds.size[5],
    marginLeft: dimonds.space[6],
  },
});
