import React from 'react';
import {View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Success from 'assets/icons/success-check.svg';
import Success2 from 'assets/icons/success-check-2.svg';
import ErrorCross from 'assets/icons/error-cross.svg';
import Close from 'assets/icons/close-icon.svg';
import Close2 from 'assets/icons/close-icon-2.svg';

const getIcon = (name, size, width, height, color) => {
  const map = new Map([
    ['success', Success],
    ['success-2', Success2],
    ['error-cross', ErrorCross],
    ['close', Close],
    ['close-2', Close2],
  ]);

  const IconName = map.get(name);

  if (!IconName) {
    return null;
  }

  return (
    <IconName
      width={size || width || 24}
      height={size || height || 24}
      fill={color || 'none'}
      fillRule={'evenodd'}
    />
  );
};

const CustomIcon = ({
  name,
  size,
  width,
  height,
  color,
  style,
  enableTouch = false,
  touchWithoutFeedback = false,
  onPress,
}) => {
  const Touch = touchWithoutFeedback
    ? TouchableWithoutFeedback
    : TouchableOpacity;
  const icon = (
    <View style={style}>{getIcon(name, size, width, height, color)}</View>
  );

  if (!enableTouch) {
    return icon;
  }

  return <Touch onPress={onPress}>{icon}</Touch>;
};

export default CustomIcon;
