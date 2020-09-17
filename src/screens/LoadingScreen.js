import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const LoadingScreen = ({navigation}) => {
  const {username} = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      const resetRoute = {name: !username || username == '' ? 'Auth' : 'Main'};

      navigation.reset({
        index: 0,
        routes: [resetRoute],
      });
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('assets/icons/app-logo.png')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066CC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
});

export default LoadingScreen;
