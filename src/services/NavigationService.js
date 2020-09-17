import {CommonActions} from '@react-navigation/native';

class NavigationService {
  navigator = null;
  previousRouteName = '';
  currentRouteName = '';

  onNavigationStateChange = (prev, current) => {
    this.previousRouteName = prev;
    this.currentRouteName = current;
    console.log(prev, current);
  };

  setNavigator = (nav) => {
    if (nav) {
      this.navigator = nav;
    }
  };

  navigate = (routeName, params = {}) => {
    try {
      if (this.navigator && routeName) {
        const action = CommonActions.navigate({name: routeName, params});
        this.navigator.dispatch(action);
      }
    } catch (e) {
      console.log('navigate-error', e);
    }
  };

  goBack = () => {
    if (this.navigator) {
      const action = CommonActions.goBack();
      this.navigator.dispatch(action);
    }
  };

  resetHomeScreen = () => {
    if (this.navigator) {
      const action = CommonActions.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
      this.navigator.dispatch(action);
    }
  };

  resetLogin = () => {
    if (!this.navigator || this.currentRouteName == 'LoginScreen') {
      return;
    }
    const action = CommonActions.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
    this.navigator.dispatch(action);
  };
}

const navigationService = new NavigationService();
export default navigationService;
