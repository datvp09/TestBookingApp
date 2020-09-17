import React from 'react';
import {Alert} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  LoadingScreen,
  LoginScreen,
  HomeScreen,
  CreateBookingScreen,
} from 'screens';
import {Icon} from 'react-native-elements';
import {store} from 'redux/store';
import {logOut} from 'redux/actions';

const Stack = createStackNavigator();

const onLogout = () => {
  Alert.alert('Confirm logout', '', [
    {
      text: 'Cancel',
      onPress: undefined,
      style: 'cancel',
    },
    {text: 'OK', onPress: () => store.dispatch(logOut())},
  ]);
};

const Router = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
    initialRouteName={'LoadingScreen'}>
    <Stack.Screen
      name="LoadingScreen"
      component={LoadingScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Main"
      component={HomeScreen}
      options={{
        title: 'Bookings',
        headerStyle: {
          backgroundColor: '#0066CC',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize: 18,
        },
        headerRight: (props) => (
          <Icon
            type={'ionicon'}
            name={'log-out-outline'}
            size={24}
            color={'white'}
            onPress={onLogout}
          />
        ),
        headerRightContainerStyle: {
          marginRight: 15,
        },
      }}
    />
    <Stack.Screen
      name="Auth"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={'CreateBookingScreen'}
      component={CreateBookingScreen}
      options={{
        title: 'Create Booking',
        headerBackTitle: '',
        headerStyle: {
          backgroundColor: '#0066CC',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize: 18,
        },
      }}
    />
  </Stack.Navigator>
);

export default Router;
