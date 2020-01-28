import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

const CatLooking = () => {
  useEffect(() => {}, []);
  return <LottieView source={require('./wifi-wiper.json')} autoPlay loop />;
};

export default CatLooking;
