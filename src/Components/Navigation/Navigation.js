import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, TransactionScreen, WalletScreen} from '../../Screen';

const Stack = createStackNavigator();

const ScreenOptions = {
  headerShown: false,
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={ScreenOptions}>
        <Stack.Screen component={HomeScreen} name="Home" />
        <Stack.Screen component={WalletScreen} name="WalletScreen" />
        <Stack.Screen component={TransactionScreen} name="Transc" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
