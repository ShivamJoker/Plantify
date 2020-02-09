import storage from './storage';
import {Alert, ToastAndroid} from 'react-native';
import React from 'react';
// const axios = require('axios').default;

export const setIP = async ip => {
  //we will make a request to the ip of device
  try {
    console.log('fetching url');
    // const data = await axios.get('http://192.168.43.231', {
    //   timeout: 5000,
    // });
    // const data = await fetch('http://192.168.43.231');
    // const res = await data;
    await storage.set('espIP', ip);

    // show a toast
    ToastAndroid.showWithGravity(
      'Device IP Saved 😄',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  } catch (err) {
    console.log(err);
    ToastAndroid.showWithGravity(
      'Device Not Found 😕',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  }
};
