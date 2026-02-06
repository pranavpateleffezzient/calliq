import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Dashboard';
import Signin_main from '../Signin_main';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator id="id">
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
        {/* <Stack.Screen name="Signin_main" component={Signin_main} options={{headerShown:false}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
