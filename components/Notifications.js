import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {useEffect} from 'react';
import { ONESIGNAL_KEY } from "../env.js"
//GET YOUR onesignal key and put it in env

const Notification = () => {
  useEffect(() => {
    OneSignal.init(ONESIGNAL_KEY);

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    return () => {
      OneSignal.removeEventListener('received');
      OneSignal.removeEventListener('opened');
      OneSignal.removeEventListener('ids');
    };
  }, []);

  const onReceived = notification => {
    console.log('Notification received: ', notification);
  };

  const onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  const onIds = device => {
    console.log('Device info: ', device);
  };

  return null;
};

export default Notification;
