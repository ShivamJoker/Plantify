import React, {useEffect} from 'react';
import {View, SafeAreaView, Linking, Alert} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {WebView} from 'react-native-webview';

import {greenColor} from '../myColors';



const PrivacyPage = () => {

  return (
    <WebView
        source={{ uri: 'https://google.com' }}
      />
  );
};

export default PrivacyPage;
