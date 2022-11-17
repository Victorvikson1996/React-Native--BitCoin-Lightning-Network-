import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {COLORS} from '../../Utils';

const DefaultButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '80%',
        backgroundColor: COLORS.BitCoin,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      testID="button">
      <Text
        testID="text"
        style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
