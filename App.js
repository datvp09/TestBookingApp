import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {StatusBar} from 'react-native';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {store, persistor} from 'redux/store';
import {getActiveRouteName} from 'utils';
import {SpinnerCenter, NotificationModal, CustomIcon} from 'components/';
import {hideNotification} from 'redux/actions';
import navService from 'services/NavigationService';
import AppContainer from 'navigators/RootNavigator';

const SpinnerContainer = () => {
  const {isFetching} = useSelector((state) => state.data);

  return (
    <SpinnerCenter
      isVisible={isFetching && navService.currentRouteName != 'Main'}
    />
  );
};

const NotificationContainer = () => {
  const {
    isShowingNotification,
    notiMessage,
    notiTitle,
    notiType,
    showNotiCallback,
    functionComponent,
  } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const iconName = notiType == 'success' ? 'success-2' : 'error-cross';
  const onDismiss = () => {
    dispatch(hideNotification());
    if (showNotiCallback) {
      showNotiCallback();
    }
  };
  const props = {
    isVisible: isShowingNotification,
    title: notiTitle,
    description: notiMessage,
    onDismiss,
  };
  if (notiType) {
    props.iconComponent = <CustomIcon name={iconName} size={75} />;
  } else {
    props.functionComponent = functionComponent;
  }

  return <NotificationModal {...props} />;
};

const RootNavigation = () => {
  const navigationRef = useRef();
  const routeNameRef = useRef(); // use to store previous route name

  useEffect(() => {
    const state = navigationRef.current.getRootState();
    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
    navService.setNavigator(navigationRef.current);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);
        navService.onNavigationStateChange(previousRouteName, currentRouteName);
      }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
      <AppContainer />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <RootNavigation />
          <SpinnerContainer />
          <NotificationContainer />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
