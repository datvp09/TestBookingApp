import React from 'react';
import {View, ActivityIndicator, StyleSheet, Keyboard} from 'react-native';
import {width, height} from 'utils/';
import {Color} from 'theme';

const SpinnerCenter = (props) => {
  const {
    isVisible = true,
    spinnerSize = 'large',
    spinnerColor = Color.Processing,
  } = props;

  if (!isVisible) {
    return null;
  } else {
    Keyboard.dismiss();
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.indicatorWrap}>
        <ActivityIndicator size={spinnerSize} color={spinnerColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    position: 'absolute',
    width, // important
    height, // important
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  indicatorWrap: {
    backgroundColor: 'white',
    height: 100,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default SpinnerCenter;
