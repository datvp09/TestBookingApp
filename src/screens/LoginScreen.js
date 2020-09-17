import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useDispatch, useSelector} from 'react-redux';
import {login} from 'redux/actions';
import {height, isiOS} from 'utils';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const auth = useSelector((state) => state.auth);
  const [username, setUsername] = useState(auth.username);
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const isButtonDisabled = username == '' || password == '';

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
    };
  }, []);

  const _keyboardDidShow = () => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd();
      }
    }, 0);
  };

  const togglePassword = () => setIsShowPassword(!isShowPassword);

  const onLogin = () => {
    dispatch(login({username, password}));
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom', 'left', 'right']}
      onStartShouldSetResponder={() => true}
      onResponderRelease={Keyboard.dismiss}>
      <StatusBar barStyle={'dark-content'} />
      <KeyboardAvoidingView
        behavior={isiOS ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps={'handled'}>
          <View style={styles.header}>
            <Image
              source={require('assets/icons/app-logo.png')}
              style={styles.icon}
            />
          </View>
          <View style={styles.body}>
            <Text style={styles.guideBig}>{'Login'}</Text>
            <Text style={styles.guideSmall}>{'Please enter your account'}</Text>
            <Input
              placeholder={'Username'}
              onChangeText={setUsername}
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              placeholderTextColor={'rgba(46,46,46,0.65)'}
              value={username}
              returnKeyLabel={'Next'}
              blurOnSubmit={false}
            />
            <Input
              placeholder={'Password'}
              onChangeText={setPassword}
              inputStyle={styles.inputStyle}
              secureTextEntry={!isShowPassword}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              placeholderTextColor={'rgba(46,46,46,0.65)'}
              value={password}
              returnKeyLabel={'Done'}
              blurOnSubmit={false}
              rightIcon={
                <Icon
                  type={'material-community'}
                  name={isShowPassword ? 'eye' : 'eye-off'}
                  size={20}
                  containerStyle={styles.rightIcon}
                  color={'#999'}
                  onPress={togglePassword}
                />
              }
              rightIconContainerStyle={styles.rightIconContainerStyle}
            />
            <Button
              title="Login"
              onPress={onLogin}
              buttonStyle={styles.buttonStyle}
              disabledTitleStyle={{color: 'white'}}
              disabledStyle={{backgroundColor: '#F05A22'}}
              containerStyle={{opacity: isButtonDisabled ? 0.7 : 1}}
              disabled={isButtonDisabled}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: getStatusBarHeight(),
    alignItems: 'center',
  },
  icon: {height: height / 6, resizeMode: 'contain'},
  guideBig: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  guideSmall: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 25,
  },
  body: {
    padding: 20,
    paddingTop: height / 15,
  },
  inputStyle: {
    fontWeight: 'normal',
    fontSize: 16,
    height: 48,
    textAlign: 'center',
    color: '#2E2E2E',
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  containerStyle: {
    marginBottom: 10,
    borderColor: '#C9C9C9',
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    height: 48,
  },
  buttonStyle: {
    borderRadius: 24,
    height: 48,
    backgroundColor: '#F05A22',
  },
  rightIconContainerStyle: {
    position: 'absolute',
    right: 6,
    paddingLeft: 10,
  },
  rightIcon: {
    justifyContent: 'center',
    flex: 1,
  },
});

export default LoginScreen;
