import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('screen');
const isiOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

export {width, height, isiOS, isAndroid};
