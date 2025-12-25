import Reactotron from 'reactotron-react-native';
import { Platform } from 'react-native';

let tron: any = null;

if (__DEV__) {
  tron = Reactotron.configure({
    name: 'RoyaShop',
    host: Platform.OS === 'android' ? '10.0.2.2' : 'localhost',
  })
    .useReactNative({
      asyncStorage: false,
      networking: {
        ignoreUrls: /symbolicate/,
      },
      editor: false,
      errors: { veto: () => false },
      overlay: false,
    })
    .connect();

  tron.clear?.();

  console.tron = tron;
} else {
  console.tron = {
    log: () => {},
    warn: () => {},
    error: () => {},
    display: () => {},
    image: () => {},
  };
}

export default tron;

